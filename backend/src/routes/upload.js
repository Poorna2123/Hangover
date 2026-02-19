const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const SkinAnalysis = require('../models/SkinAnalysis');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Ensure uploads directory exists
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

/**
 * POST /api/upload
 * Upload image and analyze skin tone
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image uploaded' });
    }

    const { userId, budget } = req.body;

    console.log('📸 Image uploaded:', req.file.filename);

    // Send image to AI microservice
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path));

    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:5000';
    console.log('🤖 Sending to AI service:', aiServiceUrl);

    let aiResponse;
    try {
      aiResponse = await axios.post(`${aiServiceUrl}/analyze`, formData, {
        headers: formData.getHeaders(),
        timeout: 30000 // 30 second timeout
      });
    } catch (aiError) {
      console.error('❌ AI Service Error:', aiError.message);
      if (aiError.code === 'ECONNREFUSED') {
        // Clean up uploaded file
        fs.unlinkSync(req.file.path);
        return res.status(503).json({ 
          success: false, 
          error: 'AI service is not running. Please start the Python service on port 5000.' 
        });
      }
      throw aiError;
    }

    console.log('✅ AI Response:', aiResponse.data);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    if (!aiResponse.data.success) {
      return res.status(400).json({ 
        success: false, 
        error: aiResponse.data.error || 'Face detection failed. Please use a clear face photo.' 
      });
    }

    // Save analysis to database
    const analysis = new SkinAnalysis({
      userId: userId || null,
      toneScore: aiResponse.data.tone_score,
      toneLabel: aiResponse.data.tone_label,
      dominantColorRgb: aiResponse.data.dominant_color_rgb,
      dominantColorHsv: aiResponse.data.dominant_color_hsv,
      imageUrl: req.file.filename,
      budget: budget || null
    });

    await analysis.save();

    res.json({
      success: true,
      analysisId: analysis._id,
      toneScore: analysis.toneScore,
      toneLabel: analysis.toneLabel,
      dominantColor: analysis.dominantColorRgb
    });

  } catch (error) {
    console.error('❌ Upload error:', error.message);
    console.error('Full error:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      success: false, 
      error: error.response?.data?.error || error.message || 'Internal server error' 
    });
  }
});

module.exports = router;

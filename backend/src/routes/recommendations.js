const express = require('express');
const router = express.Router();
const SkinAnalysis = require('../models/SkinAnalysis');
const Product = require('../models/Product');
const { getSuitableColors } = require('../services/recommendationEngine');
const { getColorCombinations, getAccessoriesForOccasion } = require('../services/combinationExplorer');

/**
 * GET /api/recommendations/:analysisId
 * Get personalized recommendations based on skin tone analysis
 */
router.get('/:analysisId', async (req, res) => {
  try {
    const { analysisId } = req.params;
    const { occasion, baseColor, budget } = req.query;

    // Fetch analysis
    const analysis = await SkinAnalysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ success: false, error: 'Analysis not found' });
    }

    // Get suitable colors based on tone
    const suitableColors = getSuitableColors(analysis.toneScore);

    // Get color combinations if base color provided
    let combinations = [];
    if (baseColor) {
      combinations = getColorCombinations(baseColor);
    }

    // Get accessories for occasion
    let accessories = [];
    if (occasion) {
      accessories = getAccessoriesForOccasion(occasion);
    }

    // Fetch products matching criteria
    const query = {
      color: { $in: suitableColors }
    };

    if (occasion) {
      query.occasion = { $in: [occasion, 'All'] };
    }

    if (budget) {
      query.price = { $lte: parseFloat(budget) };
    }

    const products = await Product.find(query).limit(20);

    res.json({
      success: true,
      analysis: {
        toneScore: analysis.toneScore,
        toneLabel: analysis.toneLabel,
        dominantColor: analysis.dominantColorRgb
      },
      recommendations: {
        suitableColors,
        combinations,
        accessories,
        products: products.map(p => ({
          id: p._id,
          name: p.name,
          category: p.category,
          color: p.color,
          occasion: p.occasion,
          price: p.price,
          imageUrl: p.imageUrl,
          buyLink: p.buyLink
        }))
      }
    });

  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
});

/**
 * POST /api/recommendations/combinations
 * Get color combinations for a base color
 */
router.post('/combinations', (req, res) => {
  try {
    const { baseColor } = req.body;
    
    if (!baseColor) {
      return res.status(400).json({ success: false, error: 'Base color required' });
    }

    const combinations = getColorCombinations(baseColor);
    
    res.json({
      success: true,
      baseColor,
      combinations
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;

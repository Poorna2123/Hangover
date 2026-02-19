const express = require('express');
const router = express.Router();
const RecommendationSession = require('../models/RecommendationSession');
const SkinAnalysis = require('../models/SkinAnalysis');
const Product = require('../models/Product');
const { getSuitableColors } = require('../services/recommendationEngine');
const { getMatchingColors } = require('../services/matchingColorEngine');
const { getAccessoriesForOccasion } = require('../services/combinationExplorer');

/**
 * POST /api/wizard/start
 * Start a new recommendation session after skin tone analysis
 */
router.post('/start', async (req, res) => {
  try {
    const { analysisId, userId } = req.body;

    if (!analysisId) {
      return res.status(400).json({ success: false, error: 'Analysis ID required' });
    }

    // Fetch the skin analysis
    const analysis = await SkinAnalysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({ success: false, error: 'Analysis not found' });
    }

    // Get suitable colors based on skin tone
    const suitableColors = getSuitableColors(analysis.toneScore);

    // Create new recommendation session
    const session = new RecommendationSession({
      userId: userId || null,
      analysisId: analysis._id,
      skinTone: {
        score: analysis.toneScore,
        label: analysis.toneLabel,
        suitableColors: suitableColors
      },
      currentStep: 2 // Move to step 2 (color selection)
    });

    await session.save();

    res.json({
      success: true,
      sessionId: session._id,
      currentStep: 2,
      skinTone: {
        score: analysis.toneScore,
        label: analysis.toneLabel,
        dominantColor: analysis.dominantColorRgb
      },
      suitableColors: suitableColors
    });

  } catch (error) {
    console.error('Start wizard error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/wizard/select-primary-color
 * Step 2: User selects a primary color from suitable colors
 */
router.post('/select-primary-color', async (req, res) => {
  try {
    const { sessionId, primaryColor } = req.body;

    if (!sessionId || !primaryColor) {
      return res.status(400).json({ success: false, error: 'Session ID and primary color required' });
    }

    const session = await RecommendationSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    // Validate that the selected color is in suitable colors
    if (!session.skinTone.suitableColors.includes(primaryColor)) {
      return res.status(400).json({ success: false, error: 'Invalid color selection' });
    }

    // Get matching colors for the selected primary color
    const matchingData = getMatchingColors(primaryColor);

    // Update session
    session.selectedPrimaryColor = primaryColor;
    session.matchingColors = matchingData.matches;
    session.currentStep = 3;
    await session.save();

    res.json({
      success: true,
      sessionId: session._id,
      currentStep: 3,
      selectedPrimaryColor: primaryColor,
      matchingColors: matchingData.matches,
      description: matchingData.description
    });

  } catch (error) {
    console.error('Select primary color error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/wizard/select-matching-color
 * Step 3: User selects a matching color to pair with primary color
 */
router.post('/select-matching-color', async (req, res) => {
  try {
    const { sessionId, matchingColor } = req.body;

    if (!sessionId || !matchingColor) {
      return res.status(400).json({ success: false, error: 'Session ID and matching color required' });
    }

    const session = await RecommendationSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    // Validate that the selected color is in matching colors
    if (!session.matchingColors.includes(matchingColor)) {
      return res.status(400).json({ success: false, error: 'Invalid matching color selection' });
    }

    // Update session
    session.selectedMatchingColor = matchingColor;
    session.currentStep = 4;
    await session.save();

    res.json({
      success: true,
      sessionId: session._id,
      currentStep: 4,
      colorCombination: {
        primary: session.selectedPrimaryColor,
        matching: matchingColor
      },
      availableOccasions: ['Wedding', 'Formal', 'Casual', 'Party', 'Interview', 'Traditional', 'Date Night', 'Sports']
    });

  } catch (error) {
    console.error('Select matching color error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/wizard/select-occasion
 * Step 4: User selects the occasion
 */
router.post('/select-occasion', async (req, res) => {
  try {
    const { sessionId, occasion } = req.body;

    if (!sessionId || !occasion) {
      return res.status(400).json({ success: false, error: 'Session ID and occasion required' });
    }

    const session = await RecommendationSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    // Update session
    session.occasion = occasion;
    session.currentStep = 5;
    await session.save();

    res.json({
      success: true,
      sessionId: session._id,
      currentStep: 5,
      occasion: occasion,
      availableGenders: ['Male', 'Female', 'Unisex']
    });

  } catch (error) {
    console.error('Select occasion error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/wizard/select-gender
 * Step 5: User selects gender preference
 */
router.post('/select-gender', async (req, res) => {
  try {
    const { sessionId, gender } = req.body;

    if (!sessionId || !gender) {
      return res.status(400).json({ success: false, error: 'Session ID and gender required' });
    }

    const session = await RecommendationSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    // Update session
    session.gender = gender;
    session.currentStep = 6;
    await session.save();

    res.json({
      success: true,
      sessionId: session._id,
      currentStep: 6,
      gender: gender,
      message: 'Generating your personalized recommendations...'
    });

  } catch (error) {
    console.error('Select gender error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/wizard/recommendations/:sessionId
 * Step 6: Get final recommendations based on all selections
 */
router.get('/recommendations/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await RecommendationSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    // Validate that all steps are completed
    if (!session.selectedPrimaryColor || !session.selectedMatchingColor || !session.occasion || !session.gender) {
      return res.status(400).json({ success: false, error: 'Please complete all steps first' });
    }

    // Build product query
    const productQuery = {
      $or: [
        { color: session.selectedPrimaryColor },
        { color: session.selectedMatchingColor }
      ],
      occasion: { $in: [session.occasion, 'All'] },
      $or: [
        { gender: session.gender },
        { gender: 'Unisex' }
      ],
      priceRange: { $in: ['Mid', 'High'] }, // Mid to High range as requested
      inStock: true
    };

    // Fetch products
    const products = await Product.find(productQuery).limit(30);

    // Get accessories for the occasion
    const accessories = getAccessoriesForOccasion(session.occasion);

    // Update session with recommendations
    session.recommendations = {
      products: products.map(p => p._id),
      accessories: accessories,
      generatedAt: new Date()
    };
    session.completed = true;
    await session.save();

    res.json({
      success: true,
      sessionId: session._id,
      summary: {
        skinTone: session.skinTone,
        colorCombination: {
          primary: session.selectedPrimaryColor,
          matching: session.selectedMatchingColor
        },
        occasion: session.occasion,
        gender: session.gender
      },
      recommendations: {
        products: products.map(p => ({
          id: p._id,
          name: p.name,
          category: p.category,
          color: p.color,
          price: p.price,
          priceRange: p.priceRange,
          clothType: p.clothType,
          brand: p.brand,
          imageUrl: p.imageUrl,
          buyLink: p.buyLink,
          rating: p.rating,
          sizes: p.sizes,
          description: p.description
        })),
        accessories: accessories
      }
    });

  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/wizard/session/:sessionId
 * Get current session state
 */
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await RecommendationSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    res.json({
      success: true,
      session: {
        id: session._id,
        currentStep: session.currentStep,
        skinTone: session.skinTone,
        selectedPrimaryColor: session.selectedPrimaryColor,
        matchingColors: session.matchingColors,
        selectedMatchingColor: session.selectedMatchingColor,
        occasion: session.occasion,
        gender: session.gender,
        completed: session.completed
      }
    });

  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

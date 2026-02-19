const mongoose = require('mongoose');

const recommendationSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  analysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkinAnalysis',
    required: true
  },
  // Step 1: Skin tone analysis (completed via upload)
  skinTone: {
    score: { type: Number, required: true },
    label: { type: String, required: true },
    suitableColors: [String]
  },
  // Step 2: Primary color selection
  selectedPrimaryColor: {
    type: String,
    required: false
  },
  // Step 3: Matching color selection
  matchingColors: [String],
  selectedMatchingColor: {
    type: String,
    required: false
  },
  // Step 4: Occasion selection
  occasion: {
    type: String,
    enum: ['Wedding', 'Formal', 'Casual', 'Party', 'Interview', 'Traditional', 'Date Night', 'Sports'],
    required: false
  },
  // Step 5: Gender selection
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    required: false
  },
  // Step 6: Final recommendations (generated)
  recommendations: {
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    accessories: [Object],
    generatedAt: Date
  },
  // Session metadata
  currentStep: {
    type: Number,
    default: 1,
    min: 1,
    max: 6
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
recommendationSessionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('RecommendationSession', recommendationSessionSchema);

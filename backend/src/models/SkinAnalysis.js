const mongoose = require('mongoose');

const skinAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  toneScore: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  toneLabel: {
    type: String,
    required: true,
    enum: ['Very Fair', 'Fair', 'Medium', 'Dusky', 'Deep']
  },
  dominantColorRgb: {
    type: [Number],
    required: true
  },
  dominantColorHsv: {
    type: [Number],
    required: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  budget: {
    type: Number,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SkinAnalysis', skinAnalysisSchema);

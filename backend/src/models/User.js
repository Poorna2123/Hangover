const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  budget: {
    type: Number,
    default: null
  },
  preferences: {
    favoriteColors: [String],
    occasions: [String],
    style: {
      type: String,
      enum: ['Casual', 'Formal', 'Traditional', 'Ethnic', 'Sporty', 'Party'],
      default: 'Casual'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);

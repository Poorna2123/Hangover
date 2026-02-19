const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Shirt', 'T-Shirt', 'Dress', 'Jeans', 'Trousers', 'Skirt', 'Jacket', 'Saree', 'Kurta', 'Accessories']
  },
  color: {
    type: String,
    required: true
  },
  occasion: {
    type: [String],
    required: true,
    enum: ['Casual', 'Formal', 'Party', 'Traditional', 'Ethnic', 'Sporty', 'Wedding', 'Interview', 'Date Night', 'Sports', 'All']
  },
  price: {
    type: Number,
    required: true
  },
  priceRange: {
    type: String,
    enum: ['Budget', 'Mid', 'High', 'Luxury'],
    default: 'Mid'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Unisex'],
    default: 'Unisex'
  },
  clothType: {
    type: String,
    enum: ['Cotton', 'Silk', 'Linen', 'Polyester', 'Wool', 'Denim', 'Chiffon', 'Velvet', 'Leather', 'Mixed'],
    default: 'Cotton'
  },
  sizes: {
    type: [String],
    default: ['S', 'M', 'L', 'XL']
  },
  description: {
    type: String,
    default: ''
  },
  brand: {
    type: String,
    default: 'Generic'
  },
  imageUrl: {
    type: String,
    required: true
  },
  buyLink: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.index({ color: 1, occasion: 1, price: 1, gender: 1, priceRange: 1 });

module.exports = mongoose.model('Product', productSchema);

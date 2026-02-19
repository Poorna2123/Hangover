const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const productsData = require('../data/products-enhanced.json');
require('dotenv').config();

async function seedProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/swag-vastra');
    
    console.log('✅ Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    // Insert new products
    const inserted = await Product.insertMany(productsData);
    console.log(`✅ Seeded ${inserted.length} products successfully!`);
    
    // Show summary
    console.log('\n📊 Product Summary:');
    const summary = await Product.aggregate([
      {
        $group: {
          _id: {
            gender: '$gender',
            priceRange: '$priceRange'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.gender': 1, '_id.priceRange': 1 } }
    ]);
    
    summary.forEach(item => {
      console.log(`   ${item._id.gender} - ${item._id.priceRange}: ${item.count} products`);
    });
    
    console.log('\n✨ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedProducts();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();

const uploadRoutes = require('./routes/upload');
const recommendationRoutes = require('./routes/recommendations');
const wizardRoutes = require('./routes/wizard');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/swag-vastra', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/wizard', wizardRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'swag-vastra-backend' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});

module.exports = app;

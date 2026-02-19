# Swag Vastra - Enhanced Setup Guide

## Overview
This guide will help you set up and run the enhanced Swag Vastra application with the new multi-step recommendation wizard.

## New Features
✨ Multi-step recommendation wizard
✨ Primary and matching color selection
✨ Occasion-based recommendations (Wedding, Formal, Casual, Party, Interview, etc.)
✨ Gender-specific product filtering
✨ Enhanced product details (cloth type, price range)
✨ Improved landing page with detailed color science explanation

## Prerequisites
- Node.js 18+ (for backend and frontend)
- Python 3.8+ (for AI service)
- MongoDB (local or cloud instance)

## Installation Steps

### 1. AI Service Setup

```bash
cd swag-vastra/ai-service

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the AI service
python app.py
```

The AI service will run on `http://localhost:5000`

### 2. Backend Setup

```bash
cd swag-vastra/backend

# Install dependencies
npm install

# Create .env file (if not exists)
cp .env.example .env

# Edit .env file with your MongoDB URI
# Example:
# PORT=3001
# MONGODB_URI=mongodb://localhost:27017/swag-vastra
# AI_SERVICE_URL=http://localhost:5000
# NODE_ENV=development

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd swag-vastra/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Seed Database (Important!)

```bash
cd swag-vastra/backend

# Run the seed script to populate products
npm run seed
```

## Application Flow

### Step-by-Step User Journey

1. **Landing Page** (`/`)
   - User sees detailed explanation of HSV color science
   - Clicks "Get Started" to begin

2. **Upload Photo** (`/upload`)
   - User uploads a clear face photo
   - AI analyzes skin tone and provides 1-10 rating
   - Redirects to wizard

3. **Wizard - Step 2: Choose Primary Color** (`/wizard`)
   - Shows suitable colors based on skin tone
   - User selects one primary color (e.g., Baby Pink)

4. **Wizard - Step 3: Choose Matching Color**
   - Shows colors that match with selected primary color
   - User selects matching color (e.g., White)

5. **Wizard - Step 4: Select Occasion**
   - User chooses occasion: Wedding, Formal, Casual, Party, Interview, Traditional, Date Night, or Sports

6. **Wizard - Step 5: Select Gender**
   - User selects: Male, Female, or Unisex

7. **Final Recommendations** (`/recommendations`)
   - Shows complete style profile
   - Displays recommended accessories for the occasion
   - Shows clothing products with:
     - Product images
     - Brand names
     - Price (₹)
     - Price range (Mid/High)
     - Cloth type (Cotton, Silk, etc.)
     - Clickable "Buy Now" links
   - Filter by price range

## API Endpoints

### New Wizard Endpoints

- `POST /api/wizard/start` - Start recommendation session
- `POST /api/wizard/select-primary-color` - Select primary color
- `POST /api/wizard/select-matching-color` - Select matching color
- `POST /api/wizard/select-occasion` - Select occasion
- `POST /api/wizard/select-gender` - Select gender
- `GET /api/wizard/recommendations/:sessionId` - Get final recommendations
- `GET /api/wizard/session/:sessionId` - Get session state

### Existing Endpoints

- `POST /api/upload` - Upload image for analysis
- `GET /api/recommendations/:analysisId` - Get recommendations (old flow)

## Database Models

### New Models

**RecommendationSession**
- Tracks user's multi-step selection process
- Stores: skin tone, selected colors, occasion, gender
- Links to final product recommendations

### Enhanced Models

**Product** (Updated)
- Added fields: `gender`, `priceRange`, `clothType`, `sizes`, `description`
- Enhanced occasion enum: Wedding, Interview, Date Night, Sports

## Troubleshooting

### AI Service Not Running
```
Error: AI service is not running
Solution: Make sure Python service is running on port 5000
```

### MongoDB Connection Error
```
Error: MongoDB Connection Error
Solution: Check MONGODB_URI in .env file and ensure MongoDB is running
```

### No Products Found
```
Error: No products in recommendations
Solution: Run the seed script: npm run seed (in backend folder)
```

### Port Already in Use
```
Error: Port 3000/3001/5000 already in use
Solution: Kill the process or change port in configuration
```

## Testing the Application

### Test Flow
1. Visit `http://localhost:3000`
2. Click "Get Started"
3. Upload a test photo (use a clear face photo)
4. Follow the wizard steps:
   - Select a primary color
   - Select a matching color
   - Choose an occasion
   - Select gender preference
5. View your personalized recommendations

### Sample Test Data
- Skin Tone: 5/10 (Medium)
- Suitable Colors: White, Sky Blue, Baby Pink, Orange, Emerald Green, Royal Blue
- Example Selection: Baby Pink + White
- Occasion: Party
- Gender: Female

## Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
npm start
```

### Run Backend in Production
```bash
cd backend
NODE_ENV=production npm start
```

### Run AI Service in Production
```bash
cd ai-service
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Environment Variables

### Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/swag-vastra
AI_SERVICE_URL=http://localhost:5000
NODE_ENV=development
```

### Frontend (if needed)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Features Summary

### Color Science
- HSV (Hue, Saturation, Value) analysis
- 1-10 skin tone scale
- Scientific color matching

### Personalization
- Skin tone-based color recommendations
- Color combination matching
- Occasion-specific styling
- Gender-specific products

### Product Details
- Mid to High price range focus
- Cloth type information
- Brand names
- Direct purchase links
- Product ratings
- Size availability

### User Experience
- Step-by-step wizard interface
- Progress tracking
- Visual color selection
- Responsive design
- Smooth animations

## Support

For issues or questions:
1. Check this guide first
2. Review error messages in browser console
3. Check backend/AI service logs
4. Ensure all services are running

## Next Steps

After setup:
1. Test the complete user flow
2. Add more products to database (optional)
3. Customize color recommendations (optional)
4. Add Google OAuth (future enhancement)
5. Deploy to production (optional)

Happy styling! 🎨👗

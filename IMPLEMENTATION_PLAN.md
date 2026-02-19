# Swag Vastra - Enhanced Implementation Plan

## Overview
Multi-step AI-powered fashion recommendation system with Google OAuth, gender-specific recommendations, and occasion-based styling.

## New Features to Implement

### 1. Authentication
- Google OAuth 2.0 integration
- User profile management
- Session handling

### 2. Enhanced Landing Page
- Detailed explanation of color science (HSV, saturation, hue, value)
- Visual examples of the recommendation process
- Theme-based accessory matching explanation

### 3. Multi-Step Recommendation Flow

#### Step 1: Photo Upload & Skin Tone Analysis
- Upload photo
- AI analyzes and returns skin tone (1-10 scale)
- Display suitable colors based on tone

#### Step 2: Primary Color Selection
- User selects one color from suitable colors
- Example: Skin tone 5 → Colors: Navy Blue, Baby Pink, White, Sky Blue, Orange
- User selects: Baby Pink

#### Step 3: Matching Color Selection
- Show colors that match with selected primary color
- Example: Baby Pink matches with → White, Olive Green, Navy Blue, Gray
- User selects matching color: White

#### Step 4: Occasion Selection
- Wedding
- Formal/Office
- Casual Wear
- Party Wear
- Interview
- Traditional/Ethnic
- Date Night
- Sports/Gym

#### Step 5: Gender Selection
- Male
- Female
- Unisex

#### Step 6: Final Recommendations
- Clothing items with:
  - Product images
  - Brand names
  - Clickable purchase links
  - Price range (Mid: ₹1000-3000, High: ₹3000+)
  - Cloth type (Cotton, Silk, Linen, etc.)
- Matching accessories for the outfit
- Complete outfit combinations

## Technical Implementation

### Backend Changes
1. Add Google OAuth routes
2. Create multi-step recommendation API
3. Enhanced product filtering (gender, price range, cloth type)
4. Session management for recommendation flow

### Frontend Changes
1. Add authentication pages
2. Create step-by-step wizard component
3. Enhanced results page with filtering
4. Gender-specific product display

### Database Schema Updates
1. User model with Google OAuth
2. Enhanced Product model (gender, clothType, priceRange)
3. RecommendationSession model (track user's selection flow)

### AI Service
- No changes needed (already provides skin tone analysis)

## File Structure
```
swag-vastra/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js (NEW)
│   │   │   ├── recommendations-v2.js (NEW)
│   │   ├── models/
│   │   │   ├── RecommendationSession.js (NEW)
│   │   ├── middleware/
│   │   │   ├── auth.js (NEW)
│   │   ├── services/
│   │   │   ├── matchingColorEngine.js (NEW)
│   │   │   ├── genderSpecificRecommendations.js (NEW)
├── frontend/
│   ├── app/
│   │   ├── auth/ (NEW)
│   │   ├── wizard/ (NEW - Multi-step flow)
│   │   ├── recommendations/ (NEW - Final results)
│   ├── components/
│   │   ├── StepWizard.tsx (NEW)
│   │   ├── ColorSelector.tsx (NEW)
│   │   ├── OccasionSelector.tsx (NEW)
│   │   ├── GenderSelector.tsx (NEW)
```

## Implementation Priority
1. ✅ Create implementation plan
2. 🔄 Update database models
3. 🔄 Create multi-step recommendation API
4. 🔄 Build frontend wizard flow
5. 🔄 Add Google OAuth
6. 🔄 Enhance product data
7. 🔄 Testing & refinement

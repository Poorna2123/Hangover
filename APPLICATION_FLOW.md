# Swag Vastra - Application Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER STARTS HERE                         │
│                    http://localhost:3000                         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LANDING PAGE (/)                            │
│  • Explanation of HSV color science                              │
│  • How the app works                                             │
│  • Features overview                                             │
│  • [Get Started] button                                          │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   UPLOAD PAGE (/upload)                          │
│  • Drag & drop or click to upload photo                          │
│  • Image preview                                                 │
│  • [Analyze Skin Tone] button                                    │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │  POST /api/upload      │
                    │  • Sends image to AI   │
                    │  • Saves to MongoDB    │
                    │  • Returns analysisId  │
                    └────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              WIZARD PAGE (/wizard?analysisId=xxx)                │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 1: SKIN TONE ANALYSIS (Completed)                   │   │
│  │ ✓ Photo uploaded and analyzed                            │   │
│  │ ✓ Skin tone: 5/10 (Medium)                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 2: CHOOSE PRIMARY COLOR                             │   │
│  │ • Display suitable colors based on skin tone             │   │
│  │ • User selects one color (e.g., Baby Pink)               │   │
│  │ • POST /api/wizard/select-primary-color                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                        │
│                          ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 3: CHOOSE MATCHING COLOR                            │   │
│  │ • Display colors that match with Baby Pink               │   │
│  │ • User selects one (e.g., White)                         │   │
│  │ • POST /api/wizard/select-matching-color                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                        │
│                          ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 4: SELECT OCCASION                                  │   │
│  │ • Wedding                                                 │   │
│  │ • Formal/Office                                           │   │
│  │ • Casual Wear                                             │   │
│  │ • Party Wear                                              │   │
│  │ • Interview                                               │   │
│  │ • Traditional/Ethnic                                      │   │
│  │ • Date Night                                              │   │
│  │ • Sports/Gym                                              │   │
│  │ • User selects one (e.g., Party)                         │   │
│  │ • POST /api/wizard/select-occasion                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                        │
│                          ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 5: SELECT GENDER                                    │   │
│  │ • Male                                                    │   │
│  │ • Female                                                  │   │
│  │ • Unisex                                                  │   │
│  │ • User selects one (e.g., Female)                        │   │
│  │ • POST /api/wizard/select-gender                         │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│         RECOMMENDATIONS PAGE (/recommendations?sessionId=xxx)    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ YOUR STYLE PROFILE                                       │   │
│  │ • Skin Tone: Medium (5/10)                               │   │
│  │ • Color Combination: Baby Pink + White                   │   │
│  │ • Occasion: Party                                        │   │
│  │ • Style: Female                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ RECOMMENDED ACCESSORIES                                  │   │
│  │ • Chain - Statement chain necklace                       │   │
│  │ • Bracelet - Designer bracelet                           │   │
│  │ • Ring - Bold cocktail ring                              │   │
│  │ • Clutch - Embellished clutch bag                        │   │
│  │ • Heels - Stiletto or block heels                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ SHOP YOUR STYLE                                          │   │
│  │ [Filter: All Prices ▼]                                   │   │
│  │                                                           │   │
│  │ ┌──────────┐  ┌──────────┐  ┌──────────┐               │   │
│  │ │ Product 1│  │ Product 2│  │ Product 3│               │   │
│  │ │ Image    │  │ Image    │  │ Image    │               │   │
│  │ │ Name     │  │ Name     │  │ Name     │               │   │
│  │ │ Brand    │  │ Brand    │  │ Brand    │               │   │
│  │ │ Baby Pink│  │ White    │  │ Baby Pink│               │   │
│  │ │ Silk     │  │ Cotton   │  │ Chiffon  │               │   │
│  │ │ ₹2,500   │  │ ₹1,800   │  │ ₹3,200   │               │   │
│  │ │[Buy Now] │  │[Buy Now] │  │[Buy Now] │               │   │
│  │ └──────────┘  └──────────┘  └──────────┘               │   │
│  │                                                           │   │
│  │ ... more products ...                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  [Try Another Look] button                                       │
└─────────────────────────────────────────────────────────────────┘
```

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                    Next.js 14 + TypeScript                       │
│                    Port: 3000                                    │
│                                                                   │
│  Pages:                                                          │
│  • / (Landing)                                                   │
│  • /upload (Photo Upload)                                        │
│  • /wizard (Multi-step Wizard)                                   │
│  • /recommendations (Final Results)                              │
│                                                                   │
│  Components:                                                     │
│  • ColorSelector                                                 │
│  • MatchingColorSelector                                         │
│  • OccasionSelector                                              │
│  • GenderSelector                                                │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 │ HTTP Requests (Axios)
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
│                    Node.js + Express                             │
│                    Port: 3001                                    │
│                                                                   │
│  Routes:                                                         │
│  • POST /api/upload                                              │
│  • POST /api/wizard/start                                        │
│  • POST /api/wizard/select-primary-color                         │
│  • POST /api/wizard/select-matching-color                        │
│  • POST /api/wizard/select-occasion                              │
│  • POST /api/wizard/select-gender                                │
│  • GET  /api/wizard/recommendations/:sessionId                   │
│                                                                   │
│  Services:                                                       │
│  • recommendationEngine.js (Skin tone → Colors)                  │
│  • matchingColorEngine.js (Primary → Matching colors)            │
│  • combinationExplorer.js (Occasion → Accessories)               │
│                                                                   │
│  Models:                                                         │
│  • SkinAnalysis                                                  │
│  • RecommendationSession                                         │
│  • Product                                                       │
└─────────────────────────────────────────────────────────────────┘
                    │                              │
                    │                              │
                    ▼                              ▼
    ┌───────────────────────┐      ┌───────────────────────┐
    │    AI SERVICE         │      │      MONGODB          │
    │  Python + Flask       │      │   Database            │
    │  Port: 5000           │      │   Port: 27017         │
    │                       │      │                       │
    │  • MediaPipe          │      │  Collections:         │
    │  • OpenCV             │      │  • skinanalyses       │
    │  • K-Means            │      │  • recommendationsess │
    │  • Face Detection     │      │  • products           │
    │  • HSV Analysis       │      │  • users              │
    └───────────────────────┘      └───────────────────────┘
```

## Data Flow

### 1. Photo Upload & Analysis
```
User Photo
    │
    ▼
Frontend (/upload)
    │
    │ FormData with image
    ▼
Backend (POST /api/upload)
    │
    │ Forward image
    ▼
AI Service (POST /analyze)
    │
    │ MediaPipe Face Detection
    │ K-Means Clustering
    │ HSV Analysis
    ▼
Returns: {
    tone_score: 5,
    tone_label: "Medium",
    dominant_color_rgb: [180, 140, 120],
    dominant_color_hsv: [25, 33, 70]
}
    │
    ▼
Backend saves to MongoDB (SkinAnalysis)
    │
    ▼
Returns analysisId to Frontend
    │
    ▼
Redirect to /wizard?analysisId=xxx
```

### 2. Wizard Session Creation
```
Frontend (/wizard)
    │
    │ POST /api/wizard/start
    │ { analysisId: "xxx" }
    ▼
Backend
    │
    │ Fetch SkinAnalysis from MongoDB
    │ Get suitable colors (recommendationEngine)
    │ Create RecommendationSession
    ▼
Returns: {
    sessionId: "yyy",
    currentStep: 2,
    skinTone: { score: 5, label: "Medium" },
    suitableColors: ["White", "Sky Blue", "Baby Pink", ...]
}
    │
    ▼
Frontend displays Step 2 (Color Selection)
```

### 3. Color Selection Flow
```
User selects "Baby Pink"
    │
    │ POST /api/wizard/select-primary-color
    │ { sessionId: "yyy", primaryColor: "Baby Pink" }
    ▼
Backend
    │
    │ Get matching colors (matchingColorEngine)
    │ Update RecommendationSession
    ▼
Returns: {
    matchingColors: ["White", "Gray", "Navy Blue", ...]
}
    │
    ▼
Frontend displays Step 3 (Matching Color Selection)
    │
User selects "White"
    │
    │ POST /api/wizard/select-matching-color
    │ { sessionId: "yyy", matchingColor: "White" }
    ▼
Backend updates session
    │
    ▼
Frontend displays Step 4 (Occasion Selection)
```

### 4. Final Recommendations
```
User completes all steps
    │
    │ GET /api/wizard/recommendations/:sessionId
    ▼
Backend
    │
    │ Query Products:
    │   - color IN [Baby Pink, White]
    │   - occasion = Party OR All
    │   - gender = Female OR Unisex
    │   - priceRange IN [Mid, High]
    │   - inStock = true
    │
    │ Get accessories for Party occasion
    │
    │ Update RecommendationSession with results
    ▼
Returns: {
    summary: { skinTone, colorCombination, occasion, gender },
    recommendations: {
        products: [...],
        accessories: [...]
    }
}
    │
    ▼
Frontend displays recommendations with:
    • Style profile summary
    • Accessories list
    • Product grid with filters
    • Buy Now links
```

## Color Matching Logic

```
Skin Tone Analysis (1-10)
    │
    ▼
┌─────────────────────────────────────┐
│  Tone Score → Suitable Colors       │
│                                      │
│  1-2 (Very Fair)                    │
│    → Pastel Pink, Lavender, etc.    │
│                                      │
│  3-4 (Fair)                         │
│    → Coral, Turquoise, etc.         │
│                                      │
│  5-6 (Medium)                       │
│    → White, Sky Blue, Baby Pink     │
│                                      │
│  7-8 (Dusky)                        │
│    → Maroon, Mustard, etc.          │
│                                      │
│  9-10 (Deep)                        │
│    → Bright Red, Electric Blue      │
└─────────────────────────────────────┘
    │
    ▼
User selects Primary Color (e.g., Baby Pink)
    │
    ▼
┌─────────────────────────────────────┐
│  Primary Color → Matching Colors    │
│                                      │
│  Baby Pink matches with:            │
│    • White                           │
│    • Gray                            │
│    • Navy Blue                       │
│    • Mint Green                      │
│    • Gold                            │
│    • Beige                           │
│    • Olive Green                     │
│    • Black                           │
└─────────────────────────────────────┘
    │
    ▼
User selects Matching Color (e.g., White)
    │
    ▼
Final Color Combination: Baby Pink + White
```

## Session State Management

```
RecommendationSession Document:
{
    _id: "session_id",
    userId: null,  // Optional
    analysisId: "analysis_id",
    
    // Step 1 (completed via upload)
    skinTone: {
        score: 5,
        label: "Medium",
        suitableColors: ["White", "Sky Blue", ...]
    },
    
    // Step 2
    selectedPrimaryColor: "Baby Pink",
    
    // Step 3
    matchingColors: ["White", "Gray", ...],
    selectedMatchingColor: "White",
    
    // Step 4
    occasion: "Party",
    
    // Step 5
    gender: "Female",
    
    // Step 6
    recommendations: {
        products: [ObjectId, ObjectId, ...],
        accessories: [{type, description}, ...],
        generatedAt: Date
    },
    
    currentStep: 6,
    completed: true,
    createdAt: Date,
    updatedAt: Date
}
```

## Error Handling Flow

```
Any Step Fails
    │
    ▼
┌─────────────────────────────────────┐
│  Error Handling                      │
│                                      │
│  • Display error message             │
│  • Keep user on current step         │
│  • Allow retry                       │
│  • Log error to console              │
│  • Don't lose session data           │
└─────────────────────────────────────┘
    │
    ▼
User can:
    • Retry current step
    • Go back to previous step
    • Start over from upload
```

---

This flow diagram shows the complete journey from landing page to final recommendations, including all technical components and data flows.

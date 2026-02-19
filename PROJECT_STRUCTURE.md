# Swag Vastra - Project Structure

```
swag-vastra/
├── frontend/                    # Next.js App
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Landing page
│   │   ├── upload/
│   │   │   └── page.tsx        # Upload interface
│   │   └── results/
│   │       └── page.tsx        # Results dashboard
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── UploadZone.tsx
│   │   ├── ResultsView.tsx
│   │   └── OutfitCard.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                     # Express API Gateway
│   ├── src/
│   │   ├── routes/
│   │   │   ├── upload.js
│   │   │   └── recommendations.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── SkinAnalysis.js
│   │   │   └── Product.js
│   │   ├── services/
│   │   │   ├── recommendationEngine.js
│   │   │   └── combinationExplorer.js
│   │   └── server.js
│   ├── data/
│   │   └── products.json
│   └── package.json
│
└── ai-service/                  # Python CV Microservice
    ├── tone_classifier.py
    ├── requirements.txt
    └── app.py                   # Flask API wrapper
```

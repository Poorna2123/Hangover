# Getting Started Checklist ✅

Use this checklist to ensure you have everything set up correctly before running Swag Vastra.

## Pre-Installation Checklist

### System Requirements
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Python 3.8+ installed (`python --version`)
- [ ] MongoDB installed and accessible
- [ ] Git installed (if cloning from repository)
- [ ] At least 2GB free disk space
- [ ] Internet connection for package downloads

### Development Tools (Optional but Recommended)
- [ ] VS Code or preferred code editor
- [ ] MongoDB Compass (for database visualization)
- [ ] Postman or similar (for API testing)

## Installation Checklist

### AI Service Setup
- [ ] Navigate to `swag-vastra/ai-service`
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate virtual environment
  - Windows: `venv\Scripts\activate`
  - Mac/Linux: `source venv/bin/activate`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Verify installation: Check for errors
- [ ] Test run: `python app.py`
- [ ] Verify service: Visit `http://localhost:5000/health`
- [ ] Should see: `{"status": "healthy", "service": "ai-tone-classifier"}`

### Backend Setup
- [ ] Navigate to `swag-vastra/backend`
- [ ] Install dependencies: `npm install`
- [ ] Create .env file: `cp .env.example .env`
- [ ] Edit .env file with correct values:
  - [ ] PORT=3001
  - [ ] MONGODB_URI (your MongoDB connection string)
  - [ ] AI_SERVICE_URL=http://localhost:5000
  - [ ] NODE_ENV=development
- [ ] Verify MongoDB is running
- [ ] Seed database: `npm run seed`
- [ ] Should see: "✅ Products seeded successfully"
- [ ] Start backend: `npm run dev`
- [ ] Verify service: Visit `http://localhost:3001/health`
- [ ] Should see: `{"status": "healthy", "service": "swag-vastra-backend"}`

### Frontend Setup
- [ ] Navigate to `swag-vastra/frontend`
- [ ] Install dependencies: `npm install`
- [ ] Verify no errors during installation
- [ ] Start frontend: `npm run dev`
- [ ] Verify service: Visit `http://localhost:3000`
- [ ] Should see: Swag Vastra landing page

## First Run Checklist

### Verify All Services
- [ ] AI Service running on port 5000
- [ ] Backend running on port 3001
- [ ] Frontend running on port 3000
- [ ] MongoDB connected (check backend logs)
- [ ] No error messages in any terminal

### Test Basic Flow
- [ ] Open `http://localhost:3000` in browser
- [ ] Landing page loads correctly
- [ ] Click "Get Started" button
- [ ] Upload page loads
- [ ] Can select/drag image file
- [ ] Upload a test photo (clear face photo)
- [ ] Photo preview appears
- [ ] Click "Analyze Skin Tone"
- [ ] Loading indicator appears
- [ ] Redirects to wizard page
- [ ] Skin tone analysis shows (score 1-10)
- [ ] Suitable colors display

### Test Wizard Flow
- [ ] Step 2: Can select primary color
- [ ] Step 3: Matching colors appear
- [ ] Step 3: Can select matching color
- [ ] Step 4: Occasion options display
- [ ] Step 4: Can select occasion
- [ ] Step 5: Gender options display
- [ ] Step 5: Can select gender
- [ ] Redirects to recommendations page
- [ ] Style profile summary shows
- [ ] Accessories display
- [ ] Products display with images
- [ ] Can filter by price range
- [ ] "Buy Now" links work

## Troubleshooting Checklist

### If AI Service Fails
- [ ] Check Python version: `python --version` (should be 3.8+)
- [ ] Check if virtual environment is activated
- [ ] Reinstall dependencies: `pip install -r requirements.txt`
- [ ] Check for port 5000 conflicts: `netstat -ano | findstr :5000` (Windows)
- [ ] Check error messages in terminal
- [ ] Try: `pip install opencv-python mediapipe scikit-learn flask flask-cors`

### If Backend Fails
- [ ] Check Node version: `node --version` (should be 18+)
- [ ] Check MongoDB is running: `mongosh` or MongoDB Compass
- [ ] Verify .env file exists and has correct values
- [ ] Check for port 3001 conflicts
- [ ] Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- [ ] Check MongoDB URI format: `mongodb://localhost:27017/swag-vastra`
- [ ] Run seed script again: `npm run seed`

### If Frontend Fails
- [ ] Check Node version: `node --version` (should be 18+)
- [ ] Check for port 3000 conflicts
- [ ] Delete node_modules and .next: `rm -rf node_modules .next && npm install`
- [ ] Clear browser cache
- [ ] Check browser console for errors (F12)
- [ ] Try different browser

### If Upload Fails
- [ ] Check AI service is running (port 5000)
- [ ] Check backend is running (port 3001)
- [ ] Check image file size (should be < 10MB)
- [ ] Check image format (JPG, PNG, JPEG)
- [ ] Check face is clearly visible in photo
- [ ] Check browser console for errors
- [ ] Check backend terminal for errors

### If No Products Show
- [ ] Run seed script: `cd backend && npm run seed`
- [ ] Check MongoDB has products: Use MongoDB Compass
- [ ] Check database name is correct: `swag-vastra`
- [ ] Check products collection exists
- [ ] Verify products have required fields (color, gender, occasion, priceRange)

### If Wizard Doesn't Progress
- [ ] Check browser console for errors
- [ ] Check backend terminal for errors
- [ ] Verify sessionId is being passed
- [ ] Check network tab in browser dev tools
- [ ] Try refreshing the page
- [ ] Start over from upload page

## Performance Checklist

### Optimize for Better Performance
- [ ] Close unnecessary applications
- [ ] Use Chrome or Firefox (recommended)
- [ ] Clear browser cache regularly
- [ ] Restart services if they become slow
- [ ] Check system resources (CPU, RAM)
- [ ] Use smaller test images (< 5MB)

## Development Checklist

### Before Making Changes
- [ ] Create a backup of working code
- [ ] Create a new git branch
- [ ] Document what you're changing
- [ ] Test changes locally first

### After Making Changes
- [ ] Test the complete user flow
- [ ] Check for console errors
- [ ] Verify all services still work
- [ ] Test on different browsers
- [ ] Update documentation if needed

## Production Checklist (When Ready)

### Before Deployment
- [ ] Test complete flow multiple times
- [ ] Fix all known bugs
- [ ] Update environment variables for production
- [ ] Build frontend: `npm run build`
- [ ] Test production build locally
- [ ] Set up production MongoDB
- [ ] Configure CORS for production domains
- [ ] Set up SSL certificates
- [ ] Configure production AI service URL

### After Deployment
- [ ] Test live application
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Set up monitoring/alerts
- [ ] Document production URLs
- [ ] Create backup strategy

## Daily Development Checklist

### Starting Work
- [ ] Pull latest code changes
- [ ] Start MongoDB
- [ ] Start AI service
- [ ] Start backend
- [ ] Start frontend
- [ ] Verify all services running

### Ending Work
- [ ] Commit code changes
- [ ] Push to repository
- [ ] Stop all services (Ctrl+C)
- [ ] Document any issues found

## Quick Reference

### Service URLs
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- AI Service: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

### Important Commands
```bash
# AI Service
cd ai-service
python app.py

# Backend
cd backend
npm run dev
npm run seed

# Frontend
cd frontend
npm run dev
```

### Common Issues & Solutions
| Issue | Solution |
|-------|----------|
| Port in use | Kill process or change port |
| MongoDB not connected | Start MongoDB service |
| AI service timeout | Check Python service is running |
| No products | Run seed script |
| Upload fails | Check image size and format |

## Success Indicators ✅

You're ready to go when:
- ✅ All three services start without errors
- ✅ Landing page loads at localhost:3000
- ✅ Can upload a photo successfully
- ✅ Skin tone analysis works
- ✅ Wizard progresses through all steps
- ✅ Recommendations display with products
- ✅ No console errors
- ✅ All links work

## Need Help?

If you're stuck:
1. ✅ Check this checklist again
2. 📖 Read ENHANCED_SETUP_GUIDE.md
3. 🚀 Review START_ALL_SERVICES.md
4. 📝 Check CHANGES_SUMMARY.md
5. 🔍 Search error messages online
6. 💬 Ask for help with specific error messages

---

**Happy Coding! 🎨👗✨**

Remember: Take it step by step, and don't skip any checkboxes!

# Swag Vastra - Complete Setup Guide

## Prerequisites

Before starting, ensure you have these installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **Python** (v3.8 or higher)
   - Download from: https://www.python.org/
   - Verify: `python --version` or `python3 --version`

3. **MongoDB**
   - Option A: Install locally from https://www.mongodb.com/try/download/community
   - Option B: Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Verify: `mongod --version`

4. **pip** (Python package manager)
   - Usually comes with Python
   - Verify: `pip --version` or `pip3 --version`

---

## Step-by-Step Installation

### Step 1: Start MongoDB

**Option A - Local MongoDB:**
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
# OR
mongod --dbpath /path/to/data/directory
```

**Option B - MongoDB Atlas:**
- Create free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

---

### Step 2: Setup AI Service (Python)

Open a new terminal/command prompt:

```bash
# Navigate to AI service directory
cd swag-vastra/ai-service

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the AI service
python app.py
```

✅ AI Service should now be running on **http://localhost:5000**

Keep this terminal open!

---

### Step 3: Setup Backend (Node.js)

Open a NEW terminal/command prompt:

```bash
# Navigate to backend directory
cd swag-vastra/backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env
# Mac/Linux: cp .env.example .env

# Edit .env file with your settings:
# - If using local MongoDB: MONGODB_URI=mongodb://localhost:27017/swag-vastra
# - If using MongoDB Atlas: MONGODB_URI=your_atlas_connection_string

# Seed the database with products
npm run seed

# Start the backend server
npm run dev
```

✅ Backend should now be running on **http://localhost:3001**

Keep this terminal open!

---

### Step 4: Setup Frontend (Next.js)

Open a NEW terminal/command prompt:

```bash
# Navigate to frontend directory
cd swag-vastra/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend should now be running on **http://localhost:3000**

Keep this terminal open!

---

## Verify Everything is Running

You should have **3 terminals open**:

1. **Terminal 1**: AI Service (Python) - Port 5000
2. **Terminal 2**: Backend (Node.js) - Port 3001
3. **Terminal 3**: Frontend (Next.js) - Port 3000

### Quick Health Check

Open your browser and test:

1. Frontend: http://localhost:3000 (should show landing page)
2. Backend: http://localhost:3001/health (should show `{"status":"healthy"}`)
3. AI Service: http://localhost:5000/health (should show `{"status":"healthy"}`)

---

## Using the Application

1. Open browser to **http://localhost:3000**
2. Click **"Get Started"**
3. Upload a clear face photo (JPG/PNG)
4. Click **"Analyze Skin Tone"**
5. View your personalized recommendations!

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running (`mongod` command)

### Python Module Not Found
```
ModuleNotFoundError: No module named 'cv2'
```
**Solution**: 
```bash
pip install opencv-python
# OR install all requirements again
pip install -r requirements.txt
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: 
- Kill the process using that port
- Or change the port in the respective config

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### AI Service Not Responding
**Solution**: 
- Check if Python service is running on port 5000
- Verify `.env` file has correct `AI_SERVICE_URL=http://localhost:5000`
- Check firewall settings

### No Products Showing
**Solution**: Run the seed script
```bash
cd backend
npm run seed
```

---

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
npm start
```

### Run AI Service with Gunicorn
```bash
cd ai-service
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

---

## Environment Variables Reference

### Backend (.env)
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/swag-vastra
AI_SERVICE_URL=http://localhost:5000
NODE_ENV=development
```

### Frontend (optional .env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Need Help?

- Check all 3 services are running
- Verify MongoDB connection
- Check browser console for errors (F12)
- Check terminal logs for error messages
- Ensure all dependencies are installed

---

## Quick Start Commands Summary

```bash
# Terminal 1 - AI Service
cd swag-vastra/ai-service
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py

# Terminal 2 - Backend
cd swag-vastra/backend
npm install
copy .env.example .env
npm run seed
npm run dev

# Terminal 3 - Frontend
cd swag-vastra/frontend
npm install
npm run dev
```

Then visit: **http://localhost:3000**

🎉 Enjoy Swag Vastra!

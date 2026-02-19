# Quick Start Guide - Run All Services

## Windows Users

### Option 1: Manual Start (Recommended for First Time)

Open 3 separate command prompt/PowerShell windows:

**Window 1 - AI Service:**
```cmd
cd swag-vastra\ai-service
python app.py
```

**Window 2 - Backend:**
```cmd
cd swag-vastra\backend
npm run dev
```

**Window 3 - Frontend:**
```cmd
cd swag-vastra\frontend
npm run dev
```

### Option 2: Using Start Command (All at once)
```cmd
cd swag-vastra
start cmd /k "cd ai-service && python app.py"
start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm run dev"
```

## Mac/Linux Users

### Option 1: Manual Start (Recommended for First Time)

Open 3 separate terminal windows:

**Terminal 1 - AI Service:**
```bash
cd swag-vastra/ai-service
python app.py
```

**Terminal 2 - Backend:**
```bash
cd swag-vastra/backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd swag-vastra/frontend
npm run dev
```

### Option 2: Using tmux (All in one terminal)
```bash
cd swag-vastra

# Start AI service in background
cd ai-service && python app.py &

# Start backend in background
cd ../backend && npm run dev &

# Start frontend
cd ../frontend && npm run dev
```

## Verify Services Are Running

1. **AI Service**: Open `http://localhost:5000/health` - Should show "healthy"
2. **Backend**: Open `http://localhost:3001/health` - Should show "healthy"
3. **Frontend**: Open `http://localhost:3000` - Should show landing page

## First Time Setup Checklist

Before running services, make sure you've completed:

- [ ] Installed Python dependencies: `cd ai-service && pip install -r requirements.txt`
- [ ] Installed backend dependencies: `cd backend && npm install`
- [ ] Installed frontend dependencies: `cd frontend && npm install`
- [ ] Created backend .env file: `cd backend && cp .env.example .env`
- [ ] Started MongoDB (local or cloud)
- [ ] Seeded database: `cd backend && npm run seed`

## Stopping Services

### Windows
- Press `Ctrl + C` in each command prompt window
- Or close the windows

### Mac/Linux
- Press `Ctrl + C` in each terminal
- Or use: `killall node python`

## Common Issues

### Port Already in Use
If you get "port already in use" error:

**Windows:**
```cmd
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### MongoDB Not Running
Make sure MongoDB is installed and running:

**Windows:**
```cmd
net start MongoDB
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

## Access the Application

Once all services are running:

1. Open browser: `http://localhost:3000`
2. Click "Get Started"
3. Upload a photo
4. Follow the wizard steps
5. Get your personalized recommendations!

## Development Tips

- Frontend auto-reloads on file changes
- Backend auto-reloads with nodemon
- AI service needs manual restart after code changes
- Check browser console for frontend errors
- Check terminal/cmd for backend/AI errors

Enjoy building with Swag Vastra! 🚀

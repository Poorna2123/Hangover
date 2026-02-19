# Troubleshooting: "Failed to start wizard" Error

## The Problem
You're seeing "Failed to start wizard" error on the wizard page, which means the backend API call to `/api/wizard/start` is failing.

## Step-by-Step Fix

### 1. Check Backend is Running
Open the terminal where you started the backend and verify:
- You should see: `🚀 Backend server running on port 3001`
- You should see: `✅ MongoDB Connected`

If not running:
```powershell
cd swag-vastra\backend
npm run dev
```

### 2. Check MongoDB is Running
The backend needs MongoDB to be running.

**Windows:**
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# If not running, start it:
net start MongoDB
```

**If MongoDB is not installed:**
- Download from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### 3. Verify .env File
Check `swag-vastra/backend/.env` exists and has:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/swag-vastra
AI_SERVICE_URL=http://localhost:5000
NODE_ENV=development
```

### 4. Check Browser Console
Open browser DevTools (F12) and check the Console tab for errors.

Common errors:
- `ERR_CONNECTION_REFUSED` → Backend not running
- `404 Not Found` → Route not registered
- `500 Internal Server Error` → Check backend terminal for error details

### 5. Test Backend Directly
Open a new PowerShell and test the backend:

```powershell
# Test health endpoint
curl http://localhost:3001/health

# Should return: {"status":"healthy","service":"swag-vastra-backend"}
```

### 6. Check if Analysis ID Exists
The wizard needs a valid analysisId from the upload step.

**Solution:** Go back and upload a photo first:
1. Go to http://localhost:3000
2. Click "Get Started"
3. Upload a photo
4. Wait for analysis to complete
5. It should automatically redirect to wizard

### 7. Check Backend Logs
Look at the backend terminal for error messages like:
- `Analysis not found` → The analysisId doesn't exist in database
- `MongoDB Connection Error` → MongoDB not running
- `ValidationError` → Database schema issue

### 8. Restart All Services
Sometimes a fresh start helps:

**Stop all services** (Ctrl+C in each terminal)

**Start in order:**

Terminal 1 - AI Service:
```powershell
cd swag-vastra\ai-service
python app.py
```

Terminal 2 - Backend:
```powershell
cd swag-vastra\backend
npm run dev
```

Terminal 3 - Frontend:
```powershell
cd swag-vastra\frontend
npm run dev
```

### 9. Clear Browser Cache
Sometimes old data causes issues:
- Press Ctrl+Shift+Delete
- Clear cached images and files
- Refresh the page (Ctrl+F5)

### 10. Check Network Tab
In browser DevTools (F12), go to Network tab:
1. Refresh the page
2. Look for the request to `/api/wizard/start`
3. Click on it to see:
   - Request payload (should have analysisId)
   - Response (shows the actual error)

## Common Specific Errors

### Error: "Analysis ID required"
**Cause:** No analysisId in the URL
**Fix:** Go back to upload page and upload a photo first

### Error: "Analysis not found"
**Cause:** The analysisId doesn't exist in database
**Fix:** Upload a new photo to create a new analysis

### Error: "MongoDB Connection Error"
**Cause:** MongoDB is not running
**Fix:** Start MongoDB service (see step 2 above)

### Error: "Cannot read property 'toneScore' of null"
**Cause:** Analysis document is incomplete
**Fix:** Upload a new photo

## Quick Test Script

Create a test file to verify backend is working:

**test-wizard.js:**
```javascript
const axios = require('axios');

async function testWizard() {
  try {
    // First, test health
    const health = await axios.get('http://localhost:3001/health');
    console.log('✅ Backend health:', health.data);

    // Test wizard start (will fail without valid analysisId, but shows if route works)
    try {
      const wizard = await axios.post('http://localhost:3001/api/wizard/start', {
        analysisId: 'test123'
      });
      console.log('Wizard response:', wizard.data);
    } catch (err) {
      console.log('Expected error (invalid ID):', err.response?.data);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testWizard();
```

Run it:
```powershell
cd swag-vastra\backend
node test-wizard.js
```

## Still Not Working?

If none of the above works, please provide:
1. Backend terminal output (copy the error messages)
2. Browser console errors (F12 → Console tab)
3. Network tab response (F12 → Network → click on wizard/start request)

This will help identify the exact issue!

## Success Checklist

You know it's working when:
- ✅ Backend shows "MongoDB Connected"
- ✅ Backend shows "Backend server running on port 3001"
- ✅ http://localhost:3001/health returns healthy status
- ✅ Upload page successfully analyzes photo
- ✅ Wizard page loads without "Failed to start wizard" error
- ✅ You can see suitable colors displayed

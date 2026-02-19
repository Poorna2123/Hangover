# Service Check Script for Swag Vastra
Write-Host "=== Swag Vastra Service Check ===" -ForegroundColor Cyan
Write-Host ""

# Check AI Service (Port 5000)
Write-Host "Checking AI Service (Port 5000)..." -ForegroundColor Yellow
try {
    $aiHealth = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ AI Service is running" -ForegroundColor Green
    Write-Host "   Response: $($aiHealth.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ AI Service is NOT running" -ForegroundColor Red
    Write-Host "   Start it with: cd ai-service && python app.py" -ForegroundColor Yellow
}
Write-Host ""

# Check Backend (Port 3001)
Write-Host "Checking Backend (Port 3001)..." -ForegroundColor Yellow
try {
    $backendHealth = Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Backend is running" -ForegroundColor Green
    Write-Host "   Response: $($backendHealth.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Backend is NOT running" -ForegroundColor Red
    Write-Host "   Start it with: cd backend && npm run dev" -ForegroundColor Yellow
}
Write-Host ""

# Check Frontend (Port 3000)
Write-Host "Checking Frontend (Port 3000)..." -ForegroundColor Yellow
try {
    $frontendHealth = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ Frontend is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend is NOT running" -ForegroundColor Red
    Write-Host "   Start it with: cd frontend && npm run dev" -ForegroundColor Yellow
}
Write-Host ""

# Check MongoDB
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
try {
    $mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
    if ($mongoService -and $mongoService.Status -eq 'Running') {
        Write-Host "✅ MongoDB service is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MongoDB service not found or not running" -ForegroundColor Yellow
        Write-Host "   Start it with: net start MongoDB" -ForegroundColor Yellow
        Write-Host "   Or use MongoDB Atlas (cloud)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Could not check MongoDB service" -ForegroundColor Yellow
    Write-Host "   Make sure MongoDB is installed and running" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "If all services show ✅, your application should work!" -ForegroundColor Green
Write-Host "If any show ❌, start that service first." -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure all services are running (✅)" -ForegroundColor White
Write-Host "2. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "3. Click 'Get Started' and upload a photo" -ForegroundColor White
Write-Host ""

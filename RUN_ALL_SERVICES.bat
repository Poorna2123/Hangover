@echo off
echo ========================================
echo Starting Swag Vastra Application
echo ========================================
echo.

echo Starting AI Service...
start "AI Service" cmd /k "cd ai-service && venv\Scripts\activate && python app.py"
timeout /t 3

echo Starting Backend...
start "Backend" cmd /k "cd backend && npm run dev"
timeout /t 3

echo Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo All services are starting!
echo ============================
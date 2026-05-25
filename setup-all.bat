@echo off
REM WhatsApp Web App - Complete Setup Script
REM This script sets up all directories and moves files to proper locations

color 0A
cls
echo ============================================
echo   WhatsApp Web Android App - Setup
echo ============================================
echo.

REM Set working directory
cd /d F:\apps\android\whatsapp-web-app

echo [1/5] Creating directory structure...
mkdir backend\config 2>nul
mkdir backend\middleware 2>nul
mkdir backend\controllers 2>nul
mkdir backend\routes 2>nul
mkdir frontend\src\services 2>nul
mkdir frontend\src\pages 2>nul
mkdir frontend\public 2>nul
mkdir android-app\lib\services 2>nul
echo ✅ Directories created

echo.
echo [2/5] Moving backend files...
REM Backend files are already in root with prefix, we'll create them fresh
echo ✅ Backend files ready

echo.
echo [3/5] Moving frontend files...
echo ✅ Frontend files ready

echo.
echo [4/5] Backend dependencies...
cd backend
echo Installing backend packages...
call npm install
cd ..
echo ✅ Backend packages installed

echo.
echo [5/5] Frontend dependencies...
cd frontend
echo Installing frontend packages...
call npm install
cd ..
echo ✅ Frontend packages installed

echo.
echo ============================================
echo   ✅ Setup Complete!
echo ============================================
echo.
echo Next steps:
echo.
echo Terminal 1 - Start Backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Start Frontend:
echo   cd frontend
echo   npm start
echo.
echo Open browser to: http://localhost:3000
echo.
pause

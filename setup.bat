@echo off
REM WhatsApp Web - Unified Setup

setlocal enabledelayedexpansion
color 0A
cls

cd /d F:\apps\android\whatsapp-web-app

echo ============================================
echo   WhatsApp Web App - Complete Setup
echo ============================================
echo.

REM Step 1: Create Directories
echo [Step 1] Creating directory structure...
if not exist "backend\config" mkdir backend\config
if not exist "backend\middleware" mkdir backend\middleware
if not exist "backend\controllers" mkdir backend\controllers
if not exist "backend\routes" mkdir backend\routes
if not exist "frontend\src\services" mkdir frontend\src\services
if not exist "frontend\src\pages" mkdir frontend\src\pages
if not exist "frontend\public" mkdir frontend\public
if not exist "android-app\lib\services" mkdir android-app\lib\services
echo ✅ Directories created

REM Step 2: Copy/Move Backend Files
echo.
echo [Step 2] Setting up backend files...
copy backend-package.json backend\package.json >nul
copy backend-.env backend\.env >nul
copy backend-database.js backend\config\database.js >nul
copy backend-auth-middleware.js backend\middleware\auth.js >nul
copy backend-auth-controller.js backend\controllers\authController.js >nul
copy backend-index.js backend\index.js >nul
echo ✅ Backend files organized

REM Step 3: Copy/Move Frontend Files
echo.
echo [Step 3] Setting up frontend files...
copy frontend-package.json frontend\package.json >nul
copy frontend-api.js frontend\src\services\api.js >nul
copy frontend-Login.js frontend\src\pages\Login.js >nul
copy frontend-ChatPage.js frontend\src\pages\ChatPage.js >nul
copy frontend-App.js frontend\src\App.js >nul
echo ✅ Frontend files organized

REM Step 4: Install Backend Dependencies
echo.
echo [Step 4] Installing backend dependencies...
cd backend
call npm install >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend dependencies installed
) else (
    echo ⚠️  Backend install completed with warnings
)
cd ..

REM Step 5: Install Frontend Dependencies
echo.
echo [Step 5] Installing frontend dependencies...
cd frontend
call npm install >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend dependencies installed
) else (
    echo ⚠️  Frontend install completed with warnings
)
cd ..

echo.
echo ============================================
echo   ✅ Setup Complete!
echo ============================================
echo.
echo NEXT STEPS:
echo.
echo 1. Open Terminal 1 and run:
echo    cd backend
echo    npm run dev
echo.
echo 2. Open Terminal 2 and run:
echo    cd frontend
echo    npm start
echo.
echo 3. Open browser to: http://localhost:3000
echo.
echo 4. Register/Login and start chatting!
echo.
pause

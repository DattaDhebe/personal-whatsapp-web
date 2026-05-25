@echo off
cd /d F:\apps\android\whatsapp-web-app

REM Create Backend directories
mkdir backend\config
mkdir backend\middleware
mkdir backend\controllers
mkdir backend\routes

REM Create Frontend directories
mkdir frontend\src\services
mkdir frontend\src\pages
mkdir frontend\public

REM Create Android app directories
mkdir android-app\lib\services

echo.
echo ✅ All directories created successfully!
echo.
pause

# ⚡ QUICK FIX - Run this in PowerShell

# Go to project folder
cd F:\apps\android\whatsapp-web-app

# Create ALL directories at once
New-Item -ItemType Directory -Path "backend\config", "backend\middleware", "backend\controllers", "backend\routes", "frontend\src\services", "frontend\src\pages", "frontend\public" -Force | Out-Null

# Verify directories created
dir backend
dir frontend

echo "✅ Directories created! Now run:"
echo ""
echo "cd backend"
echo "npm install"

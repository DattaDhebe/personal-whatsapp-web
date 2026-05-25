#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = __dirname;

console.log('\n🚀 WhatsApp Web - Setup Script\n');

// Create directories
const dirs = [
  'backend/config',
  'backend/middleware',
  'backend/controllers',
  'backend/routes',
  'frontend/src/services',
  'frontend/src/pages',
  'frontend/public',
  'android-app/lib/services'
];

console.log('📁 Creating directories...');
dirs.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});
console.log('✅ Directories created\n');

// Copy backend files
console.log('📋 Organizing backend files...');
const backendFiles = {
  'backend-package.json': 'backend/package.json',
  'backend-.env': 'backend/.env',
  'backend-database.js': 'backend/config/database.js',
  'backend-auth-middleware.js': 'backend/middleware/auth.js',
  'backend-auth-controller.js': 'backend/controllers/authController.js',
  'backend-index.js': 'backend/index.js'
};

Object.entries(backendFiles).forEach(([src, dest]) => {
  const srcPath = path.join(projectRoot, src);
  const destPath = path.join(projectRoot, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
  }
});
console.log('✅ Backend files organized\n');

// Copy frontend files
console.log('📋 Organizing frontend files...');
const frontendFiles = {
  'frontend-package.json': 'frontend/package.json',
  'frontend-api.js': 'frontend/src/services/api.js',
  'frontend-Login.js': 'frontend/src/pages/Login.js',
  'frontend-ChatPage.js': 'frontend/src/pages/ChatPage.js',
  'frontend-App.js': 'frontend/src/App.js'
};

Object.entries(frontendFiles).forEach(([src, dest]) => {
  const srcPath = path.join(projectRoot, src);
  const destPath = path.join(projectRoot, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
  }
});
console.log('✅ Frontend files organized\n');

// Install dependencies
console.log('📦 Installing backend dependencies...');
try {
  execSync('cd backend && npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed\n');
} catch (error) {
  console.error('⚠️  Backend install had issues\n');
}

console.log('📦 Installing frontend dependencies...');
try {
  execSync('cd frontend && npm install', { stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed\n');
} catch (error) {
  console.error('⚠️  Frontend install had issues\n');
}

console.log('='.repeat(50));
console.log('✅ SETUP COMPLETE!\n');
console.log('Next steps:\n');
console.log('Terminal 1 - Backend:');
console.log('  cd backend');
console.log('  npm run dev\n');
console.log('Terminal 2 - Frontend:');
console.log('  cd frontend');
console.log('  npm start\n');
console.log('Open: http://localhost:3000\n');
console.log('='.repeat(50) + '\n');

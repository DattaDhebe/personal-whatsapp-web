# WhatsApp Web Android App

A comprehensive WhatsApp Web clone with Android support using Flutter, React PWA, Node.js backend, and MySQL database.

## Project Structure

```
whatsapp-web-app/
├── backend/              # Node.js Express server
│   ├── src/
│   │   ├── config/      # Database & configuration
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # Database models
│   │   ├── middleware/  # Auth & validation
│   │   └── index.js     # Main server file
│   └── package.json
│
├── frontend/             # React PWA (Web version)
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API & Socket.io services
│   │   ├── hooks/       # Custom React hooks
│   │   └── App.js
│   └── package.json
│
└── android-app/          # Flutter Android app
    ├── lib/
    │   ├── screens/     # App screens
    │   ├── widgets/     # Custom widgets
    │   ├── services/    # API & Socket.io
    │   └── main.dart
    └── pubspec.yaml
```

## Features

- 📱 **Cross-platform**: Web + Android support
- 💬 **Real-time Messaging**: Socket.io for instant messages
- 👥 **Group Chats**: Create and manage group conversations
- 🔐 **Authentication**: JWT-based user authentication
- 📞 **Contact Management**: Add and manage contacts
- 📡 **Online Status**: Real-time user online/offline status
- 📨 **Message Receipts**: Read and delivery confirmations
- 🎨 **Responsive UI**: Mobile-first design

## Tech Stack

- **Frontend**: React, Socket.io-client, Material-UI
- **Mobile**: Flutter
- **Backend**: Node.js, Express, Socket.io
- **Database**: MySQL
- **Authentication**: JWT

## Getting Started

### Prerequisites
- Node.js (v14+)
- MySQL
- Flutter SDK (for mobile)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your database credentials
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Database Setup

```bash
mysql -u root -p
CREATE DATABASE whatsapp_web;
USE whatsapp_web;
SOURCE backend/src/config/schema.sql;
```

## License

MIT

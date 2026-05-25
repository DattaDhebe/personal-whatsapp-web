# WhatsApp Web Android App - Setup Guide

## Quick Start

### Prerequisites
- Node.js v14+ and npm
- MySQL 5.7+
- Flutter SDK (for Android)
- Android Studio

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

**Configure .env:**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=whatsapp_web
JWT_SECRET=your_secret_key
PORT=5000
```

**Create MySQL Database:**
```bash
mysql -u root -p < src/config/schema.sql
```

**Start Backend:**
```bash
npm run dev
```

### 2. Frontend Setup (React PWA)

```bash
cd frontend
npm install
npm start
```

App runs on `http://localhost:3000`

### 3. Android App Setup (Flutter)

```bash
cd android-app
flutter pub get
flutter run
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Messages
- `GET /api/messages/:conversationId` - Get conversation messages
- `POST /api/messages/send` - Send a message
- `POST /api/messages/read` - Mark message as read

### Conversations
- `GET /api/conversations` - Get all conversations
- `POST /api/conversations` - Create new conversation

### Users
- `GET /api/users/contacts` - Get contacts list
- `PUT /api/users/:id` - Update user profile

## Socket.io Events

### Client -> Server
- `user_login` - Emit when user logs in
- `send_message` - Send a message
- `typing` - Notify user is typing
- `disconnect` - Clean up on disconnect

### Server -> Client
- `user_online` - User came online
- `user_offline` - User went offline
- `receive_message` - New message received
- `user_typing` - Someone is typing

## Project Structure

```
whatsapp-web-app/
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── config/    # Database config
│   │   ├── routes/    # API routes
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── index.js
│   └── package.json
│
├── frontend/          # React PWA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
│
└── android-app/       # Flutter
    ├── lib/
    │   ├── screens/
    │   ├── widgets/
    │   ├── services/
    │   └── main.dart
    └── pubspec.yaml
```

## Features Implemented

✅ User Authentication (JWT)
✅ Real-time Messaging (Socket.io)
✅ Group Chats
✅ Message History
✅ Online/Offline Status
✅ Read Receipts
✅ Responsive UI
✅ Android WebView Support

## Development Tips

1. **Hot Reload (React):**
   ```bash
   npm start
   ```

2. **Hot Reload (Flutter):**
   ```bash
   flutter run -v
   ```

3. **Check Backend Status:**
   ```bash
   curl http://localhost:5000/health
   ```

4. **Database Queries:**
   ```bash
   mysql -u root -p whatsapp_web
   SELECT * FROM users;
   SELECT * FROM messages;
   ```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Database Connection Error
- Ensure MySQL is running
- Check credentials in .env
- Verify database exists

### WebView Issues
- Enable WebView in Android settings
- Check device internet connectivity
- Verify backend is running on correct port

## Next Steps

1. Add end-to-end encryption
2. Implement voice/video calls
3. Add file sharing
4. Push notifications
5. Offline message queue
6. Message search functionality
7. User profile management
8. Settings & preferences

## License

MIT

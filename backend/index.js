const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.SOCKET_IO_CORS || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Import routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/auth', authRoutes);

// Socket.io event handlers
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user_login', (userId) => {
    connectedUsers.set(userId, socket.id);
    io.emit('user_online', { userId, socketId: socket.id });
    console.log('User logged in:', userId);
  });

  socket.on('send_message', (data) => {
    const { conversationId, senderId, message } = data;
    io.to(conversationId).emit('receive_message', {
      conversationId,
      senderId,
      message,
      timestamp: new Date()
    });
  });

  socket.on('typing', (data) => {
    const { conversationId, userId } = data;
    io.to(conversationId).emit('user_typing', { userId, conversationId });
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        io.emit('user_offline', { userId });
        console.log('User logged out:', userId);
        break;
      }
    }
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 WebSocket enabled`);
  console.log(`📦 Database: ${process.env.DB_NAME}`);
});

module.exports = { app, io, server };

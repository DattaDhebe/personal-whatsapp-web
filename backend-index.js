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
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Import routes
// const authRoutes = require('./routes/auth');
// const messageRoutes = require('./routes/messages');
// const userRoutes = require('./routes/users');
// const conversationRoutes = require('./routes/conversations');

// Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/conversations', conversationRoutes);

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
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io, server };

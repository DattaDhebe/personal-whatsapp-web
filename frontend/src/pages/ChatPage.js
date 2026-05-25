import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

const ChatPage = ({ userId, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      newSocket.emit('user_login', userId);
    });

    newSocket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => newSocket.close();
  }, [userId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    socket.emit('send_message', {
      conversationId: 1,
      senderId: userId,
      message: newMessage,
    });

    setMessages((prev) => [...prev, {
      senderId: userId,
      message: newMessage,
      timestamp: new Date(),
    }]);

    setNewMessage('');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, backgroundColor: '#075E54', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">WhatsApp Web</Typography>
          <Box>
            <Typography variant="caption" sx={{ mr: 2 }}>
              {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </Typography>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={onLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', p: 2, backgroundColor: '#ECE5DD' }}>
          {messages.length === 0 ? (
            <Typography align="center" color="textSecondary" sx={{ mt: 4 }}>
              No messages yet. Start a conversation!
            </Typography>
          ) : (
            messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1,
                  display: 'flex',
                  justifyContent: msg.senderId === userId ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    backgroundColor: msg.senderId === userId ? '#DCF8C6' : 'white',
                    borderRadius: 2,
                    wordWrap: 'break-word',
                  }}
                >
                  <Typography variant="body2">{msg.message}</Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2, display: 'flex', gap: 1, backgroundColor: 'white' }}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!isConnected}
            size="small"
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            type="submit"
            disabled={!isConnected || !newMessage.trim()}
            sx={{ backgroundColor: '#075E54' }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatPage;

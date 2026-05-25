import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import { getConversations, getMessages, sendMessage } from '../services/api';

const ChatPage = ({ userId, socket }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConversations();
    
    socket.on('receive_message', (data) => {
      if (data.conversationId === selectedConversation?.id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    socket.on('user_typing', (data) => {
      console.log(`${data.userId} is typing...`);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_typing');
    };
  }, [socket, selectedConversation]);

  const fetchConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    setLoading(true);
    try {
      const msgs = await getMessages(conversation.id);
      setMessages(msgs);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const messageData = await sendMessage(selectedConversation.id, userId, newMessage);
      socket.emit('send_message', {
        conversationId: selectedConversation.id,
        senderId: userId,
        message: newMessage,
      });
      setMessages((prev) => [...prev, messageData]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Conversations Sidebar */}
      <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #ddd', overflowY: 'auto' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Chats</Typography>
          <IconButton onClick={handleLogout} size="small">
            <LogoutIcon />
          </IconButton>
        </Box>
        <List>
          {conversations.map((conv) => (
            <ListItem
              key={conv.id}
              button
              selected={selectedConversation?.id === conv.id}
              onClick={() => handleSelectConversation(conv)}
            >
              <ListItemText
                primary={conv.name || 'New Chat'}
                secondary={conv.last_message || 'Start conversation'}
              />
            </ListItem>
          ))}
        </List>
      </Grid>

      {/* Chat Area */}
      <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
        {selectedConversation ? (
          <>
            <Box sx={{ p: 2, borderBottom: '1px solid #ddd', backgroundColor: '#075E54', color: 'white' }}>
              <Typography variant="h6">{selectedConversation.name}</Typography>
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: msg.sender_id === userId ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      maxWidth: '60%',
                      backgroundColor: msg.sender_id === userId ? '#25D366' : '#E5E5EA',
                      color: msg.sender_id === userId ? 'white' : 'black',
                    }}
                  >
                    <Typography variant="body2">{msg.content}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid #ddd', display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={loading}
              />
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                disabled={loading || !newMessage.trim()}
              >
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" color="textSecondary">
              Select a conversation to start chatting
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ChatPage;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#075E54',
    },
    secondary: {
      main: '#25D366',
    },
  },
});

const socket = io('http://localhost:5000');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    if (isAuthenticated && userId) {
      socket.emit('user_login', userId);
    }
  }, [isAuthenticated, userId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="xl">
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />}
            />
            <Route
              path="/"
              element={isAuthenticated ? <ChatPage userId={userId} socket={socket} /> : <Login setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />}
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

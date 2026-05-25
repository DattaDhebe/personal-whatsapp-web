import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthenticated ? (
        <ChatPage userId={userId} onLogout={handleLogout} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />
      )}
    </ThemeProvider>
  );
}

export default App;

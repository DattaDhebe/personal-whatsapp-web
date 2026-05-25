import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Tab, Tabs } from '@mui/material';
import { loginUser, registerUser } from '../services/api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Login = ({ setIsAuthenticated, setUserId }) => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone_number: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setFormData({ email: '', password: '', username: '', phone_number: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tabValue === 0) {
        await loginUser(formData.email, formData.password);
      } else {
        await registerUser(
          formData.username,
          formData.email,
          formData.password,
          formData.phone_number
        );
        await loginUser(formData.email, formData.password);
      }
      setUserId(localStorage.getItem('userId'));
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
          <Box sx={{ p: 2, backgroundColor: '#075E54', color: 'white', textAlign: 'center' }}>
            <Typography variant="h4" component="h1">
              WhatsApp Web
            </Typography>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="auth tabs"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, backgroundColor: '#075E54' }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, backgroundColor: '#075E54' }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;

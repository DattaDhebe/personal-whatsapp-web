import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import { loginUser, registerUser } from '../services/api';

const Login = ({ setIsAuthenticated, setUserId }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone_number: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await loginUser(formData.email, formData.password);
      } else {
        await registerUser(formData.username, formData.email, formData.password, formData.phone_number);
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
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {isLogin ? 'WhatsApp Web' : 'Create Account'}
          </Typography>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
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
                  label="Phone Number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  margin="normal"
                />
              </>
            )}

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
              color="primary"
              sx={{ mt: 3 }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Button color="primary" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register' : 'Login'}
            </Button>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;

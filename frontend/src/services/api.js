import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user.id);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (username, email, password, phone_number) => {
  try {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
      phone_number,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default api;

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user.id);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (username, email, password, phone_number) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
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

export const getMessages = async (conversationId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${conversationId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const sendMessage = async (conversationId, senderId, content) => {
  try {
    const response = await axios.post(
      `${API_URL}/messages/send`,
      { conversationId, senderId, content, messageType: 'text' },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getConversations = async () => {
  try {
    const response = await axios.get(`${API_URL}/conversations`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/contacts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password, phone_number } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await pool.getConnection();

    try {
      await connection.query(
        'INSERT INTO users (username, email, password, phone_number) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, phone_number || null]
      );
      
      res.status(201).json({ message: 'User registered successfully' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Register error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const connection = await pool.getConnection();
    
    try {
      const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

      if (users.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = users[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      });

      res.json({ 
        token, 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email,
          profile_picture: user.profile_picture
        } 
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };

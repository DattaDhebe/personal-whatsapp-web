const pool = require('../config/database');

// Get all messages for a conversation
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const connection = await pool.getConnection();

    const [messages] = await connection.query(
      `SELECT m.*, u.username FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at ASC`,
      [conversationId]
    );

    connection.release();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, content, messageType } = req.body;
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'INSERT INTO messages (conversation_id, sender_id, content, message_type) VALUES (?, ?, ?, ?)',
      [conversationId, senderId, content, messageType || 'text']
    );

    connection.release();
    res.status(201).json({ id: result.insertId, conversationId, senderId, content, messageType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark message as read
const markAsRead = async (req, res) => {
  try {
    const { messageId, userId } = req.body;
    const connection = await pool.getConnection();

    await connection.query(
      'INSERT INTO message_reads (message_id, user_id) VALUES (?, ?)',
      [messageId, userId]
    );

    connection.release();
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMessages, sendMessage, markAsRead };

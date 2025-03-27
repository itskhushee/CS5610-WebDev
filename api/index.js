// api/index.js
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { register, login, logout } = require('./controllers/authController');
const { getAllItems, createItem } = require('./controllers/itemController');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow requests from the React client
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

// Utility endpoint
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Authentication endpoints
app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

// Items endpoints (protected with requireAuth)
app.get('/items', requireAuth, getAllItems);
app.post('/items', requireAuth, createItem);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// 1. Enable CORS for all origins, headers, and standard methods
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Body parser middleware
app.use(express.json());

// 3. Health check ping route
app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

// 4. Mount API routes from Step 3 / Step 4
// If routes/index.js exists:
try {
  const apiRouter = require('./routes');
  app.use('/api', apiRouter);
} catch (e) {
  console.log('Routes directory not found, using base routes.');
}

// 5. Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/CardsDB';
mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully via Mongoose'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 6. Start the server (bind to port 5000 so Render and local hosts can reach it)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
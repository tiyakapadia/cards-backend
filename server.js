const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Enable CORS for all origins, headers, and standard methods
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Explicitly handle all preflight OPTIONS requests across routes
//app.options('*', cors());

// 2. Body parser middleware
app.use(express.json());

// 3. API routes MUST come after cors()
// (e.g. app.use('/api', apiRouter) or app.use('/api/users', usersRouter))
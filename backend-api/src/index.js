// src/index.js
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions));

app.use(express.json())

// Mount auth routes at /api/auth instead of /api
app.use('/api', require('./auth'))
app.use('/api', require('./contact'))

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`)
})

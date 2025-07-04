// src/auth.js
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('./db')
require('dotenv').config()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email, password)
    const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`)
    const user = stmt.get(email)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
    res.json({ token })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})


module.exports = router

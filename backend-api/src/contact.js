// src/contact.js
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('./db')
require('dotenv').config()

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Token missing' })

  const token = authHeader.split(' ')[1]
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' })
  }
}

router.get('/contact/:email', authMiddleware, (req, res) => {
  const { email } = req.params
  try {
    const stmt = db.prepare(`SELECT * FROM contacts WHERE email = ?`)
    const contact = stmt.get(email)
    if (!contact) return res.status(404).json({ error: 'Contact not found' })
    res.json(contact)
  } catch (error) {
    console.error('Error fetching contact:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router

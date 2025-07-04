// src/db.js
const Database = require('better-sqlite3').verbose()
const bcrypt = require('bcrypt')

const db = new Database('./data.db')

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      full_name TEXT,
      job_title TEXT,
      department TEXT,
      phone TEXT
    )
  `)

  // Seed user (email: test@example.com, password: password123)
  const saltRounds = 10
  const password = 'password123'
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (!err) {
      db.run(`INSERT OR IGNORE INTO users (email, password_hash) VALUES (?, ?)`, [
        'test@example.com',
        hash,
      ])
    }
  })

  // Seed contact
  db.run(
    `INSERT OR IGNORE INTO contacts (email, full_name, job_title, department, phone) VALUES (?, ?, ?, ?, ?)`,
    ['sender@example.com', 'John Doe', 'Software Engineer', 'IT', '123-456-7890']
  )
})

module.exports = db

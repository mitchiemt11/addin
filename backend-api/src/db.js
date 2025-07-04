// src/db.js
const Database = require('better-sqlite3')
const bcrypt = require('bcrypt')

const db = new Database('data.db')

try {
  // Create tables if they don't exist
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT
    )
  `).run()

  db.prepare(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      full_name TEXT,
      job_title TEXT,
      department TEXT,
      phone TEXT
    )
  `).run()

  // Seed user (email: test@example.com, password: password123)
  const saltRounds = 10
  const password = 'password123'
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (!err) {
      db.prepare(`INSERT OR IGNORE INTO users (email, password_hash) VALUES (?, ?)`)
        .run('test@example.com', hash)
    }
  })

  // Seed contact
  db.prepare(
    `INSERT OR IGNORE INTO contacts (email, full_name, job_title, department, phone) VALUES (?, ?, ?, ?, ?)`
  ).run(
    'sender@example.com', 
    'John Doe', 
    'Software Engineer', 
    'IT', 
    '123-456-7890'
  )
} catch (error) {
  console.error('Error initializing database:', error)
}

module.exports = db

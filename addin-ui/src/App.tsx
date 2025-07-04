// src/App.tsx
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ContactDetails from './components/ContactDetails';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={setToken} />} />
        <Route path="/" element={
          token ? (
            <ContactDetails token={token} />
          ) : (
            <Login onLoginSuccess={setToken} />
          )
        } />
      </Routes>
    </Router>
  )
}

export default App

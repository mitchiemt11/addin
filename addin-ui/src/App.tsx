// src/App.tsx
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import LoginForm from './components/LoginForm';
import ContactDetails from './components/ContactDetails'
import ContactEnrichment from './components/ContactEnrichment';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/enrich" element={<ContactEnrichment />} />
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

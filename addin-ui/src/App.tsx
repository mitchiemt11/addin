// src/App.tsx
import { useState } from 'react'
import Login from './components/Login'
import ContactDetails from './components/ContactDetails'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  return (
    <div className="bg-gray-100 min-h-screen">
      {token ? (
        <ContactDetails token={token} />
      ) : (
        <Login onLoginSuccess={setToken} />
      )}
    </div>
  )
}

export default App

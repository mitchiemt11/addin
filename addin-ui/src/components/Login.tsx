import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const token = response.data.token
      localStorage.setItem('token', token)
      onLoginSuccess(token)
      navigate('/')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-40 p-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-4xl text-center font-bold mb-2">Outlook Addin</h1>
        
      <div className="text-center mb-8">
        <h2 className="text-2xl text-center font-bold mb-2">Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  )
}

export default Login

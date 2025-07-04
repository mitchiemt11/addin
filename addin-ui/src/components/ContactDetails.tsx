// src/components/ContactDetails.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'

type Contact = {
  full_name: string
  job_title: string
  department: string
  phone: string
}

const ContactDetails = ({ token }: { token: string }) => {
  const [contact, setContact] = useState<Contact | null>(null)
  const [error, setError] = useState('')

  const sampleEmail = 'sender@example.com' // Simulate Outlook context

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/contact/${sampleEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setContact(response.data)
      } catch (err) {
        setError('Failed to fetch contact details')
      }
    }

    fetchContact()
  }, [token])

  if (error) return <p className="text-red-500 mt-10 text-center">{error}</p>

  return contact ? (
    <div className="max-w-md mx-auto mt-20 p-6 bg-green-50 rounded-2xl shadow-xl">
      <h2 className="text-lg font-bold mb-4">Contact Info</h2>
      <ul className="space-y-2">
        <li><strong>Name:</strong> {contact.full_name}</li>
        <li><strong>Job Title:</strong> {contact.job_title}</li>
        <li><strong>Department:</strong> {contact.department}</li>
        <li><strong>Phone:</strong> {contact.phone}</li>
      </ul>
    </div>
  ) : (
    <p className="text-center mt-10">Loading contact details...</p>
  )
}

export default ContactDetails

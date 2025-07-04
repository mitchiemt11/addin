import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Contact {
    email: string;
    fullName: string;
    department: string;
    phoneNumber: string;
    jobTitle: string;
}

export default function ContactEnrichment() {
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const fetchContact = async (email: string) => {
        try {
            setLoading(true);
            setError('');
            
            const response = await axios.get(
                `http://localhost:5000/api/contacts/enrich/${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            
            setContact(response.data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to fetch contact details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h2 className="text-3xl font-bold text-center mb-8">
                                    Contact Enrichment
                                </h2>
                                
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    
                                    <button
                                        onClick={() => fetchContact(email)}
                                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                                        disabled={loading || !email}
                                    >
                                        {loading ? 'Loading...' : 'Enrich Contact'}
                                    </button>
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {error}
                                    </div>
                                )}

                                {contact && (
                                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                        <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
                                        <div className="space-y-2">
                                            <p><strong>Email:</strong> {contact.email}</p>
                                            <p><strong>Full Name:</strong> {contact.fullName}</p>
                                            <p><strong>Department:</strong> {contact.department}</p>
                                            <p><strong>Phone Number:</strong> {contact.phoneNumber}</p>
                                            <p><strong>Job Title:</strong> {contact.jobTitle}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

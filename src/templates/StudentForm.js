import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const StudentForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/students/', { first_name: firstName, last_name: lastName, email });
            setSuccess('Student added successfully');
            setFirstName('');
            setLastName('');
            setEmail('');
            navigate('/students'); // Redirect to student list after submission
        } catch (err) {
            setError('Failed to add student');
        }
    };

    return (
        <div>
            <h2>Add New Student</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default StudentForm;

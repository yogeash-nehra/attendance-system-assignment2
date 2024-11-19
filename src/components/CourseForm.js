import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CourseForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [credits, setCredits] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/courses/', { name, description, credits });
            setSuccess('Course added successfully');
            setName('');
            setDescription('');
            setCredits('');
            navigate('/courses'); // Redirect to course list after submission
        } catch (err) {
            setError('Failed to add course');
        }
    };

    return (
        <div>
            <h2>Add New Course</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>Course Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Credits:</label>
                <input
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    required
                />
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default CourseForm;

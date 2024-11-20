import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CollegeDayForm = () => {
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/college-days/', { date });
            setSuccess('College Day added successfully');
            setDate('');
            navigate('/college-days'); // Redirect to college day list after submission
        } catch (err) {
            setError('Failed to add college day');
        }
    };

    return (
        <div>
            <h2>Add New College Day</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">Add College Day</button>
            </form>
        </div>
    );
};

export default CollegeDayForm;

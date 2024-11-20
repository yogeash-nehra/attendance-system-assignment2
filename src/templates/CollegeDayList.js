import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const CollegeDayList = () => {
    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollegeDays = async () => {
            try {
                const response = await api.get('/college-days/');
                setDays(response.data);
            } catch (err) {
                setError('Failed to load college days');
            } finally {
                setLoading(false);
            }
        };

        fetchCollegeDays();
    }, []);

    if (loading) return <p>Loading college days...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>College Days</h2>
            <Link to="/college-days/add">Add New College Day</Link>
            <ul>
                {days.map(day => (
                    <li key={day.id}>{day.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default CollegeDayList;

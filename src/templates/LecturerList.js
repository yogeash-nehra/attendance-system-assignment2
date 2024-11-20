import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const LecturerList = () => {
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const response = await api.get('/lecturers/');
                setLecturers(response.data);
            } catch (err) {
                setError('Failed to load lecturers');
            } finally {
                setLoading(false);
            }
        };

        fetchLecturers();
    }, []);

    if (loading) return <p>Loading lecturers...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Lecturers</h2>
            <Link to="/lecturers/add">Add New Lecturer</Link>
            <ul>
                {lecturers.map(lecturer => (
                    <li key={lecturer.id}>
                        {lecturer.first_name} {lecturer.last_name} - {lecturer.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LecturerList;

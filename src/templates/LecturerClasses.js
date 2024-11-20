import React, { useState, useEffect } from 'react';
import api from '../services/api';

const LecturerClasses = () => {
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLecturerClasses = async () => {
            try {
                const response = await api.get('/classes/', {
                    params: { lecturer: true }, // Assuming API filters classes by logged-in lecturer
                });
                setClasses(response.data);
            } catch (err) {
                setError('Failed to load classes');
            }
        };

        fetchLecturerClasses();
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Your Classes</h2>
            <ul>
                {classes.map(cls => (
                    <li key={cls.id}>
                        {cls.name} - {cls.course.name} ({cls.semester.name})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LecturerClasses;

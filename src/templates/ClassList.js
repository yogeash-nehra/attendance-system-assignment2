import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await api.get('/classes/');
                setClasses(response.data);
            } catch (err) {
                setError('Failed to load classes');
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    if (loading) return <p>Loading classes...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Classes</h2>
            <Link to="/classes/add">Add New Class</Link>
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

export default ClassList;

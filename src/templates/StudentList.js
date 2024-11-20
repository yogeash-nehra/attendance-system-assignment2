import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('/students/');
                setStudents(response.data);
            } catch (err) {
                setError('Failed to load students');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <p>Loading students...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Students</h2>
            <Link to="/students/add">Add New Student</Link>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.first_name} {student.last_name} - {student.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;

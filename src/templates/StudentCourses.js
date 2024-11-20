import React, { useState, useEffect } from 'react';
import api from '../services/api';

const StudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/student/courses/');
                setCourses(response.data);
            } catch (err) {
                setError('Failed to load courses');
            }
        };

        fetchCourses();
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>My Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        {course.name} - {course.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentCourses;

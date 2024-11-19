import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const response = await api.get(`courses/${id}/`);
                setCourse(response.data);
            } catch (err) {
                setError('Failed to load course details');
            }
        };

        fetchCourseDetail();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!course) return <p>Loading course details...</p>;

    return (
        <div>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <p>Credits: {course.credits}</p>
        </div>
    );
};

export default CourseDetail;


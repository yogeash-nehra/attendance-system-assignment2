import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ClassForm = () => {
    const [name, setName] = useState('');
    const [courses, setCourses] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedLecturer, setSelectedLecturer] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseResponse, semesterResponse, lecturerResponse] = await Promise.all([
                    api.get('/courses/'),
                    api.get('/semesters/'),
                    api.get('/lecturers/'),
                ]);
                setCourses(courseResponse.data);
                setSemesters(semesterResponse.data);
                setLecturers(lecturerResponse.data);
            } catch (err) {
                setError('Failed to load data');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/classes/', {
                name,
                course: selectedCourse,
                semester: selectedSemester,
                lecturer: selectedLecturer,
            });
            setSuccess('Class added successfully');
            setName('');
            setSelectedCourse('');
            setSelectedSemester('');
            setSelectedLecturer('');
            navigate('/classes'); // Redirect to class list after submission
        } catch (err) {
            setError('Failed to add class');
        }
    };

    return (
        <div>
            <h2>Add New Class</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>Class Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Course:</label>
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    required
                >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
                <label>Semester:</label>
                <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    required
                >
                    <option value="">Select Semester</option>
                    {semesters.map(semester => (
                        <option key={semester.id} value={semester.id}>
                            {semester.name}
                        </option>
                    ))}
                </select>
                <label>Lecturer:</label>
                <select
                    value={selectedLecturer}
                    onChange={(e) => setSelectedLecturer(e.target.value)}
                    required
                >
                    <option value="">Select Lecturer</option>
                    {lecturers.map(lecturer => (
                        <option key={lecturer.id} value={lecturer.id}>
                            {lecturer.first_name} {lecturer.last_name}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Class</button>
            </form>
        </div>
    );
};

export default ClassForm;

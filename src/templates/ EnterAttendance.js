import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EnterAttendance = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [date, setDate] = useState('');
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchLecturerClasses = async () => {
            try {
                const response = await api.get('/classes/', {
                    params: { lecturer: true },
                });
                setClasses(response.data);
            } catch (err) {
                setError('Failed to load classes');
            }
        };

        fetchLecturerClasses();
    }, []);

    const fetchStudents = async (classId) => {
        try {
            const response = await api.get(`/classes/${classId}/students/`);
            setStudents(response.data);
            setAttendance({});
        } catch (err) {
            setError('Failed to load students');
        }
    };

    const handleAttendanceChange = (studentId, isPresent) => {
        setAttendance((prev) => ({
            ...prev,
            [studentId]: isPresent,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/attendance/', {
                class_id: selectedClass,
                date,
                attendance,
            });
            setSuccess('Attendance recorded successfully');
        } catch (err) {
            setError('Failed to record attendance');
        }
    };

    return (
        <div>
            <h2>Enter Attendance</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>Select Class:</label>
                <select
                    value={selectedClass}
                    onChange={(e) => {
                        setSelectedClass(e.target.value);
                        fetchStudents(e.target.value);
                    }}
                    required
                >
                    <option value="">Select</option>
                    {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                            {cls.name}
                        </option>
                    ))}
                </select>
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <h3>Students</h3>
                {students.map((student) => (
                    <div key={student.id}>
                        <span>
                            {student.first_name} {student.last_name}
                        </span>
                        <label>
                            <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                value="present"
                                onChange={() => handleAttendanceChange(student.id, true)}
                            />
                            Present
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                value="absent"
                                onChange={() => handleAttendanceChange(student.id, false)}
                            />
                            Absent
                        </label>
                    </div>
                ))}
                <button type="submit">Submit Attendance</button>
            </form>
        </div>
    );
};

export default EnterAttendance;

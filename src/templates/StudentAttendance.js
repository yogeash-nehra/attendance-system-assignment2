import React, { useState, useEffect } from 'react';
import api from '../services/api';

const StudentAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await api.get('/student/attendance/');
                setAttendance(response.data);
            } catch (err) {
                setError('Failed to load attendance');
            }
        };

        fetchAttendance();
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>My Attendance</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Class</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map(record => (
                        <tr key={record.id}>
                            <td>{record.date}</td>
                            <td>{record.class_name}</td>
                            <td>{record.status ? 'Present' : 'Absent'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentAttendance;

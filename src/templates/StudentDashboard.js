import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    return (
        <div>
            <h2>Student Dashboard</h2>
            <ul>
                <li><Link to="/my-courses">View My Courses</Link></li>
                <li><Link to="/attendance">View My Attendance</Link></li>
            </ul>
        </div>
    );
};

export default StudentDashboard;

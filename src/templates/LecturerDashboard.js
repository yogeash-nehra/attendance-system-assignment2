import React from 'react';
import { Link } from 'react-router-dom';

const LecturerDashboard = () => {
    return (
        <div>
            <h2>Lecturer Dashboard</h2>
            <ul>
                <li><Link to="/college-days">Manage College Days</Link></li>
                <li><Link to="/attendance">Mark Attendance</Link></li>
            </ul>
        </div>
    );
};

export default LecturerDashboard;

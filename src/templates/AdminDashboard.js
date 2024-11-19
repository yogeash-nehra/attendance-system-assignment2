import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <ul>
                <li><Link to="/courses">Manage Courses</Link></li>
                <li><Link to="/semesters">Manage Semesters</Link></li>
                <li><Link to="/lecturers">Manage Lecturers</Link></li>
                <li><Link to="/students">Manage Students</Link></li>
                <li><Link to="/classes">Manage Classes</Link></li>
            </ul>
        </div>
    );
};

export default AdminDashboard;

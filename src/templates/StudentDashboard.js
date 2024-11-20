import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    return (
        <div>
            <h2>Student Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/student-courses">My Courses</Link>
                    </li>
                    <li>
                        <Link to="/student-attendance">My Attendance</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default StudentDashboard;

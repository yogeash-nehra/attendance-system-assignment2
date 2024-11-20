import React from 'react';
import { Link } from 'react-router-dom';

const LecturerDashboard = () => {
    return (
        <div>
            <h2>Lecturer Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/lecturer-classes">Manage Classes</Link>
                    </li>
                    <li>
                        <Link to="/lecturer-attendance">Enter Attendance</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default LecturerDashboard;

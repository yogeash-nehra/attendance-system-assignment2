import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => {
    return (
        <nav>
            <ul>
                {role === 'Admin' && (
                    <>
                        <li><Link to="/courses">Manage Courses</Link></li>
                        <li><Link to="/semesters">Manage Semesters</Link></li>
                        <li><Link to="/lecturers">Manage Lecturers</Link></li>
                        <li><Link to="/students">Manage Students</Link></li>
                    </>
                )}
                {role === 'Lecturer' && (
                    <>
                        <li><Link to="/college-days">Manage College Days</Link></li>
                        <li><Link to="/attendance">Mark Attendance</Link></li>
                    </>
                )}
                {role === 'Student' && (
                    <>
                        <li><Link to="/my-courses">View My Courses</Link></li>
                        <li><Link to="/attendance">View Attendance</Link></li>
                    </>
                )}
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

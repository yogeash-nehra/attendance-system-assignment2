import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './templates/AdminDashboard';
import LecturerDashboard from './templates/LecturerDashboard';
import StudentDashboard from './templates/StudentDashboard';
import CourseList from './templates/CourseList';
import CourseForm from './templates/CourseForm';
import LecturerList from './templates/LecturerList';
import LecturerForm from './templates/LecturerForm';
import StudentList from './templates/StudentList';
import StudentForm from './templates/StudentForm';
import ClassList from './templates/ClassList';
import ClassForm from './templates/ClassForm';
import CollegeDayList from './templates/CollegeDayList';
import CollegeDayForm from './templates/CollegeDayForm';
import LecturerClasses from './templates/LecturerClasses';
import EnterAttendance from './templates/EnterAttendance';
import StudentCourses from './templates/StudentCourses';
import StudentAttendance from './templates/StudentAttendance';
import Login from './components/Login';
import api from './services/api';

const App = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(null);

    // Fetch user role when authenticated
    useEffect(() => {
        if (authToken) {
            api.get('/user-role/', {
                headers: { Authorization: `Token ${authToken}` },
            })
                .then(response => {
                    setRole(response.data.role);
                })
                .catch(() => {
                    setAuthToken(null);
                    localStorage.removeItem('token');
                });
        }
    }, [authToken]);

    // Handle login and save token
    const handleLogin = (token, userRole) => {
        setAuthToken(token);
        localStorage.setItem('token', token);
        setRole(userRole);
    };

    // Handle logout
    const handleLogout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
        setRole(null);
    };

    // Redirect to login if no token
    if (!authToken) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Router>
            <div>
                <header>
                    <button onClick={handleLogout}>Logout</button>
                </header>
                {role === 'Admin' && <AdminDashboard />}
                {role === 'Lecturer' && <LecturerDashboard />}
                {role === 'Student' && <StudentDashboard />}

                <Routes>
                    {/* Admin Routes */}
                    {role === 'Admin' && (
                        <>
                            <Route path="/courses" element={<CourseList />} />
                            <Route path="/courses/add" element={<CourseForm />} />
                            <Route path="/lecturers" element={<LecturerList />} />
                            <Route path="/lecturers/add" element={<LecturerForm />} />
                            <Route path="/students" element={<StudentList />} />
                            <Route path="/students/add" element={<StudentForm />} />
                            <Route path="/classes" element={<ClassList />} />
                            <Route path="/classes/add" element={<ClassForm />} />
                            <Route path="/college-days" element={<CollegeDayList />} />
                            <Route path="/college-days/add" element={<CollegeDayForm />} />
                        </>
                    )}

                    {/* Lecturer Routes */}
                    {role === 'Lecturer' && (
                        <>
                            <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
                            <Route path="/lecturer-classes" element={<LecturerClasses />} />
                            <Route path="/lecturer-attendance" element={<EnterAttendance />} />
                        </>
                    )}

                    {/* Student Routes */}
                    {role === 'Student' && (
                        <>
                            <Route path="/student-dashboard" element={<StudentDashboard />} />
                            <Route path="/student-courses" element={<StudentCourses />} />
                            <Route path="/student-attendance" element={<StudentAttendance />} />
                        </>
                    )}

                    {/* Redirect unknown routes */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

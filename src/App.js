import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './templates/AdminDashboard';
import LecturerDashboard from './templates/LecturerDashboard';
import StudentDashboard from './templates/StudentDashboard';
import CourseList from './templates/CourseList';
import CourseForm from './templates/CourseForm';
import Login from './components/Login';
import api from './services/api';

const App = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (authToken) {
            api.get('/user-role/')
                .then(response => {
                    setRole(response.data.role);
                })
                .catch(() => {
                    setAuthToken(null);
                    localStorage.removeItem('token');
                });
        }
    }, [authToken]);

    const handleLogin = (token, userRole) => {
        setAuthToken(token);
        localStorage.setItem('token', token);
        setRole(userRole);
    };

    const handleLogout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
        setRole(null);
    };

    if (!authToken) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Router>
            <div>
                {role === 'Admin' && <AdminDashboard />}
                {role === 'Lecturer' && <LecturerDashboard />}
                {role === 'Student' && <StudentDashboard />}

                <Routes>
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/courses/add" element={<CourseForm />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>

                <button onClick={handleLogout}>Logout</button>
            </div>
        </Router>
    );
};

export default App;

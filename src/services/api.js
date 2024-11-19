import axios from 'axios';

// Set up an Axios instance with default configuration
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',  // Update with your Django API base URL if different
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor to include token in requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

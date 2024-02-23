import axios from "axios";

const API = axios.create({
    url: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (!token) {        
        return;
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;
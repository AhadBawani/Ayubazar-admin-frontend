import axios from "axios";

const API = axios.create({
    url: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    }
});

const getToken = () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM3NDY3Njg5MzY2NGFiOWE3M2FmOTQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDgyNDE0MjgsImV4cCI6MTcwODMyNzgyOH0.vX7H-Nl6zxuX-gtN8evaJsDE4hzBIBZp12yPIUY4BSA";
    // return localStorage.getItem('token');
}

API.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;
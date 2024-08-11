import axios from "axios";
import store from '../../Redux/Store/store';
import { UserAction, UserTokenAction } from "../../Redux/Actions/AdminUserActions";

const handleNoToken = () => {
    store.dispatch(UserAction(null));
    store.dispatch(UserTokenAction(null));
    window.location.href = 'https://ayubazar.in/authenticate';
}

const API = axios.create({
    url: 'https://api.ayubazar.in',
    headers: {
        'Content-Type': 'application/json',
    }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (!token) {
        handleNoToken();
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
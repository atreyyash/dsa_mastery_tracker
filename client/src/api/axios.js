import axios from 'axios';

const CreateApi = axios.create({
    baseURL: 'http://43.204.115.142/api',
});

CreateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default CreateApi;
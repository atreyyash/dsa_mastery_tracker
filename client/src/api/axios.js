import axios from 'axios';

const CreateApi = axios.create({
  baseURL: 'http://localhost:5000/api/',
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
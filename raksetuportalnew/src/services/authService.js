import apiClient from '../utils/apiClient';

export const registerUser = async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};

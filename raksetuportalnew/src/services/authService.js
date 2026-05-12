import apiClient from '../utils/apiClient';

export const sendOtp = async (phone) => {
    const response = await apiClient.post('/auth/send-otp', { phone });
    return response;
};

export const verifyOtp = async (phone, otp) => {
    const response = await apiClient.post('/auth/verify-otp', { phone, otp });
    if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const completeProfile = async (userData) => {
    const response = await apiClient.post('/auth/complete-profile', userData);
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

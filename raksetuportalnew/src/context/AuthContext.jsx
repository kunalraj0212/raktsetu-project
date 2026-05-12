import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, sendOtp, verifyOtp, completeProfile, logoutUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    console.error("Session invalid or expired", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const loginWithOtp = async (phone, otp) => {
        const data = await verifyOtp(phone, otp);
        if (!data.isNewUser) {
            setUser(data.user);
        }
        return data;
    };

    const registerProfile = async (userData) => {
        const data = await completeProfile(userData);
        setUser(data);
        return data;
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, sendOtp, loginWithOtp, registerProfile, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

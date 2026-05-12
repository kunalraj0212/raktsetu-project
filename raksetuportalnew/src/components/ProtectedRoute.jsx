import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Reusable route guard. Wraps any route that requires authentication.
 * - While auth is initializing (loading), shows a spinner to prevent flash-of-redirect.
 * - If user is not authenticated, redirects to /login and preserves the intended destination
 *   so the user is sent back after login.
 * - If authenticated, renders children normally.
 */
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                gap: '0.75rem',
                color: '#8B0000'
            }}>
                <div style={{
                    width: '24px',
                    height: '24px',
                    border: '3px solid #FDF2F2',
                    borderTop: '3px solid #8B0000',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }}></div>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Checking authentication...</span>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!user) {
        // Redirect to login, preserving the page they tried to visit
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;

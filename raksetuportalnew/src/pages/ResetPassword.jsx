import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { resetPassword as resetPasswordApi } from '../services/authService';
import './Login.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!email) {
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        if (!password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            await resetPasswordApi(email, password);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="login-split-page" style={{ minHeight: 'calc(100vh - 80px)' }}>
                <div className="login-right-panel" style={{ width: '100%', maxWidth: '500px', margin: '0 auto', borderLeft: 'none' }}>
                    <div className="login-form-container" style={{ padding: '3rem', textAlign: 'center' }}>
                        <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto 1.5rem' }} />
                        <h2 style={{ marginBottom: '1rem' }}>Password Reset Successful</h2>
                        <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
                            Your password has been changed successfully. You can now log in with your new password.
                        </p>
                        <Button onClick={() => navigate('/login')} variant="primary" className="btn-full-width">
                            Go to Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="login-split-page" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="login-right-panel" style={{ width: '100%', maxWidth: '500px', margin: '0 auto', borderLeft: 'none' }}>
                <div className="login-form-container" style={{ padding: '3rem' }}>
                    <div className="login-form-header">
                        <h2>Create New Password</h2>
                        <p>Enter a new password for {email}</p>
                    </div>

                    {error && (
                        <div className="form-global-error" style={{ color: 'var(--danger)', backgroundColor: '#FEF2F2', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500, border: '1px solid #FECACA' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type="submit" variant="primary" className="btn-full-width" disabled={isLoading || !password || !confirmPassword} style={{ marginTop: '0.5rem', height: '48px' }}>
                            {isLoading ? 'Updating...' : (
                                <>Update Password <ArrowRight size={18} /></>
                            )}
                        </Button>
                        
                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <Link to="/login" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600 }}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

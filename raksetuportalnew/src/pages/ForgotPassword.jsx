import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import Button from '../components/Button';
import './Login.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        // Direct navigation to reset password page carrying the email
        navigate('/reset-password', { state: { email } });
    };

    return (
        <div className="login-split-page" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="login-right-panel" style={{ width: '100%', maxWidth: '500px', margin: '0 auto', borderLeft: 'none' }}>
                <div className="login-form-container" style={{ padding: '3rem' }}>
                    <div className="login-form-header">
                        <h2>Reset Password</h2>
                        <p>Enter your email address to continue</p>
                    </div>

                    {error && (
                        <div className="form-global-error" style={{ color: 'var(--danger)', backgroundColor: '#FEF2F2', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 500, border: '1px solid #FECACA' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </div>

                        <Button type="submit" variant="primary" className="btn-full-width" disabled={!email} style={{ marginTop: '0.5rem', height: '48px' }}>
                            Continue <ArrowRight size={18} />
                        </Button>
                        
                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <Link to="/login" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600 }}>
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

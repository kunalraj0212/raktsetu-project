import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, HeartPulse, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password);
            const origin = location.state?.from?.pathname || '/donor-dashboard';
            navigate(origin);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-split-page">
            {/* Left Panel - Trust & Impact */}
            <div className="login-left-panel">
                <div className="login-impact-content">
                    <div className="login-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="48" fill="#FFF" stroke="var(--primary)" strokeWidth="4"/>
                            <path d="M50 20 C50 20, 25 50, 25 68 A25 25 0 0 0 75 68 C75 50, 50 20, 50 20 Z" fill="var(--primary)" />
                            <circle cx="42" cy="58" r="5" fill="#FFF" />
                            <path d="M30 80 C 30 68, 54 68, 54 80" stroke="#FFF" strokeWidth="4" fill="none" strokeLinecap="round" />
                            <circle cx="60" cy="64" r="4" fill="#FFF" />
                            <path d="M52 80 C 52 72, 68 72, 68 80" stroke="#FFF" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </svg>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0, color: 'var(--white)' }}>RaktaSetu</h2>
                    </div>
                    
                    <h1 className="login-impact-heading">
                        Welcome to India's Most Trusted Blood Network.
                    </h1>
                    <p className="login-impact-sub">
                        Your secure access to live blood banks, emergency requests, and donor matching. 
                        Every login helps save lives.
                    </p>

                    <div className="login-trust-badges">
                        <div className="trust-badge">
                            <ShieldCheck size={20} />
                            <span>NIC Certified Security</span>
                        </div>
                        <div className="trust-badge">
                            <Lock size={20} />
                            <span>End-to-End Encrypted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="login-right-panel">
                <div className="login-form-container">
                    <div className="login-form-header">
                        <h2>Secure Login</h2>
                        <p>Enter your credentials to access your dashboard</p>
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

                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label htmlFor="password">Password</label>
                                <a href="#" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>Forgot password?</a>
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type="submit" variant="primary" className="btn-full-width" disabled={isLoading || !email || !password} style={{ marginTop: '0.5rem', height: '48px' }}>
                            {isLoading ? 'Authenticating...' : (
                                <>Sign in to Dashboard <ArrowRight size={18} /></>
                            )}
                        </Button>

                        <div className="login-divider">
                            <span>or register new</span>
                        </div>

                        <div className="login-role-links">
                            <Link to="/register-donor" className="role-link donor">
                                <HeartPulse size={16} /> I want to Donate Blood
                            </Link>
                            <Link to="/register-bloodbank" className="role-link bank">
                                <ShieldCheck size={16} /> Register a Blood Bank
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

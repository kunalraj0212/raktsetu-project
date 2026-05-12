import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sendOtp, loginWithOtp } = useAuth();
    
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        if (!/^[0-9]{10}$/.test(phone)) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        setIsLoading(true);
        try {
            await sendOtp(phone);
            setStep(2);
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (otp.length !== 6) {
            setError('Please enter the 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            const data = await loginWithOtp(phone, otp);
            
            if (data.isNewUser) {
                // Navigate to profile completion page, passing the verified phone
                navigate('/register-donor', { state: { phone, verified: true } });
            } else {
                // Existing user logged in
                const origin = location.state?.from?.pathname || '/';
                navigate(origin);
            }
        } catch (err) {
            setError(err.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>{step === 1 ? 'Welcome' : 'Verify Phone'}</h1>
                    <p>{step === 1 ? 'Log in or sign up with your mobile number' : `Enter the 6-digit OTP sent to +91 ${phone}`}</p>
                </div>

                {error && (
                    <div className="form-global-error">
                        ⚠️ {error}
                    </div>
                )}

                {step === 1 ? (
                    <form className="login-form" onSubmit={handlePhoneSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <span style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', color: '#4b5563' }}>+91</span>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    placeholder="10-digit mobile number"
                                    style={{ flex: 1 }}
                                    autoFocus
                                />
                            </div>
                        </div>

                        <button type="submit" className="login-btn" disabled={isLoading || phone.length !== 10}>
                            {isLoading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form className="login-form" onSubmit={handleOtpSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="otp">One Time Password</label>
                            <input
                                id="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="Enter 6-digit OTP"
                                style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}
                                autoFocus
                            />
                        </div>

                        <button type="submit" className="login-btn" disabled={isLoading || otp.length !== 6}>
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>

                        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                            <button 
                                type="button" 
                                onClick={() => { setStep(1); setOtp(''); setError(null); }}
                                style={{ background: 'none', border: 'none', color: '#8B0000', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
                            >
                                Change Phone Number
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;

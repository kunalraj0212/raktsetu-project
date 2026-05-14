import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, MapPin, Phone, ShieldCheck, CheckCircle, FileText } from 'lucide-react';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import { useAuth } from '../context/AuthContext';
import './DonorRegistration.css'; // Reusing the same grid/card styles for consistency

import { phoneRegex } from '../utils/validators';

const BloodBankRegistration = () => {
    const navigate = useNavigate();
    
    const initialValues = {
        hospitalName: '', email: '', phone: '',
        state: '', district: '', address: '',
        licenseNumber: '', password: '', agreeTerms: false
    };
    
    const [registeredBank, setRegisteredBank] = useState(null);
    const { register } = useAuth();

    const validate = (data) => {
        const err = {};
        if (!data.hospitalName.trim()) err.hospitalName = 'Hospital/Bank name is required';
        
        if (!data.email.trim()) err.email = 'Official email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = 'Invalid email format';
        
        if (!data.password) err.password = 'Password is required';
        else if (data.password.length < 8) err.password = 'Password must be at least 8 characters long';
        
        if (!data.phone.trim()) err.phone = 'Contact number is required';
        else if (!phoneRegex.test(data.phone.replace(/\s/g, '')))
            err.phone = 'Enter a valid 10-digit Indian phone number';
            
        if (!data.state.trim()) err.state = 'State is required';
        if (!data.district.trim()) err.district = 'District is required';
        if (!data.licenseNumber.trim()) err.licenseNumber = 'Valid registration/license number is required for verification';
        if (!data.agreeTerms) err.agreeTerms = 'You must agree to the terms to register';
        return err;
    };

    const { formData, errors, submitState, handleChange, handleSubmit } = useForm({
        initialValues,
        validate,
        onSubmit: async (data) => {
            // Map the hospital specific fields to the User schema structure
            // We pass role: 'bloodbank' to correctly assign privileges
            const user = await register({
                fullName: data.hospitalName, // Overload fullName for the organization name
                email: data.email,
                password: data.password,
                phone: data.phone,
                state: data.state,
                district: data.district,
                address: data.address,
                role: 'bloodbank' // CRITICAL: Assigns the bloodbank role
            });
            setRegisteredBank(user);
        },
    });

    if (submitState === 'success' && registeredBank) {
        return (
            <div className="dr-page">
                <section className="dr-hero" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' }}>
                    <div className="container">
                        <h1>Partner Registration</h1>
                        <p>Thank you for joining India's digital blood network.</p>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="dr-success-card">
                            <div className="dr-success-icon" style={{ color: '#1e40af', backgroundColor: '#dbeafe' }}>
                                <CheckCircle size={56} />
                            </div>
                            <h2>Registration Successful! 🎉</h2>
                            <p>Welcome to RaktaSetu, <strong>{registeredBank.fullName}</strong>!</p>
                            <div className="dr-success-details">
                                <div className="dr-detail">
                                    <span>Partner ID</span>
                                    <strong>{registeredBank._id}</strong>
                                </div>
                                <div className="dr-detail">
                                    <span>Role</span>
                                    <strong>Blood Bank</strong>
                                </div>
                                <div className="dr-detail">
                                    <span>Status</span>
                                    <strong className="status-active">Verification Pending</strong>
                                </div>
                            </div>
                            <p className="dr-success-note">Your account is created. Our team will verify your license details shortly.</p>
                            <div className="dr-success-actions">
                                <Link to="/"><Button variant="primary">Go to Home</Button></Link>
                                {/* Future: Link to Dashboard */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="dr-page">
            <section className="dr-hero" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' }}>
                <div className="container">
                    <h1><Building2 size={24} /> Blood Bank Registration</h1>
                    <p>Register your facility to manage inventory and connect with donors nationwide.</p>
                </div>
            </section>

            <section className="section">
                <div className="container dr-grid">
                    <form className="dr-form" onSubmit={handleSubmit} noValidate>
                        <div className="dr-form-section">
                            <h3><Building2 size={18} /> Organization Details</h3>
                            <div className="dr-fields-grid">
                                <div className="form-group full-width">
                                    <label htmlFor="bb-name">Hospital / Blood Bank Name *</label>
                                    <input id="bb-name" type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className={errors.hospitalName ? 'error' : ''} placeholder="Official registered name" />
                                    {errors.hospitalName && <span className="field-error">{errors.hospitalName}</span>}
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="bb-license">Registration / License Number *</label>
                                    <input id="bb-license" type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className={errors.licenseNumber ? 'error' : ''} placeholder="E.g., HP/BB/2023/104" />
                                    {errors.licenseNumber && <span className="field-error">{errors.licenseNumber}</span>}
                                    <span style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem', display: 'block' }}>Required for government verification</span>
                                </div>
                            </div>
                        </div>

                        <div className="dr-form-section">
                            <h3><Mail size={18} /> Account & Contact</h3>
                            <div className="dr-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="bb-email">Official Email Address *</label>
                                    <input id="bb-email" type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} placeholder="admin@hospital.com" />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bb-password">Secure Password *</label>
                                    <input id="bb-password" type="password" name="password" value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''} placeholder="Minimum 8 characters" />
                                    {errors.password && <span className="field-error">{errors.password}</span>}
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="bb-phone">Primary Contact Number *</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <span style={{ padding: '0.75rem', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', color: '#4b5563' }}>+91</span>
                                        <input id="bb-phone" type="tel" name="phone" value={formData.phone} onChange={(e) => handleChange({ target: { name: 'phone', value: e.target.value.replace(/\D/g, '').slice(0, 10) } })} className={errors.phone ? 'error' : ''} placeholder="10-digit mobile number" style={{ flex: 1 }} />
                                    </div>
                                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="dr-form-section">
                            <h3><MapPin size={18} /> Facility Location</h3>
                            <div className="dr-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="bb-state">State *</label>
                                    <input id="bb-state" type="text" name="state" value={formData.state} onChange={handleChange} className={errors.state ? 'error' : ''} placeholder="Enter state" />
                                    {errors.state && <span className="field-error">{errors.state}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bb-district">District *</label>
                                    <input id="bb-district" type="text" name="district" value={formData.district} onChange={handleChange} className={errors.district ? 'error' : ''} placeholder="Enter district" />
                                    {errors.district && <span className="field-error">{errors.district}</span>}
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="bb-address">Complete Address</label>
                                    <textarea id="bb-address" name="address" value={formData.address} onChange={handleChange} rows="2" placeholder="Street, landmark, pin code..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="dr-terms">
                            <label className="dr-checkbox-label">
                                <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
                                <span>I certify that this facility is legally authorized to collect and distribute blood, and I agree to the <Link to="/terms">Terms of Service</Link>.</span>
                            </label>
                            {errors.agreeTerms && <span className="field-error">{errors.agreeTerms}</span>}
                        </div>

                        {errors.form && (
                            <div className="form-global-error" style={{ color: '#8B0000', backgroundColor: '#FEE2E2', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem', textAlign: 'center', fontWeight: '500', border: '1px solid #FCA5A5' }}>
                                ⚠️ {errors.form}
                            </div>
                        )}

                        <Button type="submit" variant="primary" className="btn-full-width btn-lg" disabled={submitState === 'submitting'} style={{ backgroundColor: '#1e3a8a' }}>
                            {submitState === 'submitting' ? 'Registering Facility...' : <><Building2 size={18} /> Register Facility</>}
                        </Button>
                        
                        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                            Already registered? <Link to="/login" style={{ color: '#1e3a8a', fontWeight: 'bold' }}>Log in to Dashboard</Link>
                        </div>
                    </form>

                    <div className="dr-sidebar">
                        <div className="dr-info-card" style={{ borderColor: '#bfdbfe', backgroundColor: '#f0fdfa' }}>
                            <ShieldCheck size={28} className="dr-info-icon" style={{ color: '#0f766e', backgroundColor: '#ccfbf1' }} />
                            <h4 style={{ color: '#115e59' }}>Verified Network</h4>
                            <p>Only verified institutions receive a badge. Uploading fake documents will result in permanent suspension.</p>
                        </div>
                        <div className="dr-info-card" style={{ borderColor: '#e2e8f0' }}>
                            <FileText size={28} className="dr-info-icon" style={{ color: '#334155', backgroundColor: '#f1f5f9' }} />
                            <h4>Required Documents</h4>
                            <ul>
                                <li>Valid Blood Bank License</li>
                                <li>State Health Dept NOC</li>
                                <li>NABH Accreditation (Optional)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BloodBankRegistration;

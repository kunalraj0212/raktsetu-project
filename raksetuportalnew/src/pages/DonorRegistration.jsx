import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import {
    Heart, User, Mail, Phone, MapPin, Calendar, Droplets,
    CheckCircle, ArrowLeft, ShieldCheck
} from 'lucide-react';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import { useAuth } from '../context/AuthContext';
import './DonorRegistration.css';

import { phoneRegex, bloodGroups } from '../utils/validators';

const DonorRegistration = () => {
    const location = useLocation();
    
    // If user arrived here without going through OTP verification first, redirect to login/onboarding
    const verifiedPhone = location.state?.phone;
    const isVerified = location.state?.verified;

    const initialValues = {
        fullName: '', email: '', phone: verifiedPhone || '', dob: '', gender: '',
        bloodGroup: '', state: '', district: '', address: '',
        weight: '', lastDonation: '', medicalConditions: '',
        password: '', agreeTerms: false
    };
    const [registeredDonor, setRegisteredDonor] = useState(null);
    const { registerProfile } = useAuth();

    const validate = (data) => {
        const err = {};
        if (!data.fullName.trim()) err.fullName = 'Full name is required';
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = 'Invalid email format';
        if (!data.phone.trim()) err.phone = 'Phone number is required';
        else if (!phoneRegex.test(data.phone.replace(/\s/g, '')))
            err.phone = 'Enter a valid 10-digit Indian phone number';
        if (!data.dob) err.dob = 'Date of birth is required';
        else {
            const age = (new Date() - new Date(data.dob)) / (365.25 * 24 * 60 * 60 * 1000);
            if (age < 18) err.dob = 'You must be at least 18 years old to donate';
            if (age > 65) err.dob = 'Donors must be under 65 years of age';
        }
        if (!data.gender) err.gender = 'Please select gender';
        if (!data.bloodGroup) err.bloodGroup = 'Please select blood group';
        if (!data.state.trim()) err.state = 'State is required';
        if (!data.weight) err.weight = 'Weight is required';
        else if (Number(data.weight) < 45) err.weight = 'Minimum weight for donors is 45 kg';
        if (!data.agreeTerms) err.agreeTerms = 'You must agree to the terms';
        return err;
    };

    const { formData, errors, submitState, handleChange, handleSubmit } = useForm({
        initialValues,
        validate,
        onSubmit: async (data) => {
            const donor = await registerProfile({
                fullName: data.fullName,
                email: data.email || '',
                phone: verifiedPhone, // Guaranteed verified
                dob: data.dob,
                gender: data.gender,
                bloodGroup: data.bloodGroup,
                state: data.state,
                district: data.district,
                address: data.address,
                weight: data.weight,
                lastDonation: data.lastDonation,
                medicalConditions: data.medicalConditions
            });
            setRegisteredDonor(donor);
        },
    });

    if (submitState === 'success' && registeredDonor) {
        return (
            <div className="dr-page">
                <section className="dr-hero">
                    <div className="container">
                        <h1>Donor Registration</h1>
                        <p>Thank you for choosing to save lives!</p>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="dr-success-card">
                            <div className="dr-success-icon">
                                <CheckCircle size={56} />
                            </div>
                            <h2>Registration Successful! 🎉</h2>
                            <p>Welcome to the RaktSetu family, <strong>{registeredDonor.fullName}</strong>!</p>
                            <div className="dr-success-details">
                                <div className="dr-detail">
                                    <span>Donor ID</span>
                                    <strong>{registeredDonor._id}</strong>
                                </div>
                                <div className="dr-detail">
                                    <span>Blood Group</span>
                                    <strong>{registeredDonor.bloodGroup}</strong>
                                </div>
                                <div className="dr-detail">
                                    <span>Status</span>
                                    <strong className="status-active">Active ✓</strong>
                                </div>
                            </div>
                            <p className="dr-success-note">You'll be notified when there's a blood request matching your blood group in your area.</p>
                            <div className="dr-success-actions">
                                <Link to="/"><Button variant="primary">Go to Home</Button></Link>
                                <Link to="/blood-availability"><Button variant="secondary">Search Blood</Button></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (!isVerified || !verifiedPhone) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="dr-page">
            <section className="dr-hero">
                <div className="container">
                    <h1><Heart size={24} /> Donor Registration</h1>
                    <p>Register as a blood donor and help save lives across India.</p>
                </div>
            </section>

            <section className="section">
                <div className="container dr-grid">
                    <form className="dr-form" onSubmit={handleSubmit} noValidate>
                        <div className="dr-form-section">
                            <h3><User size={18} /> Personal Information</h3>
                            <div className="dr-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="dr-name">Full Name *</label>
                                    <input id="dr-name" type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={errors.fullName ? 'error' : ''} placeholder="Enter your full name" />
                                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-email">Email Address (Optional)</label>
                                    <input id="dr-email" type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} placeholder="your@email.com" />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-phone">Phone Number (Verified) ✓</label>
                                    <input id="dr-phone" type="tel" name="phone" value={formData.phone} disabled className="disabled-input" style={{ backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-dob">Date of Birth *</label>
                                    <input id="dr-dob" type="date" name="dob" value={formData.dob} onChange={handleChange} className={errors.dob ? 'error' : ''} />
                                    {errors.dob && <span className="field-error">{errors.dob}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-gender">Gender *</label>
                                    <select id="dr-gender" name="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? 'error' : ''}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.gender && <span className="field-error">{errors.gender}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-weight">Weight (kg) *</label>
                                    <input id="dr-weight" type="number" name="weight" value={formData.weight} onChange={handleChange} className={errors.weight ? 'error' : ''} placeholder="Min 45 kg" min="30" max="200" />
                                    {errors.weight && <span className="field-error">{errors.weight}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="dr-form-section">
                            <h3><Droplets size={18} /> Blood & Medical</h3>
                            <div className="dr-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="dr-blood">Blood Group *</label>
                                    <select id="dr-blood" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={errors.bloodGroup ? 'error' : ''}>
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                    {errors.bloodGroup && <span className="field-error">{errors.bloodGroup}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-lastdonation">Last Donation Date</label>
                                    <input id="dr-lastdonation" type="date" name="lastDonation" value={formData.lastDonation} onChange={handleChange} />
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="dr-medical">Medical Conditions (if any)</label>
                                    <textarea id="dr-medical" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} rows="3" placeholder="E.g., diabetes, heart disease, recent surgery..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="dr-form-section">
                            <h3><MapPin size={18} /> Location</h3>
                            <div className="dr-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="dr-state">State *</label>
                                    <input id="dr-state" type="text" name="state" value={formData.state} onChange={handleChange} className={errors.state ? 'error' : ''} placeholder="Enter your state" />
                                    {errors.state && <span className="field-error">{errors.state}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dr-district">District</label>
                                    <input id="dr-district" type="text" name="district" value={formData.district} onChange={handleChange} placeholder="Enter your district" />
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="dr-address">Full Address</label>
                                    <textarea id="dr-address" name="address" value={formData.address} onChange={handleChange} rows="2" placeholder="Street, landmark, pin code..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="dr-terms">
                            <label className="dr-checkbox-label">
                                <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
                                <span>I confirm that the information provided is accurate and I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.</span>
                            </label>
                            {errors.agreeTerms && <span className="field-error">{errors.agreeTerms}</span>}
                        </div>

                        {errors.form && (
                            <div className="form-global-error" style={{ color: '#8B0000', backgroundColor: '#FEE2E2', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem', textAlign: 'center', fontWeight: '500', border: '1px solid #FCA5A5' }}>
                                ⚠️ {errors.form}
                            </div>
                        )}

                        <Button type="submit" variant="primary" className="btn-full-width btn-lg" disabled={submitState === 'submitting'}>
                            {submitState === 'submitting' ? 'Registering...' : <><Heart size={18} /> Register as Donor</>}
                        </Button>
                    </form>

                    <div className="dr-sidebar">
                        <div className="dr-info-card">
                            <ShieldCheck size={28} className="dr-info-icon" />
                            <h4>Your Data is Safe</h4>
                            <p>We follow strict data protection guidelines. Your personal information is encrypted and never shared without consent.</p>
                        </div>
                        <div className="dr-info-card">
                            <Heart size={28} className="dr-info-icon" />
                            <h4>Why Donate?</h4>
                            <ul>
                                <li>1 donation can save up to 3 lives</li>
                                <li>India needs 12M units / year</li>
                                <li>Deficit is ~4M units annually</li>
                                <li>Only 1% of population donates</li>
                            </ul>
                        </div>
                        <div className="dr-info-card">
                            <Calendar size={28} className="dr-info-icon" />
                            <h4>After Registration</h4>
                            <p>You'll be matched with nearby blood centers and notified when your blood group is needed in your area.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DonorRegistration;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AlertTriangle, Phone, MapPin, Droplets, User, Clock,
    CheckCircle, Zap, Building2
} from 'lucide-react';
import Button from '../components/Button';
import useForm from '../hooks/useForm';
import { createEmergencyRequest } from '../services/bloodBankService';
import './EmergencyRequest.css';

import { phoneRegex, bloodGroups } from '../utils/validators';

const EmergencyRequest = () => {
    const initialValues = {
        patientName: '', bloodGroup: '', unitsNeeded: '1',
        hospital: '', city: '', state: '',
        contactName: '', contactPhone: '',
        urgency: 'critical', requiredBy: '', notes: ''
    };
    const [request, setRequest] = useState(null);

    const validate = (data) => {
        const err = {};
        if (!data.patientName.trim()) err.patientName = 'Patient name is required';
        if (!data.bloodGroup) err.bloodGroup = 'Select blood group';
        if (!data.unitsNeeded || Number(data.unitsNeeded) < 1) err.unitsNeeded = 'At least 1 unit required';
        if (!data.requiredBy) err.requiredBy = 'Required-by date is needed';
        if (!data.hospital.trim()) err.hospital = 'Hospital name is required';
        if (!data.city.trim()) err.city = 'City/District is required';
        if (!data.contactName.trim()) err.contactName = 'Contact name is required';
        if (!data.contactPhone.trim()) err.contactPhone = 'Phone number is required';
        else if (!phoneRegex.test(data.contactPhone.replace(/\s/g, '')))
            err.contactPhone = 'Enter a valid 10-digit Indian phone number';
        return err;
    };

    const { formData, errors, submitState, handleChange, handleSubmit } = useForm({
        initialValues,
        validate,
        onSubmit: async (data) => {
            const result = await createEmergencyRequest(data);
            setRequest(result);
        }
    });

    if (submitState === 'success' && request) {
        return (
            <div className="em-page">
                <section className="em-hero em-hero-alert">
                    <div className="container">
                        <h1><AlertTriangle size={24} /> Emergency Blood Request</h1>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="em-success-card">
                            <div className="em-pulse-ring">
                                <CheckCircle size={48} />
                            </div>
                            <h2>Emergency Alert Sent!</h2>
                            <p className="em-success-sub">Your request has been broadcasted to all compatible donors<br /> and blood banks in <strong>{formData.city}</strong>.</p>
                            <div className="em-request-details">
                                <div><span>Request ID</span><strong>{request._id}</strong></div>
                                <div><span>Blood Group</span><strong className="text-danger">{formData.bloodGroup}</strong></div>
                                <div><span>Units</span><strong>{formData.unitsNeeded}</strong></div>
                                <div><span>Status</span><strong className="text-amber">Broadcasting...</strong></div>
                            </div>
                            <div className="em-what-next">
                                <h4>What happens next?</h4>
                                <ul>
                                    <li><Clock size={14} /> Nearby donors are being notified right now</li>
                                    <li><Building2 size={14} /> Blood banks with matching stock are alerted</li>
                                    <li><Phone size={14} /> You'll receive a call when a donor is found</li>
                                </ul>
                            </div>
                            <div className="em-success-actions">
                                <Link to="/blood-availability"><Button variant="primary">Search Blood Banks</Button></Link>
                                <Link to="/"><Button variant="secondary">Go Home</Button></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="em-page">
            <section className="em-hero em-hero-alert">
                <div className="container">
                    <div className="em-hero-content">
                        <div className="em-urgent-badge">
                            <Zap size={14} />
                            <span>Average response: 15 minutes</span>
                        </div>
                        <h1><AlertTriangle size={28} /> Emergency Blood Request</h1>
                        <p>Submit a critical blood request. We'll alert all compatible donors and blood banks near you immediately.</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container em-grid">
                    <form className="em-form" onSubmit={handleSubmit} noValidate>
                        <div className="em-urgency-selector">
                            <label>Urgency Level</label>
                            <div className="urgency-options">
                                {[{ value: 'critical', label: 'Critical' }, { value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }].map(level => (
                                    <label key={level.value} className={`urgency-opt ${formData.urgency === level.value ? 'active' : ''} urgency-${level.value}`}>
                                        <input type="radio" name="urgency" value={level.value} checked={formData.urgency === level.value} onChange={handleChange} />
                                        <span>{level.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="em-form-section">
                            <h3><Droplets size={18} /> Patient & Blood Details</h3>
                            <div className="em-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="em-patient">Patient Name *</label>
                                    <input id="em-patient" type="text" name="patientName" value={formData.patientName} onChange={handleChange} className={errors.patientName ? 'error' : ''} placeholder="Patient full name" />
                                    {errors.patientName && <span className="field-error">{errors.patientName}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="em-blood">Blood Group Needed *</label>
                                    <select id="em-blood" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={errors.bloodGroup ? 'error' : ''}>
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                    {errors.bloodGroup && <span className="field-error">{errors.bloodGroup}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="em-units">Units Required *</label>
                                    <input id="em-units" type="number" name="unitsNeeded" value={formData.unitsNeeded} onChange={handleChange} className={errors.unitsNeeded ? 'error' : ''} min="1" max="20" />
                                    {errors.unitsNeeded && <span className="field-error">{errors.unitsNeeded}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="em-requiredby">Required By (Date) *</label>
                                    <input id="em-requiredby" type="date" name="requiredBy" value={formData.requiredBy} onChange={handleChange} className={errors.requiredBy ? 'error' : ''} min={new Date().toISOString().split('T')[0]} />
                                    {errors.requiredBy && <span className="field-error">{errors.requiredBy}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="em-form-section">
                            <h3><MapPin size={18} /> Hospital & Location</h3>
                            <div className="em-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="em-hospital">Hospital Name *</label>
                                    <input id="em-hospital" type="text" name="hospital" value={formData.hospital} onChange={handleChange} className={errors.hospital ? 'error' : ''} placeholder="Hospital where patient is admitted" />
                                    {errors.hospital && <span className="field-error">{errors.hospital}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="em-city">City / District *</label>
                                    <input id="em-city" type="text" name="city" value={formData.city} onChange={handleChange} className={errors.city ? 'error' : ''} placeholder="e.g., Mumbai" />
                                    {errors.city && <span className="field-error">{errors.city}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="em-state">State</label>
                                    <input id="em-state" type="text" name="state" value={formData.state} onChange={handleChange} placeholder="e.g., Maharashtra" />
                                </div>
                            </div>
                        </div>

                        <div className="em-form-section">
                            <h3><User size={18} /> Contact Person</h3>
                            <div className="em-fields-grid">
                                <div className="form-group">
                                    <label htmlFor="em-contact">Contact Name *</label>
                                    <input id="em-contact" type="text" name="contactName" value={formData.contactName} onChange={handleChange} className={errors.contactName ? 'error' : ''} placeholder="Person to call" />
                                    {errors.contactName && <span className="field-error">{errors.contactName}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="em-phone">Phone Number *</label>
                                    <input id="em-phone" type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className={errors.contactPhone ? 'error' : ''} placeholder="10-digit number" />
                                    {errors.contactPhone && <span className="field-error">{errors.contactPhone}</span>}
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="em-notes">Additional Notes</label>
                                    <textarea id="em-notes" name="notes" value={formData.notes} onChange={handleChange} rows="2" placeholder="Any other details (surgery time, specific component, etc.)"></textarea>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" variant="primary" className="btn-full-width btn-lg em-submit-btn" disabled={submitState === 'submitting'}>
                            {submitState === 'submitting' ? 'Broadcasting Emergency Alert...' : <><AlertTriangle size={18} /> Send Emergency Alert</>}
                        </Button>
                    </form>

                    <div className="em-sidebar">
                        <div className="em-helpline-card">
                            <Phone size={28} />
                            <h4>Blood Helpline</h4>
                            <a href="tel:+911234567890" className="em-helpline-number">+91 123 456 7890</a>
                            <p>Available 24/7 for critical emergencies</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EmergencyRequest;

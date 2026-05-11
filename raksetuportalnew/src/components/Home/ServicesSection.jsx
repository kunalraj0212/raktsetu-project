import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, HeartHandshake, Zap, ClipboardCheck } from 'lucide-react';

const ServicesSection = () => {
    return (
        <section className="section services-section">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-tag">Services</span>
                    <h2 className="section-title">Everything You Need</h2>
                </div>
                <div className="services-grid">
                    <Link to="/blood-availability" className="service-card active-card">
                        <div className="svc-icon"><Search size={28} /></div>
                        <span>Blood Availability Search</span>
                    </Link>
                    <Link to="/blood-availability" className="service-card">
                        <div className="svc-icon"><Building2 size={28} /></div>
                        <span>Blood Center Directory</span>
                    </Link>
                    <Link to="/register-donor" className="service-card">
                        <div className="svc-icon"><HeartHandshake size={28} /></div>
                        <span>Donor Registration</span>
                    </Link>
                    <Link to="/emergency" className="service-card">
                        <div className="svc-icon"><Zap size={28} /></div>
                        <span>Emergency Requests</span>
                    </Link>
                    <Link to="/blood-banks" className="service-card">
                        <div className="svc-icon"><ClipboardCheck size={28} /></div>
                        <span>Blood Bank Registration</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;

import React from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart3, Package, Users, Bell, ShieldCheck,
    Calendar, Zap, Globe, CheckCircle
} from 'lucide-react';
import Button from '../components/Button';
import './ForBloodBanks.css';

const benefits = [
    { icon: Package, title: 'Inventory Management', desc: 'Real-time tracking of all blood groups and components with expiry alerts.' },
    { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Demand forecasting, usage trends, and operational performance metrics.' },
    { icon: Users, title: 'Donor Network', desc: 'Access to thousands of registered donors for camp organization and matching.' },
    { icon: Bell, title: 'Smart Alerts', desc: 'Automated notifications for low stock, emergency requests, and expirations.' },
    { icon: ShieldCheck, title: 'Verified Badge', desc: 'Build trust with a verified center badge visible to all users on the platform.' },
    { icon: Globe, title: 'Nationwide Visibility', desc: 'Your center appears in search results across all states and districts.' },
];

const ForBloodBanks = () => {
    return (
        <div className="bb-page">
            <section className="bb-hero">
                <div className="container">
                    <h1>For Blood Banks</h1>
                    <p>Join India's largest digital blood management network. Streamline operations and save more lives.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title text-center">Why Register with RaktaSetu?</h2>
                    <div className="bb-benefits-grid">
                        {benefits.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bb-benefit">
                                    <div className="bb-icon-wrap">
                                        <Icon size={24} />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bb-integration-section">
                <div className="container bb-integration-grid">
                    <div className="bb-integration-content">
                        <h2 className="section-title">Seamless Integration</h2>
                        <p>RaktaSetu integrates effortlessly with your existing systems. Our platform is designed to complement your workflow, not replace it.</p>
                        <ul className="bb-checklist">
                            <li><CheckCircle size={16} className="check-green" /> No hardware installation required</li>
                            <li><CheckCircle size={16} className="check-green" /> Web-based dashboard — access from anywhere</li>
                            <li><CheckCircle size={16} className="check-green" /> API integration for existing software</li>
                            <li><CheckCircle size={16} className="check-green" /> Dedicated onboarding support</li>
                            <li><CheckCircle size={16} className="check-green" /> Free for government blood banks</li>
                        </ul>
                        <Link to="/register-bloodbank">
                            <Button variant="primary">Register Your Blood Bank</Button>
                        </Link>
                    </div>
                    <div className="bb-integration-visual">
                        <div className="dashboard-mockup">
                            <div className="mock-header">
                                <span className="mock-dot"></span>
                                <span className="mock-dot"></span>
                                <span className="mock-dot"></span>
                            </div>
                            <div className="mock-content">
                                <div className="mock-sidebar">
                                    <div className="mock-bar" style={{ width: '80%' }}></div>
                                    <div className="mock-bar" style={{ width: '60%' }}></div>
                                    <div className="mock-bar" style={{ width: '90%' }}></div>
                                    <div className="mock-bar" style={{ width: '45%' }}></div>
                                </div>
                                <div className="mock-main">
                                    <div className="mock-chart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForBloodBanks;

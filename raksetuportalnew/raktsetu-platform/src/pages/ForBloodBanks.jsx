import React from 'react';
import { LayoutDashboard, Users, Zap, Award, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import './ForBloodBanks.css';

const BenefitCard = ({ icon: Icon, title, description }) => (
    <div className="benefit-card">
        <Icon size={40} className="benefit-icon" />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

const ForBloodBanks = () => {
    return (
        <div className="blood-banks-page">
            <section className="bb-hero">
                <div className="container bb-hero-container">
                    <div className="bb-hero-content">
                        <h1>Partner with RaktSetu to Save More Lives</h1>
                        <p>Digitize your inventory, manage donors efficiently, and respond to emergencies instantly.</p>
                        <Button variant="primary" className="btn-lg">Register Your Blood Bank</Button>
                    </div>
                    <div className="bb-hero-image">
                        {/* Placeholder for dashboard screenshot */}
                        <div className="dashboard-preview">
                            <div className="preview-header">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                            <div className="preview-body">
                                <div className="preview-sidebar"></div>
                                <div className="preview-main">
                                    <div className="preview-card"></div>
                                    <div className="preview-card"></div>
                                    <div className="preview-card"></div>
                                    <div className="preview-chart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bb-benefits">
                <div className="container">
                    <div className="text-center section-header">
                        <h2 className="section-title">Why Join RaktSetu?</h2>
                        <p className="section-subtitle">We provide a comprehensive suite of tools designed for modern blood banks.</p>
                    </div>
                    <div className="benefits-grid">
                        <BenefitCard
                            icon={LayoutDashboard}
                            title="Digital Inventory Management"
                            description="Say goodbye to manual registers. Track blood units, expiration dates, and types in real-time."
                        />
                        <BenefitCard
                            icon={Users}
                            title="Increased Donor Visits"
                            description="Your blood bank becomes visible to thousands of potential donors nearby who can book appointments."
                        />
                        <BenefitCard
                            icon={Zap}
                            title="Emergency Visibility"
                            description="Broadcast shortages instantly to the community and get immediate donor response."
                        />
                        <BenefitCard
                            icon={Award}
                            title="Community Trust"
                            description="Build trust with transparency. Verified blood banks get a specialized badge and higher ranking."
                        />
                    </div>
                </div>
            </section>

            <section className="bb-integration">
                <div className="container integration-container">
                    <div className="integration-content">
                        <h2>Seamless Integration</h2>
                        <ul className="integration-list">
                            <li><CheckCircle size={20} className="check-icon-sm" /> Cloud-based secure platform</li>
                            <li><CheckCircle size={20} className="check-icon-sm" /> 24/7 Support and Training</li>
                            <li><CheckCircle size={20} className="check-icon-sm" /> Compatible with existing hospital systems</li>
                            <li><CheckCircle size={20} className="check-icon-sm" /> Analytics and Reporting tools</li>
                        </ul>
                    </div>
                    <div className="integration-cta">
                        <h3>Ready to upgrade your blood bank?</h3>
                        <Button variant="secondary">Request Demo</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForBloodBanks;

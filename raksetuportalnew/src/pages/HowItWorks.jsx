import React, { useState } from 'react';
import { ClipboardCheck, Search, Heart, Building2, Stethoscope, Calendar, UserCheck, Package } from 'lucide-react';
import './HowItWorks.css';

const tabs = [
    {
        id: 'patient',
        label: 'For Patients',
        icon: Search,
        steps: [
            { icon: Search, title: 'Search Blood', desc: 'Enter your blood group, component, and location to find available units.' },
            { icon: Building2, title: 'Locate Center', desc: 'View nearby blood banks with real-time availability and contact details.' },
            { icon: ClipboardCheck, title: 'Request Blood', desc: 'Submit a request directly to the center or raise an emergency alert.' },
            { icon: Package, title: 'Receive Blood', desc: 'Coordinate with the center for pickup or delivery of the required units.' },
        ]
    },
    {
        id: 'donor',
        label: 'For Donors',
        icon: Heart,
        steps: [
            { icon: UserCheck, title: 'Register', desc: 'Sign up with your basic details and blood group — takes under 2 minutes.' },
            { icon: Stethoscope, title: 'Health Screening', desc: 'Complete a brief health check to ensure you meet donation eligibility criteria.' },
            { icon: Calendar, title: 'Schedule Donation', desc: 'Choose a convenient date, time, and nearby center for your donation.' },
            { icon: Heart, title: 'Donate & Save Lives', desc: 'Complete your donation. Track your history and impact on your dashboard.' },
        ]
    },
    {
        id: 'bloodbank',
        label: 'For Blood Banks',
        icon: Building2,
        steps: [
            { icon: ClipboardCheck, title: 'Register Center', desc: 'Submit your center details for verification and onboarding to the platform.' },
            { icon: Package, title: 'Manage Inventory', desc: 'Update real-time stock levels for all blood groups and components.' },
            { icon: Search, title: 'Match Requests', desc: 'Receive and respond to blood requests from patients and hospitals.' },
            { icon: Building2, title: 'Analytics Dashboard', desc: 'Access usage trends, demand forecasting, and operational insights.' },
        ]
    }
];

const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState('patient');
    const activeData = tabs.find(t => t.id === activeTab);

    return (
        <div className="how-page">
            <section className="how-hero">
                <div className="container">
                    <h1>How It Works</h1>
                    <p>Simple, transparent process for everyone — patients, donors, and blood banks.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="how-tabs">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    className={`how-tab ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <Icon size={18} /> {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="how-steps">
                        {activeData.steps.map((step, i) => {
                            const StepIcon = step.icon;
                            return (
                                <div key={i} className="how-step">
                                    <div className="step-number">{i + 1}</div>
                                    <div className="step-icon-box">
                                        <StepIcon size={28} />
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;

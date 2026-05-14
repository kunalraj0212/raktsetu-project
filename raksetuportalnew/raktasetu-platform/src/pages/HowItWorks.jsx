import React, { useState } from 'react';
import Button from '../components/Button';
import './HowItWorks.css';

const StepCard = ({ number, title, description }) => (
    <div className="step-card">
        <div className="step-number">{number}</div>
        <div className="step-content">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    </div>
);

const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState('patient');

    const tabs = [
        { id: 'patient', label: 'For Patients' },
        { id: 'donor', label: 'For Donors' },
        { id: 'bloodbank', label: 'For Blood Banks' }
    ];

    const content = {
        patient: [
            { title: "Search Blood", description: "Select your required blood group and city to see real-time availability." },
            { title: "View Nearby Banks", description: "Get a list of nearest blood banks with stock and contact details." },
            { title: "Connect or Request", description: "Call the blood bank directly or post an emergency request for donors." }
        ],
        donor: [
            { title: "Create Profile", description: "Sign up and add your blood group and health details securely." },
            { title: "Find Donation Camps", description: "Browse nearby blood donation camps or blood banks." },
            { title: "Schedule & Donate", description: "Book a slot and donate. Track your donation history." }
        ],
        bloodbank: [
            { title: "Register Facility", description: "Create an official account for your hospital or blood bank." },
            { title: "Update Inventory", description: "Real-time dashboard to update blood stock levels easily." },
            { title: "Manage Requests", description: "Approve donation appointments and respond to emergency requests." }
        ]
    };

    return (
        <div className="how-it-works-page">
            <section className="hiw-hero">
                <div className="container text-center">
                    <h1 className="section-title">How RaktaSetu Works</h1>
                    <p className="section-subtitle">Simple text steps to save a life or find help.</p>
                </div>
            </section>

            <section className="hiw-tabs-section">
                <div className="container">
                    <div className="tabs-header">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="steps-container">
                        <div className="steps-connector-line"></div>
                        {content[activeTab].map((step, index) => (
                            <StepCard
                                key={index}
                                number={index + 1}
                                title={step.title}
                                description={step.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="hiw-cta text-center">
                <div className="container">
                    <h2>Join the chain of life saving.</h2>
                    <Button variant="primary" style={{ marginTop: '1.5rem' }}>Get Started Now</Button>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;

import React from 'react';
import { Search, Radio, Calendar, Database, Bell, Shield } from 'lucide-react';
import Button from '../components/Button';
import './Features.css';

const Features = () => {
    const featuresList = [
        {
            icon: Search,
            title: "Real-time Blood Search",
            description: "Instantly search for blood availability by blood group and location. our advanced algorithm finds the nearest blood banks with stock."
        },
        {
            icon: Radio,
            title: "Emergency Request Broadcasting",
            description: "When you post an emergency request, we instantly notify all nearby compatible donors and blood banks via push notifications and SMS."
        },
        {
            icon: Calendar,
            title: "Donation Scheduling",
            description: "Book appointments at blood banks to donate blood. Avoid long queues and donate at your convenience."
        },
        {
            icon: Database,
            title: "Live Inventory Dashboard",
            description: "Blood banks get a dedicated dashboard to manage their stock levels, approve donation requests, and coordinate with other blood banks."
        },
        {
            icon: Bell,
            title: "Smart Notifications",
            description: "Get alerted only when your blood type is needed nearby. We value your time and altruism."
        },
        {
            icon: Shield,
            title: "Verified Community",
            description: "All donors and blood banks are verified to ensure safety and trust within the RaktaSetu ecosystem."
        }
    ];

    return (
        <div className="features-page">
            <section className="features-hero">
                <div className="container text-center">
                    <h1 className="section-title">Powerful Features to Save Lives</h1>
                    <p className="section-subtitle">Technology that bridges the gap between distress and hope.</p>
                </div>
            </section>

            <section className="features-grid-section">
                <div className="container">
                    <div className="features-showcase-grid">
                        {featuresList.map((feature, index) => (
                            <div key={index} className="feature-detail-card">
                                <div className="feature-icon-wrapper">
                                    <feature.icon size={32} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="features-cta">
                <div className="container text-center">
                    <h2>Ready to experience RaktaSetu?</h2>
                    <div className="cta-group">
                        <Button variant="primary">Find Blood</Button>
                        <Button variant="secondary">Register as Donor</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features;

import React from 'react';
import {
    Search, Shield, Clock, Bell, Activity, MapPin,
    Smartphone, Users, BarChart3, HeartPulse, Globe, Lock
} from 'lucide-react';
import './Features.css';

const features = [
    { icon: Search, title: 'Real-Time Blood Search', desc: 'Search blood availability across registered centers by group, component, and location.' },
    { icon: Bell, title: 'Smart Notifications', desc: 'Receive instant alerts for emergency requests, donation camps, and appointment reminders.' },
    { icon: MapPin, title: 'Nearby Center Finder', desc: 'GPS-based discovery of the nearest blood banks and donation camps in your area.' },
    { icon: Shield, title: 'Verified Blood Banks', desc: 'All registered centers undergo verification to ensure safety and reliability.' },
    { icon: Activity, title: 'Health Dashboard', desc: 'Track your donation history, upcoming appointments, and health screening records.' },
    { icon: Clock, title: 'Quick Registration', desc: 'Simple, fast donor registration process — sign up in under 2 minutes.' },
    { icon: Users, title: 'Community Network', desc: 'Join thousands of active donors making a difference across India every day.' },
    { icon: BarChart3, title: 'Analytics for Blood Banks', desc: 'Comprehensive inventory management, usage trends, and demand forecasting tools.' },
    { icon: Smartphone, title: 'Mobile Responsive', desc: 'Seamless experience across all devices — search and donate on the go.' },
    { icon: HeartPulse, title: 'Emergency Requests', desc: 'One-click emergency blood requests that notify all nearby compatible donors instantly.' },
    { icon: Globe, title: 'Pan-India Coverage', desc: 'Network spanning 28+ states with 500+ registered blood centers nationwide.' },
    { icon: Lock, title: 'Data Privacy', desc: 'End-to-end encryption and strict data policies protect your personal health information.' },
];

const Features = () => {
    return (
        <div className="features-page">
            <section className="features-hero">
                <div className="container">
                    <h1>Platform Features</h1>
                    <p>Everything you need for blood availability, donation, and management — in one platform.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="features-grid">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="feature-item">
                                    <div className="feature-icon-wrap">
                                        <Icon size={24} />
                                    </div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features;

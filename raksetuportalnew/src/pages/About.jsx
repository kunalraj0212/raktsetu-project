import React from 'react';
import { Heart, Target, Users, ShieldCheck, Award, Globe } from 'lucide-react';
import './About.css';

const values = [
    { icon: Heart, title: 'Compassion', desc: 'Every unit of blood represents a human story. We treat every case with urgency and empathy.' },
    { icon: ShieldCheck, title: 'Trust & Safety', desc: 'Verified centers, encrypted data, and transparent processes you can rely on.' },
    { icon: Users, title: 'Community', desc: 'Building a nationwide network of donors, patients, and healthcare providers.' },
    { icon: Globe, title: 'Accessibility', desc: 'Ensuring blood availability information is just a click away for every Indian.' },
];

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1>About RaktaSetu</h1>
                    <p>India's digital bridge between blood donors and those in need.</p>
                </div>
            </section>

            <section className="section">
                <div className="container about-mission-grid">
                    <div className="about-mission">
                        <div className="mission-icon-wrap"><Target size={32} /></div>
                        <h2>Our Mission</h2>
                        <p>To ensure no life is lost due to the unavailability of blood in India. RaktaSetu aims to bridge the gap between blood availability and demand through technology, making the entire process transparent, efficient, and accessible to everyone.</p>
                    </div>
                    <div className="about-story">
                        <div className="mission-icon-wrap"><Award size={32} /></div>
                        <h2>Our Story</h2>
                        <p>Born out of the realization that India faces a chronic shortage of blood — with an annual deficit of nearly 10 million units — RaktaSetu was created to solve this crisis through digital innovation. We connect donors, patients, and blood banks on a single, unified platform.</p>
                    </div>
                </div>
            </section>

            <section className="section values-section">
                <div className="container">
                    <h2 className="section-title text-center">Our Values</h2>
                    <div className="values-grid">
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <div key={i} className="value-card">
                                    <div className="value-icon"><Icon size={24} /></div>
                                    <h3>{v.title}</h3>
                                    <p>{v.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

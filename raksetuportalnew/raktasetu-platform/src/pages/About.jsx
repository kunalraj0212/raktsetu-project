import React from 'react';
import { Target, Heart, Globe } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1 className="about-title">About RaktaSetu</h1>
                    <p className="about-subtitle">
                        Our mission is to ensure that no life is lost due to the unavailability of blood.
                    </p>
                </div>
            </section>

            <section className="mission-section">
                <div className="container mission-container">
                    <div className="mission-content">
                        <h2>Our Mission</h2>
                        <p>
                            RaktaSetu aims to eliminate delays in blood availability by creating a connected ecosystem of donors,
                            hospitals, and patients. We believe that technology can bridge the gap between those who need help
                            and those willing to give.
                        </p>
                        <div className="values-grid">
                            <div className="value-item">
                                <Target className="value-icon" />
                                <h3>Efficiency</h3>
                                <p>Reducing the time to find blood from hours to minutes.</p>
                            </div>
                            <div className="value-item">
                                <Heart className="value-icon" />
                                <h3>Compassion</h3>
                                <p>Fostering a community of care and voluntary donation.</p>
                            </div>
                            <div className="value-item">
                                <Globe className="value-icon" />
                                <h3>Accessibility</h3>
                                <p>Making blood availability transparent for everyone, everywhere.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="story-section">
                <div className="container story-container">
                    <div className="story-image">
                        {/* Placeholder for team or community image */}
                        <div className="image-placeholder-block"></div>
                    </div>
                    <div className="story-text">
                        <h2>The Story</h2>
                        <p>
                            RaktaSetu was born out of a personal experience where a critical emergency highlighted the inefficiencies
                            in the current blood donation system. Despite willing donors being nearby, the lack of real-time
                            information led to panic and delay.
                        </p>
                        <p>
                            We decided to change that. By leveraging modern web technologies, we built a platform that puts
                            real-time information in the hands of people when they need it most.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

import React from 'react';
import { Search, Heart, Calendar, Activity, ArrowRight, Users, Clock, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-headline">Find Blood When Every Second Matters.</h1>
                        <p className="hero-subheadline">
                            Real-time blood availability, emergency requests, and donation scheduling — all in one platform.
                        </p>
                        <div className="hero-actions">
                            <Button variant="primary" className="hero-btn">Find Blood Now</Button>
                            <Button variant="secondary" className="hero-btn">Become a Donor</Button>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <Users size={20} className="stat-icon" />
                                <span>10k+ Donors</span>
                            </div>
                            <div className="stat-item">
                                <Activity size={20} className="stat-icon" />
                                <span>500+ Blood Banks</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image-placeholder">
                        {/* Abstract Healthcare/Connection Illustration Placeholder */}
                        <div className="abstract-shape shape-1"></div>
                        <div className="abstract-shape shape-2"></div>
                        <Heart size={120} className="hero-heart-icon" />
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="section problem-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-tag">The Challenge</span>
                        <h2 className="section-title">Emergency Doesn't Wait</h2>
                        <p className="section-subtitle">
                            Every day, families struggle to find blood during emergencies, losing precious time calling hospitals and searching social media.
                        </p>
                    </div>
                    <div className="problem-grid">
                        <div className="problem-card">
                            <Clock size={40} className="problem-icon" />
                            <h3>Time Sensitive</h3>
                            <p>Delays in finding the right blood group can cost lives during critical surgeries and accidents.</p>
                        </div>
                        <div className="problem-card">
                            <Users size={40} className="problem-icon" />
                            <h3>Fragmented Info</h3>
                            <p>No central database means calling multiple blood banks to check availability one by one.</p>
                        </div>
                        <div className="problem-card">
                            <ShieldCheck size={40} className="problem-icon" />
                            <h3>Unverified Sources</h3>
                            <p>Social media requests often lead to outdated or unverified donor information.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="section solution-section">
                <div className="container solution-container">
                    <div className="solution-content">
                        <span className="section-tag">Our Solution</span>
                        <h2 className="section-title">The RaktaSetu Solution</h2>
                        <p className="solution-text">
                            RaktaSetu creates a real-time digital bridge between donors, blood banks, and patients. We digitize inventory and connect communities to ensure no one has to wait for blood.
                        </p>
                        <ul className="solution-list">
                            <li><div className="check-icon">✓</div> Instant Availability Check</li>
                            <li><div className="check-icon">✓</div> Verified Donor Network</li>
                            <li><div className="check-icon">✓</div> Direct Hospital Integration</li>
                        </ul>
                        <Button variant="outline">Learn How It Works <ArrowRight size={16} style={{ marginLeft: '8px' }} /></Button>
                    </div>
                    <div className="solution-graphics">
                        <div className="graphic-box">
                            <div className="connection-line"></div>
                            <div className="node node-patient">Patient</div>
                            <div className="node node-platform">RaktaSetu</div>
                            <div className="node node-donor">Donor</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Preview */}
            <section className="section features-preview-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Everything You Need</h2>
                        <p className="section-subtitle">Comprehensive tools for patients, donors, and blood banks.</p>
                    </div>
                    <div className="features-grid">
                        <FeatureCard
                            icon={Search}
                            title="Real-Time Availability"
                            description="See live blood stock from nearby hospitals and blood banks instantly."
                        />
                        <FeatureCard
                            icon={Activity}
                            title="Emergency Requests"
                            description="Post urgent blood needs and notify nearby eligible donors immediately."
                        />
                        <FeatureCard
                            icon={Calendar}
                            title="Schedule Donations"
                            description="Book donation slots at nearby blood banks to save time and avoid crowds."
                        />
                        <FeatureCard
                            icon={Users}
                            title="Digital Blood Bank"
                            description="Hospitals can manage inventory and requests through a dedicated dashboard."
                        />
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="section impact-section">
                <div className="container">
                    <div className="impact-grid">
                        <div className="impact-item">
                            <span className="impact-number">5000+</span>
                            <span className="impact-label">Lives Saved</span>
                        </div>
                        <div className="impact-item">
                            <span className="impact-number">120+</span>
                            <span className="impact-label">Partner Blood Banks</span>
                        </div>
                        <div className="impact-item">
                            <span className="impact-number">15min</span>
                            <span className="impact-label">Avg. Response Time</span>
                        </div>
                        <div className="impact-item">
                            <span className="impact-number">8000+</span>
                            <span className="impact-label">Active Donors</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container cta-container">
                    <h2>Ready to Save a Life?</h2>
                    <p>Join the RaktaSetu community today. Whether you are a donor or seeking help, we are here for you.</p>
                    <div className="cta-buttons">
                        <Button variant="secondary">Find Blood</Button>
                        <Button variant="primary" className="btn-white-border">Register as Donor</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

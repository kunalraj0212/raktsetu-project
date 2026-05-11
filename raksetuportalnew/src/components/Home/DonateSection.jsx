import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Heart, Droplets } from 'lucide-react';
import Button from '../Button';

const DonateSection = () => {
    return (
        <section className="section donate-section">
            <div className="container donate-grid">
                <div className="donate-content">
                    <span className="section-tag">Eligibility</span>
                    <h2 className="section-title">Who Can Donate</h2>
                    <p className="donate-text">
                        Donating blood is a simple, safe and life-saving act. To ensure safety of
                        both donors and recipients, certain health criteria must be met.
                    </p>
                    <ul className="eligibility-list">
                        <li><CheckCircle size={18} className="check-green" /> Age between 18–65 years</li>
                        <li><CheckCircle size={18} className="check-green" /> Weight above 45 kg</li>
                        <li><CheckCircle size={18} className="check-green" /> Hemoglobin level of 12.5 g/dL minimum</li>
                        <li><CheckCircle size={18} className="check-green" /> Pulse 50–100, no irregularities</li>
                        <li><CheckCircle size={18} className="check-green" /> BP: Systolic 100–180, Diastolic 50–100</li>
                        <li><CheckCircle size={18} className="check-green" /> No major surgery in the last 6 months</li>
                    </ul>
                    <div className="donate-cta-group">
                        <Link to="/register-donor">
                            <Button variant="primary">Register Now</Button>
                        </Link>
                    </div>
                </div>
                <div className="donate-visual">
                    <div className="donate-illustration">
                        <div className="donor-figure">
                            <Heart size={64} className="donor-heart" fill="currentColor" />
                            <div className="iv-line"></div>
                            <div className="blood-bag">
                                <Droplets size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonateSection;

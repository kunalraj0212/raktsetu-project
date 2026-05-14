import React from 'react';
import './Legal.css';

const PrivacyPolicy = () => {
    return (
        <div className="legal-page">
            <section className="legal-hero">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: February 2025</p>
                </div>
            </section>
            <section className="legal-content">
                <div className="container legal-body">
                    <h2>1. Information We Collect</h2>
                    <p>We collect information you provide directly when using RaktaSetu, including:</p>
                    <ul>
                        <li>Name, email address, and phone number when registering</li>
                        <li>Blood group and medical information for donor registration</li>
                        <li>Location data for finding nearby blood centers and camps</li>
                        <li>Usage data including pages visited and features used</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the collected information to:</p>
                    <ul>
                        <li>Connect blood donors with patients in need</li>
                        <li>Send notifications about donation camps and emergencies</li>
                        <li>Improve our platform and services</li>
                        <li>Communicate updates and important information</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>We do not sell your personal information. We share data only with:</p>
                    <ul>
                        <li>Registered blood banks for donor matching</li>
                        <li>Healthcare providers for emergency blood requests</li>
                        <li>Law enforcement when required by law</li>
                    </ul>

                    <h2>4. Data Security</h2>
                    <p>We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits.</p>

                    <h2>5. Your Rights</h2>
                    <p>You have the right to access, update, or delete your personal information at any time. Contact us at <strong>privacy@raktasetu.com</strong> for data-related requests.</p>

                    <h2>6. Cookies</h2>
                    <p>We use essential cookies for site functionality and analytics cookies to understand user behavior. You can manage cookie preferences through your browser settings.</p>

                    <h2>7. Contact Us</h2>
                    <p>For privacy-related questions, reach out to us at <strong>privacy@raktasetu.com</strong> or visit our Contact page.</p>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;

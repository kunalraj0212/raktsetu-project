import React from 'react';
import './Legal.css';

const Terms = () => {
    return (
        <div className="legal-page">
            <section className="legal-hero">
                <div className="container">
                    <h1>Terms of Service</h1>
                    <p>Last updated: February 2025</p>
                </div>
            </section>
            <section className="legal-content">
                <div className="container legal-body">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing and using RaktaSetu, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

                    <h2>2. Services Description</h2>
                    <p>RaktaSetu is a technology platform that connects blood donors, patients, and blood banks. We provide:</p>
                    <ul>
                        <li>Real-time blood availability search</li>
                        <li>Donor registration and management</li>
                        <li>Blood bank directory and connectivity</li>
                        <li>Emergency blood request facilitation</li>
                    </ul>

                    <h2>3. User Responsibilities</h2>
                    <p>Users agree to:</p>
                    <ul>
                        <li>Provide accurate and truthful information</li>
                        <li>Not misuse the platform for fraudulent activities</li>
                        <li>Follow all applicable health guidelines for blood donation</li>
                        <li>Keep account credentials secure</li>
                    </ul>

                    <h2>4. Medical Disclaimer</h2>
                    <p>RaktaSetu is a technology platform and does not provide medical advice. Always consult qualified healthcare professionals before making health-related decisions. We are not responsible for medical outcomes.</p>

                    <h2>5. Limitation of Liability</h2>
                    <p>RaktaSetu provides its services "as is" and makes no warranties regarding availability, accuracy, or completeness of information. We shall not be liable for any indirect, incidental, or consequential damages.</p>

                    <h2>6. Intellectual Property</h2>
                    <p>All content, logos, and designs on RaktaSetu are protected by intellectual property laws. Unauthorized use or reproduction is prohibited.</p>

                    <h2>7. Modifications</h2>
                    <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>

                    <h2>8. Contact</h2>
                    <p>For questions about these terms, contact us at <strong>legal@raktasetu.com</strong>.</p>
                </div>
            </section>
        </div>
    );
};

export default Terms;

import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section brand-section">
                    <Link to="/" className="footer-logo">
                        <Droplet className="logo-icon" fill="currentColor" />
                        <span className="logo-text">RaktaSetu</span>
                    </Link>
                    <p className="footer-tagline">Connecting Lives Through Blood.</p>
                    <p className="footer-mission">
                        RaktaSetu creates a real-time digital bridge between donors, blood banks, and patients to save lives during emergencies.
                    </p>
                </div>

                <div className="footer-section links-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/features">Features</Link></li>
                        <li><Link to="/how-it-works">How It Works</Link></li>
                        <li><Link to="/blood-banks">For Blood Banks</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact-section">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><Mail size={16} /> support@raktasetu.com</li>
                        <li><Phone size={16} /> +91 98765 43210</li>
                        <li><MapPin size={16} /> Mumbai, India</li>
                    </ul>
                    <div className="social-icons">
                        <a href="#" className="social-link"><Facebook size={20} /></a>
                        <a href="#" className="social-link"><Twitter size={20} /></a>
                        <a href="#" className="social-link"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} RaktaSetu. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

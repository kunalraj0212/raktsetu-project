import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                {/* Brand */}
                <div className="footer-col brand-col">
                    <Link to="/" className="footer-brand">
                        <div className="footer-logo-icon">
                            <Droplet size={24} fill="currentColor" />
                        </div>
                        <span className="footer-brand-name">RaktSetu</span>
                    </Link>
                    <p className="footer-desc">
                        India's digital platform connecting blood donors, patients, and blood banks. Ensuring no life is lost due to blood unavailability.
                    </p>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook size={18} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Twitter size={18} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram size={18} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <Youtube size={18} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/features">Features</Link></li>
                        <li><Link to="/how-it-works">How It Works</Link></li>
                        <li><Link to="/blood-banks">For Blood Banks</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div className="footer-col">
                    <h4>Services</h4>
                    <ul>
                        <li><Link to="/blood-availability">Blood Availability Search</Link></li>
                        <li><Link to="/blood-availability">Blood Center Directory</Link></li>
                        <li><Link to="/how-it-works">Donation Camps</Link></li>
                        <li><Link to="/how-it-works">Donor Registration</Link></li>
                    </ul>
                </div>

                {/* Contact + Legal */}
                <div className="footer-col">
                    <h4>Contact Us</h4>
                    <ul className="contact-list">
                        <li><Mail size={14} /> support@raktsetu.com</li>
                        <li><Phone size={14} /> +91 98765 43210</li>
                        <li><MapPin size={14} /> Mumbai, India</li>
                    </ul>
                    <h4 className="mt-legal">Legal</h4>
                    <ul>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>&copy; {new Date().getFullYear()} RaktSetu. All rights reserved.</p>
                    <p className="disclaimer">RaktSetu is a technology platform. Always consult medical professionals for health decisions.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

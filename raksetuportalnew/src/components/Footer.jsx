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
                    <Link to="/" className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <div className="footer-logo-icon">
                            <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="48" fill="#FFF" stroke="var(--primary)" strokeWidth="4"/>
                                <path d="M50 20 C50 20, 25 50, 25 68 A25 25 0 0 0 75 68 C75 50, 50 20, 50 20 Z" fill="var(--primary)" />
                                <circle cx="42" cy="58" r="5" fill="#FFF" />
                                <path d="M30 80 C 30 68, 54 68, 54 80" stroke="#FFF" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <circle cx="60" cy="64" r="4" fill="#FFF" />
                                <path d="M52 80 C 52 72, 68 72, 68 80" stroke="#FFF" strokeWidth="3" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="footer-brand-name" style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--white)' }}>Rakta<span style={{ color: 'var(--primary)' }}>Setu</span></span>
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
                        <li><Mail size={14} /> support@raktasetu.com</li>
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
                    <p>&copy; {new Date().getFullYear()} RaktaSetu. All rights reserved.</p>
                    <p className="disclaimer">RaktaSetu is a technology platform. Always consult medical professionals for health decisions.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

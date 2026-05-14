import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <div className="container text-center">
                    <h1>Get in Touch</h1>
                    <p>Have questions or suggestions? We'd love to hear from you.</p>
                </div>
            </section>

            <section className="contact-content">
                <div className="container contact-container">
                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <p className="info-intro">Fill out the form and our team will get back to you within 24 hours.</p>

                        <div className="info-item">
                            <Mail className="info-icon" />
                            <div>
                                <h3>Email</h3>
                                <p>support@raktasetu.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <Phone className="info-icon" />
                            <div>
                                <h3>Phone</h3>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <MapPin className="info-icon" />
                            <div>
                                <h3>Address</h3>
                                <p>123 Innovation Tower, Tech Park,<br />Mumbai, India - 400001</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Type your message here..."
                                ></textarea>
                            </div>
                            <Button type="submit" variant="primary" className="btn-full-width">
                                Send Message <Send size={18} style={{ marginLeft: '8px' }} />
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

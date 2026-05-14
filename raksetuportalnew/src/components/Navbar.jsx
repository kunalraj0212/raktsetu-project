import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Droplet, Search, Eye, Moon, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [fontSize, setFontSize] = useState(100);
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
    }, [fontSize]);

    useEffect(() => {
        if (isHighContrast) document.body.classList.add('high-contrast-mode');
        else document.body.classList.remove('high-contrast-mode');
    }, [isHighContrast]);

    const changeFontSize = (step) => {
        setFontSize(prev => {
            if (step === 0) return 100;
            return Math.max(80, Math.min(120, prev + step));
        });
    };

    return (
        <header className="site-header">
            {/* 1. Government & Accessibility Top Bar */}
            <div className="gov-top-bar">
                <div className="container top-bar-inner">
                    <div className="top-bar-left">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" className="gov-emblem" />
                        <span>GOVERNMENT OF INDIA | MINISTRY OF HEALTH & FAMILY WELFARE</span>
                    </div>
                    <div className="top-bar-right">
                        <span className="helpline-text">National Helpline: <span className="helpline-number">104</span></span>
                        <div className="top-bar-divider"></div>
                        <div className="font-controls">
                            <button onClick={() => changeFontSize(-10)}>A-</button>
                            <button onClick={() => changeFontSize(0)}>A</button>
                            <button onClick={() => changeFontSize(10)}>A+</button>
                        </div>
                        <div className="top-bar-divider"></div>
                        <button className="contrast-toggle" onClick={() => setIsHighContrast(!isHighContrast)}>
                            {isHighContrast ? <Eye size={14} /> : <Moon size={14} />}
                            <span>High Contrast</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Main Premium Navbar */}
            <div className="main-navbar">
                <div className="container nav-container">
                    {/* Brand */}
                    <Link to="/" className="brand-link">
                        <div className="brand-logo-container">
                            <svg width="44" height="44" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg">
                                <circle cx="50" cy="50" r="48" fill="#FFF" stroke="var(--primary)" strokeWidth="4"/>
                                <path d="M50 20 C50 20, 25 50, 25 68 A25 25 0 0 0 75 68 C75 50, 50 20, 50 20 Z" fill="var(--primary)" />
                                <circle cx="42" cy="58" r="5" fill="#FFF" />
                                <path d="M30 80 C 30 68, 54 68, 54 80" stroke="#FFF" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <circle cx="60" cy="64" r="4" fill="#FFF" />
                                <path d="M52 80 C 52 72, 68 72, 68 80" stroke="#FFF" strokeWidth="3" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="brand-text">
                            <div className="brand-title">
                                <span className="text-dark">Rakta</span><span className="text-primary">Setu</span>
                            </div>
                            <span className="brand-tagline">Bridging Hearts. Saving Lives.</span>
                        </div>
                    </Link>

                    {/* Links */}
                    <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
                        <NavLink to="/blood-availability" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Find Blood</NavLink>
                        <NavLink to="/register-donor" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Donate</NavLink>
                        <NavLink to="/blood-banks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Blood Banks</NavLink>
                        
                        {/* Mobile Auth Buttons (visible only on mobile) */}
                        {!user && (
                            <div className="mobile-auth-buttons">
                                <Link to="/register-bloodbank" className="btn-outline-primary" onClick={() => setIsMobileMenuOpen(false)}>Blood Bank Login</Link>
                                <Link to="/login" className="btn-solid-primary" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
                            </div>
                        )}
                    </nav>

                    {/* Actions */}
                    <div className="nav-actions">
                        <button className="nav-search-btn" aria-label="Search">
                            <Search size={18} />
                        </button>
                        
                        {user ? (
                            <div className="user-profile">
                                <Link to="/donor-dashboard" className="user-info" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <UserIcon size={18} />
                                    <span>{user.fullName || 'User'}</span>
                                </Link>
                                <button onClick={() => { logout(); navigate('/'); }} className="logout-btn">
                                    <LogOut size={14} /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <Link to="/register-bloodbank" className="btn-outline-primary">Blood Bank Login</Link>
                                <Link to="/login" className="btn-solid-primary">Login / Register</Link>
                            </div>
                        )}
                        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
                            {isMobileMenuOpen ? <span style={{ fontSize: '1.5rem' }}>×</span> : <span style={{ fontSize: '1.5rem' }}>≡</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Soft Red Ticker */}
            <div className="hero-ticker">
                <div className="container ticker-flex">
                    <div className="ticker-item">
                        <span className="ticker-drop">💧</span> Be a hero. <span className="text-primary-bold">Donate blood, save lives.</span>
                    </div>
                    <div className="ticker-divider">|</div>
                    <div className="ticker-item">
                        <span className="text-primary-bold">Every drop counts, every second matters.</span> <span className="ticker-heart">❤️</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

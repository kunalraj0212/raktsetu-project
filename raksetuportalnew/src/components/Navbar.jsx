import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Droplet, Search, ChevronDown, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navItems = [
        { label: 'Home', path: '/' },
        {
            label: 'About RaktaSetu', path: '/about', hasDropdown: true,
            children: [
                { label: 'Our Mission', path: '/about' },
                { label: 'How It Works', path: '/how-it-works' },
                { label: 'Our Features', path: '/features' },
            ]
        },
        {
            label: 'Looking for Blood', path: '/blood-availability', hasDropdown: true,
            children: [
                { label: 'Blood Availability Search', path: '/blood-availability' },
                { label: 'Blood Center Directory', path: '/blood-availability' },
                { label: 'Emergency Request', path: '/emergency' },
            ]
        },
        {
            label: 'Want to Donate', path: '/register-donor', hasDropdown: true,
            children: [
                { label: 'Donor Registration', path: '/register-donor' },
                { label: 'Donation Process', path: '/how-it-works' },
                { label: 'Find Nearby Camps', path: '/blood-availability' },
                { label: 'About Blood Donation', path: '/about' },
            ]
        },
        {
            label: 'For Blood Banks', path: '/blood-banks', hasDropdown: true,
            children: [
                { label: 'Register Your Blood Bank', path: '/blood-banks' },
                { label: 'Dashboard Features', path: '/features' },
                { label: 'Contact Us', path: '/contact' },
            ]
        },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const closeAll = () => {
        setIsOpen(false);
        setActiveDropdown(null);
    };

    return (
        <header className="site-header">
            {/* Top bar with logo and search */}
            <div className="header-top">
                <div className="container header-top-inner">
                    <Link to="/" className="header-brand" onClick={closeAll}>
                        <div className="brand-logo">
                            <Droplet size={32} fill="currentColor" />
                        </div>
                        <div className="brand-text">
                            <span className="brand-name">RaktaSetu</span>
                            <span className="brand-tagline">Connecting Lives Through Blood</span>
                        </div>
                    </Link>
                    <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="header-search" style={{ marginRight: '1rem' }}>
                            <Search size={16} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="search-input"
                                aria-label="Search the site"
                            />
                        </div>
                        {user ? (
                            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#1f2937' }}>
                                    <UserIcon size={18} />
                                    <span>{user.fullName || 'User'}</span>
                                </div>
                                <button onClick={() => { logout(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: '1px solid #e5e7eb', padding: '0.4rem 0.75rem', borderRadius: '4px', cursor: 'pointer', color: '#4b5563', fontSize: '0.875rem' }}>
                                    <LogOut size={14} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <Link to="/register-bloodbank" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
                                    Blood Bank Login
                                </Link>
                                <Link to="/login" style={{ backgroundColor: '#8B0000', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>
                                    Login as User
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation bar */}
            <nav className="main-nav" ref={dropdownRef} aria-label="Main navigation">
                <div className="container nav-inner">
                    <button
                        className="nav-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                        {navItems.map((item, index) => (
                            <li key={index} className={`nav-item ${item.hasDropdown ? 'has-dropdown' : ''}`}>
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            className={`nav-link dropdown-trigger ${activeDropdown === index ? 'open' : ''}`}
                                            onClick={() => toggleDropdown(index)}
                                            aria-expanded={activeDropdown === index}
                                            aria-haspopup="true"
                                        >
                                            {item.label}
                                            <ChevronDown size={14} className={`chevron ${activeDropdown === index ? 'rotated' : ''}`} />
                                        </button>
                                        <ul className={`dropdown-menu ${activeDropdown === index ? 'show' : ''}`}>
                                            {item.children.map((child, ci) => (
                                                <li key={ci}>
                                                    <Link
                                                        to={child.path}
                                                        className="dropdown-link"
                                                        onClick={closeAll}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                        onClick={closeAll}
                                        end
                                    >
                                        {item.label}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Marquee ticker */}
            <div className="ticker-bar">
                <div className="container">
                    <div className="ticker-content">
                        <span className="ticker-icon">🩸</span>
                        <span>Be a life saver! </span>
                        <span className="ticker-highlight">Donate blood and help save lives. Every drop counts!</span>
                        <span className="ticker-icon"> 🩸</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

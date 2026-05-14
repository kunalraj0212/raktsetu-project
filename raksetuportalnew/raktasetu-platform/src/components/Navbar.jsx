import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Droplet } from 'lucide-react';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <Droplet className="logo-icon" fill="currentColor" />
                    <span className="logo-text">RaktaSetu</span>
                </Link>
                <div className="navbar-toggle" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
                <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsOpen(false)}>
                            Home
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/features" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsOpen(false)}>
                            Features
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/how-it-works" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsOpen(false)}>
                            How It Works
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/blood-banks" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsOpen(false)}>
                            For Blood Banks
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsOpen(false)}>
                            About
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={() => setIsOpen(false)}>
                            Contact
                        </NavLink>
                    </li>
                    <li className="navbar-item desktop-only">
                        <Button variant="outline" className="btn-sm">Sign In</Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

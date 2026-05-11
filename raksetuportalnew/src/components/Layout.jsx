import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
    return (
        <div className="app-layout">
            <a href="#main-content" className="skip-to-content">
                Skip to main content
            </a>
            <ScrollToTop />
            <Navbar />
            <main id="main-content" className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

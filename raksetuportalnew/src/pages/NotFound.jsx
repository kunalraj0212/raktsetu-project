import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="nf-content">
                <div className="nf-code">404</div>
                <h1>Page Not Found</h1>
                <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
                <div className="nf-actions">
                    <Link to="/">
                        <Button variant="primary"><Home size={16} /> Go Home</Button>
                    </Link>
                    <Link to="/blood-availability">
                        <Button variant="secondary"><ArrowLeft size={16} /> Blood Availability</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

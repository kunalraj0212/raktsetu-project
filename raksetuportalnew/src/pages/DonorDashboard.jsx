import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    HeartPulse, Calendar, MapPin, Clock, ShieldCheck, 
    Award, ChevronRight, Droplets, Bell, CheckCircle
} from 'lucide-react';
import Button from '../components/Button';
import './DonorDashboard.css';

const DonorDashboard = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading donor specific data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Mock data for the dashboard based on prompt requirements
    const donorStats = {
        totalDonations: 3,
        livesImpacted: 9,
        lastDonation: '2023-11-15',
        nextEligible: '2024-02-15',
        isEligible: true, // Assuming current date is past nextEligible
    };

    const upcomingAppointment = {
        id: 'APT-8829',
        date: '2024-05-20',
        time: '10:30 AM',
        center: 'City Central Blood Bank',
        address: '142 Health Avenue, Downtown',
        status: 'confirmed'
    };

    const nearbyCenters = [
        { id: 1, name: 'Apollo Hospital Blood Center', distance: '2.5 km', need: 'High' },
        { id: 2, name: 'Red Cross Society', distance: '4.1 km', need: 'Medium' },
        { id: 3, name: 'Fortis Healthcare', distance: '5.8 km', need: 'Critical' }
    ];

    if (isLoading) {
        return (
            <div className="dashboard-page">
                <div className="container dashboard-container">
                    <div className="skeleton-header" style={{ height: '120px', borderRadius: '16px', marginBottom: '2rem', background: '#f1f5f9' }}></div>
                    <div className="dashboard-grid">
                        <div className="skeleton-card" style={{ height: '300px', borderRadius: '16px', background: '#f1f5f9' }}></div>
                        <div className="skeleton-card" style={{ height: '300px', borderRadius: '16px', background: '#f1f5f9' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-top-banner">
                <div className="container">
                    <div className="banner-content">
                        <div className="user-greeting">
                            <h1>Welcome back, <span className="text-primary">{user?.fullName?.split(' ')[0] || 'Hero'}</span>!</h1>
                            <p>Your blood type <strong className="text-primary">{user?.bloodGroup || 'O+'}</strong> is currently in high demand in your area.</p>
                        </div>
                        <div className="donor-blood-badge">
                            <Droplets size={28} />
                            <span>{user?.bloodGroup || 'O+'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container dashboard-container">
                <div className="dashboard-grid">
                    
                    {/* Left Column - Main Content */}
                    <div className="dashboard-main">
                        
                        {/* Eligibility & Impact Card */}
                        <div className="dash-card impact-card">
                            <div className="card-header">
                                <h3><ShieldCheck size={20} className="text-success" /> Eligibility & Impact</h3>
                            </div>
                            <div className="impact-stats-grid">
                                <div className="impact-stat">
                                    <div className="stat-icon-bg bg-red-light"><HeartPulse size={24} className="text-primary" /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{donorStats.totalDonations}</span>
                                        <span className="stat-label">Total Donations</span>
                                    </div>
                                </div>
                                <div className="impact-stat">
                                    <div className="stat-icon-bg bg-blue-light"><Award size={24} className="text-blue" /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{donorStats.livesImpacted}</span>
                                        <span className="stat-label">Est. Lives Saved</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`eligibility-banner ${donorStats.isEligible ? 'eligible' : 'cooldown'}`}>
                                <div className="el-icon">
                                    {donorStats.isEligible ? <CheckCircle size={24} /> : <Clock size={24} />}
                                </div>
                                <div className="el-text">
                                    <h4>{donorStats.isEligible ? 'You are eligible to donate!' : 'You are in the cooldown period.'}</h4>
                                    <p>Your last donation was on {donorStats.lastDonation}. {donorStats.isEligible ? 'Schedule your next donation today.' : `You will be eligible again on ${donorStats.nextEligible}.`}</p>
                                </div>
                                {donorStats.isEligible && (
                                    <Button variant="primary" className="btn-sm">Book Slot</Button>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Appointment */}
                        <div className="dash-card appointment-card">
                            <div className="card-header">
                                <h3><Calendar size={20} className="text-dark" /> Upcoming Appointment</h3>
                                <span className="badge badge-success">Confirmed</span>
                            </div>
                            <div className="apt-details">
                                <div className="apt-time">
                                    <span className="apt-day">20</span>
                                    <span className="apt-month">MAY</span>
                                </div>
                                <div className="apt-info">
                                    <h4>{upcomingAppointment.center}</h4>
                                    <p><MapPin size={14}/> {upcomingAppointment.address}</p>
                                    <p className="apt-time-slot"><Clock size={14}/> {upcomingAppointment.time}</p>
                                </div>
                            </div>
                            <div className="apt-actions">
                                <Button variant="outline" className="btn-sm">Reschedule</Button>
                                <Button variant="outline" className="btn-sm btn-danger-outline">Cancel</Button>
                                <Button variant="primary" className="btn-sm">Get Directions</Button>
                            </div>
                        </div>

                        {/* Preparation Tips */}
                        <div className="dash-card tips-card">
                            <div className="card-header">
                                <h3><Bell size={20} className="text-amber" /> Preparation Tips</h3>
                            </div>
                            <ul className="tips-list">
                                <li>Drink an extra 500ml of water before your appointment.</li>
                                <li>Eat a healthy meal, avoiding fatty foods, 2-3 hours before donating.</li>
                                <li>Bring your official ID and RaktaSetu Donor Card.</li>
                                <li>Wear clothing with sleeves that can be easily rolled up.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="dashboard-sidebar">
                        
                        {/* Quick Actions */}
                        <div className="dash-card quick-actions-card">
                            <h3>Quick Actions</h3>
                            <div className="action-buttons">
                                <Link to="/blood-availability" className="quick-action-btn">
                                    <div className="icon-wrap"><MapPin size={18} /></div>
                                    <div className="text-wrap">
                                        <strong>Find Centers</strong>
                                        <span>Locate nearby blood banks</span>
                                    </div>
                                    <ChevronRight size={16} className="arrow" />
                                </Link>
                                <Link to="/emergency" className="quick-action-btn danger">
                                    <div className="icon-wrap"><HeartPulse size={18} /></div>
                                    <div className="text-wrap">
                                        <strong>Emergency Request</strong>
                                        <span>Need blood urgently?</span>
                                    </div>
                                    <ChevronRight size={16} className="arrow" />
                                </Link>
                            </div>
                        </div>

                        {/* Nearby Centers needing blood */}
                        <div className="dash-card nearby-card">
                            <div className="card-header">
                                <h3>Centers Near You</h3>
                            </div>
                            <div className="nearby-list">
                                {nearbyCenters.map(center => (
                                    <div key={center.id} className="nearby-item">
                                        <div className="ni-info">
                                            <strong>{center.name}</strong>
                                            <span>{center.distance} away</span>
                                        </div>
                                        <div className="ni-badge">
                                            <span className={`need-badge ${center.need.toLowerCase()}`}>{center.need} Need</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="btn-full-width" style={{ marginTop: '1rem' }}>View All Centers</Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;

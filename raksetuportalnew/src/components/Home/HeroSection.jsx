import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Droplets, Heart, ShieldCheck, Users, Lock, ChevronDown, User } from 'lucide-react';
import { bloodGroups } from '../../utils/validators';

const HeroSection = ({ stats }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({
        target: 'someone',
        state: '',
        district: '',
        bloodGroup: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/blood-availability', { state: searchParams });
    };

    return (
        <section className="hero-premium">
            <div className="hero-bg-accent"></div>
            
            <div className="container hero-container">
                {/* Left Side: Typography & CTA */}
                <div className="hero-content">
                    <h1 className="hero-heading">
                        Find <span className="text-primary">Lifesaving</span> Blood.<br/>
                        Anywhere. Anytime.
                    </h1>
                    
                    <p className="hero-subtext">
                        India's most trusted blood availability network.<br/>
                        Instant search • Verified blood banks • Real-time availability
                    </p>
                    
                    <div className="hero-cta-group">
                        <Link to="/blood-availability" className="btn-solid-primary hero-btn">
                            <Droplets size={18} fill="currentColor" /> Find Blood Now
                        </Link>
                        <Link to="/register-donor" className="btn-outline-primary hero-btn btn-white-bg">
                            <Heart size={18} /> Donate Blood
                        </Link>
                    </div>
                    
                    <div className="hero-trust-row">
                        <span className="trust-item"><ShieldCheck size={16} /> Verified Network</span>
                        <span className="trust-item"><Lock size={16} /> Secure & Private</span>
                        <span className="trust-item"><Users size={16} /> {stats ? stats.totalBanks : 3893}+ Blood Banks</span>
                    </div>
                </div>

                {/* Right Side: Image & Floating Cards */}
                <div className="hero-visual">
                    <div className="visual-circle-bg"></div>
                    <img src="/hero_blood_drop.png" alt="Hands holding a lifesaver blood drop" className="hero-main-img" />
                    
                    {/* Floating Stat 1 */}
                    <div className="floating-stat stat-top-left">
                        <div className="stat-icon-wrapper bg-red-soft">
                            <Users size={20} className="text-primary" />
                        </div>
                        <div className="stat-text">
                            <span className="stat-num">25L+</span>
                            <span className="stat-label">Lives Impacted</span>
                        </div>
                    </div>
                    
                    {/* Floating Stat 2 */}
                    <div className="floating-stat stat-bottom-left">
                        <div className="stat-icon-wrapper bg-red-soft">
                            <Droplets size={20} className="text-primary" fill="currentColor" />
                        </div>
                        <div className="stat-text">
                            <span className="stat-num">12L+</span>
                            <span className="stat-label">Units Available</span>
                        </div>
                    </div>
                    
                    {/* Floating Stat 3 */}
                    <div className="floating-stat stat-right">
                        <div className="stat-icon-wrapper bg-gray-soft">
                            <ShieldCheck size={20} className="text-dark" />
                        </div>
                        <div className="stat-text">
                            <span className="stat-num">3893+</span>
                            <span className="stat-label">Verified Banks</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Integrated Command Center Search Bar */}
            <div className="container search-container-wrapper">
                <form className="hero-command-center" onSubmit={handleSearch}>
                    
                    <div className="search-segment segment-target">
                        <label>I need blood for</label>
                        <div className="target-toggle">
                            <button 
                                type="button" 
                                className={`target-btn ${searchParams.target === 'self' ? 'active' : ''}`}
                                onClick={() => setSearchParams({...searchParams, target: 'self'})}
                            >
                                <User size={14} /> Self / Family
                            </button>
                            <button 
                                type="button" 
                                className={`target-btn ${searchParams.target === 'someone' ? 'active' : ''}`}
                                onClick={() => setSearchParams({...searchParams, target: 'someone'})}
                            >
                                <Users size={14} /> Someone Else
                            </button>
                        </div>
                    </div>

                    <div className="search-segment">
                        <label>Select State</label>
                        <div className="input-with-icon">
                            <MapPin size={18} className="text-primary" />
                            <select 
                                value={searchParams.state}
                                onChange={(e) => setSearchParams({...searchParams, state: e.target.value})}
                            >
                                <option value="">Choose State</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Delhi">Delhi</option>
                                {/* Add dynamic states here */}
                            </select>
                            <ChevronDown size={16} className="select-arrow" />
                        </div>
                    </div>

                    <div className="search-segment">
                        <label>Select District</label>
                        <div className="input-with-icon">
                            <MapPin size={18} className="text-primary" />
                            <select 
                                value={searchParams.district}
                                onChange={(e) => setSearchParams({...searchParams, district: e.target.value})}
                            >
                                <option value="">Choose District</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="New Delhi">New Delhi</option>
                            </select>
                            <ChevronDown size={16} className="select-arrow" />
                        </div>
                    </div>

                    <div className="search-segment">
                        <label>Blood Group</label>
                        <div className="input-with-icon">
                            <Droplets size={18} className="text-primary" />
                            <select 
                                value={searchParams.bloodGroup}
                                onChange={(e) => setSearchParams({...searchParams, bloodGroup: e.target.value})}
                            >
                                <option value="">Select Blood Group</option>
                                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                            <ChevronDown size={16} className="select-arrow" />
                        </div>
                    </div>

                    <button type="submit" className="search-submit-btn">
                        <Search size={20} /> Search Blood
                    </button>
                </form>
            </div>
        </section>
    );
};

export default HeroSection;

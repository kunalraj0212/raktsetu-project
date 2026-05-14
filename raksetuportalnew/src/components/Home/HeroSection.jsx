import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, CircleDot, Droplets, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import Button from '../Button';

const HeroSection = ({ stats, donorCount }) => {
    return (
        <section className="hero-immersive">
            {/* Fluid background blobs */}
            <div className="fluid-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
                <div className="blob blob-4"></div>
                <div className="fluid-noise"></div>
            </div>

            {/* Floating particles */}
            <div className="particles">
                {[...Array(12)].map((_, i) => (
                    <span key={i} className={`particle p-${i}`}></span>
                ))}
            </div>

            {/* Blood drop animation */}
            <div className="hero-blood-drop">
                <svg viewBox="0 0 100 140" className="drop-svg">
                    <defs>
                        <radialGradient id="dropGrad" cx="40%" cy="40%">
                            <stop offset="0%" stopColor="#FF4444" />
                            <stop offset="50%" stopColor="#CC0000" />
                            <stop offset="100%" stopColor="#8B0000" />
                        </radialGradient>
                        <filter id="dropGlow">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <path
                        d="M50 10 C50 10 15 55 15 80 C15 100 30 130 50 130 C70 130 85 100 85 80 C85 55 50 10 50 10Z"
                        fill="url(#dropGrad)"
                        filter="url(#dropGlow)"
                        className="drop-path"
                    />
                    <ellipse cx="35" cy="65" rx="8" ry="12" fill="rgba(255,255,255,0.15)" transform="rotate(-20, 35, 65)" />
                </svg>
            </div>

            <div className="container hero-grid">
                <div className="hero-text">
                    <div className="hero-badge">
                        <CircleDot size={14} />
                        <span>India's Trusted Blood Network</span>
                    </div>
                    <h1 className="hero-headline">
                        Every Drop<br />
                        <span className="hero-accent">Saves a Life.</span>
                    </h1>
                    <p className="hero-sub">
                        Real-time blood availability. Instant donor matching.
                        Emergency alerts across India. Join the movement that's
                        saving thousands of lives.
                    </p>
                    <div className="hero-actions">
                        <Link to="/blood-availability">
                            <Button variant="primary" className="btn-lg hero-btn-glow">
                                <Search size={18} /> Search Blood Now
                            </Button>
                        </Link>
                        <Link to="/register-donor">
                            <Button variant="secondary" className="btn-lg hero-btn-outline">
                                <Heart size={18} /> Become a Donor
                            </Button>
                        </Link>
                    </div>

                    {/* Live stats ticker */}
                    <div className="hero-live-stats">
                        <div className="live-stat">
                            <span className="live-num">{stats ? stats.totalBanks : 40}+</span>
                            <span className="live-label">Blood Banks</span>
                        </div>
                        <div className="live-divider"></div>
                        <div className="live-stat">
                            <span className="live-num">{stats ? stats.totalUnits.toLocaleString() : '0'}</span>
                            <span className="live-label">Units Available</span>
                        </div>
                        <div className="live-divider"></div>
                        <div className="live-stat">
                            <span className="live-num">28+</span>
                            <span className="live-label">States Covered</span>
                        </div>
                        <div className="live-divider"></div>
                        <div className="live-stat">
                            <span className="live-num">{10000 + donorCount}</span>
                            <span className="live-label">Donors</span>
                        </div>
                    </div>
                </div>

                {/* Glass cards stack */}
                <div className="hero-cards-area">
                    <div className="glass-card gc-1">
                        <div className="gc-icon gc-red"><Droplets size={22} /></div>
                        <div className="gc-body">
                            <strong>A+ Available</strong>
                            <span>City Hospital, Mumbai — 12 units</span>
                        </div>
                        <div className="gc-badge available">Live</div>
                    </div>
                    <div className="glass-card gc-2">
                        <div className="gc-icon gc-orange"><AlertTriangle size={22} /></div>
                        <div className="gc-body">
                            <strong>Emergency Request</strong>
                            <span>O- needed urgently — AIIMS Delhi</span>
                        </div>
                        <div className="gc-badge urgent">Urgent</div>
                    </div>
                    <div className="glass-card gc-3">
                        <div className="gc-icon gc-green"><CheckCircle size={22} /></div>
                        <div className="gc-body">
                            <strong>Donor Matched!</strong>
                            <span>Response in 8 minutes ❤️</span>
                        </div>
                        <div className="gc-badge matched">Done</div>
                    </div>
                    <div className="glass-card gc-4">
                        <div className="gc-icon gc-blue"><Calendar size={22} /></div>
                        <div className="gc-body">
                            <strong>Donation Scheduled</strong>
                            <span>Feb 22 at Red Cross, Delhi</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

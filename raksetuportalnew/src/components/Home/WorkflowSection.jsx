import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, HeartHandshake, Zap, AlertTriangle } from 'lucide-react';
import Button from '../Button';

const WorkflowSection = () => {
    return (
        <section className="section workflows-section">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-tag">How It Works</span>
                    <h2 className="section-title">Choose Your Path</h2>
                    <p className="section-subtitle">Whether you need blood, want to donate, or face an emergency — we've got you covered.</p>
                </div>

                <div className="workflows-grid">
                    {/* Workflow 1: Order Blood */}
                    <div className="workflow-card wf-order">
                        <div className="wf-header">
                            <div className="wf-icon-wrap wf-red"><Search size={28} /></div>
                            <h3>Need Blood?</h3>
                            <p>Find and order the right blood type from verified centers near you.</p>
                        </div>
                        <div className="wf-steps">
                            <div className="wf-step">
                                <div className="wf-step-num">1</div>
                                <div className="wf-step-content">
                                    <strong>Search Availability</strong>
                                    <span>Select blood group, component & location</span>
                                </div>
                            </div>
                            <div className="wf-connector"></div>
                            <div className="wf-step">
                                <div className="wf-step-num">2</div>
                                <div className="wf-step-content">
                                    <strong>Choose Blood Center</strong>
                                    <span>Compare centers by stock & distance</span>
                                </div>
                            </div>
                            <div className="wf-connector"></div>
                            <div className="wf-step">
                                <div className="wf-step-num">3</div>
                                <div className="wf-step-content">
                                    <strong>Request & Collect</strong>
                                    <span>Place request and coordinate pickup</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/blood-availability" className="wf-action">
                            <Button variant="primary" className="btn-full-width">
                                Search Blood Now <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>

                    {/* Workflow 2: Schedule Donation */}
                    <div className="workflow-card wf-donate">
                        <div className="wf-header">
                            <div className="wf-icon-wrap wf-green"><HeartHandshake size={28} /></div>
                            <h3>Want to Donate?</h3>
                            <p>Register as a donor and schedule your first life-saving donation.</p>
                        </div>
                        <div className="wf-steps">
                            <div className="wf-step">
                                <div className="wf-step-num">1</div>
                                <div className="wf-step-content">
                                    <strong>Register Online</strong>
                                    <span>Quick 2-minute registration form</span>
                                </div>
                            </div>
                            <div className="wf-connector"></div>
                            <div className="wf-step">
                                <div className="wf-step-num">2</div>
                                <div className="wf-step-content">
                                    <strong>Schedule Appointment</strong>
                                    <span>Pick a date, time & nearby center</span>
                                </div>
                            </div>
                            <div className="wf-connector"></div>
                            <div className="wf-step">
                                <div className="wf-step-num">3</div>
                                <div className="wf-step-content">
                                    <strong>Donate & Save Lives</strong>
                                    <span>Complete donation with professional staff</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/register-donor" className="wf-action">
                            <Button variant="primary" className="btn-full-width">
                                Register as Donor <ArrowRight size={16} />
                            </Button>
                        </Link>
                    </div>

                    {/* Workflow 3: Emergency Blood */}
                    <div className="workflow-card wf-emergency">
                        <div className="wf-header">
                            <div className="wf-icon-wrap wf-amber"><Zap size={28} /></div>
                            <h3>Emergency?</h3>
                            <p>Critical blood need? We alert all nearby compatible donors instantly.</p>
                        </div>
                        <div className="wf-steps">
                            <div className="wf-step">
                                <div className="wf-step-num">1</div>
                                <div className="wf-step-content">
                                    <strong>Raise Emergency Alert</strong>
                                    <span>Submit patient details & blood needed</span>
                                </div>
                            </div>
                            <div className="wf-connector"></div>
                            <div className="wf-step">
                                <div className="wf-step-num">2</div>
                                <div className="wf-step-content">
                                    <strong>Donors Notified</strong>
                                    <span>All compatible donors within 10km alerted</span>
                                </div>
                            </div>
                            <div className="wf-connector"></div>
                            <div className="wf-step">
                                <div className="wf-step-num">3</div>
                                <div className="wf-step-content">
                                    <strong>Blood Delivered</strong>
                                    <span>Fastest responder matched & dispatched</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/emergency" className="wf-action">
                            <Button variant="primary" className="btn-full-width wf-emergency-btn">
                                <AlertTriangle size={16} /> Emergency Request
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;

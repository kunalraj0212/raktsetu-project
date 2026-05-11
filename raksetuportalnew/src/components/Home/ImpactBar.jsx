import React from 'react';

const ImpactBar = ({ stats, donorCount }) => {
    return (
        <section className="impact-bar">
            <div className="container impact-grid">
                <div className="impact-item">
                    <span className="impact-number">5,000+</span>
                    <span className="impact-label">Lives Saved</span>
                </div>
                <div className="impact-item">
                    <span className="impact-number">{stats ? stats.totalBanks : 40}+</span>
                    <span className="impact-label">Partner Blood Banks</span>
                </div>
                <div className="impact-item">
                    <span className="impact-number">15 min</span>
                    <span className="impact-label">Avg Response Time</span>
                </div>
                <div className="impact-item">
                    <span className="impact-number">{(10000 + donorCount).toLocaleString()}</span>
                    <span className="impact-label">Active Donors</span>
                </div>
            </div>
        </section>
    );
};

export default ImpactBar;

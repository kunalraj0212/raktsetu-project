import React from 'react';

const StatsBar = ({ stats }) => {
    if (!stats) return null;
    
    return (
        <section className="blood-group-bar" data-aos="fade-up">
            <div className="container">
                <div className="bg-bar-inner premium-stats-card">
                    <div className="stats-header">
                        <div className="pulse-dot"></div>
                        <h3 className="bg-bar-title">Live National Inventory</h3>
                    </div>
                    <div className="bg-group-grid premium-grid">
                        {Object.entries(stats.groupTotals).map(([group, count], idx) => (
                            <div key={group} className="bg-group-item premium-item" data-aos="zoom-in" data-aos-delay={idx * 50}>
                                <div className={`bg-circle premium-circle ${count < 50 ? 'low' : count < 100 ? 'medium' : 'high'}`}>
                                    <span className="bg-label">{group}</span>
                                </div>
                                <div className="bg-count-wrap">
                                    <span className="bg-count">{count}</span>
                                    <span className="bg-unit-label">units</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsBar;

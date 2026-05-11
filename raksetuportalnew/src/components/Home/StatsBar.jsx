import React from 'react';

const StatsBar = ({ stats }) => {
    if (!stats) return null;
    
    return (
        <section className="blood-group-bar">
            <div className="container">
                <div className="bg-bar-inner">
                    <h3 className="bg-bar-title">Real-Time Blood Stock</h3>
                    <div className="bg-group-grid">
                        {Object.entries(stats.groupTotals).map(([group, count]) => (
                            <div key={group} className="bg-group-item">
                                <div className={`bg-circle ${count < 50 ? 'low' : count < 100 ? 'medium' : 'high'}`}>
                                    <span className="bg-label">{group}</span>
                                </div>
                                <span className="bg-count">{count} units</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsBar;

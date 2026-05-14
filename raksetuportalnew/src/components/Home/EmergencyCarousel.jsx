import React from 'react';
import { AlertTriangle, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const dummyRequests = [
    { id: 1, group: 'O-', location: 'AIIMS, New Delhi', time: '2 hours ago', units: 3 },
    { id: 2, group: 'B+', location: 'Apollo Hospital, Mumbai', time: '4 hours ago', units: 1 },
    { id: 3, group: 'A-', location: 'Fortis, Bangalore', time: 'Just now', units: 2 },
    { id: 4, group: 'AB+', location: 'City Hospital, Pune', time: '1 hour ago', units: 4 },
];

const EmergencyCarousel = () => {
    return (
        <section style={{ backgroundColor: 'var(--off-white)', padding: '0 0 8rem 0', position: 'relative', zIndex: 3, marginTop: '-2rem' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blood)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px' }}>
                        <span style={{ position: 'relative', display: 'flex', h: '12px', w: '12px', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', backgroundColor: 'var(--accent-blood)', opacity: 0.75 }}></span>
                            <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '8px', width: '8px', backgroundColor: 'var(--accent-blood)' }}></span>
                        </span>
                        Live Emergency Needs
                    </div>
                    <div style={{ height: '1px', flex: 1, backgroundColor: 'var(--gray-200)' }}></div>
                    <Link to="/blood-availability" style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                        View All <ArrowRight size={14} />
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
                    {dummyRequests.map(req => (
                        <div key={req.id} style={{ 
                            minWidth: '300px', 
                            backgroundColor: 'white', 
                            borderRadius: '12px', 
                            padding: '1.25rem', 
                            border: '1px solid var(--gray-200)',
                            borderLeft: '4px solid var(--accent-blood)',
                            boxShadow: 'var(--shadow-sm)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FFF1F2', color: 'var(--accent-blood)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
                                        {req.group}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-blood)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <AlertTriangle size={12} /> {req.units} Units Needed
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--gray-500)', fontSize: '0.75rem', fontWeight: 500 }}>
                                    <Clock size={12} /> {req.time}
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-700)', fontSize: '0.9rem', fontWeight: 500 }}>
                                <MapPin size={16} color="var(--gray-400)" /> {req.location}
                            </div>
                            
                            <Link to="/register-donor" style={{ marginTop: '0.5rem', width: '100%' }}>
                                <button style={{ width: '100%', padding: '0.6rem', backgroundColor: 'var(--primary-bg)', color: 'var(--primary-dark)', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                                    Respond to Request
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
                <style>{`
                    @keyframes ping {
                        75%, 100% {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `}</style>
            </div>
        </section>
    );
};

export default EmergencyCarousel;

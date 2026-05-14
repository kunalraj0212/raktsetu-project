import React, { useEffect, useState } from 'react';
import { Search, MapPin, Droplets, Building2, Filter, ChevronDown, Phone, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { fetchBloodBankCount, fetchDistricts, fetchStates, searchBloodAvailability } from '../services/bloodBankService';
import './BloodAvailability.css';

const allBloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const components = ['Packed Red Blood Cells', 'Whole Blood', 'Platelets', 'Fresh Frozen Plasma', 'Cryoprecipitate'];

const BloodAvailability = () => {
    const [filters, setFilters] = useState({
        state: '', district: '', bloodGroup: 'All', component: ''
    });
    const [hasSearched, setHasSearched] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bankCount, setBankCount] = useState(0);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [error, setError] = useState(null);
    const perPage = 8;

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const [nextStates, nextBankCount] = await Promise.all([
                    fetchStates(),
                    fetchBloodBankCount(),
                ]);
                if (!isMounted) return;
                setStates(nextStates);
                setBankCount(nextBankCount);
                setError(null);
            } catch (err) {
                if (isMounted) {
                    setError('Failed to load initial data. Please try again later.');
                    setStates([]);
                    setBankCount(0);
                }
            }
        })();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            if (!filters.state) {
                if (isMounted) setDistricts([]);
                return;
            }
            try {
                const nextDistricts = await fetchDistricts(filters.state);
                if (!isMounted) return;
                setDistricts(nextDistricts);
            } catch (err) {
                console.error('Failed to fetch districts:', err);
                if (isMounted) setDistricts([]);
            }
        })();
        return () => { isMounted = false; };
    }, [filters.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'state' ? { district: '' } : {})
        }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            setIsSearching(true);
            const searchResults = await searchBloodAvailability(filters);
            setResults(searchResults);
            setHasSearched(true);
            setCurrentPage(1);
        } catch (err) {
            setError(err.message || 'Failed to search blood availability.');
            setResults([]);
            setHasSearched(false);
        } finally {
            setIsSearching(false);
        }
    };

    const handleClear = () => {
        setFilters({ state: '', district: '', bloodGroup: 'All', component: '' });
        setResults([]);
        setHasSearched(false);
        setError(null);
    };

    const totalPages = Math.ceil(results.length / perPage);
    const paginatedResults = results.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <div className="ba-page">
            <section className="ba-hero">
                <div className="container">
                    <h1><Search size={24} /> Blood Availability Search</h1>
                    <p>Search real-time blood stock across {bankCount}+ verified blood banks in India.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {error && (
                        <div style={{ color: '#8B0000', backgroundColor: '#FEE2E2', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '500', border: '1px solid #FCA5A5' }}>
                            ⚠️ {error}
                        </div>
                    )}
                    <form className="ba-search-form" onSubmit={handleSearch}>
                        <div className="ba-filters-grid">
                            <div className="ba-filter-group">
                                <label><MapPin size={14} /> State</label>
                                <select name="state" value={filters.state} onChange={handleChange}>
                                    <option value="">All States</option>
                                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="ba-filter-group">
                                <label><MapPin size={14} /> District</label>
                                <select name="district" value={filters.district} onChange={handleChange} disabled={!filters.state}>
                                    <option value="">All Districts</option>
                                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="ba-filter-group">
                                <label><Droplets size={14} /> Blood Group</label>
                                <select name="bloodGroup" value={filters.bloodGroup} onChange={handleChange}>
                                    {allBloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="ba-filter-group">
                                <label><Filter size={14} /> Component</label>
                                <select name="component" value={filters.component} onChange={handleChange}>
                                    <option value="">All Components</option>
                                    {components.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="ba-form-actions">
                            <Button type="submit" variant="primary" className="btn-lg" disabled={isSearching}>
                                {isSearching ? 'Searching...' : <><Search size={16} /> Search</>}
                            </Button>
                            <button type="button" className="ba-clear-btn" onClick={handleClear}>
                                Clear Filters
                            </button>
                        </div>
                    </form>

                    {/* Active Filters */}
                    {hasSearched && (
                        <div className="ba-active-filters">
                            {filters.state && <span className="ba-tag">{filters.state} ×</span>}
                            {filters.district && <span className="ba-tag">{filters.district} ×</span>}
                            {filters.bloodGroup !== 'All' && <span className="ba-tag">{filters.bloodGroup} ×</span>}
                            {filters.component && <span className="ba-tag">{filters.component} ×</span>}
                            <span className="ba-result-count">{results.length} results found</span>
                        </div>
                    )}

                    {/* Loading State: Skeletons */}
                    {isSearching && (
                        <div className="ba-results">
                            <div className="ba-results-grid">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="ba-result-card skeleton-card">
                                        <div className="skeleton-title"></div>
                                        <div className="skeleton-text"></div>
                                        <div className="skeleton-grid">
                                            <div className="skeleton-box"></div>
                                            <div className="skeleton-box"></div>
                                            <div className="skeleton-box"></div>
                                            <div className="skeleton-box"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    {hasSearched && !isSearching && results.length > 0 && (
                        <div className="ba-results">
                            <div className="ba-results-grid">
                                {paginatedResults.map(bank => (
                                    <div key={bank.id} className="ba-result-card">
                                        <div className="ba-card-header">
                                            <div className="ba-card-type" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <span className={`ba-category ${bank.category.toLowerCase()}`}>{bank.category}</span>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#10B981', fontSize: '0.7rem', fontWeight: 'bold', backgroundColor: '#ECFDF5', padding: '0.1rem 0.4rem', borderRadius: '4px' }}><ShieldCheck size={12} /> Verified</span>
                                            </div>
                                            <h3>{bank.name}</h3>
                                            <p className="ba-address"><MapPin size={13} /> {bank.address}</p>
                                        </div>

                                        <div className="ba-stock-grid">
                                            {Object.entries(bank.availability).map(([group, count]) => (
                                                <div key={group} className={`ba-stock-item ${count === 0 ? 'empty' : count < 5 ? 'low' : 'available'}`}>
                                                    <span className="ba-group">{group}</span>
                                                    <span className="ba-units">{count}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="ba-card-footer">
                                            <div className="ba-meta">
                                                <span><Clock size={12} /> Updated: {bank.lastUpdated}</span>
                                                <span className={`ba-status ${bank.status.toLowerCase().replace(' ', '-')}`}>{bank.status}</span>
                                            </div>
                                            <a href={`tel:${bank.phone}`} className="ba-call-link">
                                                <Phone size={14} /> Call
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="ba-pagination">
                                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="ba-page-btn">← Prev</button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} className={`ba-page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="ba-page-btn">Next →</button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Empty state */}
                    {hasSearched && !isSearching && results.length === 0 && (
                        <div className="ba-empty">
                            <Droplets size={48} />
                            <h3>No matching blood units found nearby yet</h3>
                            <p>Try expanding your search radius or modifying your filters. If this is an emergency, please submit an Emergency Request.</p>
                            <Button variant="outline" style={{ marginTop: '1rem' }} onClick={() => window.location.href = '/emergency'}>Go to Emergency Request</Button>
                        </div>
                    )}

                    {/* Initial state */}
                    {!hasSearched && !isSearching && (
                        <div className="ba-initial">
                            <Search size={48} />
                            <h3>Search for blood availability</h3>
                            <p>Use the filters above to search for blood across {bankCount}+ verified blood banks.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BloodAvailability;

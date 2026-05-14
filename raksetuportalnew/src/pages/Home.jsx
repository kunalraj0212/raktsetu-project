import React, { useEffect, useState } from 'react';
import { getStats, fetchDonorCount } from '../services/bloodBankService';
import HeroSection from '../components/Home/HeroSection';
import StatsBar from '../components/Home/StatsBar';
import WorkflowSection from '../components/Home/WorkflowSection';
import ServicesSection from '../components/Home/ServicesSection';
import DonateSection from '../components/Home/DonateSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import ImpactBar from '../components/Home/ImpactBar';
import CtaBanner from '../components/Home/CtaBanner';
import './Home.css';

const Home = () => {
    const [stats, setStats] = useState(null);
    const [donorCount, setDonorCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const [nextStats, nextDonorCount] = await Promise.all([
                    getStats(),
                    fetchDonorCount(),
                ]);
                if (!isMounted) return;
                setStats(nextStats);
                setDonorCount(nextDonorCount);
            } catch (err) {
                if (isMounted) {
                    setStats({ totalDonors: 0, totalRequests: 0, livesSaved: 0 });
                    setDonorCount(0);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        })();
        return () => { isMounted = false; };
    }, []);

    // We removed the full-page isLoading block so the UI loads instantly.
    // Child components (HeroSection, StatsBar, etc.) are already designed to handle null stats.

    return (
        <div className="home-page">
            <HeroSection stats={stats?.groupTotals ? stats : null} donorCount={donorCount || 0} />
            <StatsBar stats={stats?.groupTotals ? stats : null} />
            <WorkflowSection />
            <ServicesSection />
            <DonateSection />
            <TestimonialsSection />
            <ImpactBar stats={stats?.groupTotals ? stats : null} donorCount={donorCount || 0} />
            <CtaBanner />
        </div>
    );
};

export default Home;

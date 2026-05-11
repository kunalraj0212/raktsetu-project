import React, { useEffect, useState } from 'react';
import { fetchStats, fetchDonorCount } from '../services/bloodBankService';
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

    useEffect(() => {
        let isMounted = true;
        (async () => {
            const [nextStats, nextDonorCount] = await Promise.all([
                fetchStats(),
                fetchDonorCount(),
            ]);
            if (!isMounted) return;
            setStats(nextStats);
            setDonorCount(nextDonorCount);
        })();
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="home-page">
            <HeroSection stats={stats} donorCount={donorCount} />
            <StatsBar stats={stats} />
            <WorkflowSection />
            <ServicesSection />
            <DonateSection />
            <TestimonialsSection />
            <ImpactBar stats={stats} donorCount={donorCount} />
            <CtaBanner />
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { getStats, fetchDonorCount } from '../services/bloodBankService';
import HeroSection from '../components/Home/HeroSection';
import EmergencyCarousel from '../components/Home/EmergencyCarousel';
import StatsBar from '../components/Home/StatsBar';
import WorkflowSection from '../components/Home/WorkflowSection';
import ImpactStories from '../components/Home/ImpactStories';
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
            <HeroSection stats={stats?.groupTotals ? stats : null} />
            <EmergencyCarousel />
            <StatsBar stats={stats?.groupTotals ? stats : null} />
            <div data-aos="fade-up" data-aos-delay="100">
                <WorkflowSection />
            </div>
            <div data-aos="fade-up" data-aos-delay="150">
                <ImpactStories />
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
                <ServicesSection />
            </div>
            <div data-aos="fade-up" data-aos-delay="250">
                <DonateSection />
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
                <TestimonialsSection />
            </div>
            <ImpactBar stats={stats?.groupTotals ? stats : null} donorCount={donorCount || 0} />
            <CtaBanner />
        </div>
    );
};

export default Home;

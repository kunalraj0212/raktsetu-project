import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Features = lazy(() => import('./pages/Features'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const ForBloodBanks = lazy(() => import('./pages/ForBloodBanks'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const BloodAvailability = lazy(() => import('./pages/BloodAvailability'));
const DonorRegistration = lazy(() => import('./pages/DonorRegistration'));
const BloodBankRegistration = lazy(() => import('./pages/BloodBankRegistration'));
const Login = lazy(() => import('./pages/Login'));
const EmergencyRequest = lazy(() => import('./pages/EmergencyRequest'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Page loading fallback
const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: '0.75rem',
    color: '#8B0000'
  }}>
    <div style={{
      width: '24px',
      height: '24px',
      border: '3px solid #FDF2F2',
      borderTop: '3px solid #8B0000',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }}></div>
    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Loading...</span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="features" element={<Features />} />
                <Route path="how-it-works" element={<HowItWorks />} />
                <Route path="blood-banks" element={<ForBloodBanks />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="blood-availability" element={<BloodAvailability />} />
                <Route path="register-donor" element={<DonorRegistration />} />
                <Route path="register-bloodbank" element={<BloodBankRegistration />} />
                <Route path="login" element={<Login />} />
                <Route path="emergency" element={<ProtectedRoute><EmergencyRequest /></ProtectedRoute>} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

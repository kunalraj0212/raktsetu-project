import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft, XCircle, HeartPulse } from 'lucide-react';
import Button from './Button';

const questions = [
    {
        id: 1,
        question: "Are you between 18 and 65 years old?",
        description: "Donors must be in this age range for safety reasons.",
        passAnswer: "Yes",
        options: ["Yes", "No"]
    },
    {
        id: 2,
        question: "Do you weigh at least 45 kg?",
        description: "A minimum weight is required to safely donate standard blood volumes.",
        passAnswer: "Yes",
        options: ["Yes", "No"]
    },
    {
        id: 3,
        question: "Have you donated blood in the past 3 months?",
        description: "Your body needs time to fully replenish red blood cells.",
        passAnswer: "No",
        options: ["Yes", "No"]
    },
    {
        id: 4,
        question: "Have you had any major surgeries, tattoos, or piercings in the last 6 months?",
        description: "This prevents the potential transmission of blood-borne infections.",
        passAnswer: "No",
        options: ["Yes", "No"]
    }
];

const EligibilityChecker = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [status, setStatus] = useState('checking'); // 'checking', 'failed', 'passed'

    const handleAnswer = (answer) => {
        const currentQ = questions[currentStep];
        
        if (answer !== currentQ.passAnswer) {
            setStatus('failed');
            return;
        }

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setStatus('passed');
        }
    };

    const resetQuiz = () => {
        setCurrentStep(0);
        setStatus('checking');
    };

    if (status === 'passed') {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#F0FDF4', borderRadius: '16px', border: '1px solid #BBF7D0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#22C55E' }}>
                    <ShieldCheck size={64} />
                </div>
                <h2 style={{ color: '#166534', marginBottom: '0.5rem', fontSize: '1.75rem' }}>You're Eligible!</h2>
                <p style={{ color: '#15803D', marginBottom: '2rem' }}>Great news! Based on your answers, you are eligible to donate blood. Let's get you registered.</p>
                <Button variant="primary" onClick={onComplete} style={{ backgroundColor: '#16A34A', borderColor: '#16A34A' }}>
                    Continue to Registration <ArrowRight size={18} />
                </Button>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#FEF2F2', borderRadius: '16px', border: '1px solid #FECACA' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#EF4444' }}>
                    <XCircle size={64} />
                </div>
                <h2 style={{ color: '#991B1B', marginBottom: '0.5rem', fontSize: '1.75rem' }}>Not Eligible Currently</h2>
                <p style={{ color: '#B91C1C', marginBottom: '2rem' }}>For your safety and the safety of the patients, you are temporarily unable to donate blood based on your answers.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button variant="outline" onClick={resetQuiz}>
                        <ArrowLeft size={18} /> Retake Quiz
                    </Button>
                    <Button variant="primary" onClick={() => window.location.href = '/'}>
                        Return Home
                    </Button>
                </div>
            </div>
        );
    }

    const progress = ((currentStep) / questions.length) * 100;

    return (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)' }}>
                    <HeartPulse size={28} />
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--gray-900)' }}>Quick Eligibility Check</h3>
                </div>
                <span style={{ color: 'var(--gray-500)', fontSize: '0.875rem', fontWeight: 600 }}>
                    Question {currentStep + 1} of {questions.length}
                </span>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--gray-100)', borderRadius: '999px', marginBottom: '2.5rem', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--primary)', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
            </div>

            <div style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--gray-900)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {questions[currentStep].question}
                </h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                    {questions[currentStep].description}
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    {questions[currentStep].options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                border: '2px solid var(--gray-200)',
                                borderRadius: '12px',
                                backgroundColor: 'var(--white)',
                                color: 'var(--gray-700)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = 'var(--primary)';
                                e.currentTarget.style.color = 'var(--primary)';
                                e.currentTarget.style.backgroundColor = 'var(--primary-bg)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'var(--gray-200)';
                                e.currentTarget.style.color = 'var(--gray-700)';
                                e.currentTarget.style.backgroundColor = 'var(--white)';
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            
            {currentStep > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <button 
                        onClick={() => setCurrentStep(currentStep - 1)}
                        style={{ background: 'none', border: 'none', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
                    >
                        <ArrowLeft size={16} /> Previous Question
                    </button>
                </div>
            )}
        </div>
    );
};

export default EligibilityChecker;

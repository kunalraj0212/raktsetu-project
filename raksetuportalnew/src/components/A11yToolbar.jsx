import React, { useState, useEffect } from 'react';
import { Settings, Eye, Moon } from 'lucide-react';
import './A11yToolbar.css';

const A11yToolbar = () => {
    const [fontSize, setFontSize] = useState(100);
    const [isHighContrast, setIsHighContrast] = useState(false);

    useEffect(() => {
        // Apply font size
        document.documentElement.style.fontSize = `${fontSize}%`;
    }, [fontSize]);

    useEffect(() => {
        // Apply high contrast mode
        if (isHighContrast) {
            document.body.classList.add('high-contrast-mode');
        } else {
            document.body.classList.remove('high-contrast-mode');
        }
    }, [isHighContrast]);

    const changeFontSize = (step) => {
        setFontSize(prev => {
            if (step === 0) return 100;
            const newSize = prev + step;
            // Limit between 80% and 120%
            return Math.max(80, Math.min(120, newSize));
        });
    };

    return (
        <div className="a11y-toolbar">
            <div className="container a11y-inner">
                <div className="a11y-left">
                    <span className="a11y-label">Screen Reader Access</span>
                    <a href="#main-content" className="a11y-link skip-link">Skip to Main Content</a>
                </div>
                <div className="a11y-right">
                    <div className="font-resizers">
                        <button onClick={() => changeFontSize(-10)} aria-label="Decrease font size" title="Decrease font size">A-</button>
                        <button onClick={() => changeFontSize(0)} aria-label="Normal font size" title="Normal font size">A</button>
                        <button onClick={() => changeFontSize(10)} aria-label="Increase font size" title="Increase font size">A+</button>
                    </div>
                    <div className="a11y-divider"></div>
                    <button 
                        className="contrast-toggle" 
                        onClick={() => setIsHighContrast(!isHighContrast)}
                        aria-label="Toggle High Contrast"
                        title="Toggle High Contrast"
                    >
                        {isHighContrast ? <Eye size={14} /> : <Moon size={14} />}
                        <span>High Contrast</span>
                    </button>
                    <div className="a11y-divider"></div>
                    <select className="language-select" aria-label="Select Language">
                        <option value="en">English</option>
                        <option value="hi">हिन्दी</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default A11yToolbar;

import React from 'react';

const TestimonialsSection = () => {
    return (
        <section className="section testimonials-section">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-tag">Impact</span>
                    <h2 className="section-title">Lives We've Touched</h2>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="t-quote">"RaktaSetu found O- blood for my mother within 15 minutes during her surgery. This platform literally saved her life."</div>
                        <div className="t-author">
                            <div className="t-avatar">RP</div>
                            <div>
                                <strong>Rahul Patel</strong>
                                <span>Mumbai, Maharashtra</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="t-quote">"As a regular donor, I love how easy it is to schedule appointments and track my donation history. Wonderful initiative."</div>
                        <div className="t-author">
                            <div className="t-avatar">AS</div>
                            <div>
                                <strong>Ananya Sharma</strong>
                                <span>New Delhi</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="t-quote">"Our blood bank's efficiency improved 40% after joining RaktaSetu. The inventory management tools are exceptional."</div>
                        <div className="t-author">
                            <div className="t-avatar">DK</div>
                            <div>
                                <strong>Dr. Kumar</strong>
                                <span>Red Cross, Chennai</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;

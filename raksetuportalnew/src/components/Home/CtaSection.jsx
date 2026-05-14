import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

const CtaSection = () => {
  return (
    <section className="cta-banner">
      <div className="container cta-inner text-center">
        <h2>Ready to Make a Difference?</h2>
        <p>Join the RaktaSetu community today. Every donor is a hero.</p>
        <div className="cta-buttons">
          <Link to="/blood-availability">
            <Button variant="secondary">Find Blood</Button>
          </Link>
          <Link to="/register-donor">
            <Button variant="primary" className="btn-white-border">Register as Donor</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;


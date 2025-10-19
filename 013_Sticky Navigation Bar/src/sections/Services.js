import React from 'react';

const Services = () => {
  return (
    <section id="services" className="section services-section">
      <div style={{ padding: '100px 20px', minHeight: '100vh', backgroundColor: '#e9ecef' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Our Services</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            This is the services section. The navbar should be sticky now!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
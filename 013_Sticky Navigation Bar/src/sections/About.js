import React from 'react';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div style={{ padding: '100px 20px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>About Us</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            This is the about section. Scroll to see how the navbar sticks to the top!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
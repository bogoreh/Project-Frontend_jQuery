import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div style={{ padding: '100px 20px', minHeight: '100vh', backgroundColor: '#dee2e6' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Contact Us</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            This is the contact section. The sticky navbar makes navigation easy!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React from 'react';

const Home = () => {
  return (
    <section id="home" className="section home-section">
      <div style={{ padding: '100px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome Home</h1>
          <p style={{ fontSize: '1.2rem' }}>Scroll down to see the sticky navbar in action!</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
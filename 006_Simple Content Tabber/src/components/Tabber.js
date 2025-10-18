// src/components/Tabber.js
import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import './Tabber.css';

const Tabber = () => {
  const tabberRef = useRef(null);

  useEffect(() => {
    // Initialize tabs when component mounts
    const initializeTabs = () => {
      const $tabber = $(tabberRef.current);
      
      // Hide all content panes except the first one
      $tabber.find('.tab-content').hide();
      $tabber.find('.tab-content').first().show();
      
      // Add active class to first tab
      $tabber.find('.tab').first().addClass('active');
    };

    // Tab click handler
    const handleTabClick = (e) => {
      e.preventDefault();
      
      const $clickedTab = $(e.currentTarget);
      const $tabber = $clickedTab.closest('.tabber');
      const targetContent = $clickedTab.data('tab');
      
      // Remove active class from all tabs
      $tabber.find('.tab').removeClass('active');
      
      // Add active class to clicked tab
      $clickedTab.addClass('active');
      
      // Hide all content panes
      $tabber.find('.tab-content').hide();
      
      // Show the target content pane
      $tabber.find(`#${targetContent}`).show();
    };

    // Initialize tabs
    initializeTabs();

    // Add click event listeners to tabs
    const $tabs = $(tabberRef.current).find('.tab');
    $tabs.on('click', handleTabClick);

    // Cleanup function
    return () => {
      $tabs.off('click', handleTabClick);
    };
  }, []);

  return (
    <div className="tabber" ref={tabberRef}>
      <div className="tabs-container">
        <button className="tab" data-tab="content-home">
          Home
        </button>
        <button className="tab" data-tab="content-about">
          About
        </button>
        <button className="tab" data-tab="content-services">
          Services
        </button>
        <button className="tab" data-tab="content-contact">
          Contact
        </button>
      </div>

      <div className="content-container">
        <div id="content-home" className="tab-content">
          <h2>Home Content</h2>
          <p>Welcome to the home section! This is the main content area.</p>
          <ul>
            <li>Feature 1: Responsive design</li>
            <li>Feature 2: Easy navigation</li>
            <li>Feature 3: Clean interface</li>
          </ul>
        </div>

        <div id="content-about" className="tab-content">
          <h2>About Us</h2>
          <p>Learn more about our company and mission.</p>
          <div className="about-content">
            <p>We are a dedicated team of professionals committed to delivering excellence in everything we do.</p>
            <p>Our values include innovation, integrity, and customer satisfaction.</p>
          </div>
        </div>

        <div id="content-services" className="tab-content">
          <h2>Our Services</h2>
          <p>Discover the range of services we offer:</p>
          <div className="services-grid">
            <div className="service-item">
              <h3>Web Development</h3>
              <p>Custom web applications and sites</p>
            </div>
            <div className="service-item">
              <h3>Consulting</h3>
              <p>Expert advice and guidance</p>
            </div>
            <div className="service-item">
              <h3>Support</h3>
              <p>24/7 customer support</p>
            </div>
          </div>
        </div>

        <div id="content-contact" className="tab-content">
          <h2>Contact Information</h2>
          <p>Get in touch with us:</p>
          <div className="contact-info">
            <p><strong>Email:</strong> info@example.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Main St, City, State 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabber;
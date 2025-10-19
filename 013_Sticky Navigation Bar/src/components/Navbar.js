import React, { useEffect } from 'react';
import $ from 'jquery';
import './Navbar.css';

const Navbar = () => {
  useEffect(() => {
    // jQuery for sticky navbar
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 50) {
        $('.navbar').addClass('sticky');
      } else {
        $('.navbar').removeClass('sticky');
      }
    });

    // jQuery for smooth scrolling
    $('.nav-link').on('click', function(e) {
      if (this.hash !== '') {
        e.preventDefault();
        const hash = this.hash;
        $('html, body').animate(
          {
            scrollTop: $(hash).offset().top - 70,
          },
          800
        );
      }
    });

    // jQuery for mobile menu toggle
    $('.hamburger').on('click', function() {
      $('.nav-menu').toggleClass('active');
      $('.hamburger').toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').on('click', function() {
      $('.nav-menu').removeClass('active');
      $('.hamburger').removeClass('active');
    });

    // Cleanup function
    return () => {
      $(window).off('scroll');
      $('.nav-link').off('click');
      $('.hamburger').off('click');
    };
  }, []);

  // Update active link on scroll using jQuery
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = $(window).scrollTop() + 100;
      
      $('.section').each(function() {
        const sectionTop = $(this).offset().top;
        const sectionBottom = sectionTop + $(this).outerHeight();
        const sectionId = $(this).attr('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          $('.nav-link').removeClass('active');
          $(`.nav-link[href="#${sectionId}"]`).addClass('active');
        }
      });
    };

    $(window).on('scroll', handleScroll);
    
    return () => {
      $(window).off('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#home" className="logo">
          MySite
        </a>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link active">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#services" className="nav-link">
              Services
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        
        <div className="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
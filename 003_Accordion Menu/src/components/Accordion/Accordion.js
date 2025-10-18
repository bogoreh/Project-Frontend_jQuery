import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import AccordionItem from './AccordionItem';
import './Accordion.css';

const Accordion = ({ items, allowMultiple = false }) => {
  const accordionRef = useRef(null);

  useEffect(() => {
    // Initialize accordion with jQuery
    const $accordion = $(accordionRef.current);
    
    const handleAccordionClick = function() {
      const $this = $(this);
      const $content = $this.next('.accordion-content');
      
      if (!allowMultiple) {
        // Close other open items
        $('.accordion-header').not(this).removeClass('active');
        $('.accordion-content').not($content).slideUp(300);
      }
      
      // Toggle current item
      $this.toggleClass('active');
      $content.slideToggle(300);
    };

    // Attach click event handlers
    $accordion.find('.accordion-header').on('click', handleAccordionClick);

    // Cleanup function
    return () => {
      $accordion.find('.accordion-header').off('click', handleAccordionClick);
    };
  }, [allowMultiple]);

  return (
    <div className="accordion" ref={accordionRef}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={item.isOpen || false}
        />
      ))}
    </div>
  );
};

export default Accordion;
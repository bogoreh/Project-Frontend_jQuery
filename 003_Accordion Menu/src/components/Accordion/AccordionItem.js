import React from 'react';

const AccordionItem = ({ title, content, isOpen = false }) => {
  return (
    <div className="accordion-item">
      <div className={`accordion-header ${isOpen ? 'active' : ''}`}>
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">+</span>
      </div>
      <div 
        className="accordion-content" 
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="accordion-content-inner">
          {content}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
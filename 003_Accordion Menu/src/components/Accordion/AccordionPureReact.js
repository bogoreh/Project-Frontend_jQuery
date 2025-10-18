import React, { useState } from 'react';
import './Accordion.css';

const AccordionPureReact = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(item => item !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div 
            className={`accordion-header ${openItems.includes(index) ? 'active' : ''}`}
            onClick={() => toggleItem(index)}
          >
            <span className="accordion-title">{item.title}</span>
            <span className="accordion-icon">
              {openItems.includes(index) ? '−' : '+'}
            </span>
          </div>
          <div 
            className="accordion-content"
            style={{ 
              display: openItems.includes(index) ? 'block' : 'none'
            }}
          >
            <div className="accordion-content-inner">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionPureReact;
import React, { useState, useEffect, useRef } from 'react';
import FormField from './FormField';
import useJQuery from '../hooks/useJQuery';

const DynamicForm = () => {
  const [fields, setFields] = useState([
    { id: 'field-1', value: '', type: 'email' }
  ]);
  
  const formRef = useRef(null);
  const $ = useJQuery();

  // Initialize jQuery event delegation
  useEffect(() => {
    if (!$ || !formRef.current) return;

    const $form = $(formRef.current);

    // Event delegation for dynamically added elements
    $form.on('focus', '.form-field-input', function() {
      $(this).addClass('focused');
    });

    $form.on('blur', '.form-field-input', function() {
      $(this).removeClass('focused');
    });

    // Enhanced input validation using jQuery
    $form.on('input', '.form-field-input[type="email"]', function() {
      const $input = $(this);
      const isValid = $input[0].checkValidity();
      
      if ($input.val().trim() !== '') {
        $input.toggleClass('invalid', !isValid);
        $input.toggleClass('valid', isValid);
      } else {
        $input.removeClass('valid invalid');
      }
    });

    // Cleanup event handlers
    return () => {
      $form.off('focus blur input');
    };
  }, [$, formRef.current]);

  // Add new field
  const addField = () => {
    const newId = `field-${Date.now()}`;
    setFields(prev => [
      ...prev, 
      { id: newId, value: '', type: 'email' }
    ]);

    // Use jQuery to focus the new field after a brief delay
    if ($) {
      setTimeout(() => {
        $(`[data-field-id="${newId}"] .form-field-input`).focus();
      }, 50);
    }
  };

  // Remove field
  const removeField = (fieldId) => {
    if (fields.length > 1) {
      setFields(prev => prev.filter(field => field.id !== fieldId));
    }
  };

  // Handle field value change
  const handleFieldChange = (fieldId, value) => {
    setFields(prev => 
      prev.map(field => 
        field.id === fieldId ? { ...field, value } : field
      )
    );
  };

  // jQuery-enhanced form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ($) {
      const $form = $(formRef.current);
      const $inputs = $form.find('.form-field-input');
      
      // jQuery validation
      let isValid = true;
      $inputs.each(function() {
        if (!this.checkValidity()) {
          $(this).addClass('invalid');
          isValid = false;
        }
      });

      if (!isValid) {
        $form.find('.error-message').text('Please fix validation errors');
        return;
      }

      // Get all values using jQuery
      const values = $inputs.map(function() {
        return $(this).val();
      }).get();
      
      console.log('Form submitted with values:', values);
      alert(`Form submitted with ${values.length} email addresses!`);
    }
  };

  // jQuery DOM traversal example - Count valid fields
  const countValidFields = () => {
    if (!$ || !formRef.current) return 0;
    
    const $form = $(formRef.current);
    return $form.find('.form-field-input.valid').length;
  };

  return (
    <div className="dynamic-form-container">
      <h2>Dynamic Email Form Builder</h2>
      <p>Add multiple email addresses using the form below:</p>
      
      <form ref={formRef} onSubmit={handleSubmit} className="dynamic-form">
        <div className="form-fields-container">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              id={field.id}
              value={field.value}
              onChange={handleFieldChange}
              onRemove={removeField}
              isRemovable={fields.length > 1}
              placeholder={`Email address ${index + 1}`}
              type={field.type}
            />
          ))}
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={addField}
            className="add-field-btn"
          >
            + Add Another Email
          </button>
          
          <button 
            type="submit" 
            className="submit-btn"
          >
            Submit Form
          </button>
        </div>

        <div className="form-stats">
          <p>Total fields: {fields.length}</p>
          <p>Valid fields: {countValidFields()}</p>
        </div>

        <div className="error-message"></div>
      </form>
    </div>
  );
};

export default DynamicForm;
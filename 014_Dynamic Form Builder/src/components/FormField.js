import React from 'react';

const FormField = ({ 
  id, 
  value, 
  onChange, 
  onRemove, 
  isRemovable,
  placeholder = "Enter email address",
  type = "email"
}) => {
  return (
    <div className="form-field-group" data-field-id={id}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        className="form-field-input"
      />
      {isRemovable && (
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="remove-field-btn"
          aria-label="Remove field"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default FormField;
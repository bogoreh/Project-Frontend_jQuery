import React from 'react';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`form-field ${error && touched ? 'error' : ''} ${!error && touched ? 'success' : ''}`}
      />
      {error && touched && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};

export default InputField;
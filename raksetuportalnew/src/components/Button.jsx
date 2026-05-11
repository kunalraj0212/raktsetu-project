import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', onClick, className = '', type = 'button', disabled = false, ...rest }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

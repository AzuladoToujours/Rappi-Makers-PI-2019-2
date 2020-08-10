import React from 'react';
import './Button.css';

const Button = ({ text, className, type, handleClick }) => (
  <>
    {handleClick ? (
      <button type={type} className={`general-btn ${className}`} onClick={handleClick}>
        {text}
      </button>
    ) : (
      <button type={type} className={`general-btn ${className}`}>
        {text}
      </button>
    )}
  </>
);

export default Button;

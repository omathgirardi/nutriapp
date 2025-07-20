import React, { useId } from 'react';
import { colors } from '../styles/colors.js';

const Input = ({ label, error, className = '', id, ...props }) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  
  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium text-[${colors.gray[700]}] mb-1`}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={inputId}
        className={`w-full px-3 py-2 border border-[${colors.gray[300]}] rounded-lg focus:outline-none focus:ring-2 focus:ring-[${colors.primary[500]}] focus:border-transparent ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
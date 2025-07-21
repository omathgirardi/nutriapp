import React, { useId } from 'react';
import { colors } from '../styles/colors.js';

const Select = ({ label, options, error, className = '', children, id, ...props }) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  
  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={selectId}
          className={`block text-sm font-medium text-[${colors.gray[700]}] mb-1`}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={selectId}
        className={`w-full px-3 py-2 border border-[${colors.gray[300]}] rounded-lg focus:outline-none focus:ring-2 focus:ring-[${colors.primary[500]}] focus:border-transparent ${error ? 'border-red-500' : ''}`}
        {...props}
      >
        {options ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          children
        )}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;
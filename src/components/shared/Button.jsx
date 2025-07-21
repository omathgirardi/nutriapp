import React from 'react';
import { colors } from '../styles/colors.js';

const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: `bg-[${colors.primary[600]}] text-white hover:bg-[${colors.primary[700]}] focus:ring-[${colors.primary[500]}]`,
    secondary: `bg-[${colors.secondary[600]}] text-white hover:bg-[${colors.secondary[700]}] focus:ring-[${colors.secondary[500]}]`,
    outline: `border border-[${colors.gray[300]}] text-[${colors.gray[700]}] hover:bg-[${colors.gray[50]}] focus:ring-[${colors.primary[500]}]`,
    ghost: `text-[${colors.gray[700]}] hover:bg-[${colors.gray[100]}] focus:ring-[${colors.primary[500]}]`,
    danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 
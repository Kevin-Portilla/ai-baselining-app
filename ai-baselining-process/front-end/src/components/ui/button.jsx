import React from 'react';
import { cn } from '@/lib/utils';

export const Button = ({ children, onClick, variant = 'default', className = '' }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer';
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };
  
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
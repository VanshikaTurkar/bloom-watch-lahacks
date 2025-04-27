'use client';

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'solid';
}

export function Button({ className = '', variant = 'solid', ...props }: ButtonProps) {
  return (
    <button
      className={`
        px-6 py-3 rounded-full font-semibold transition-all
        ${variant === 'outline' 
          ? 'border-2 border-teal-500 text-teal-600 hover:bg-teal-100 hover:shadow-md' 
          : 'bg-gradient-to-r from-teal-400 to-blue-400 text-white hover:from-teal-500 hover:to-blue-500 hover:shadow-lg'}
        ${className}
      `}
      {...props}
    />
  );
}

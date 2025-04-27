'use client';

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`
        w-full px-5 py-3 rounded-full border-2 border-teal-300
        bg-white/70 backdrop-blur-md placeholder:text-gray-400
        focus:outline-none focus:ring-4 focus:ring-teal-300
        transition-all
        ${className}
      `}
      {...props}
    />
  );
}

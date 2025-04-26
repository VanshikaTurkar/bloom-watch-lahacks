'use client';

import React, { useState } from "react";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return <div className={`flex gap-2 p-2 bg-white/70 rounded-full shadow ${className}`}>{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  className?: string;
}

export function TabsTrigger({ value, children, activeTab, setActiveTab, className = '' }: TabsTriggerProps) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab?.(value)}
      className={`
        px-5 py-2 rounded-full font-semibold transition-all
        ${isActive 
          ? 'bg-gradient-to-r from-teal-400 to-blue-400 text-white shadow-md' 
          : 'text-teal-700 hover:bg-teal-100'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

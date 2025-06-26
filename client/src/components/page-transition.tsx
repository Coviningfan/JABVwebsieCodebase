import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function PageTransition({ children, isLoading = false }: PageTransitionProps) {
  return (
    <div className={`transition-all duration-500 ease-out ${
      isLoading 
        ? 'opacity-0 translate-y-4' 
        : 'opacity-100 translate-y-0'
    }`}>
      {children}
    </div>
  );
}
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function PageTransition({ children, isLoading = false }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Stagger the animations
      const timer1 = setTimeout(() => setShowContent(true), 100);
      const timer2 = setTimeout(() => setIsVisible(true), 200);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setIsVisible(false);
      setShowContent(false);
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen">
      {/* Sliding overlay for page transitions */}
      <div className={`fixed inset-0 z-50 bg-gradient-to-br from-black via-neutral-900 to-black transform transition-transform duration-700 ease-in-out ${
        isVisible ? 'translate-x-full' : 'translate-x-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent" />
        
        {/* Loading indicator on transition overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
            <div className="text-white text-lg font-semibold">Loading...</div>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className={`transition-all duration-700 ease-out ${
        showContent && isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}>
        {children}
      </div>
    </div>
  );
}
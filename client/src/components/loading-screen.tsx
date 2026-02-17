import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setFadeOut(false);

      const showTimer = setTimeout(() => {
        setShowLogo(true);
      }, 50);

      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 800);

      const completeTimer = setTimeout(() => {
        onComplete?.();
      }, 1400);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(fadeTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative z-10 text-center">
        <div className={`transition-all duration-500 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h1 className="text-6xl md:text-8xl font-bold">
            <span className="text-white">JABV</span>
            <span style={{ color: '#C82222' }}>Labs</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

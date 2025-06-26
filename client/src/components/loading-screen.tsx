import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setShowLogo(false);
      
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowLogo(true);
              setTimeout(() => {
                onComplete?.();
              }, 800);
            }, 200);
            return 100;
          }
          return prev + Math.random() * 15 + 5; // Variable progress speed
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Logo animation */}
        <div className={`transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="text-white">JABV</span>
            <span style={{ color: '#C82222' }}>Labs</span>
          </h1>
        </div>

        {/* Loading bar */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-gray-400 text-sm animate-pulse">
          {progress < 30 && "Initializing..."}
          {progress >= 30 && progress < 60 && "Loading components..."}
          {progress >= 60 && progress < 90 && "Preparing experience..."}
          {progress >= 90 && "Almost ready..."}
        </div>

        {/* Loading percentage */}
        <div className="text-white text-lg font-semibold mt-2">
          {Math.floor(Math.min(progress, 100))}%
        </div>
      </div>

      {/* Overlay for fade out */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-800 ${showLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
    </div>
  );
}
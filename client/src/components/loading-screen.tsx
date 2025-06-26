import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [showProgress, setShowProgress] = useState(true);

  const loadingSteps = [
    { text: 'Initializing...', duration: 500 },
    { text: 'Loading assets...', duration: 600 },
    { text: 'Preparing interface...', duration: 500 },
    { text: 'Almost ready...', duration: 450 },
    { text: 'Welcome to JABV Labs', duration: 450 }
  ];

  useEffect(() => {
    if (!isLoading) return;

    let currentStep = 0;
    let currentProgress = 0;
    
    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        
        const targetProgress = ((currentStep + 1) / loadingSteps.length) * 100;
        const progressIncrement = (targetProgress - currentProgress) / (step.duration / 50);
        
        const progressInterval = setInterval(() => {
          currentProgress += progressIncrement;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            currentStep++;
            
            if (currentStep < loadingSteps.length) {
              setTimeout(updateProgress, 100);
            } else {
              // Loading complete
              setTimeout(() => {
                setShowProgress(false);
                setTimeout(() => {
                  onComplete?.();
                }, 300);
              }, 400);
            }
          }
        }, 50);
      }
    };

    updateProgress();
  }, [isLoading, onComplete]);

  if (!isLoading && !showProgress) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
      !showProgress ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Background Animation */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`loading-particle-${i}`}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {/* JABV Labs Logo/Text */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">JABV</span>
            <span className="text-red-500 ml-2">Labs</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="text-right mt-2">
            <span className="text-red-400 text-sm font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-gray-300 text-lg font-medium animate-pulse">
          {loadingText}
        </div>

        {/* Subtle dots animation */}
        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
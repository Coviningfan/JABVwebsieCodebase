interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
  lines?: number;
}

export function SkeletonLoader({ 
  className = '', 
  variant = 'rectangular',
  width = '100%',
  height = '20px',
  lines = 1
}: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-[length:200%_100%]';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'rounded h-4';
      case 'circular':
        return 'rounded-full aspect-square';
      case 'rectangular':
        return 'rounded';
      case 'card':
        return 'rounded-xl';
      default:
        return 'rounded';
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              width: i === lines - 1 ? '80%' : width,
              height: height
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={{ width, height }}
    />
  );
}
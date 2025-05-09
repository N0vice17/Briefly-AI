import React from 'react';

const LoadingDots = () => {
  return (
    <div className="flex space-x-1 items-center p-4">
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
    </div>
  );
};

export default LoadingDots;
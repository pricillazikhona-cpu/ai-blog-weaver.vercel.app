
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-center animate-fade-in">
      <p><strong>Error:</strong> {message}</p>
    </div>
  );
};

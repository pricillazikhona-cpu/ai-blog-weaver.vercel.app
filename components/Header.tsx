
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        AI Blog Weaver
      </h1>
      <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
        Turn your ideas into stunning blog posts in seconds. Just provide a topic, and let our AI handle the rest.
      </p>
    </header>
  );
};

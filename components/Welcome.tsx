
import React from 'react';

const BulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-300/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

export const Welcome: React.FC = () => {
  return (
    <div className="text-center max-w-2xl mx-auto mt-16 p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl ring-1 ring-white/10">
      <div className="flex justify-center mb-6">
        <BulbIcon />
      </div>
      <h2 className="text-2xl font-semibold text-gray-100">Your Next Blog Post Awaits</h2>
      <p className="mt-2 text-gray-400">
        Enter a topic above to let our AI writer craft a unique article complete with a stunning hero image.
        From tech trends to travel diaries, the possibilities are endless.
      </p>
    </div>
  );
};

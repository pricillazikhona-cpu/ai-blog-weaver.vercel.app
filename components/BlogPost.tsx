import React from 'react';
import type { BlogPostData } from '../types';

interface BlogPostProps {
  data: BlogPostData;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

export const BlogPost: React.FC<BlogPostProps> = ({ data }) => {
    const sanitizeFileName = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    const handleDownloadText = () => {
        if (!data) return;
        const textContent = `${data.title}\n\n${data.content}`;
        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const fileName = `${sanitizeFileName(data.title) || 'blog-post'}.txt`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleDownloadImage = () => {
        if (!data) return;
        const link = document.createElement('a');
        link.href = data.imageUrl;
        const fileName = `${sanitizeFileName(data.title) || 'blog-image'}.jpeg`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


  return (
    <article className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 animate-fade-in">
      <img
        src={data.imageUrl}
        alt={data.title}
        className="w-full h-64 sm:h-80 md:h-96 object-cover"
      />
      <div className="p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 leading-tight">
          {data.title}
        </h1>
        
        <div className="mt-6 border-b border-white/10 pb-6 flex flex-wrap gap-4">
            <button
                onClick={handleDownloadText}
                className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200"
                aria-label="Download blog post as a text file"
            >
                <DownloadIcon />
                Save Article (.txt)
            </button>
            <button
                onClick={handleDownloadImage}
                className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200"
                aria-label="Download hero image"
            >
                <DownloadIcon />
                Download Image
            </button>
        </div>

        <div className="mt-6 prose prose-invert prose-lg max-w-none text-gray-300">
          {data.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

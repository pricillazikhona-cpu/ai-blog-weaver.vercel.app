
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TopicInputForm, FormState } from './components/TopicInputForm';
import { BlogPost } from './components/BlogPost';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Welcome } from './components/Welcome';
import type { BlogPostData } from './types';
import { generateBlogPostContent, generateBlogImage } from './services/geminiService';
import { Type } from "@google/genai";

const App: React.FC = () => {
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (formData: FormState) => {
    const { topic, audience, articleType, goals, technicalLevel, budget, budgetAreas, aiEngine } = formData;
    if (!topic) {
      setError("Please enter a topic.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setBlogPost(null);

    try {
      const blogContentPromise = generateBlogPostContent(topic, audience, articleType, goals, technicalLevel, budget, budgetAreas, aiEngine);
      const blogImagePromise = generateBlogImage(topic, audience, articleType, goals, technicalLevel, budget, budgetAreas, aiEngine);

      const [contentResponse, imageResponse] = await Promise.all([blogContentPromise, blogImagePromise]);
      
      let blogContent: { title: string; content: string; };
      try {
        const jsonText = contentResponse.text.trim();
        blogContent = JSON.parse(jsonText);
      } catch (e) {
         throw new Error("Failed to parse blog content from AI response.");
      }

      const imageUrl = `data:image/jpeg;base64,${imageResponse.generatedImages[0].image.imageBytes}`;
      
      setBlogPost({
        title: blogContent.title,
        content: blogContent.content,
        imageUrl: imageUrl,
      });

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please check the console.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-purple-500 selection:text-white">
      <div className="relative isolate min-h-screen overflow-hidden bg-gray-900">
          <svg className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
            <defs>
              <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
              <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth="0" />
            </svg>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
          </svg>
        <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Header />
          <main className="mt-12">
            <TopicInputForm onSubmit={handleGenerate} isLoading={isLoading} />
            
            {error && <ErrorDisplay message={error} />}

            <div className="mt-12">
              {isLoading && <Loader />}
              {blogPost && !isLoading && <BlogPost data={blogPost} />}
              {!blogPost && !isLoading && <Welcome />}
            </div>
          </main>
          <footer className="text-center text-gray-500 mt-12 pb-4">
            <p>Created by Zikhona Bam</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;

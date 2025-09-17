
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getEngineStylePrompt = (engine: string): string => {
    switch (engine) {
        case 'Narrato Style':
            return 'Emulate the style of Narrato.io, focusing on creating a well-optimized, SEO-friendly article from scratch. Incorporate content ideas and structure it like a professional content brief or template. The tone should be authoritative and comprehensive.';
        case 'Gravity Write Style':
            return 'Emulate the style of GravityWrite.com, generating a concise, highly SEO-friendly blog post quickly. The structure should be clear and easy to read, with well-defined sections. The content should be suitable for a global audience and easily translatable.';
        default:
            return ''; // Default "Blog Weaver" style
    }
}

const getEngineImageStylePrompt = (engine: string): string => {
     switch (engine) {
        case 'Narrato Style':
            return 'The image should look like a professional, optimized stock photo suitable for a content template.';
        case 'Gravity Write Style':
            return 'The image should have a customizable and versatile feel, suitable for a wide range of international blogs.';
        default:
            return 'High quality, cinematic, suitable for a tech or business blog.';
    }
}


export async function generateBlogPostContent(
    topic: string, 
    audience: string, 
    articleType: string, 
    goals: string[], 
    technicalLevel: string,
    budget: string,
    budgetAreas: string[],
    aiEngine: string
): Promise<GenerateContentResponse> {
  const goalsText = goals.length > 0 ? `The primary goals of this article are to: ${goals.join(', ')}.` : '';
  const budgetText = budgetAreas.length > 0
      ? `The article should be written considering a "${budget}" budget, with a focus on these areas: ${budgetAreas.join(', ')}.`
      : `The article should be written considering a "${budget}" budget.`;
  const engineStyleText = getEngineStylePrompt(aiEngine);

  const prompt = `Generate a compelling and well-structured blog post about "${topic}".
${engineStyleText}
The post should be a "${articleType}".
${audience ? `The post should be tailored for an audience of "${audience}".` : ''}
The technical complexity should be at an "${technicalLevel}" level.
${goalsText}
${budgetText}
The post should have a clear title, an introduction, several body paragraphs, and a conclusion. Format the output as a single, clean JSON object with "title" and "content" keys. The content should be a single string with paragraphs separated by double newline characters (\\n\\n).`;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "The catchy title of the blog post."
          },
          content: {
            type: Type.STRING,
            description: "The full content of the blog post, with paragraphs separated by double newlines."
          }
        },
        required: ["title", "content"]
      },
      temperature: 0.7,
      topP: 0.95,
    }
  });

  return response;
}

export async function generateBlogImage(
    topic: string, 
    audience: string,
    articleType: string,
    goals: string[],
    technicalLevel: string,
    budget: string,
    budgetAreas: string[],
    aiEngine: string
) {
  const budgetPrompt = budgetAreas.length > 0
        ? `The image's aesthetic should align with a "${budget}" budget, and be relevant to ${budgetAreas.join(', ')}.`
        : `The image's aesthetic should align with a "${budget}" budget.`;
  const engineImageStylePrompt = getEngineImageStylePrompt(aiEngine);

  const prompt = `A professional and visually appealing blog post hero image representing the concept of "${topic}" as a "${articleType}". 
${audience ? `The image should be suitable for an audience of "${audience}".` : ''}
The style should reflect a "${technicalLevel}" technical level.
${goals.includes('Engage') ? 'The image should be engaging and dynamic.' : 'The image should be informative and clean.'}
${budgetPrompt}
${engineImageStylePrompt} Avoid text and logos.`;
  
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '16:9',
    },
  });

  return response;
}

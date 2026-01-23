import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../types";

// Lazy initialization to prevent app crash when API key is missing
let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI | null => {
  if (ai) return ai;
  
  // Try different env var patterns for different bundlers
  const apiKey = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY)
    || (typeof process !== 'undefined' && process.env?.API_KEY)
    || null;
  
  if (!apiKey) {
    console.warn("Gemini API key not configured. AI features will use fallback responses.");
    return null;
  }
  
  try {
    ai = new GoogleGenAI({ apiKey });
    return ai;
  } catch (e) {
    console.warn("Failed to initialize Gemini:", e);
    return null;
  }
};

export const getMovieRecommendations = async (genres: string[], lang: Language = 'es-AR') => {
  const client = getAI();
  if (!client) {
    // Return demo data when API is not available
    return [
      { title: "Película de ejemplo 1", description: "Una historia épica", imageUrl: "movie1" },
      { title: "Película de ejemplo 2", description: "Drama intenso", imageUrl: "movie2" },
    ];
  }
  
  const languageName = lang === 'es-AR' ? 'Español rioplatense de Argentina (voseo)' : 'English';
  
  try {
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Based on these favorite genres: ${genres.join(', ')}, suggest 3 current or upcoming movies people would want to see together in theaters. Respond in ${languageName}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              imageUrl: { type: Type.STRING, description: 'A relevant search keyword for the movie' }
            },
            required: ['title', 'description', 'imageUrl']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini recommendation error:", error);
    return [];
  }
};

export const getIcebreaker = async (userGenres: string[], matchGenres: string[], lang: Language = 'es-AR') => {
  const client = getAI();
  const fallback = lang === 'es-AR' ? "¡Hola! ¿Sale peli?" : "Hey! Ready for a movie?";
  
  if (!client) return fallback;
  
  const context = lang === 'es-AR' 
    ? 'Use Argentine Spanish (voseo, amigable, sin ser cursi).' 
    : 'Use friendly, natural conversational English.';

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Generate a creative cinema-themed icebreaker for two people who like ${userGenres.filter(g => matchGenres.includes(g)).join(', ') || 'movies'}. One likes ${userGenres.join(', ')} and the other likes ${matchGenres.join(', ')}. ${context} Keep it short.`,
    });
    return response.text || fallback;
  } catch (error) {
    return fallback;
  }
};

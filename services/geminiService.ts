
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMovieRecommendations = async (genres: string[], lang: Language = 'es-AR') => {
  const languageName = lang === 'es-AR' ? 'Español rioplatense de Argentina (voseo)' : 'English';
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
  const context = lang === 'es-AR' 
    ? 'Use Argentine Spanish (voseo, amigable, sin ser cursi).' 
    : 'Use friendly, natural conversational English.';

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a creative cinema-themed icebreaker for two people who like ${userGenres.filter(g => matchGenres.includes(g)).join(', ') || 'movies'}. One likes ${userGenres.join(', ')} and the other likes ${matchGenres.join(', ')}. ${context} Keep it short.`,
    });
    return response.text || (lang === 'es-AR' ? "¡Hola! ¿Sale peli?" : "Hey! Ready for a movie?");
  } catch (error) {
    return lang === 'es-AR' ? "¡Hola! ¿Sale peli?" : "Hey! Ready for a movie?";
  }
};

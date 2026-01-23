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

export const getIcebreaker = async (userProfile: any, matchProfile: any, lang: Language = 'es-AR') => {
    const client = getAI();
    const fallback = lang === 'es-AR' ? "¡Hola! ¿Sale peli?" : "Hey! Ready for a movie?";

    if (!client) return fallback;

    const context = lang === 'es-AR'
        ? 'Use Argentine Spanish (voseo, amigable, con personalidad, sin ser cursi).'
        : 'Use friendly, witty, personalized conversational English.';

    try {
        const response = await client.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Generate a creative cinema-themed icebreaker for two people:
      User 1: Genres [${userProfile.favoriteGenres.join(', ')}], Bio: ${userProfile.bio}
      User 2: Genres [${matchProfile.favoriteGenres.join(', ')}], Bio: ${matchProfile.bio}
      ${context} Keep it short and engaging. Do not use generic movie references unless they match their specific tastes.`,
        });
        return response.text || fallback;
    } catch (error) {
        return fallback;
    }
};

export const getCollaborativeRecommendation = async (userA: any, userB: any, lang: Language = 'es-AR') => {
    const client = getAI();
    if (!client) {
        return {
            title: "Cine Especial",
            reason: "¡Parece que ambos tienen gustos excelentes!"
        };
    }

    const languageName = lang === 'es-AR' ? 'Español rioplatense de Argentina' : 'English';

    try {
        const response = await client.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Find one perfect movie for a 'movie night' date between these two people:
      User A: ${userA.favoriteGenres.join(', ')} - ${userA.bio}
      User B: ${userB.favoriteGenres.join(', ')} - ${userB.bio}
      Respond in ${languageName}. Return a JSON object with: 
      { "title": "Movie Title", "reason": "A witty explanation of why this movie fits both their specific tastes" }`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        reason: { type: Type.STRING }
                    },
                    required: ['title', 'reason']
                }
            }
        });
        return JSON.parse(response.text || '{}');
    } catch (error) {
        console.error("Gemini collaborative error:", error);
        return null;
    }
};

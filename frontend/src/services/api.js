import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

export const getMovieRecommendations = async (genres, language = 'es-AR') => {
  try {
    const response = await axios.post(`${API_URL}/api/recommendations`, {
      genres,
      language
    });
    return response.data;
  } catch (error) {
    console.error('Recommendation error:', error);
    return [
      { title: 'Dune: Part Two', description: 'La épica saga de ciencia ficción continúa', imageUrl: 'dune' },
      { title: 'Oppenheimer', description: 'El drama histórico de Christopher Nolan', imageUrl: 'oppenheimer' },
      { title: 'Poor Things', description: 'Una comedia oscura y fantástica', imageUrl: 'fantasy' }
    ];
  }
};

export const getIcebreaker = async (userGenres, matchGenres, language = 'es-AR') => {
  try {
    const response = await axios.post(`${API_URL}/api/icebreaker`, {
      userGenres,
      matchGenres,
      language
    });
    return response.data.icebreaker;
  } catch (error) {
    console.error('Icebreaker error:', error);
    return language === 'es-AR' ? '¡Hola! ¿Sale peli?' : 'Hey! Ready for a movie?';
  }
};

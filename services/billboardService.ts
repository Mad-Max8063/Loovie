import { Movie } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8001';

export async function fetchBillboard(): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_BASE}/api/billboard`);
    if (!response.ok) {
      throw new Error(`Billboard API error: ${response.status}`);
    }
    const data: Movie[] = await response.json();
    console.log(`🎬 Loovie: Billboard loaded - ${data.length} movies from TMDB`);
    return data;
  } catch (error) {
    console.warn('🎬 Loovie: Failed to fetch billboard, using static fallback:', error);
    // Fallback to static data if API is down
    const { BILLBOARD } = await import('../constants');
    return BILLBOARD;
  }
}

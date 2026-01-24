
export enum IntentMode {
  SOCIAL = 'Social',
  FRIENDSHIP = 'Amistad',
  DEEP_TALK = 'Charla Cinéfila'
}

export type Language = 'es-AR' | 'en-US';

export interface UserProfile {
  id: string;
  displayName: string;
  photoUrl: string;
  age: number;
  bio: string;
  favoriteGenres: string[];
  availability: string[];
  intentMode: IntentMode;
  likes?: string[];
  location?: { lat: number; lng: number };
  city?: string;
  isVerified?: boolean;
  isVisible?: boolean;
  watchlist?: string[]; // IDs of movies from the Billboard
}

export interface Match {
  id: string;
  users: [string, string];
  timestamp: number;
  lastMessage?: string;
  matchedMovieId?: string; // Optional: ID of the movie that triggered the match
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  genres: string[];
  releaseDate: string;
  isPremiere?: boolean;
}

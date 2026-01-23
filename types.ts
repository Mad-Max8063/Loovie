
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
  isVerified?: boolean;
}

export interface Match {
  id: string;
  users: [string, string];
  timestamp: number;
  lastMessage?: string;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Movie {
  title: string;
  genre: string[];
  description: string;
  rating: number;
  imageUrl: string;
}

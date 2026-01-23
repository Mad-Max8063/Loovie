import { UserProfile } from '../types';

/**
 * Calculates compatibility score between two users based on multiple factors.
 * Returns a score between 0 and 100.
 */
export const calculateCompatibility = (currentUser: UserProfile, potentialMatch: UserProfile): number => {
  let score = 0;
  
  // Genre overlap (max 50 points)
  const sharedGenres = currentUser.favoriteGenres.filter(
    genre => potentialMatch.favoriteGenres.includes(genre)
  );
  const genreScore = Math.min((sharedGenres.length / 3) * 50, 50);
  score += genreScore;
  
  // Intent mode compatibility (max 30 points)
  if (currentUser.intentMode === potentialMatch.intentMode) {
    score += 30;
  } else {
    score += 10;
  }
  
  // Availability overlap (max 20 points)
  const sharedAvailability = currentUser.availability.filter(
    slot => potentialMatch.availability.includes(slot)
  );
  if (sharedAvailability.length > 0) {
    score += Math.min(sharedAvailability.length * 10, 20);
  }
  
  return Math.round(score);
};

/**
 * Determines if two users should match based on compatibility threshold.
 */
export const shouldMatch = (currentUser: UserProfile, potentialMatch: UserProfile): boolean => {
  const compatibility = calculateCompatibility(currentUser, potentialMatch);
  
  let matchProbability: number;
  if (compatibility >= 70) {
    matchProbability = 0.8;
  } else if (compatibility >= 40) {
    matchProbability = 0.4;
  } else {
    matchProbability = 0.1;
  }
  
  return Math.random() < matchProbability;
};

export const getSharedInterests = (user1: UserProfile, user2: UserProfile): string[] => {
  return user1.favoriteGenres.filter(genre => user2.favoriteGenres.includes(genre));
};

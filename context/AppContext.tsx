import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserProfile, Match, Message, Language, IntentMode } from '../types';
import { MOCK_USERS } from '../constants';
import { translations } from '../translations';
import { shouldMatch } from '../services/matchingService';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from '../services/firebase';

interface AppContextType {
  currentUser: UserProfile | null;
  potentials: UserProfile[];
  likes: Set<string>;
  matches: Match[];
  messages: Message[];
  language: Language;
  isUserVerified: boolean;
  t: (key: keyof typeof translations['es-AR']) => string;
  setLanguage: (lang: Language) => void;
  setUserVerified: (status: boolean) => void;
  addLike: (id: string) => void;
  removePotential: (id: string) => void;
  sendMessage: (matchId: string, text: string) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isDemoMode: boolean;
  setDemoMode: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [potentials, setPotentials] = useState<UserProfile[]>(MOCK_USERS);
  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState<Language>('es-AR');
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser({
          id: firebaseUser.uid,
          displayName: firebaseUser.displayName || 'Cinéfilo',
          photoUrl: firebaseUser.photoURL || 'https://images.unsplash.com/photo-153571501000f-103f12a1464e?q=80&w=200&h=200&auto=format&fit=crop',
          age: 25, // Mock age as Firebase doesn't provide it
          bio: 'Nuevo en CineMatch. ¡Listo para la función!',
          favoriteGenres: [],
          availability: [],
          intentMode: IntentMode.FRIENDSHIP
        });
        setIsDemoMode(false);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setDemoMode(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const setDemoMode = (val: boolean) => {
    setIsDemoMode(val);
    if (val) {
      // Set a mock user for demo
      setCurrentUser({
        id: 'demo-user',
        displayName: 'Cinéfilo Demo',
        photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=600&auto=format&fit=crop',
        age: 27,
        bio: 'Probando la app. ¡Me encanta el cine nacional!',
        favoriteGenres: ['Ciencia Ficción', 'Cine Independiente'],
        availability: ['Fines de semana'],
        intentMode: IntentMode.DEEP_TALK
      });
    }
  };

  const t = (key: keyof typeof translations['es-AR']): string => {
    return translations[language][key] || translations['es-AR'][key];
  };

  const removePotential = useCallback((id: string) => {
    setPotentials(prev => prev.filter(u => u.id !== id));
  }, []);

  const setUserVerified = (status: boolean) => {
    setIsUserVerified(status);
  };

  const addLike = useCallback((id: string) => {
    setLikes(prev => new Set(prev).add(id));
    
    if (!currentUser) return;

    const matchedUser = MOCK_USERS.find(u => u.id === id);
    if (matchedUser && shouldMatch(currentUser, matchedUser)) {
      setMatches(prev => [...prev, {
        id: `m-${Date.now()}-${id}`, 
        users: [currentUser.id, id],
        timestamp: Date.now()
      }]);
    }
    removePotential(id);
  }, [currentUser, removePotential]);

  const sendMessage = useCallback((matchId: string, text: string) => {
    if (!currentUser) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`, 
      matchId,
      senderId: currentUser.id,
      text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, lastMessage: text } : m));
  }, [currentUser]);

  return (
    <AppContext.Provider value={{ 
      currentUser, potentials, likes, matches, messages, 
      language, t, setLanguage, isUserVerified, setUserVerified,
      addLike, removePotential, sendMessage, login, logout, 
      isDemoMode, setDemoMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

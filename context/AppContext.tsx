import React, { createContext, useContext, useState, useCallback } from 'react';
import { UserProfile, Match, Message, Language } from '../types';
import { CURRENT_USER, MOCK_USERS } from '../constants';
import { translations } from '../translations';
import { shouldMatch } from '../services/matchingService';

interface AppContextType {
  currentUser: UserProfile;
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser] = useState<UserProfile>(CURRENT_USER);
  const [potentials, setPotentials] = useState<UserProfile[]>(MOCK_USERS);
  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState<Language>('es-AR');
  const [isUserVerified, setIsUserVerified] = useState(false);

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
    
    // Smart matching based on compatibility - FIXED: define matchedUser BEFORE using it
    const matchedUser = MOCK_USERS.find(u => u.id === id);
    if (matchedUser && shouldMatch(currentUser, matchedUser)) {
      setMatches(prev => [...prev, {
        id: `m-${Date.now()}`,
        users: [currentUser.id, id],
        timestamp: Date.now()
      }]);
    }
    removePotential(id);
  }, [currentUser, removePotential]);

  const sendMessage = useCallback((matchId: string, text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      matchId,
      senderId: currentUser.id,
      text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, lastMessage: text } : m));
  }, [currentUser.id]);

  return (
    <AppContext.Provider value={{ 
      currentUser, potentials, likes, matches, messages, 
      language, t, setLanguage, isUserVerified, setUserVerified,
      addLike, removePotential, sendMessage 
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

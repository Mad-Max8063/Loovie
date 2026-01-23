import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserProfile, Match, Message, Language, IntentMode } from '../types';
import { MOCK_USERS } from '../constants';
import { translations } from '../translations';
import { shouldMatch } from '../services/matchingService';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../services/firebase';
import * as dbService from '../services/dbService';
import * as chatService from '../services/chatService';

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
  login: (method?: 'google' | 'email', email?: string, password?: string, isSignup?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isDemoMode: boolean;
  setDemoMode: (val: boolean) => void;
  needsProfileSetup: boolean;
  setActiveChatId: (id: string | null) => void;
  refreshProfile: () => Promise<void>;
  isPremium: boolean;
  setIsPremium: (val: boolean) => void;
  swipesRemaining: number;
  decrementSwipes: () => void;
  activeSponsor: { name: string, logo?: string } | null;
  handleApplyPromo: (months: number) => void;
  initiatePayment: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [potentials, setPotentials] = useState<UserProfile[]>([]);
  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('es-AR');
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false);

  const [isPremium, setIsPremium] = useState(false);
  const [swipesRemaining, setSwipesRemaining] = useState(10);
  const [activeSponsor, setActiveSponsor] = useState<{ name: string, logo?: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await dbService.getUser(firebaseUser.uid);
        if (profile) {
          setCurrentUser(profile);
          setNeedsProfileSetup(false);
          const unsubMatches = dbService.subscribeToMatches(firebaseUser.uid, (newMatches) => {
            setMatches(newMatches);
          });
          return () => unsubMatches();
        } else {
          setCurrentUser({
            id: firebaseUser.uid,
            displayName: firebaseUser.displayName || 'Cinéfilo',
            photoUrl: firebaseUser.photoURL || 'https://images.unsplash.com/photo-153571501000f-103f12a1464e?q=80&w=200&h=200&auto=format&fit=crop',
            age: 0,
            bio: '',
            favoriteGenres: [],
            availability: [],
            intentMode: IntentMode.FRIENDSHIP
          });
          setNeedsProfileSetup(true);
        }
        setIsDemoMode(false);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPotentials = async () => {
      if (currentUser && !isDemoMode) {
        const users = await dbService.getAllUsers(currentUser.id);
        setPotentials(users);
      } else if (isDemoMode) {
        setPotentials(MOCK_USERS);
      }
    };
    fetchPotentials();
  }, [currentUser, isDemoMode]);

  useEffect(() => {
    setActiveSponsor({ name: 'Movistar Cine' });
  }, []);

  const refreshProfile = async () => {
    if (currentUser?.id) {
      const profile = await dbService.getUser(currentUser.id);
      if (profile) setCurrentUser(profile);
    }
  };

  const login = async (method: 'google' | 'email' = 'google', email?: string, password?: string, isSignup?: boolean) => {
    try {
      if (method === 'google') {
        await signInWithPopup(auth, googleProvider);
      } else if (method === 'email' && email && password) {
        if (isSignup) {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
          await signInWithEmailAndPassword(auth, email, password);
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
      throw error;
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
      setPotentials(MOCK_USERS);
      setSwipesRemaining(10);
    }
  };

  const handleApplyPromo = (months: number) => {
    setIsPremium(true);
    setSwipesRemaining(999);
  };

  const initiatePayment = () => {
    const PAYMENT_URL = "https://mpago.la/example-loovie-premium";
    window.open(PAYMENT_URL, '_blank');
  };

  const decrementSwipes = useCallback(() => {
    if (swipesRemaining > 0 && !isPremium) {
      setSwipesRemaining(prev => prev - 1);
    }
  }, [swipesRemaining, isPremium]);

  const t = (key: keyof typeof translations['es-AR']): string => {
    return translations[language][key] || translations['es-AR'][key];
  };

  const removePotential = useCallback((id: string) => {
    setPotentials(prev => prev.filter(u => u.id !== id));
  }, []);

  const setUserVerified = (status: boolean) => {
    setIsUserVerified(status);
  };

  const addLike = useCallback(async (id: string) => {
    setLikes(prev => new Set(prev).add(id));
    if (!currentUser) return;

    if (!isDemoMode) {
      await dbService.addLike(currentUser.id, id);
    } else {
      const matchedUser = MOCK_USERS.find(u => u.id === id);
      if (matchedUser && shouldMatch(currentUser, matchedUser)) {
        setMatches(prev => [...prev, {
          id: `m-${Date.now()}-${id}`,
          users: [currentUser.id, id],
          timestamp: Date.now()
        }]);
      }
    }
    removePotential(id);
  }, [currentUser, removePotential, isDemoMode]);

  const sendMessage = useCallback(async (matchId: string, text: string) => {
    if (!currentUser) return;
    if (isDemoMode) {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        matchId,
        senderId: currentUser.id,
        text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, newMessage]);
      setMatches(prev => prev.map(m => m.id === matchId ? { ...m, lastMessage: text } : m));
    } else {
      await chatService.sendMessage(matchId, currentUser.id, text);
    }
  }, [currentUser, isDemoMode]);

  return (
    <AppContext.Provider value={{
      currentUser, potentials, likes, matches, messages,
      language, t, setLanguage, isUserVerified, setUserVerified,
      addLike, removePotential, sendMessage, login, logout,
      isDemoMode, setDemoMode, needsProfileSetup, setActiveChatId,
      refreshProfile, isPremium, setIsPremium, swipesRemaining,
      decrementSwipes, activeSponsor, handleApplyPromo, initiatePayment
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

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CURRENT_USER, MOCK_USERS, translations } from '../constants';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [currentUser] = useState(CURRENT_USER);
  const [potentials, setPotentials] = useState(MOCK_USERS);
  const [likes, setLikes] = useState(new Set());
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('es-AR');
  const [isUserVerified, setIsUserVerified] = useState(false);

  const t = (key) => {
    return translations[language][key] || translations['es-AR'][key] || key;
  };

  const removePotential = useCallback((id) => {
    setPotentials(prev => prev.filter(u => u.id !== id));
  }, []);

  const setUserVerified = (status) => {
    setIsUserVerified(status);
  };

  const addLike = useCallback((id) => {
    setLikes(prev => new Set(prev).add(id));
    
    // Demo: u4 and u2 always match
    if (id === 'u4' || id === 'u2') {
      const matchedUser = MOCK_USERS.find(u => u.id === id);
      if (matchedUser) {
        setMatches(prev => [...prev, {
          id: `m-${Date.now()}`,
          users: [currentUser.id, id],
          timestamp: Date.now()
        }]);
      }
    }
    removePotential(id);
  }, [currentUser.id, removePotential]);

  const sendMessage = useCallback((matchId, text) => {
    const newMessage = {
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

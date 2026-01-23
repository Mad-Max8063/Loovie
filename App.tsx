import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { useAppContext } from './context/AppContext';
import ExploreView from './views/ExploreView';
import MatchesView from './views/MatchesView';
import ProfileView from './views/ProfileView';
import LandingView from './views/LandingView';
import DemoBanner from './components/DemoBanner';
import PrivacyPolicyScreen from './views/PrivacyPolicyScreen';
import { MessageSquare, X } from 'lucide-react';

const App: React.FC = () => {
  const { currentUser, isDemoMode, setDemoMode, login } = useAppContext();
  const [activeTab, setActiveTab] = useState<'explore' | 'matches' | 'profile'>('explore');
  const [appState, setAppState] = useState<'landing' | 'privacy' | 'app'>('landing');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [demoSwipes, setDemoSwipes] = useState(5);

  // Sync internal landing state with global context
  useEffect(() => {
    if (currentUser) {
      setAppState('app');
    } else {
      setAppState('landing');
    }
  }, [currentUser]);

  const handleDemoSwipe = () => {
    if (isDemoMode && demoSwipes > 0) {
      setDemoSwipes(prev => prev - 1);
    }
  };

  const renderView = () => {
    switch (activeTab) {
      case 'explore':
        return <ExploreView onSwipe={handleDemoSwipe} swipesRemaining={isDemoMode ? demoSwipes : undefined} />;
      case 'matches':
        return <MatchesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <ExploreView onSwipe={handleDemoSwipe} swipesRemaining={isDemoMode ? demoSwipes : undefined} />;
    }
  };

  // 1. Landing View
  if (appState === 'landing') {
    return (
      <LandingView 
        onStartDemo={() => {
          setDemoMode(true);
          setAppState('app');
        }}
        onStartRegister={() => setAppState('privacy')}
      />
    );
  }

  // 2. Privacy Policy
  if (appState === 'privacy') {
    return (
      <PrivacyPolicyScreen 
        onAccept={() => {
          login(); // Trigger Google Login
        }}
        onDecline={() => setAppState('landing')}
      />
    );
  }

  // 3. Main App View (Demo or Registered)
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Demo Banner */}
      {isDemoMode && (
        <DemoBanner 
          onRegisterClick={() => setAppState('privacy')}
          swipesRemaining={demoSwipes}
        />
      )}

      <div className={isDemoMode ? 'pt-10' : ''}>
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderView()}
        </Layout>
      </div>

      {/* Demo limit reached modal */}
      {isDemoMode && demoSwipes === 0 && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-neutral-900 rounded-3xl p-8 max-w-sm text-center border border-white/10 shadow-2xl">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎬</div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-2">¡Demo Completada!</h2>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Has explorado los perfiles de ejemplo. Regístrate con Google para conocer personas reales que comparten tu pasión por el cine.
            </p>
            <button
              onClick={() => setAppState('privacy')}
              className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-950/20 active:scale-95 transition-all"
            >
              Crear Cuenta Gratis
            </button>
            <button
              onClick={() => { setDemoSwipes(5); }}
              className="w-full py-3 mt-3 text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-neutral-300 transition-colors"
            >
              Reiniciar Demo
            </button>
          </div>
        </div>
      )}

      {/* Canal de Feedback */}
      <div className="fixed bottom-24 right-4 z-[60]">
        {!showFeedback ? (
          <button 
            onClick={() => setShowFeedback(true)}
            className="w-14 h-14 bg-[#d4af37] text-black rounded-full shadow-2xl flex items-center justify-center animate-bounce hover:scale-110 transition-transform active:scale-95 shadow-[#d4af37]/20"
          >
            <MessageSquare size={24} />
          </button>
        ) : (
          <div className="bg-neutral-900 border border-[#d4af37]/30 rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.9)] w-80 transform transition-all animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></div>
                <h4 className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em]">Crítica de la App</h4>
              </div>
              <button onClick={() => { setShowFeedback(false); setFeedbackSent(false); }} className="text-neutral-600 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {!feedbackSent ? (
              <div className="space-y-4">
                <p className="text-xs text-neutral-200 font-black leading-relaxed">¿Qué te parece la experiencia CineMatch hasta ahora?</p>
                <textarea 
                  className="w-full bg-black border border-white/5 rounded-2xl p-4 text-xs text-white outline-none focus:border-[#d4af37]/40 transition-colors"
                  placeholder="Tu opinión nos ayuda a lanzar la app..."
                  rows={4}
                />
                <button 
                  onClick={() => setFeedbackSent(true)}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-950/20 active:scale-95 transition-all"
                >
                  ENVIAR FEEDBACK
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-green-950/30 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                  <MessageSquare size={28} />
                </div>
                <p className="text-[11px] font-black text-white uppercase tracking-widest pt-2">¡Oído en la sala!</p>
                <p className="text-[9px] text-neutral-500 font-bold italic leading-relaxed px-4">Gracias. Tu crítica nos sirve para pulir los detalles finales del estreno.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';
import ExploreView from './views/ExploreView';
import MatchesView from './views/MatchesView';
import ProfileView from './views/ProfileView';
import LandingView from './views/LandingView';
import DemoBanner from './components/DemoBanner';
import PrivacyPolicyScreen from './views/PrivacyPolicyScreen';
import { MessageSquare, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'matches' | 'profile'>('explore');
  const [appState, setAppState] = useState<'landing' | 'privacy' | 'demo' | 'registered'>('landing');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [demoSwipes, setDemoSwipes] = useState(5);

  const isDemoMode = appState === 'demo';

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

  // Landing screen
  if (appState === 'landing') {
    return (
      <AppProvider>
        <LandingView 
          onStartDemo={() => setAppState('demo')}
          onStartRegister={() => setAppState('privacy')}
        />
      </AppProvider>
    );
  }

  // Privacy policy screen before registration
  if (appState === 'privacy') {
    return (
      <AppProvider>
        <PrivacyPolicyScreen 
          onAccept={() => setAppState('registered')}
          onDecline={() => setAppState('landing')}
        />
      </AppProvider>
    );
  }

  return (
    <AppProvider>
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
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6">
          <div className="bg-neutral-900 rounded-3xl p-8 max-w-sm text-center border border-white/10">
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-2">¡Demo Completada!</h2>
            <p className="text-xs text-neutral-400 mb-6">
              Has explorado los perfiles de ejemplo. Regístrate para conocer personas reales que comparten tu pasión por el cine.
            </p>
            <button
              onClick={() => setAppState('privacy')}
              className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest"
            >
              Crear Cuenta Gratis
            </button>
            <button
              onClick={() => { setDemoSwipes(5); }}
              className="w-full py-3 mt-2 text-neutral-500 text-[10px] font-bold uppercase tracking-wider hover:text-white"
            >
              Reiniciar Demo
            </button>
          </div>
        </div>
      )}

      {/* Floating Demo Feedback UI */}
      <div className="fixed bottom-24 right-4 z-[60]">
        {!showFeedback ? (
          <button 
            onClick={() => setShowFeedback(true)}
            className="w-12 h-12 bg-[#d4af37] text-black rounded-full shadow-2xl flex items-center justify-center animate-bounce transition-transform active:scale-90"
          >
            <MessageSquare size={20} />
          </button>
        ) : (
          <div className="bg-neutral-900 border border-[#d4af37]/30 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] w-72">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest">Feedback Demo</h4>
              <button onClick={() => { setShowFeedback(false); setFeedbackSent(false); }} className="text-neutral-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            {!feedbackSent ? (
              <div className="space-y-4">
                <p className="text-xs text-neutral-300 font-bold leading-relaxed">¿Qué te pareció CineMatch?</p>
                <textarea 
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#d4af37]/50"
                  placeholder="Tu opinión nos ayuda a lanzar la app..."
                  rows={3}
                />
                <button 
                  onClick={() => setFeedbackSent(true)}
                  className="w-full py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-900/20 active:scale-95 transition-all"
                >
                  ENVIAR CRÍTICA
                </button>
              </div>
            ) : (
              <div className="text-center py-4 space-y-2">
                <div className="w-12 h-12 bg-green-600/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare size={24} />
                </div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest pt-2">¡Gracias por tu aporte!</p>
                <p className="text-[9px] text-neutral-500 font-bold italic">Tu feedback fue registrado para la versión beta.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AppProvider>
  );
};

export default App;

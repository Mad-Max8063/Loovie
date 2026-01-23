import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { useAppContext } from './context/AppContext';
import ExploreView from './views/ExploreView';
import MatchesView from './views/MatchesView';
import ProfileView from './views/ProfileView';
import LandingView from './views/LandingView';
import AuthView from './views/AuthView';
import ProfileSetupView from './views/ProfileSetupView';
import DemoBanner from './components/DemoBanner';
import PrivacyPolicyScreen from './views/PrivacyPolicyScreen';
import PromoCodeSection from './components/PromoCodeSection';
import { MessageSquare, X } from 'lucide-react';

const App: React.FC = () => {
  const {
    currentUser, isDemoMode, setDemoMode, login, needsProfileSetup,
    isPremium, swipesRemaining, decrementSwipes, activeSponsor, handleApplyPromo
  } = useAppContext();
  const [activeTab, setActiveTab] = useState<'explore' | 'matches' | 'profile'>('explore');
  const [appState, setAppState] = useState<'landing' | 'privacy' | 'auth' | 'app'>('landing');
  const [privacyIntent, setPrivacyIntent] = useState<'demo' | 'auth' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setAppState('app');
    } else {
      setAppState('landing');
    }
  }, [currentUser]);

  const renderView = () => {
    switch (activeTab) {
      case 'explore':
        return <ExploreView onSwipe={decrementSwipes} swipesRemaining={swipesRemaining} />;
      case 'matches':
        return <MatchesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <ExploreView onSwipe={handleDemoSwipe} swipesRemaining={isDemoMode ? demoSwipes : undefined} />;
    }
  };

  if (appState === 'landing') {
    return (
      <LandingView
        onStartDemo={() => {
          setPrivacyIntent('demo');
          setAppState('privacy');
        }}
        onStartRegister={() => {
          setPrivacyIntent('auth');
          setAppState('privacy');
        }}
        sponsor={activeSponsor}
      />
    );
  }

  if (appState === 'privacy') {
    return (
      <PrivacyPolicyScreen
        onAccept={() => {
          if (privacyIntent === 'demo') {
            setDemoMode(true);
            setAppState('app');
          } else {
            setAppState('auth');
          }
        }}
        onDecline={() => {
          setPrivacyIntent(null);
          setAppState('landing');
        }}
      />
    );
  }

  if (appState === 'auth') {
    return <AuthView onBack={() => setAppState('landing')} />;
  }

  if (needsProfileSetup) {
    return <ProfileSetupView />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {isDemoMode && (
        <DemoBanner
          onRegisterClick={() => setAppState('auth')}
          swipesRemaining={swipesRemaining}
        />
      )}

      <div className={isDemoMode ? 'pt-10' : ''}>
        <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderView()}
        </Layout>
      </div>

      {(isDemoMode || !isPremium) && swipesRemaining === 0 && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-neutral-900 rounded-3xl p-8 max-w-sm text-center border border-white/10 shadow-2xl">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎬</div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-2">¡Límite Alcanzado!</h2>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Has agotado tus swipes por hoy. {isDemoMode ? 'Regístrate' : 'Pásate a Premium'} para seguir conociendo cinéfilos sin límites.
            </p>
            <button
              onClick={() => isDemoMode ? setAppState('auth') : console.log("Go to checkout")}
              className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-950/20 active:scale-95 transition-all"
            >
              {isDemoMode ? 'Crear Cuenta Gratis' : 'Ver Planes Premium'}
            </button>
            <div className="mt-6 border-t border-white/5 pt-6">
              <PromoCodeSection
                onApplyPromo={handleApplyPromo}
                brandName={activeSponsor?.name}
              />
            </div>

            <button
              onClick={() => setDemoMode(true)}
              className="w-full py-3 mt-3 text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-neutral-300 transition-colors"
            >
              Reiniciar Demo
            </button>
          </div>
        </div>
      )}

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
                <h4 className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em]">Crítica de Loovie</h4>
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
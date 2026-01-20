
import React, { useState } from 'react';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';
import ExploreView from './views/ExploreView';
import MatchesView from './views/MatchesView';
import ProfileView from './views/ProfileView';
import LandingView from './views/LandingView';
import { MessageSquare, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'matches' | 'profile'>('explore');
  const [hasStarted, setHasStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const renderView = () => {
    switch (activeTab) {
      case 'explore':
        return <ExploreView />;
      case 'matches':
        return <MatchesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <ExploreView />;
    }
  };

  if (!hasStarted) {
    return (
      <AppProvider>
        <LandingView onStart={() => setHasStarted(true)} />
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderView()}
      </Layout>

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
          <div className="bg-neutral-900 border border-[#d4af37]/30 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] w-72 animate-in zoom-in-95 fade-in duration-200">
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

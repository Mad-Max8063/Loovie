
import React from 'react';
import { Clapperboard, MessageCircle, User, Ticket } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'explore' | 'matches' | 'profile';
  setActiveTab: (tab: 'explore' | 'matches' | 'profile') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { t } = useAppContext();

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative bg-[#050505] shadow-2xl overflow-hidden border-x border-white/5">
      <header className="p-4 flex items-center justify-between border-b border-[#d4af37]/30 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Clapperboard className="text-red-600 w-6 h-6" />
          <h1 className="text-2xl font-black tracking-tighter italic uppercase text-white" style={{ fontFamily: 'Impact, sans-serif' }}>
            CINE<span className="text-red-600">MATCH</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-[#d4af37]/50 overflow-hidden shadow-inner">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&h=100&auto=format&fit=crop" alt="avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative pb-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black/95 backdrop-blur-xl border-t border-[#d4af37]/20 flex justify-around items-center p-3 z-50">
        <button 
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'explore' ? 'text-red-600 scale-110' : 'text-neutral-500'}`}
        >
          <Ticket size={26} />
          <span className="text-[10px] uppercase font-black">{t('nav_explore')}</span>
        </button>
        <button 
          onClick={() => setActiveTab('matches')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'matches' ? 'text-red-600 scale-110' : 'text-neutral-500'}`}
        >
          <MessageCircle size={26} />
          <span className="text-[10px] uppercase font-black">{t('nav_matches')}</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'profile' ? 'text-red-600 scale-110' : 'text-neutral-500'}`}
        >
          <User size={26} />
          <span className="text-[10px] uppercase font-black">{t('nav_profile')}</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;

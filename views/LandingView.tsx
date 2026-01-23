import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Clapperboard, Play, Sparkles, UserPlus } from 'lucide-react';

interface LandingViewProps {
  onStartDemo: () => void;
  onStartRegister: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onStartDemo, onStartRegister }) => {
  const { t } = useAppContext();

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Cinematic Video/Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale" 
          alt="cinema background"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-grain pointer-events-none"></div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center gap-8 max-w-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.5)] transform rotate-12 animate-pulse">
            <Clapperboard size={48} className="text-white" />
          </div>
          <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white mt-4" style={{ fontFamily: 'Impact, sans-serif' }}>
            {t('landing_title')}<span className="text-red-600">{t('landing_subtitle')}</span>
          </h1>
          <div className="h-1 w-24 bg-[#d4af37] rounded-full"></div>
        </div>

        <p className="text-lg text-neutral-300 font-bold uppercase tracking-widest leading-relaxed">
          {t('landing_tagline')}
        </p>

        <div className="flex flex-col gap-3 w-full mt-4">
          {/* Primary CTA - Register */}
          <button 
            onClick={onStartRegister}
            className="group relative w-full py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-95 shadow-2xl"
          >
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
              <UserPlus size={18} />
              Crear Cuenta
            </span>
          </button>
          
          {/* Secondary CTA - Demo */}
          <button 
            onClick={onStartDemo}
            className="group w-full py-4 bg-transparent border-2 border-white/30 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 hover:border-white/60 hover:bg-white/5"
          >
            <span className="flex items-center justify-center gap-3">
              <Sparkles size={16} />
              Probar Demo
            </span>
          </button>
          
          <p className="text-[9px] text-neutral-500 font-bold mt-2">
            La demo incluye perfiles de ejemplo para que explores la experiencia
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 text-[8px] font-black text-neutral-600 uppercase tracking-[0.5em] opacity-50">
        Curated for Cinephiles
      </div>

      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1%, -1%); }
          50% { transform: translate(1%, 1%); }
          75% { transform: translate(-1%, 1%); }
        }
        .animate-grain {
          animation: grain 0.5s steps(1) infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingView;

import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Clapperboard, Play, Sparkles, UserPlus, LogIn } from 'lucide-react';

interface LandingViewProps {
  onStartDemo: () => void;
  onStartRegister: () => void;
  onStartLogin?: () => void;
  sponsor?: { name: string; logo?: string } | null;
}

const LandingView: React.FC<LandingViewProps> = ({ onStartDemo, onStartRegister, sponsor }) => {
  const { t } = useAppContext();

  return (
    <div className="absolute inset-0 bg-black flex flex-col overflow-y-auto no-scrollbar">
      <div className="min-h-full flex flex-col items-center justify-start p-8 py-10 md:py-16 relative">
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
            <h1 className="text-6xl font-black italic tracking-tighter uppercase text-white mt-4 flex items-center gap-1" style={{ fontFamily: 'Impact, sans-serif' }}>
              L
              <span className="relative flex items-center -mx-1">
                <span className="w-10 h-10 rounded-full border-4 border-white/20 bg-neutral-900 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden relative">
                  <span className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-red-500/20"></span>
                  <span className="w-4 h-4 bg-white/10 rounded-full animate-pulse"></span>
                </span>
                <span className="w-10 h-10 rounded-full border-4 border-white/20 bg-neutral-900 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] -ml-2 overflow-hidden relative">
                  <span className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-red-500/20"></span>
                  <span className="w-4 h-4 bg-white/10 rounded-full animate-pulse delay-75"></span>
                </span>
              </span>
              VIE
            </h1>
            <div className="h-1 w-24 bg-[#d4af37] rounded-full mt-2"></div>

            {sponsor && (
              <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full animate-in fade-in slide-in-from-top-2 duration-1000">
                <Sparkles size={12} className="text-[#d4af37] animate-pulse" />
                <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest">
                  Sponsor del Mes: {sponsor.name}
                </span>
              </div>
            )}
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
                {t('auth_signup_btn')}
              </span>
            </button>

            {/* Secondary CTA - Login */}
            <button
              onClick={onStartRegister}
              className="group w-full py-4 bg-black border-2 border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 hover:border-white/30"
            >
              <span className="flex items-center justify-center gap-3">
                <LogIn size={16} className="text-red-600" />
                {t('auth_login_btn')}
              </span>
            </button>

            {/* Demo CTA */}
            <button
              onClick={onStartDemo}
              className="group w-full py-4 bg-transparent border-2 border-white/30 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 hover:border-white/60 hover:bg-white/5"
            >
              <span className="flex items-center justify-center gap-3">
                <Sparkles size={16} />
                {t('landing_demo_btn')}
              </span>
            </button>

            <p className="text-[9px] text-neutral-500 font-bold mt-2">
              {t('landing_demo_desc')}
            </p>
          </div>
        </div>

        <div className="mt-20 text-[10px] font-black text-neutral-600 uppercase tracking-[0.5em] opacity-50">
          {t('landing_tagline_footer')}
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
    </div>
  );
};

export default LandingView;

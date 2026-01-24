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
    <div className="flex-1 flex flex-col bg-black overflow-y-auto no-scrollbar relative">
      {/* Background Cinematic Video/Pattern */}
      <div className="absolute inset-0 opacity-40 h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop"
          className="w-full h-full object-cover grayscale"
          alt="cinema background"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-grain pointer-events-none"></div>
      </div>

      <div className="relative z-20 flex-1 flex flex-col items-center text-center p-8 pt-12 pb-20 max-w-sm w-full mx-auto">
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="w-24 h-24 bg-red-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)] transform rotate-12 animate-pulse">
            <Clapperboard size={56} className="text-white" />
          </div>
          <h1 className="text-7xl font-black italic tracking-tighter uppercase text-white mt-4 flex items-center gap-1" style={{ fontFamily: 'Impact, sans-serif' }}>
            L
            <span className="relative flex items-center -mx-1">
              <span className="w-12 h-12 rounded-full border-4 border-white/20 bg-neutral-900 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden relative">
                <span className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-red-500/20"></span>
                <span className="w-4 h-4 bg-white/10 rounded-full animate-pulse"></span>
              </span>
              <span className="w-12 h-12 rounded-full border-4 border-white/20 bg-neutral-900 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] -ml-2 overflow-hidden relative">
                <span className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-red-500/20"></span>
                <span className="w-4 h-4 bg-white/10 rounded-full animate-pulse delay-75"></span>
              </span>
            </span>
            VIE
          </h1>
          <div className="h-1.5 w-32 bg-[#d4af37] rounded-full"></div>

          {sponsor && (
            <div className="mt-4 flex items-center gap-2 px-6 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full animate-in fade-in slide-in-from-top-2 duration-1000">
              <Sparkles size={14} className="text-[#d4af37] animate-pulse" />
              <span className="text-[11px] font-black text-[#d4af37] uppercase tracking-widest">
                {sponsor.name}
              </span>
            </div>
          )}
        </div>

        <p className="text-xl text-neutral-300 font-bold uppercase tracking-widest leading-relaxed mb-6">
          {t('landing_tagline')}
        </p>

        {/* Feature Highlights Section */}
        <div className="w-full grid grid-cols-1 gap-3 mb-12 text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="p-3 bg-red-600/20 rounded-xl flex-shrink-0">
              <Play size={20} className="text-red-500" />
            </div>
            <div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-wider mb-1">Cita por Cartelera</h3>
              <p className="text-[10px] text-neutral-500 leading-relaxed">Hacé match con gente que quiere ver la misma película que vos hoy.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="p-3 bg-blue-600/20 rounded-xl flex-shrink-0">
              <Sparkles size={20} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-wider mb-1">Icebreakers IA</h3>
              <p className="text-[10px] text-neutral-500 leading-relaxed">Gemini genera el primer mensaje perfecto basado en sus gustos cinéfilos.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            <div className="p-3 bg-green-600/20 rounded-xl flex-shrink-0">
              <Shield size={20} className="text-green-500" />
            </div>
            <div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-wider mb-1">Cinéfilos Reales</h3>
              <p className="text-[10px] text-neutral-500 leading-relaxed">Validación facial por IA para que tus citas sean seguras y reales.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full mt-auto">
          {/* Primary CTA - Register */}
          <button
            onClick={onStartRegister}
            className="group relative w-full py-6 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-95 shadow-2xl"
          >
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
              <UserPlus size={20} />
              {t('auth_signup_btn')}
            </span>
          </button>

          {/* Secondary CTA - Login */}
          <button
            onClick={onStartRegister}
            className="group w-full py-5 bg-black border-2 border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 hover:border-white/30"
          >
            <span className="flex items-center justify-center gap-3">
              <LogIn size={18} className="text-red-600" />
              {t('auth_login_btn')}
            </span>
          </button>

          {/* Demo CTA */}
          <button
            onClick={onStartDemo}
            className="group w-full py-5 bg-transparent border-2 border-white/30 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 hover:border-white/60 hover:bg-white/5"
          >
            <span className="flex items-center justify-center gap-3">
              <Sparkles size={18} />
              {t('landing_demo_btn')}
            </span>
          </button>

          <p className="text-[10px] text-neutral-500 font-bold mt-2 uppercase tracking-tight">
            {t('landing_demo_desc')}
          </p>
        </div>

        <div className="mt-20 text-[10px] font-black text-neutral-600 uppercase tracking-[0.5em] opacity-50">
          {t('landing_tagline_footer')}
        </div>
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

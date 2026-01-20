
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MapPin, Calendar, Popcorn, ShieldCheck, Clapperboard, Heart, Ticket, Flame, Sparkles } from 'lucide-react';

const ExploreView: React.FC = () => {
  const { potentials, addLike, removePotential, t } = useAppContext();
  const [swipeState, setSwipeState] = useState<'none' | 'left' | 'right'>('none');
  const [isBurning, setIsBurning] = useState(false);
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);

  const user = potentials[0];

  const handleSwipeLeft = () => {
    if (!user || swipeState !== 'none' || isBurning) return;
    
    setIsBurning(true);
    setTimeout(() => {
      setSwipeState('left');
      setTimeout(() => {
        removePotential(user.id);
        setSwipeState('none');
        setIsBurning(false);
      }, 400);
    }, 500); 
  };

  const handleSwipeRight = () => {
    if (!user || swipeState !== 'none' || isBurning) return;
    
    const isMatch = user.id === 'u4' || user.id === 'u2';
    
    if (isMatch) {
      setShowMatchAnimation(true);
      setTimeout(() => {
        setSwipeState('right');
        setTimeout(() => {
          addLike(user.id);
          setSwipeState('none');
          setShowMatchAnimation(false);
        }, 400);
      }, 800);
    } else {
      setSwipeState('right');
      setTimeout(() => {
        addLike(user.id);
        setSwipeState('none');
      }, 400);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center gap-4 animate-in fade-in zoom-in-95 duration-700">
        <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center border-2 border-dashed border-neutral-700">
          <Popcorn className="text-neutral-700 w-12 h-12" />
        </div>
        <h2 className="text-xl font-bold italic">{t('explore_no_users_title')}</h2>
        <p className="text-neutral-400 text-sm">{t('explore_no_users_desc')}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-red-700 rounded-full font-black text-xs uppercase tracking-tighter shadow-lg shadow-red-900/40 active:scale-95 transition-all"
        >
          {t('explore_refresh')}
        </button>
      </div>
    );
  }

  return (
    <div className="h-full p-4 flex flex-col gap-4 overflow-hidden relative">
      {/* Celuloide Container */}
      <div className={`relative flex-1 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black transition-all duration-500 ease-out transform-gpu flex
        ${swipeState === 'left' ? '-translate-x-[150%] -rotate-12 opacity-0' : ''}
        ${swipeState === 'right' ? 'translate-x-[150%] rotate-12 opacity-0' : ''}
        ${showMatchAnimation ? 'ring-4 ring-[#d4af37] scale-[1.02] shadow-[0_0_60px_rgba(212,175,55,0.4)]' : ''}
        ${isBurning ? 'animate-film-burn' : ''}
      `}>
        
        {/* Perforaciones Izquierda */}
        <div className="w-8 h-full bg-black flex flex-col justify-around py-2 items-center border-r border-white/5 z-20">
          {[...Array(12)].map((_, i) => (
            <div key={`p-l-${i}`} className="w-4 h-5 bg-neutral-800 rounded-sm border border-black shadow-inner"></div>
          ))}
        </div>

        {/* Contenido Principal (El Fotograma) */}
        <div className="flex-1 relative overflow-hidden group">
          <img 
            src={user.photoUrl} 
            alt={user.displayName}
            className={`w-full h-full object-cover transition-all duration-700 ${isBurning ? 'sepia contrast-150 brightness-150 blur-sm' : 'brightness-90 group-hover:scale-105'}`}
          />
          
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-grain"></div>

          {/* Overlay de Match */}
          {showMatchAnimation && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
               <div className="flex flex-col items-center animate-bounce-short">
                  <div className="bg-[#d4af37] text-black px-6 py-2 rounded-lg font-black text-2xl italic tracking-[0.2em] transform -rotate-3 shadow-[0_0_30px_#d4af37] flex items-center gap-3">
                    <Ticket size={24} />
                    MATCH!
                    <Ticket size={24} className="rotate-180" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Heart className="text-red-600 fill-red-600 animate-pulse" size={32} />
                    <Heart className="text-red-600 fill-red-600 animate-pulse delay-75" size={32} />
                    <Heart className="text-red-600 fill-red-600 animate-pulse delay-150" size={32} />
                  </div>
               </div>
            </div>
          )}

          {/* Efecto de Quemado Visual */}
          {isBurning && (
            <div className="absolute inset-0 z-40 bg-gradient-to-t from-orange-600/60 via-transparent to-red-600/60 mix-blend-color-dodge animate-pulse">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-[60px] animate-ping opacity-70"></div>
              <Flame size={120} className="absolute inset-0 m-auto text-orange-500 opacity-40 animate-bounce" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-4xl font-black text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] uppercase tracking-tighter italic">{user.displayName}, {user.age}</h2>
                <ShieldCheck className="text-blue-400 fill-blue-400/20" size={24} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mt-1 drop-shadow-md">
                <MapPin size={12} className="text-red-600" />
                <span>{t('explore_distance')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {user.favoriteGenres.map(g => (
                <span key={g} className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-md text-[9px] font-black border border-white/10 uppercase text-neutral-300">
                  {g}
                </span>
              ))}
            </div>

            <div className="space-y-3 mb-2 bg-black/60 p-4 rounded-xl backdrop-blur-md border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[9px] font-black text-[#d4af37] uppercase tracking-widest">
                  <Calendar size={12} />
                  <span>{user.availability.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-black text-white/50 uppercase">
                  <Sparkles size={10} className="text-red-600" />
                  <span>{user.intentMode}</span>
                </div>
              </div>
              <p className="text-xs text-neutral-200 line-clamp-2 leading-relaxed italic border-l-2 border-red-600 pl-3">"{user.bio}"</p>
            </div>
          </div>
        </div>

        {/* Perforaciones Derecha */}
        <div className="w-8 h-full bg-black flex flex-col justify-around py-2 items-center border-l border-white/5 z-20">
          {[...Array(12)].map((_, i) => (
            <div key={`p-r-${i}`} className="w-4 h-5 bg-neutral-800 rounded-sm border border-black shadow-inner"></div>
          ))}
        </div>
      </div>

      {/* Controles Estilo Consola de Cine */}
      <div className="flex items-center justify-center gap-8 py-4 relative z-50">
        <button 
          onClick={handleSwipeLeft}
          disabled={swipeState !== 'none' || isBurning}
          className="group flex flex-col items-center gap-2 active:scale-90 transition-all disabled:opacity-50"
        >
          <div className="w-16 h-16 rounded-full border-2 border-neutral-800 flex items-center justify-center bg-neutral-950 group-hover:bg-neutral-900 group-hover:border-red-600/50 transition-all shadow-xl">
            <Flame size={28} className="text-neutral-700 group-hover:text-red-500 transition-colors" />
          </div>
          <span className="text-[9px] font-black text-neutral-600 tracking-[0.3em] uppercase group-hover:text-red-500">{t('explore_cut')}</span>
        </button>

        <button 
          onClick={handleSwipeRight}
          disabled={swipeState !== 'none' || isBurning}
          className="group flex flex-col items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          <div className="w-20 h-20 rounded-full bg-red-700 border-4 border-black ring-2 ring-red-900 flex items-center justify-center shadow-[0_10px_30px_rgba(185,28,28,0.5)] group-hover:shadow-[0_15px_40px_rgba(185,28,28,0.7)] group-hover:scale-105 transition-all relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            <Clapperboard 
              size={32} 
              className="text-white drop-shadow-md transition-transform duration-500 group-hover:rotate-12" 
            />
          </div>
          <span className="text-[10px] font-black text-white tracking-[0.4em] uppercase drop-shadow-lg">{t('explore_action')}</span>
        </button>
      </div>

      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-1%, -1%); }
          50% { transform: translate(1%, 1%); }
          75% { transform: translate(-1%, 1%); }
        }
        @keyframes film-burn {
          0% { filter: contrast(100%) brightness(100%) saturate(100%); transform: scale(1); }
          20% { filter: contrast(150%) brightness(120%) saturate(200%) hue-rotate(20deg); transform: scale(1.02) rotate(1deg); }
          50% { filter: contrast(300%) brightness(200%) saturate(300%) blur(2px); clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
          70% { filter: contrast(500%) brightness(400%) blur(8px); clip-path: inset(10% 5% 20% 5% round 20%); }
          100% { filter: contrast(1000%) brightness(1000%) blur(20px); transform: scale(1.1) rotate(-2deg); opacity: 0; }
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        .animate-grain {
          animation: grain 0.5s steps(1) infinite;
        }
        .animate-film-burn {
          animation: film-burn 0.8s ease-in forwards;
        }
        .animate-bounce-short {
          animation: bounce-short 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ExploreView;

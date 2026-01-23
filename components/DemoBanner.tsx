import React from 'react';
import { Sparkles, UserPlus } from 'lucide-react';

interface DemoBannerProps {
  onRegisterClick: () => void;
  swipesRemaining?: number;
}

const DemoBanner: React.FC<DemoBannerProps> = ({ onRegisterClick, swipesRemaining }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[80] bg-gradient-to-r from-amber-600/90 via-orange-500/90 to-red-500/90 backdrop-blur-sm">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Sparkles size={14} className="text-white/80 flex-shrink-0" />
          <p className="text-[10px] font-bold text-white truncate">
            {swipesRemaining !== undefined && swipesRemaining <= 3 
              ? `Modo Demo · ${swipesRemaining} swipes restantes`
              : 'Modo Demo · Perfiles de ejemplo'
            }
          </p>
        </div>
        <button
          onClick={onRegisterClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded-full text-[9px] font-black uppercase tracking-wider hover:bg-white/90 transition-colors flex-shrink-0"
        >
          <UserPlus size={12} />
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default DemoBanner;

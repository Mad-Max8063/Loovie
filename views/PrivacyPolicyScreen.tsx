import React from 'react';
import { Shield, CheckCircle, X } from 'lucide-react';

interface PrivacyPolicyScreenProps {
  onAccept: () => void;
  onDecline: () => void;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 z-[150] bg-black flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield size={32} className="text-red-500" />
            <h1 className="text-xl font-black text-white uppercase tracking-widest">Seguridad</h1>
          </div>
          
          <div className="bg-neutral-900 rounded-2xl p-5 border border-white/10 space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider">Nuestro Compromiso</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              En CineMatch, tu seguridad es nuestra prioridad. Nos comprometemos a crear un espacio 
              seguro para que los amantes del cine se conecten.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-neutral-900/50 rounded-xl p-4 border border-white/5">
              <h3 className="text-xs font-black text-white mb-2">🔒 Verificación de Identidad</h3>
              <p className="text-[10px] text-neutral-500">Usamos IA para verificar que cada foto de perfil sea real y corresponda a la persona.</p>
            </div>
            
            <div className="bg-neutral-900/50 rounded-xl p-4 border border-white/5">
              <h3 className="text-xs font-black text-white mb-2">🛡️ Sistema de Reportes</h3>
              <p className="text-[10px] text-neutral-500">Puedes reportar cualquier comportamiento inapropiado. Nuestro equipo revisa cada caso.</p>
            </div>
            
            <div className="bg-neutral-900/50 rounded-xl p-4 border border-white/5">
              <h3 className="text-xs font-black text-white mb-2">🚫 Bloqueo Instantáneo</h3>
              <p className="text-[10px] text-neutral-500">Si alguien te incomoda, puedes bloquearlo inmediatamente y no volverá a aparecer.</p>
            </div>
            
            <div className="bg-neutral-900/50 rounded-xl p-4 border border-white/5">
              <h3 className="text-xs font-black text-white mb-2">📍 Privacidad de Ubicación</h3>
              <p className="text-[10px] text-neutral-500">Tu ubicación exacta nunca se comparte. Solo mostramos distancia aproximada.</p>
            </div>
          </div>
          
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
            <p className="text-[10px] text-red-400 font-bold">
              ⚠️ Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad. 
              Debes tener al menos 18 años para usar CineMatch.
            </p>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent">
        <div className="max-w-md mx-auto space-y-3">
          <button
            onClick={onAccept}
            className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <CheckCircle size={18} />
            Acepto y Continuar
          </button>
          <button
            onClick={onDecline}
            className="w-full py-3 text-neutral-500 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors"
          >
            No Acepto
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyScreen;

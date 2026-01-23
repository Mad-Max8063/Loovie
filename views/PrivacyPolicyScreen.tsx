import React from 'react';
import { Shield, CheckCircle, Lock, Eye, MapPin, AlertCircle, FileText } from 'lucide-react';

interface PrivacyPolicyScreenProps {
  onAccept: () => void;
  onDecline: () => void;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 z-[150] bg-black flex flex-col font-sans">
      {/* Header con gradiente cinematográfico */}
      <div className="h-48 bg-gradient-to-b from-red-950/40 to-black flex flex-col items-center justify-center p-6 text-center border-b border-white/5">
        <Shield size={48} className="text-red-500 mb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
        <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Tu Seguridad</h1>
        <p className="text-neutral-400 text-xs mt-1">El guion más importante de CineMatch es cuidarte.</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 pb-40">
        <div className="max-w-md mx-auto space-y-10">
          
          {/* Sección Amigable: Resumen Transparente */}
          <section className="space-y-6">
            <h2 className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <SparkleIcon /> En criollo: ¿Cómo te cuidamos?
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-neutral-900/40 rounded-2xl p-4 border border-white/5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Lock size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-1">Tus fotos son tuyas</h3>
                  <p className="text-[10px] text-neutral-500 leading-relaxed">Usamos IA solo para validar que sos vos. No vendemos tus fotos ni las usamos para otra cosa.</p>
                </div>
              </div>

              <div className="bg-neutral-900/40 rounded-2xl p-4 border border-white/5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-1">Ubicación aproximada</h3>
                  <p className="text-[10px] text-neutral-500 leading-relaxed">Nadie va a ver tu calle exacta. Solo mostramos que estás en una zona (ej. "Caballito") para encontrar citas cerca.</p>
                </div>
              </div>

              <div className="bg-neutral-900/40 rounded-2xl p-4 border border-white/5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Eye size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white mb-1">Chau a los mala onda</h3>
                  <p className="text-[10px] text-neutral-500 leading-relaxed">Si alguien te molesta, lo bloqueás y listo. El equipo de CineMatch revisa cada reporte al toque.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección Formal: Términos Legales (Scrollable Interno) */}
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <FileText size={12} /> Detalles Legales (Ley 25.326)
            </h2>
            <div className="bg-neutral-900 rounded-xl p-4 border border-white/10 h-48 overflow-y-auto text-[9px] text-neutral-400 leading-loose scrollbar-hide">
              <p className="mb-3 font-bold text-neutral-300">1. PROTECCIÓN DE DATOS (ARGENTINA)</p>
              <p className="mb-3">
                CineMatch cumple estrictamente con la Ley N° 25.326 de Protección de Datos Personales en la República Argentina. Tus datos personales se almacenan en una base de datos segura con el único fin de proveer el servicio de conexión entre usuarios.
              </p>
              <p className="mb-3 font-bold text-neutral-300">2. DATOS BIOMÉTRICOS E IA</p>
              <p className="mb-3">
                Al subir una foto de perfil, autorizás el procesamiento de datos biométricos mediante tecnología de Inteligencia Artificial (Google Gemini) para fines exclusivos de validación de identidad. Estos datos no son transferidos a terceros con fines publicitarios.
              </p>
              <p className="mb-3 font-bold text-neutral-300">3. DERECHOS ARCO</p>
              <p className="mb-3">
                El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses. Asimismo, podrá solicitar la rectificación, actualización o supresión de sus datos enviando un correo a soporte@cinematch.app.
              </p>
              <p className="mb-3">
                La Agencia de Acceso a la Información Pública es el Órgano de Control de la Ley N° 25.326.
              </p>
            </div>
          </section>

          <div className="flex items-start gap-3 p-4 bg-red-900/10 border border-red-900/30 rounded-2xl">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-red-400/80 leading-relaxed">
              Al tocar el botón de abajo, confirmás que sos mayor de 18 años y aceptás estos términos. Queremos que tu experiencia sea de película, pero con reglas claras.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Fijo */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent backdrop-blur-sm">
        <div className="max-w-md mx-auto space-y-4">
          <button
            onClick={onAccept}
            className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)]"
          >
            <CheckCircle size={18} />
            Acepto y Continuar
          </button>
          <button
            onClick={onDecline}
            className="w-full py-2 text-neutral-600 font-black text-[9px] uppercase tracking-[0.2em] hover:text-neutral-400 transition-colors"
          >
            No me convence
          </button>
        </div>
      </div>
    </div>
  );
};

const SparkleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

export default PrivacyPolicyScreen;

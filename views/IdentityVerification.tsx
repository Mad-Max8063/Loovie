
import React, { useRef, useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Camera, ShieldCheck, ArrowLeft, RefreshCw, Lock, UserCheck, AlertCircle, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const IdentityVerification: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t, setUserVerified } = useAppContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'active' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 720 },
          height: { ideal: 720 }
        },
        audio: false 
      });
      
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        // El autoPlay del video hará el resto
        setStatus('active');
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setErrorMessage("No se pudo acceder a la cámara. Verificá los permisos.");
      setStatus('error');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setStatus('idle');
  };

  const captureAndVerify = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsVerifying(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Configurar canvas al tamaño del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    if (context) {
      // Dibujar frame actual (espejado para que coincida con la vista previa)
      context.save();
      context.scale(-1, 1);
      context.drawImage(video, -canvas.width, 0);
      context.restore();
    }
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { text: "Verificación de Identidad para App de Citas: Analizá esta selfie. ¿Es una persona real mirando a cámara? Buscá signos de fraude (fotos de pantallas, máscaras, fotos impresas). Respondé 'VALID' si parece real y natural, o 'INVALID: [motivo]' si no es apta. Sé estricto con la iluminación y claridad." },
          { inlineData: { data: imageData, mimeType: 'image/jpeg' } }
        ]
      });

      const result = response.text || "";
      if (result.includes('VALID')) {
        setStatus('success');
        setUserVerified(true);
        setTimeout(onBack, 2500);
      } else {
        setErrorMessage(result.replace('INVALID:', '').trim() || "La verificación falló. Intentá con mejor luz.");
        setStatus('error');
      }
    } catch (err) {
      console.error("Verification error:", err);
      setErrorMessage("Error de conexión con el servidor de seguridad.");
      setStatus('error');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col p-6 animate-in fade-in duration-500 overflow-hidden">
      <header className="flex items-center gap-4 mb-6 z-20">
        <button onClick={() => { stopCamera(); onBack(); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-[#d4af37]" />
        </button>
        <div className="flex flex-col">
          <h2 className="text-xl font-black uppercase tracking-tighter italic text-white leading-tight">Validación <span className="text-red-600">Búnker</span></h2>
          <span className="text-[8px] text-[#d4af37] font-bold tracking-[0.4em] uppercase">Security Level High</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
        <div className="relative w-full aspect-square max-w-[320px]">
          {/* Marco de Escaneo Estético */}
          <div className={`absolute inset-0 border-2 rounded-full z-20 pointer-events-none transition-all duration-500 ${
            status === 'active' ? 'border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 
            status === 'success' ? 'border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.5)]' : 'border-white/10'
          }`}>
            {status === 'active' && !isVerifying && (
              <div className="absolute top-0 left-0 w-full h-1 bg-[#d4af37] shadow-[0_0_15px_#d4af37] animate-scan opacity-50"></div>
            )}
          </div>

          <div className="w-full h-full rounded-full bg-neutral-900 overflow-hidden border-4 border-white/5 relative shadow-2xl">
            {/* Pantalla Inicial */}
            {status === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center p-8 bg-neutral-950 z-30">
                <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center border border-white/5 shadow-inner">
                  <Camera size={40} className="text-neutral-700" />
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-black text-white uppercase tracking-widest leading-relaxed">Verificación Biométrica Requerida</p>
                  <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest leading-relaxed px-4">Prepará tu mejor ángulo bajo buena luz para validar tu perfil.</p>
                </div>
              </div>
            )}

            {/* Pantalla Cargando */}
            {status === 'loading' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-950 z-30">
                <RefreshCw className="text-[#d4af37] animate-spin" size={32} />
                <p className="text-[9px] font-black text-[#d4af37] uppercase tracking-[0.4em]">Iniciando Capturador...</p>
              </div>
            )}
            
            {/* VIDEO PREVIEW - Simple y Directo */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-500 ${status === 'active' ? 'opacity-100' : 'opacity-0'}`}
            />
            
            {/* Overlay de Verificación */}
            {isVerifying && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-6 z-40 animate-in fade-in duration-300">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
                  <Lock className="absolute inset-0 m-auto text-white/40" size={24} />
                </div>
                <div className="text-center space-y-2 px-8">
                  <p className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Analizando Identidad</p>
                  <div className="h-1 w-32 bg-neutral-800 mx-auto rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 animate-progress"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Éxito */}
            {status === 'success' && (
              <div className="absolute inset-0 bg-green-600 flex flex-col items-center justify-center gap-6 z-50 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl scale-110">
                  <ShieldCheck className="text-white" size={60} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-white uppercase tracking-[0.4em]">Acceso Concedido</p>
                  <p className="text-[10px] text-white/70 font-bold uppercase mt-1 tracking-widest">Identidad Blindada</p>
                </div>
              </div>
            )}

            {/* Error */}
            {status === 'error' && !isVerifying && (
              <div className="absolute inset-0 bg-red-950/90 backdrop-blur-xl flex flex-col items-center justify-center gap-4 text-center p-8 z-40">
                <AlertCircle className="text-red-500" size={48} />
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">Error de Validación</p>
                  <p className="text-[9px] text-red-400 font-bold uppercase leading-relaxed">{errorMessage}</p>
                </div>
                <button 
                  onClick={startCamera}
                  className="mt-4 px-6 py-2 bg-red-600 rounded-full text-[9px] font-black uppercase tracking-widest"
                >
                  Reintentar
                </button>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Info Box */}
        <div className="w-full max-w-[280px] space-y-5 px-4">
          <div className="flex items-center gap-4 p-4 bg-neutral-900/40 rounded-2xl border border-white/5 backdrop-blur-sm">
            <Sparkles size={18} className="text-[#d4af37]" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-white uppercase tracking-widest">IA Confiable</span>
              <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-tight">Verificamos que seas vos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="mt-auto pb-8 z-20">
        {status === 'idle' && (
          <button 
            onClick={startCamera}
            className="w-full py-5 bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Abrir Obturador
          </button>
        )}
        
        {status === 'active' && !isVerifying && (
          <div className="flex flex-col gap-3">
            <button 
              onClick={captureAndVerify}
              className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-[0.98] transition-all"
            >
              Capturar y Validar
            </button>
            <button 
              onClick={stopCamera}
              className="w-full py-3 text-neutral-500 font-black text-[9px] uppercase tracking-widest hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(320px); }
          100% { transform: translateY(0); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        .animate-progress {
          animation: progress 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default IdentityVerification;

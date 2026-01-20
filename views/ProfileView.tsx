
import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Settings, Edit3, Clapperboard, Star, Clock, Heart, Globe, Check, ShieldCheck, ShieldAlert, Share2, X, Copy, ExternalLink, Ticket, AlertTriangle, QrCode, HelpCircle } from 'lucide-react';
import { getMovieRecommendations } from '../services/geminiService';
import IdentityVerification from './IdentityVerification';

const ProfileView: React.FC = () => {
  const { currentUser, language, setLanguage, t, isUserVerified } = useAppContext();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showVerifyFlow, setShowVerifyFlow] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Intentamos capturar la URL actual, pero permitimos que el usuario la vea
    setShareUrl(window.location.href);
    
    const fetchRecs = async () => {
      setLoading(true);
      const data = await getMovieRecommendations(currentUser.favoriteGenres, language);
      setRecommendations(data);
      setLoading(false);
    };
    fetchRecs();
  }, [currentUser.favoriteGenres, language]);

  // Detectar si la URL parece ser de un entorno de desarrollo privado
  const isPrivateUrl = shareUrl.includes('localhost') || 
                       shareUrl.includes('127.0.0.1') || 
                       shareUrl.includes('webcontainer') || 
                       shareUrl.includes('stackblitz') ||
                       shareUrl.includes('internal');

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (err) {
      // Fallback manual para navegadores viejos o sandboxes restrictivos
      if (linkInputRef.current) {
        linkInputRef.current.select();
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    }
  };

  if (showVerifyFlow) {
    return <IdentityVerification onBack={() => setShowVerifyFlow(false)} />;
  }

  return (
    <div className="p-6 pb-24 space-y-8 relative">
      {/* Perfil Header */}
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#d4af37]/30 p-1 bg-gradient-to-tr from-red-900 to-black shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <img src={currentUser.photoUrl} alt="profile" className="w-full h-full object-cover rounded-full shadow-2xl" />
          </div>
          <button className="absolute bottom-2 right-2 p-2.5 bg-red-700 rounded-full shadow-xl border-2 border-black active:scale-90 transition-all">
            <Edit3 size={18} className="text-white" />
          </button>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl font-black text-white">{currentUser.displayName}, {currentUser.age}</h2>
            {isUserVerified && <ShieldCheck className="text-blue-400" size={24} />}
          </div>
          <p className="text-[#d4af37] text-xs font-black uppercase tracking-[0.3em] mt-1">{t('profile_level')}</p>
        </div>
      </div>

      {/* Botón Compartir */}
      <button 
        onClick={() => setIsShareModalOpen(true)}
        className="w-full py-5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-all"
      >
        <Share2 size={18} />
        {t('profile_share')}
      </button>

      {/* MODAL DE COMPARTIR DEMO - VERSION RESISTENTE */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="bg-neutral-900 w-full max-w-sm rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden relative flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
            
            {/* Cabecera del Ticket */}
            <div className="p-8 pb-4 flex flex-col items-center gap-4 relative">
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-6 right-6 text-neutral-500 hover:text-white p-2"
              >
                <X size={24} />
              </button>

              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center border border-[#d4af37]/20">
                <Ticket size={32} className="text-[#d4af37]" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Tu Ticket de Invitado</h3>
                <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.2em]">CineMatch Early Access</p>
              </div>
            </div>

            {/* Cuerpo del Ticket (Scrollable) */}
            <div className="px-8 pb-8 flex-1 overflow-y-auto no-scrollbar space-y-6">
              
              {/* QR Dinámico */}
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-white rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <img 
                    src={`https://chart.googleapis.com/chart?chs=180x180&cht=qr&chl=${encodeURIComponent(shareUrl)}&choe=UTF-8`} 
                    alt="QR Code" 
                    className="w-32 h-32"
                  />
                </div>
                <span className="text-[8px] font-black text-neutral-500 uppercase tracking-widest">Escaneame para entrar</span>
              </div>

              {/* URL y Validaciones */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-neutral-500 uppercase">Enlace del Demo</span>
                    {isPrivateUrl && (
                      <span className="bg-red-600 text-white text-[7px] px-1.5 py-0.5 rounded font-black uppercase flex items-center gap-1">
                        <AlertTriangle size={8} /> Local/Privado
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsEditingUrl(!isEditingUrl)}
                    className="text-[9px] font-black text-[#d4af37] uppercase hover:underline"
                  >
                    {isEditingUrl ? 'OK' : 'EDITAR'}
                  </button>
                </div>

                <div className="relative">
                  <input 
                    ref={linkInputRef}
                    type="text"
                    readOnly={!isEditingUrl}
                    value={shareUrl}
                    onChange={(e) => setShareUrl(e.target.value)}
                    className={`w-full bg-black border rounded-2xl p-4 pr-12 text-[10px] font-mono outline-none transition-all ${
                      isEditingUrl ? 'border-[#d4af37] ring-1 ring-[#d4af37]/50 text-white' : 'border-white/10 text-neutral-400'
                    }`}
                  />
                  {!isEditingUrl && <ExternalLink size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-700" />}
                </div>

                {/* Advertencia si la URL parece incorrecta */}
                {isPrivateUrl && !isEditingUrl && (
                  <div className="p-4 bg-red-900/10 border border-red-600/20 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertTriangle size={14} />
                      <span className="text-[9px] font-black uppercase">¿El link no funciona?</span>
                    </div>
                    <p className="text-[8px] text-neutral-400 font-bold uppercase leading-relaxed">
                      Parece que estás compartiendo una URL privada de tu editor. 
                      Para compartir el demo real, copia el link que aparece en la **barra de direcciones de tu navegador** y pegalo arriba dándole a "EDITAR".
                    </p>
                  </div>
                )}

                {/* Botones de Acción */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={copyToClipboard}
                    className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                      isCopied ? 'bg-green-600 text-white' : 'bg-white text-black active:scale-95'
                    }`}
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    {isCopied ? 'COPIADO' : 'COPIAR'}
                  </button>
                  <a 
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 bg-neutral-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-700 transition-all active:scale-95"
                  >
                    <ExternalLink size={14} /> PROBAR
                  </a>
                </div>
              </div>

              {/* Ayuda Rápida */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-neutral-600 mb-2 px-1">
                  <HelpCircle size={12} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Guía de compartición</span>
                </div>
                <div className="text-[7px] text-neutral-500 font-bold uppercase grid grid-cols-2 gap-4 leading-tight">
                  <p>1. Abrí el demo en una pestaña nueva.</p>
                  <p>2. Copiá la URL de esa pestaña.</p>
                  <p>3. Pegala acá arriba y compartí.</p>
                  <p>4. Así te aseguras que el link funcione.</p>
                </div>
              </div>

            </div>

            {/* Footer del Ticket */}
            <div className="bg-[#d4af37] py-4 text-center border-t border-black/10 mt-auto flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-black/20"></div>
              <span className="text-[8px] font-black text-black uppercase tracking-[0.4em]">CineMatch Beta Showcase</span>
              <div className="w-2 h-2 rounded-full bg-black/20"></div>
            </div>

            {/* Decoración lateral ticket */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border border-white/5 shadow-inner"></div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border border-white/5 shadow-inner"></div>
          </div>
        </div>
      )}

      {/* Identity Verification Banner */}
      {!isUserVerified ? (
        <button 
          onClick={() => setShowVerifyFlow(true)}
          className="w-full p-5 bg-gradient-to-r from-red-900/40 to-black border border-red-600/30 rounded-3xl flex items-center justify-between group active:scale-95 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600 rounded-2xl">
              <ShieldAlert className="text-white" size={24} />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">{t('security_verify_btn')}</h4>
              <p className="text-[10px] text-neutral-400 font-medium">Protegé tu cuenta y ganá confianza</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <Check size={16} className="text-neutral-600" />
          </div>
        </button>
      ) : (
        <div className="w-full p-5 bg-gradient-to-r from-blue-900/40 to-black border border-blue-600/30 rounded-3xl flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">{t('security_verified')}</h4>
            <p className="text-[10px] text-neutral-400 font-medium italic">Validación biométrica exitosa</p>
          </div>
        </div>
      )}

      {/* Estadísticas de Usuario */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-900/40 p-4 rounded-3xl border border-white/5 flex flex-col items-center gap-2 backdrop-blur-sm">
          <Star className="text-[#d4af37]" size={22} />
          <span className="text-[9px] font-black uppercase text-neutral-600 tracking-widest">{t('profile_reputation')}</span>
          <span className="font-black text-white">4.9 / 5.0</span>
        </div>
        <div className="bg-neutral-900/40 p-4 rounded-3xl border border-white/5 flex flex-col items-center gap-2 backdrop-blur-sm">
          <Clock className="text-red-600" size={22} />
          <span className="text-[9px] font-black uppercase text-neutral-600 tracking-widest">{t('profile_waiting')}</span>
          <span className="font-black text-white">2 Pelis</span>
        </div>
      </div>

      {/* Géneros */}
      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">{t('profile_genres')}</h3>
          <button className="text-[10px] text-red-600 font-black hover:underline">{t('profile_edit')}</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentUser.favoriteGenres.map(g => (
            <span key={g} className="px-4 py-2 bg-neutral-900/60 rounded-xl text-xs font-bold border border-white/5 text-neutral-300">
              {g}
            </span>
          ))}
        </div>
      </section>

      {/* Recomendaciones Sugeridas */}
      <section>
        <div className="flex items-center gap-2 mb-5 px-1">
          <Clapperboard className="text-red-700" size={20} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">{t('profile_upcoming')}</h3>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center p-10 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-600 border-r-2"></div>
            <span className="text-[10px] font-black text-neutral-600 uppercase">{t('profile_loading_recs')}</span>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((movie, idx) => (
              <div key={idx} className="bg-neutral-900/40 rounded-3xl overflow-hidden border border-white/5 flex group cursor-pointer hover:border-[#d4af37]/30 transition-all active:scale-98">
                <div className="w-24 h-32 bg-neutral-800 flex-shrink-0 relative overflow-hidden">
                   <img 
                    src={`https://picsum.photos/seed/${movie.imageUrl}/200/300`} 
                    alt={movie.title} 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/40"></div>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-black text-sm mb-1 text-white uppercase tracking-tight leading-tight">{movie.title}</h4>
                    <p className="text-[10px] text-neutral-500 line-clamp-2 italic font-medium">"{movie.description}"</p>
                  </div>
                  <button className="text-[9px] font-black text-red-600 uppercase flex items-center gap-1.5 mt-2 hover:text-red-500 transition-colors">
                    <Heart size={12} className="fill-red-700" /> {t('profile_wishlist')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Ajustes finales */}
      <div className="space-y-3">
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="w-full py-4 bg-neutral-900/40 text-neutral-400 font-black text-[11px] uppercase tracking-widest rounded-2xl border border-white/5 flex items-center justify-between px-6 hover:bg-neutral-900 transition-all"
          >
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-[#d4af37]" /> {t('profile_language')}: {language === 'es-AR' ? 'Castellano (AR)' : 'English (US)'}
            </div>
            <span className="text-[8px] opacity-50">{t('profile_change')}</span>
          </button>
          
          {showLangMenu && (
            <div className="absolute bottom-full mb-2 w-full bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden z-20 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
              <button 
                onClick={() => { setLanguage('es-AR'); setShowLangMenu(false); }}
                className="w-full p-4 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
              >
                Castellano (Argentina)
                {language === 'es-AR' && <Check size={16} className="text-red-600" />}
              </button>
              <button 
                onClick={() => { setLanguage('en-US'); setShowLangMenu(false); }}
                className="w-full p-4 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors border-t border-white/5"
              >
                English (US)
                {language === 'en-US' && <Check size={16} className="text-red-600" />}
              </button>
            </div>
          )}
        </div>
        
        <button className="w-full py-4 bg-neutral-900/40 text-neutral-400 font-black text-[11px] uppercase tracking-widest rounded-2xl border border-white/5 flex items-center gap-3 justify-center hover:bg-neutral-900 transition-all">
          <Settings size={18} /> {t('profile_settings')}
        </button>
      </div>
    </div>
  );
};

export default ProfileView;

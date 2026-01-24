import React, { useState } from 'react';
import { Ticket, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface PromoCodeSectionProps {
    onApplyPromo: (months: number) => void;
    brandName?: string;
}

const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({ onApplyPromo, brandName = "Nuestro Sponsor" }) => {
    const { t } = useAppContext();
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');

    const handleApply = () => {
        if (!code) return;
        setStatus('validating');

        // Simulación de validación de código de marca
        setTimeout(() => {
            const upperCode = code.toUpperCase();
            if (upperCode === 'LOOVIE2026' || upperCode === 'CINEPROMO' || upperCode === 'LOOVIE_VIP_2026') {
                setStatus('success');
                onApplyPromo(upperCode === 'LOOVIE_VIP_2026' ? 9999 : 1);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        }, 1500);
    };

    return (
        <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#d4af37]/20 text-[#d4af37] rounded-xl flex items-center justify-center border border-[#d4af37]/30">
                    <Ticket size={20} />
                </div>
                <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">¿Tenés un código?</h4>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-tight">Atención cortesía de {brandName}</p>
                </div>
            </div>

            <div className="relative">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="INGRESA TU CÓDIGO"
                    disabled={status === 'success' || status === 'validating'}
                    className="w-full bg-black border border-white/10 rounded-2xl py-4 px-5 text-sm font-black uppercase tracking-widest text-white outline-none focus:border-[#d4af37] transition-all disabled:opacity-50"
                />

                <button
                    onClick={handleApply}
                    disabled={!code || status !== 'idle'}
                    className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95
            ${status === 'success' ? 'bg-green-600 text-white' :
                            status === 'error' ? 'bg-red-600 text-white' :
                                'bg-white text-black hover:bg-[#d4af37]'}
          `}
                >
                    {status === 'validating' ? '...' :
                        status === 'success' ? <CheckCircle2 size={16} /> :
                            status === 'error' ? <AlertCircle size={16} /> :
                                'APLICAR'}
                </button>
            </div>

            {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 text-green-500 animate-in fade-in slide-in-from-top-2">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-black uppercase tracking-wider">
                        {code.toUpperCase() === 'LOOVIE_VIP_2026'
                            ? t('vip_code_terms')
                            : '¡Código aceptado! 1 Mes Premium Activado'}
                    </span>
                </div>
            )}

            {status === 'error' && (
                <div className="mt-2 text-red-500 text-[9px] font-black uppercase tracking-wider text-center">
                    Código inválido o expirado
                </div>
            )}
        </div>
    );
};

export default PromoCodeSection;

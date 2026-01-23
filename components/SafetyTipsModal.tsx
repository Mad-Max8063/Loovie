import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ShieldCheck, MapPin, Users, Car, AlertCircle, X, Clapperboard } from 'lucide-react';

interface SafetyTipsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SafetyTipsModal: React.FC<SafetyTipsModalProps> = ({ isOpen, onClose }) => {
    const { t } = useAppContext();

    if (!isOpen) return null;

    const tips = [
        {
            icon: <MapPin className="text-red-500" />,
            title: t('safety_tip_1_title'),
            desc: t('safety_tip_1_desc'),
            cinema: t('safety_tip_1_cinema')
        },
        {
            icon: <Users className="text-blue-500" />,
            title: t('safety_tip_2_title'),
            desc: t('safety_tip_2_desc'),
            cinema: null
        },
        {
            icon: <Car className="text-orange-500" />,
            title: t('safety_tip_3_title'),
            desc: t('safety_tip_3_desc'),
            cinema: null
        },
        {
            icon: <AlertCircle className="text-yellow-500" />,
            title: t('safety_tip_4_title'),
            desc: t('safety_tip_4_desc'),
            cinema: null
        },
    ];

    return (
        <div className="fixed inset-0 z-[250] bg-black/95 flex items-center justify-center p-6 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-neutral-900 border border-white/10 rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors p-2 z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 pb-4 text-center">
                    <div className="inline-block p-4 bg-blue-600/10 rounded-3xl mb-4 border border-blue-600/20">
                        <ShieldCheck size={40} className="text-blue-500 animate-pulse" />
                    </div>

                    <h2 className="text-2xl font-black text-white uppercase tracking-tight italic mb-1">
                        {t('safety_tips_title')}
                    </h2>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest leading-relaxed px-4">
                        {t('safety_tips_subtitle')}
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-5 no-scrollbar">
                    {tips.map((tip, i) => (
                        <div key={i} className="bg-white/5 p-5 rounded-3xl border border-white/5 space-y-3 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5">
                                    {tip.icon}
                                </div>
                                <h3 className="text-xs font-black text-white uppercase tracking-wider">{tip.title}</h3>
                            </div>
                            <p className="text-[10px] text-neutral-400 font-medium leading-relaxed">
                                {tip.desc}
                            </p>
                            {tip.cinema && (
                                <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                                    <Clapperboard size={14} className="text-red-600 mt-0.5" />
                                    <p className="text-[9px] text-[#d4af37] font-black italic uppercase italic">"{tip.cinema}"</p>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={onClose}
                        className="w-full py-5 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-white/10 active:scale-95 transition-all mt-4"
                    >
                        {t('safety_tip_cta')}
                    </button>
                </div>

                {/* Decoración Estilo Film */}
                <div className="w-full h-1.5 bg-neutral-800 flex justify-around items-center px-4 overflow-hidden mt-auto">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="w-4 h-full bg-black border-x border-neutral-900"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SafetyTipsModal;

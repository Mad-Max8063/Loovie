import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Popcorn, Ticket, Rewind, Check, X } from 'lucide-react';

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose }) => {
    const { t, initiatePayment } = useAppContext();

    if (!isOpen) return null;

    const features = [
        { icon: <Popcorn className="text-red-500" />, text: t('premium_feature_swipes') },
        { icon: <Ticket className="text-[#d4af37]" />, text: t('premium_feature_likes') },
        { icon: <Rewind className="text-blue-500" />, text: t('premium_feature_rewind') },
    ];

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-neutral-900 border border-white/10 rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors p-2"
                >
                    <X size={24} />
                </button>

                <div className="p-8 pt-12 text-center">
                    <div className="inline-block p-4 bg-red-600/10 rounded-3xl mb-6">
                        <Popcorn size={40} className="text-red-600 animate-bounce" />
                    </div>

                    <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
                        {t('premium_title')}
                    </h2>
                    <p className="text-xs text-neutral-400 mb-8 px-4">
                        {t('premium_subtitle')}
                    </p>

                    <div className="space-y-4 mb-10 text-left px-4">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center">
                                    {f.icon}
                                </div>
                                <span className="text-xs font-bold text-white uppercase tracking-tight">{f.text}</span>
                                <Check className="ml-auto text-green-500" size={18} />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            initiatePayment();
                            onClose();
                        }}
                        className="w-full py-5 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-950/40 active:scale-95 transition-all mb-4"
                    >
                        {t('premium_cta')}
                    </button>

                    <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest italic">
                        Desde $2.99/mes • Cancelá cuando quieras
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaywallModal;

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MOCK_USERS } from '../constants';
import { Search, Send, ArrowLeft, Popcorn, Ticket } from 'lucide-react';
import { getIcebreaker, getCollaborativeRecommendation } from '../services/geminiService';

const MatchesView: React.FC = () => {
    const { matches, currentUser, messages, sendMessage, t, language, setActiveChatId, potentials } = useAppContext();
    const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');
    const [isGeneratingIcebreaker, setIsGeneratingIcebreaker] = useState(false);
    const [isGeneratingRec, setIsGeneratingRec] = useState(false);

    const handleSelectChat = (id: string | null) => {
        setSelectedMatchId(id);
        setActiveChatId(id);
    };

    const activeMatch = matches.find(m => m.id === selectedMatchId);
    const matchedUserId = activeMatch?.users.find(id => id !== currentUser?.id);
    const matchedUser = MOCK_USERS.find(u => u.id === matchedUserId) || potentials.find(u => u.id === matchedUserId);

    const matchMessages = messages.filter(msg => msg.matchId === selectedMatchId);

    const handleSend = () => {
        if (!inputText.trim() || !selectedMatchId) return;
        sendMessage(selectedMatchId, inputText);
        setInputText('');
    };

    const handleGetIcebreaker = async () => {
        if (!matchedUser || !selectedMatchId || !currentUser) return;
        setIsGeneratingIcebreaker(true);
        const text = await getIcebreaker(currentUser, matchedUser, language);
        setInputText(text);
        setIsGeneratingIcebreaker(false);
    };

    const handleGetMovieNight = async () => {
        if (!matchedUser || !selectedMatchId || !currentUser) return;
        setIsGeneratingRec(true);
        const rec = await getCollaborativeRecommendation(currentUser, matchedUser, language);
        if (rec && rec.title) {
            const intro = t('chat_movie_night_intro') + ' ';
            setInputText(`${intro} ${rec.title}. ${rec.reason}`);
        }
        setIsGeneratingRec(false);
    };

    if (selectedMatchId && matchedUser) {
        return (
            <div className="flex flex-col h-full bg-black">
                <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-black/80 backdrop-blur-md sticky top-0 z-10">
                    <button onClick={() => handleSelectChat(null)} className="p-1 hover:bg-neutral-800 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-[#d4af37]" />
                    </button>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 shadow-lg shadow-red-900/20">
                        <img src={matchedUser.photoUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-white">{matchedUser.displayName}</h3>
                        <span className="text-[9px] text-green-500 uppercase font-black tracking-widest">{t('chat_online')}</span>
                    </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                    <div className="text-center py-4">
                        <div className="inline-block px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-[9px] text-red-500 uppercase font-black tracking-[0.2em]">
                            {t('chat_matched_on')} {activeMatch ? new Date(activeMatch.timestamp).toLocaleDateString() : ''}
                        </div>
                    </div>

                    {matchMessages.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 text-center text-neutral-600">
                            <Popcorn className="w-14 h-14 mb-4 opacity-10" />
                            <p className="text-sm italic">{t('chat_no_messages')}</p>
                        </div>
                    )}

                    {matchMessages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm shadow-sm ${msg.senderId === currentUser?.id
                                    ? 'bg-red-700 text-white rounded-tr-none'
                                    : 'bg-neutral-900 text-neutral-100 rounded-tl-none border border-white/5'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-white/10 bg-black/90">
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={handleGetIcebreaker}
                            disabled={isGeneratingIcebreaker}
                            className="px-4 py-1.5 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full text-[10px] font-black text-[#d4af37] flex items-center gap-2 hover:bg-[#d4af37]/20 transition-all disabled:opacity-50"
                        >
                            <Ticket size={14} />
                            {isGeneratingIcebreaker ? t('chat_icebreaker_loading') : t('chat_icebreaker_btn')}
                        </button>
                        <button
                            onClick={handleGetMovieNight}
                            disabled={isGeneratingRec}
                            className="px-4 py-1.5 bg-red-600/10 border border-red-600/30 rounded-full text-[10px] font-black text-red-500 flex items-center gap-2 hover:bg-red-600/20 transition-all disabled:opacity-50"
                        >
                            <Popcorn size={14} />
                            {isGeneratingRec ? '...' : (t('explore_action'))}
                        </button>
                    </div>
                    <div className="flex gap-3 items-center bg-neutral-950 rounded-2xl px-5 py-3 border border-white/10">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={t('chat_placeholder')}
                            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-neutral-600"
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend} className="text-red-500 hover:scale-125 active:scale-95 transition-all">
                            <Send size={22} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 flex flex-col h-full gap-4">
            <div className="flex items-center gap-3 bg-neutral-900/50 rounded-2xl px-5 py-3 border border-white/5">
                <Search size={18} className="text-neutral-500" />
                <input type="text" placeholder={t('matches_search')} className="bg-transparent border-none outline-none text-sm text-white w-full" />
            </div>

            <div className="flex-1 overflow-y-auto">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4 px-2">{t('matches_new')}</h2>
                <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar">
                    {matches.filter(m => !m.lastMessage).map(m => {
                        const userId = m.users.find(id => id !== currentUser?.id);
                        const user = MOCK_USERS.find(u => u.id === userId) || potentials.find(u => u.id === userId);
                        if (!user) return null;
                        return (
                            <button
                                key={m.id}
                                onClick={() => handleSelectChat(m.id)}
                                className="flex-shrink-0 flex flex-col items-center gap-2 group"
                            >
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-600 p-0.5 transition-all group-active:scale-90 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                                    <img src={user.photoUrl} alt="" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-tighter">{user.displayName}</span>
                            </button>
                        );
                    })}
                    {matches.filter(m => !m.lastMessage).length === 0 && (
                        <div className="text-[10px] text-neutral-700 font-bold uppercase italic p-5 border border-dashed border-neutral-800 rounded-3xl w-full text-center">
                            {t('matches_empty_new')}
                        </div>
                    )}
                </div>

                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-3 px-2">{t('matches_messages')}</h2>
                <div className="space-y-3">
                    {matches.filter(m => m.lastMessage).map(m => {
                        const userId = m.users.find(id => id !== currentUser?.id);
                        const user = MOCK_USERS.find(u => u.id === userId) || potentials.find(u => u.id === userId);
                        if (!user) return null;
                        return (
                            <button
                                key={m.id}
                                onClick={() => handleSelectChat(m.id)}
                                className="w-full p-4 rounded-3xl bg-neutral-900/20 hover:bg-neutral-900/50 flex gap-4 items-center transition-all border border-white/5 active:scale-98"
                            >
                                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                                    <img src={user.photoUrl} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-bold text-sm text-white">{user.displayName}</h4>
                                        <span className="text-[9px] text-neutral-600 font-black">2H</span>
                                    </div>
                                    <p className="text-xs text-neutral-500 line-clamp-1 italic">"{m.lastMessage}"</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MatchesView;

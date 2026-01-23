import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { User, Calendar, FileText, Film, Check } from 'lucide-react';
import * as dbService from '../services/dbService';

const ProfileSetupView: React.FC = () => {
    const { t, currentUser, refreshProfile } = useAppContext();
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [genres, setGenres] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const availableGenres = ['genre_action', 'genre_comedy', 'genre_drama', 'genre_horror', 'genre_sci_fi', 'genre_documentary', 'genre_indie'];

    const handleToggleGenre = (g: string) => {
        setGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
    };

    const handleSave = async () => {
        if (!currentUser || isSaving) return;
        setIsSaving(true);
        try {
            const updatedProfile = {
                ...currentUser,
                age: parseInt(age),
                bio,
                favoriteGenres: genres
            };
            await dbService.saveUser(updatedProfile);
            await refreshProfile();
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[400] bg-black flex flex-col p-8 overflow-y-auto">
            <div className="max-w-sm mx-auto w-full space-y-8 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{t('profile_setup_title')}</h2>
                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{t('profile_setup_subtitle')}</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                            <Calendar size={14} /> {t('profile_setup_age')}
                        </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-4 text-xs text-white outline-none focus:border-red-600/50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                            <FileText size={14} /> {t('profile_setup_bio')}
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-4 text-xs text-white outline-none focus:border-red-600/50"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                            <Film size={14} /> {t('profile_setup_genres')}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {availableGenres.map(g => (
                                <button
                                    key={t(g as any)}
                                    onClick={() => handleToggleGenre(g)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${genres.includes(g) ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-500 border border-white/5'
                                        }`}
                                >
                                    {t(g as any)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isSaving || !age || !bio || genres.length === 0}
                    className={`w-full py-5 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all
                        ${(isSaving || !age || !bio || genres.length === 0) ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed' : 'bg-[#d4af37] text-black'}
                    `}
                >
                    {isSaving ? '...' : t('profile_setup_save')}
                </button>
            </div>
        </div>
    );
};

export default ProfileSetupView;
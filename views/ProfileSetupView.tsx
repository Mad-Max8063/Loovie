import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, FileText, Film, Check, Shield, X, UserPlus } from 'lucide-react';
import * as dbService from '../services/dbService';

const ProfileSetupView: React.FC = () => {
    const { t, currentUser, refreshProfile } = useAppContext();
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [genres, setGenres] = useState<string[]>([]);
    const [photos, setPhotos] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const availableGenres = ['genre_action', 'genre_comedy', 'genre_drama', 'genre_horror', 'genre_sci_fi', 'genre_documentary', 'genre_indie'];

    const handleToggleGenre = (g: string) => {
        setGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
    };

    const handleAddPhoto = () => {
        // Simulated photo addition for demo
        const demoPhotos = [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=600&auto=format&fit=crop'
        ];
        const nextPhoto = demoPhotos[photos.length % demoPhotos.length];
        setPhotos(prev => [...prev, nextPhoto]);
    };

    const handleRemovePhoto = (idx: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSave = async () => {
        if (!currentUser || isSaving || photos.length < 3) return;
        setIsSaving(true);
        try {
            const updatedProfile = {
                ...currentUser,
                age: parseInt(age),
                bio,
                favoriteGenres: genres,
                photos: photos,
                photoUrl: photos[0] // Set main thumbnail
            };
            await dbService.saveUser(updatedProfile);
            await refreshProfile();
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const isReady = age && bio && genres.length > 0 && photos.length >= 3;

    return (
        <div className="flex-1 flex flex-col bg-black p-8 overflow-y-auto no-scrollbar">
            <div className="max-w-sm mx-auto w-full space-y-8 py-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{t('profile_setup_title')}</h2>
                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{t('profile_setup_subtitle')}</p>
                </div>

                <div className="space-y-6">
                    {/* Photo Picker Section */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                                <Shield size={14} /> {t('profile_setup_photos')}
                            </label>
                            <p className="text-[9px] text-neutral-600 font-bold uppercase">{t('profile_setup_photos_desc')}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {photos.map((p, idx) => (
                                <div key={idx} className="relative aspect-[3/4] bg-neutral-900 rounded-xl overflow-hidden border border-white/5">
                                    <img src={p} className="w-full h-full object-cover" alt="upload" />
                                    <button
                                        onClick={() => handleRemovePhoto(idx)}
                                        className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white/70 hover:text-white"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            {photos.length < 6 && (
                                <button
                                    onClick={handleAddPhoto}
                                    className="aspect-[3/4] bg-neutral-900/50 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 text-neutral-500 hover:border-red-600/50 hover:text-red-500 transition-all active:scale-95"
                                >
                                    <UserPlus size={20} />
                                    <span className="text-[8px] font-black uppercase">Subir</span>
                                </button>
                            )}
                        </div>
                        <div className="flex gap-1 h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                            {[1, 2, 3].map(step => (
                                <div
                                    key={step}
                                    className={`flex-1 transition-all duration-500 ${photos.length >= step ? 'bg-red-600' : 'bg-transparent'}`}
                                />
                            ))}
                        </div>
                    </div>

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
                    disabled={isSaving || !isReady}
                    className={`w-full py-5 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all
                        ${(isSaving || !isReady) ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed' : 'bg-[#d4af37] text-black'}
                    `}
                >
                    {isSaving ? '...' : t('profile_setup_save')}
                </button>
            </div>
        </div>
    );
};

export default ProfileSetupView;
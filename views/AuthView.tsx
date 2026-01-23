import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Clapperboard, Mail, Lock, LogIn, UserPlus, ArrowLeft } from 'lucide-react';

interface AuthViewProps {
  onBack: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onBack }) => {
  const { t, login } = useAppContext();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login('email', email, password, isSignup);
    } catch (err: any) {
      setError(t('auth_error_email'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await login('google');
    } catch (err) {
      setError('Error with Google Sign-in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-black flex flex-col p-8 overflow-y-auto">
      <button onClick={onBack} className="self-start p-3 text-neutral-500 hover:text-white transition-colors">
        <ArrowLeft size={24} />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-sm mx-auto w-full">
        <div className="text-center space-y-2">
          <Clapperboard className="w-12 h-12 text-red-600 mx-auto" />
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{t('auth_title')}</h2>
          <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{t('auth_subtitle')}</p>
        </div>

        <div className="w-full space-y-4">
          <button
            onClick={handleGoogle}
            className="w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="google" />
            {t('auth_google_btn')}
          </button>

          <div className="flex items-center gap-4 text-neutral-800 py-2">
            <div className="flex-1 h-px bg-neutral-800"></div>
            <span className="text-[10px] font-black tracking-widest uppercase">{t('auth_or_email')}</span>
            <div className="flex-1 h-px bg-neutral-800"></div>
          </div>

          <form onSubmit={handleAuth} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
              <input
                type="email"
                placeholder={t('auth_email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-4 pl-12 text-xs text-white outline-none focus:border-red-600/50 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
              <input
                type="password"
                placeholder={t('auth_password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-white/5 rounded-2xl p-4 pl-12 text-xs text-white outline-none focus:border-red-600/50 transition-colors"
              />
            </div>

            {error && <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                isSignup ? <UserPlus size={18} /> : <LogIn size={18} />
              )}
              {isSignup ? t('auth_signup_btn') : t('auth_login_btn')}
            </button>
          </form>

          <button
            onClick={() => setIsSignup(!isSignup)}
            className="w-full py-2 text-neutral-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
          >
            {isSignup ? t('auth_switch_to_login') : t('auth_switch_to_signup')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
import React, { useState } from 'react';
import { X, Cloud, Key, Mail, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function LoginModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setIsRegister(false);
    setEmail('learner@example.com');
    setPassword('AwsCloudPass123!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (isRegister) {
        res = await api.register(name, email, password);
      } else {
        res = await api.login(email, password);
      }

      localStorage.setItem('aws_learning_token', res.token);
      localStorage.setItem('aws_learning_user', JSON.stringify(res.user));
      onAuthSuccess(res.user);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl neo-card p-6 sm:p-8 shadow-2xl space-y-5 border-amber-500/30">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-glow-gold/20">
            <Cloud className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white font-display">
              {isRegister ? 'Create AWS Learner Profile' : 'Sign in to AWS Platform'}
            </h3>
            <p className="text-xs text-slate-400">Save your progress, lab cleanups, and quiz streak</p>
          </div>
        </div>

        {/* 1-Click Demo Fill Pill */}
        <button
          type="button"
          onClick={handleFillDemo}
          className="w-full p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition text-xs font-bold flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Quick 1-Click Fill Seed Demo Account
        </button>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block font-bold text-slate-300 mb-1">Your Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jagadish"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white font-black text-xs shadow-glow-gold transition"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/[0.06]">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="font-bold text-amber-400 hover:underline ml-1"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New learner?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="font-bold text-amber-400 hover:underline ml-1"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Cloud, Flame, ShieldAlert, Award, User, LogOut, Palette, Zap, Bot } from 'lucide-react';

export default function Navbar({ user, onLogout, onOpenLogin, onOpenSafety, onOpenAiTrainer, currentTheme, onSelectTheme }) {
  const themes = [
    { id: 'indigo', name: 'Indigo Neon', color: 'bg-indigo-500' },
    { id: 'coral', name: 'AWS Coral', color: 'bg-orange-500' },
    { id: 'emerald', name: 'Matrix Emerald', color: 'bg-emerald-500' },
    { id: 'light', name: 'Studio Light', color: 'bg-slate-200 border border-slate-400' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-2xl border-b border-indigo-500/20 text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand with Glowing Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-10 h-10 rounded-xl bg-slate-950 border border-indigo-400/40 flex items-center justify-center text-white shadow-xl">
              <Cloud className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight font-display bg-gradient-to-r from-indigo-400 via-cyan-300 to-white bg-clip-text text-transparent">
                Cloud &amp; DevOps Master
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1 shadow-sm">
                <Zap className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> 20 Modules + Ollama AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">AWS Cloud, GitHub, Jenkins, Docker &amp; Kubernetes</p>
          </div>
        </div>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Theme Switcher Pill */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-900/90 border border-indigo-500/30 shadow-inner">
            <Palette className="w-3.5 h-3.5 text-indigo-400 ml-1 mr-0.5" />
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => onSelectTheme(t.id)}
                className={`w-5 h-5 rounded-full ${t.color} transition-all transform ${
                  currentTheme === t.id
                    ? 'ring-2 ring-white scale-110 shadow-lg'
                    : 'opacity-50 hover:opacity-100'
                }`}
                title={`Switch to ${t.name}`}
              />
            ))}
          </div>

          {/* AI Trainer Button */}
          {onOpenAiTrainer && (
            <button
              onClick={onOpenAiTrainer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition text-xs font-bold shadow-sm"
              title="Open AI DevOps Trainer"
            >
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">AI Trainer</span>
            </button>
          )}

          {/* Free Tier Shield Button */}
          <button
            onClick={onOpenSafety}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition text-xs font-bold shadow-sm"
            title="Free Tier Safety Center"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cost Guard</span>
          </button>

          {/* Learning Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs font-bold shadow-sm">
            <Flame className="w-4 h-4 text-orange-400 animate-pulse fill-orange-400/30" />
            <span>{user ? user.streakDays || 1 : 1}d</span>
          </div>

          {/* User Profile / Login */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-indigo-500/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 border border-white/20 text-white flex items-center justify-center font-bold text-xs shadow-md">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-90 text-white font-extrabold text-xs shadow-glow-indigo transition flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 stroke-[2.5]" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

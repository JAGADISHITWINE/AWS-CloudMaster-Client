import React from 'react';
import {
  Cloud,
  Flame,
  ShieldAlert,
  User,
  LogOut,
  Zap,
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
  Maximize2,
  Minimize2,
  Search,
  Sparkles
} from 'lucide-react';

export default function Navbar({
  user,
  onLogout,
  onOpenLogin,
  onOpenSafety,
  onOpenAiTrainer,
  isSidebarCollapsed = false,
  onToggleSidebar,
  isFullscreen = false,
  onToggleFullscreen,
  onOpenSearch
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#0b101b]/90 backdrop-blur-2xl border-b border-white/[0.08] text-slate-100 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Section: Sidebar Toggle + Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Sidebar Collapse/Expand Toggle */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06] transition-all flex items-center justify-center"
              title={isSidebarCollapsed ? "Expand Sidebar (Widescreen)" : "Collapse Sidebar (Compact Rail)"}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-cyan-400" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-slate-400" />
              )}
            </button>
          )}

          {/* Brand with Glowing Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-cyan-400/30 flex items-center justify-center text-white shadow-xl">
                <Cloud className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight font-display bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent">
                  Cloud &amp; DevOps Master
                </span>
                <span className="hidden sm:flex text-[10px] font-black uppercase tracking-wider bg-cyan-500/15 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30 items-center gap-1 shadow-sm">
                  <Zap className="w-2.5 h-2.5 fill-cyan-400 text-cyan-400" /> 24 Modules
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                AWS Cloud, DevOps CI/CD &amp; Full-Stack (Angular + Node.js)
              </p>
            </div>
          </div>
        </div>

        {/* Center / Quick Search Bar */}
        {onOpenSearch && (
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:border-cyan-500/30 text-xs text-slate-400 hover:text-slate-300 transition-all shadow-inner"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Quick search topics, commands, interview Q&amp;A...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white/[0.06] rounded border border-white/[0.1] text-slate-400">
                ⌘K
              </kbd>
            </button>
          </div>
        )}

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2 sm:gap-3">
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

          {/* Free Tier Cost Guard */}
          <button
            onClick={onOpenSafety}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition text-xs font-bold shadow-sm"
            title="Free Tier Safety Center"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cost Guard</span>
          </button>

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06] transition"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <Maximize2 className="w-4 h-4 text-slate-400" />
              )}
            </button>
          )}

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

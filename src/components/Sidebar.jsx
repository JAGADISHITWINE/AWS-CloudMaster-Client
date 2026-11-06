import React from 'react';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Terminal,
  HelpCircle,
  Briefcase,
  CheckSquare,
  BarChart2,
  RotateCcw,
  ShieldCheck,
  Settings,
  Bot,
  Code,
  FolderGit2,
  BookMarked,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  onSelectTab,
  pendingCleanups = 0,
  dueRevisions = 0,
  isCollapsed = false,
  onToggleCollapse
}) {
  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-trainer', label: 'AI DevOps Trainer', icon: Bot, badgeText: 'Ollama AI', highlight: true },
    { id: 'hands-on-projects', label: 'Hands-on Projects', icon: FolderGit2, badgeText: '7 Projects' },
    { id: 'definitions-glossary', label: 'Definitions Glossary', icon: BookMarked, badgeText: 'A-Z Terms' },
    { id: 'command-hub', label: 'Commands Hub', icon: Code, badgeText: 'Cheatsheet' },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Compass, badgeText: '24 Modules' },
    { id: 'topic-detail', label: 'Topic Notes', icon: BookOpen },
    { id: 'practice-lab', label: 'Practice Lab', icon: Terminal },
  ];

  const practiceNav = [
    { id: 'scenario-practice', label: 'Scenario Practice', icon: HelpCircle },
    { id: 'interview-prep', label: 'Interview Prep', icon: Briefcase },
    { id: 'quiz-center', label: 'Quiz Center', icon: CheckSquare },
  ];

  const analyticsNav = [
    { id: 'analytics', label: 'Progress Analytics', icon: BarChart2 },
    { id: 'revision-center', label: 'Revision Center', icon: RotateCcw, badge: dueRevisions > 0 ? dueRevisions : null },
    { id: 'free-tier-safety', label: 'Free Tier Safety', icon: ShieldCheck, alert: pendingCleanups > 0 ? pendingCleanups : null },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderItem = (item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;

    if (isCollapsed) {
      return (
        <div key={item.id} className="relative group flex justify-center py-1">
          <button
            onClick={() => onSelectTab(item.id)}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 relative ${
              isActive
                ? 'bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-500/30 text-cyan-300 border border-cyan-400/40 shadow-glow-cyan/20'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
            }`}
            title={item.label}
          >
            <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'text-slate-400'}`} />
            {item.badge && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-black rounded-full bg-purple-500 text-white flex items-center justify-center border border-slate-900">
                {item.badge}
              </span>
            )}
            {item.alert && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border border-slate-900 animate-ping" />
            )}
          </button>
          {/* Floating Tooltip */}
          <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-slate-900 text-slate-100 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 border border-slate-700 shadow-xl">
            {item.label}
          </div>
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => onSelectTab(item.id)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 group ${
          isActive
            ? 'bg-gradient-to-r from-indigo-500/25 via-purple-500/15 to-transparent text-indigo-200 font-bold border-l-2 border-indigo-400 shadow-glow-indigo/10'
            : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'text-slate-400'}`} />
          <span className="truncate">{item.label}</span>
        </div>
        {item.badgeText && (
          <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md border flex-shrink-0 ${
            item.highlight
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse shadow-sm'
              : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20'
          }`}>
            {item.badgeText}
          </span>
        )}
        {item.badge && (
          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex-shrink-0">
            {item.badge}
          </span>
        )}
        {item.alert && (
          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse flex-shrink-0">
            {item.alert} clean
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      className={`bg-[#0b101b]/80 backdrop-blur-2xl border-r border-white/[0.06] flex flex-col flex-shrink-0 min-h-[calc(100vh-4rem)] transition-all duration-300 ${
        isCollapsed ? 'w-20 p-2 items-center' : 'w-64 lg:w-72 p-3.5'
      }`}
    >
      <div className="space-y-4 w-full">
        {/* Core Roadmap */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-black uppercase tracking-widest text-indigo-400/80">
              Core Roadmap
            </p>
          )}
          {mainNav.map(renderItem)}
        </div>

        {/* Hands-on & Prep */}
        <div className="space-y-1 pt-1">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-black uppercase tracking-widest text-cyan-400/80">
              Hands-on &amp; Prep
            </p>
          )}
          {practiceNav.map(renderItem)}
        </div>

        {/* Analytics & Safety */}
        <div className="space-y-1 pt-1">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-black uppercase tracking-widest text-purple-400/80">
              Analytics &amp; Safety
            </p>
          )}
          {analyticsNav.map(renderItem)}
        </div>
      </div>

      {/* Footer / Toggle & Zero-Bill Safety */}
      <div className="mt-auto pt-4 w-full space-y-2">
        {!isCollapsed ? (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Bill Safety</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              All labs include automated teardown instructions and local sandbox CLI mocks.
            </p>
          </div>
        ) : null}

        {/* Rail Collapse Toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] border border-white/[0.05] transition text-xs font-semibold"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Navigation</span>
              </div>
            )}
          </button>
        )}
      </div>
    </aside>
  );
}

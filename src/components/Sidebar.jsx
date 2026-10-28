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
  Sparkles,
  Bot,
  Code,
  FolderGit2,
  BookMarked
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, pendingCleanups = 0, dueRevisions = 0 }) {
  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-trainer', label: 'AI DevOps Trainer', icon: Bot, badgeText: 'Ollama AI', highlight: true },
    { id: 'hands-on-projects', label: 'Hands-on Projects', icon: FolderGit2, badgeText: '7 Real-World' },
    { id: 'definitions-glossary', label: 'Definitions Glossary', icon: BookMarked, badgeText: 'A-Z Terms' },
    { id: 'command-hub', label: 'Commands Hub', icon: Code, badgeText: 'Git/K8s/Doc' },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Compass, badgeText: '20 Mod' },
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
    return (
      <button
        key={item.id}
        onClick={() => onSelectTab(item.id)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 group ${
          isActive
            ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-transparent text-indigo-300 font-bold border-l-2 border-indigo-400 shadow-glow-indigo/10'
            : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'text-slate-400'}`} />
          <span>{item.label}</span>
        </div>
        {item.badgeText && (
          <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md border ${
            item.highlight
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse shadow-sm'
              : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/20'
          }`}>
            {item.badgeText}
          </span>
        )}
        {item.badge && (
          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
            {item.badge}
          </span>
        )}
        {item.alert && (
          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
            {item.alert} clean
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-64 bg-slate-950/60 backdrop-blur-2xl border-r border-indigo-500/15 flex flex-col flex-shrink-0 min-h-[calc(100vh-4rem)] p-3">
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-black uppercase tracking-widest text-indigo-400/80">Core Roadmap</p>
          {mainNav.map(renderItem)}
        </div>

        <div className="space-y-1 pt-1">
          <p className="px-3 text-[10px] font-black uppercase tracking-widest text-cyan-400/80">Hands-on &amp; Prep</p>
          {practiceNav.map(renderItem)}
        </div>

        <div className="space-y-1 pt-1">
          <p className="px-3 text-[10px] font-black uppercase tracking-widest text-purple-400/80">Analytics &amp; Safety</p>
          {analyticsNav.map(renderItem)}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero-Bill Safety</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            All labs feature step-by-step cleanup checklists and local CLI mocks.
          </p>
        </div>
      </div>
    </aside>
  );
}

import React, { useState, useMemo } from 'react';
import {
  Terminal,
  Search,
  Copy,
  Check,
  Filter,
  Sparkles,
  ExternalLink,
  Bot,
  Layers,
  Code,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { DEVOPS_COMMANDS } from '../data/commandsData';

export const CATEGORIES = [
  { id: 'all', label: 'All Commands', count: DEVOPS_COMMANDS.length },
  { id: 'git', label: '🌿 Git & GitHub', count: DEVOPS_COMMANDS.filter(c => c.category === 'git').length },
  { id: 'jenkins', label: '⚙️ Jenkins CI/CD', count: DEVOPS_COMMANDS.filter(c => c.category === 'jenkins').length },
  { id: 'docker', label: '🐳 Docker Containers', count: DEVOPS_COMMANDS.filter(c => c.category === 'docker').length },
  { id: 'kubernetes', label: '☸️ Kubernetes (kubectl)', count: DEVOPS_COMMANDS.filter(c => c.category === 'kubernetes').length },
  { id: 'aws', label: '☁️ AWS Cloud CLI', count: DEVOPS_COMMANDS.filter(c => c.category === 'aws').length },
];

export default function CommandHub({ onNavigate, onAskAi }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredCommands = useMemo(() => {
    return DEVOPS_COMMANDS.filter(cmd => {
      const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery =
        cmd.title.toLowerCase().includes(query) ||
        cmd.command.toLowerCase().includes(query) ||
        cmd.explanation.toLowerCase().includes(query) ||
        cmd.subcategory.toLowerCase().includes(query) ||
        cmd.bestPractice?.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (id, command) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card border-amber-500/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/35">
              Production Cheatsheet
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-300 font-semibold">DevOps &amp; Cloud Commands Master Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            Enterprise CLI &amp; Automation Cheatsheet
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Battle-tested commands for <span className="text-amber-300 font-bold">Git</span>, <span className="text-cyan-300 font-bold">Jenkins</span>, <span className="text-blue-300 font-bold">Docker</span>, <span className="text-indigo-300 font-bold">Kubernetes (kubectl)</span>, and <span className="text-amber-400 font-bold">AWS CLI</span>. Instant 1-click copy, flag explanations, and live AI diagnostics.
          </p>
        </div>
      </div>

      {/* Controls Bar: Category Filter & Search Input */}
      <div className="p-4 sm:p-5 rounded-3xl neo-card space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-glow-gold'
                    : 'bg-white/[0.03] text-slate-300 border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands, flags, keywords (e.g., 'rebase', 'rollout undo', 'prune', 'multi-stage', 'kubeconfig')..."
            className="w-full pl-11 pr-4 py-3 bg-slate-950/70 border border-white/[0.08] rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <span>Showing <strong className="text-white">{filteredCommands.length}</strong> commands</span>
        {searchQuery && <span>Filtered by &ldquo;{searchQuery}&rdquo;</span>}
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filteredCommands.length === 0 ? (
          <div className="p-12 text-center neo-card rounded-3xl space-y-3">
            <Info className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">No commands found matching your criteria</h3>
            <p className="text-xs text-slate-400">Try clearing the search query or switching category tabs.</p>
          </div>
        ) : (
          filteredCommands.map((cmd) => {
            const isCopied = copiedId === cmd.id;
            return (
              <div
                key={cmd.id}
                className="p-5 sm:p-6 rounded-3xl neo-card border border-white/[0.08] hover:border-amber-500/30 transition space-y-4 shadow-lg group"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {cmd.categoryLabel}
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-xs text-slate-400 font-semibold">{cmd.subcategory}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-200 transition">
                      {cmd.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(cmd.id, cmd.command)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        isCopied
                          ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                          : 'bg-white/[0.06] hover:bg-amber-500 hover:text-white text-slate-300 border border-white/[0.1]'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('practice-lab')}
                        title="Run in Practice Lab Simulator"
                        className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition"
                      >
                        <Terminal className="w-4 h-4 text-amber-400" />
                      </button>
                    )}
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('ai-trainer')}
                        title="Ask AI DevOps Trainer about this"
                        className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition"
                      >
                        <Bot className="w-4 h-4 text-indigo-400" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {cmd.explanation}
                </p>

                {/* Command Code Block */}
                <div className="relative rounded-2xl bg-slate-950/90 border border-amber-500/20 p-4 font-mono text-xs sm:text-[13px] text-amber-300 overflow-x-auto shadow-inner">
                  <pre className="whitespace-pre-wrap select-all">{cmd.command}</pre>
                </div>

                {/* Flags Breakdown */}
                {cmd.flags && cmd.flags.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-black tracking-wider uppercase text-slate-400 block">
                      Options &amp; Flags Breakdown:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cmd.flags.map((f, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs flex items-start gap-2">
                          <code className="text-amber-400 font-mono font-bold text-[11px] flex-shrink-0 bg-amber-500/10 px-1.5 py-0.5 rounded">
                            {f.flag}
                          </code>
                          <span className="text-slate-300 text-[11px] leading-tight">{f.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Production Best Practice */}
                {cmd.bestPractice && (
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200">
                    <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 font-bold block mb-0.5">Production Best Practice:</strong>
                      <span>{cmd.bestPractice}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

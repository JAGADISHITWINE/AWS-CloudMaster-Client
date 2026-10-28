import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Bot,
  Copy,
  Check,
  Tag,
  Layers,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { DEFINITIONS_DATA } from '../data/definitionsData';

const CATEGORIES = [
  { id: 'all', label: 'All Terms', count: DEFINITIONS_DATA.length },
  { id: 'linux', label: '🐧 Linux & OS', count: DEFINITIONS_DATA.filter(d => d.category === 'linux').length },
  { id: 'git', label: '🌿 Git & GitHub', count: DEFINITIONS_DATA.filter(d => d.category === 'git').length },
  { id: 'build', label: '🛠️ Build & Quality', count: DEFINITIONS_DATA.filter(d => d.category === 'build').length },
  { id: 'cicd', label: '⚙️ CI/CD & Jenkins', count: DEFINITIONS_DATA.filter(d => d.category === 'cicd').length },
  { id: 'iac', label: '📜 IaC & Terraform', count: DEFINITIONS_DATA.filter(d => d.category === 'iac').length },
  { id: 'docker', label: '🐳 Docker Containers', count: DEFINITIONS_DATA.filter(d => d.category === 'docker').length },
  { id: 'kubernetes', label: '☸️ Kubernetes (K8s)', count: DEFINITIONS_DATA.filter(d => d.category === 'kubernetes').length },
  { id: 'aws', label: '☁️ AWS Cloud', count: DEFINITIONS_DATA.filter(d => d.category === 'aws').length },
  { id: 'monitoring', label: '📊 Observability', count: DEFINITIONS_DATA.filter(d => d.category === 'monitoring').length },
];

export default function DefinitionsGlossary({ onNavigate, onAskAi }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTerm, setCopiedTerm] = useState(null);

  const filteredDefinitions = useMemo(() => {
    return DEFINITIONS_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery =
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        item.whyItMatters?.toLowerCase().includes(query) ||
        item.example?.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (term, text) => {
    navigator.clipboard.writeText(`${term}: ${text}`);
    setCopiedTerm(term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card border-amber-500/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/35">
              Knowledge Dictionary
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-300 font-semibold">From Scratch to Mid-Level</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            DevOps &amp; Cloud Definitions Glossary
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Never get confused by industry jargon again. Clear, crystal-clear definitions and practical real-world examples for every term across <span className="text-amber-300 font-bold">Linux</span>, <span className="text-emerald-300 font-bold">Git</span>, <span className="text-cyan-300 font-bold">Jenkins</span>, <span className="text-blue-300 font-bold">Docker</span>, <span className="text-indigo-300 font-bold">Kubernetes</span>, <span className="text-purple-300 font-bold">Terraform</span>, and <span className="text-amber-400 font-bold">AWS</span>.
          </p>
        </div>
      </div>

      {/* Controls Bar: Category Filter & Search Input */}
      <div className="p-4 sm:p-5 rounded-3xl neo-card space-y-4">
        {/* Category Filter Pills */}
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
            placeholder="Search concepts, jargon, acronyms (e.g., 'Inode', 'Daemon', 'Multi-Stage', 'ClusterIP', 'VPC', 'cgroup')..."
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
        <span>Showing <strong className="text-white">{filteredDefinitions.length}</strong> core concepts</span>
        {searchQuery && <span>Filtered by &ldquo;{searchQuery}&rdquo;</span>}
      </div>

      {/* Definitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDefinitions.length === 0 ? (
          <div className="col-span-full p-12 text-center neo-card rounded-3xl space-y-3">
            <Info className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">No definitions found</h3>
            <p className="text-xs text-slate-400">Try clearing the search query or selecting &ldquo;All Terms&rdquo;.</p>
          </div>
        ) : (
          filteredDefinitions.map((item, idx) => {
            const isCopied = copiedTerm === item.term;
            return (
              <div
                key={idx}
                className="p-5 rounded-3xl neo-card border border-white/[0.07] hover:border-amber-500/35 transition space-y-3.5 shadow-lg group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {item.categoryLabel}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                        {item.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(item.term, item.definition)}
                        title="Copy Definition"
                        className={`p-1.5 rounded-xl border text-xs transition ${
                          isCopied
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/[0.08]'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      {onNavigate && (
                        <button
                          onClick={() => onNavigate('ai-trainer')}
                          title="Ask AI DevOps Trainer for in-depth explanation"
                          className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-indigo-300 border border-indigo-500/30 transition"
                        >
                          <Bot className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-200 transition">
                    {item.term}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/[0.05]">
                  {item.whyItMatters && (
                    <div className="text-xs text-amber-200/90 flex items-start gap-2">
                      <span className="font-bold text-amber-400 flex-shrink-0">💡 Why It Matters:</span>
                      <span className="text-slate-300 leading-tight">{item.whyItMatters}</span>
                    </div>
                  )}

                  {item.example && (
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/[0.05] text-[11px] font-mono text-cyan-300 leading-relaxed">
                      <span className="text-slate-500 select-none block font-sans text-[10px] font-bold uppercase mb-0.5">Practical Example:</span>
                      <span>{item.example}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

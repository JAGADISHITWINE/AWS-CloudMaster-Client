import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  BookOpen,
  Terminal,
  Layers,
  ChevronRight,
  ChevronDown,
  Search,
  Sparkles,
  Youtube,
  LayoutGrid,
  List,
  ExternalLink
} from 'lucide-react';
import CostRiskBadge from '../components/CostRiskBadge';
import DiagramViewer from '../components/DiagramViewer';
import { getArchitectureForTopic } from '../data/architectureData';
import { FALLBACK_MODULES } from '../data/fallbackModulesData';

export default function LearningRoadmap({ modules, onSelectTopic, onSelectModule }) {
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [activeDiagram, setActiveDiagram] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [expandedModules, setExpandedModules] = useState({});

  const activeModules = (modules && modules.length > 0) ? modules : FALLBACK_MODULES;

  const toggleModuleExpanded = (modNum) => {
    setExpandedModules(prev => ({ ...prev, [modNum]: !prev[modNum] }));
  };

  const filteredModules = activeModules.filter(m => {
    const matchesLevel = filterLevel === 'ALL' || m.level.toUpperCase() === filterLevel;
    const isDevOps = m.moduleNumber >= 16 && m.moduleNumber <= 20;
    const isFullStack = m.moduleNumber >= 21;
    const isAWS = m.moduleNumber <= 15;

    let matchesCategory = true;
    if (categoryFilter === 'AWS') matchesCategory = isAWS;
    else if (categoryFilter === 'DEVOPS') matchesCategory = isDevOps;
    else if (categoryFilter === 'FULLSTACK') matchesCategory = isFullStack;
    else if (categoryFilter === 'ANGULAR') matchesCategory = m.moduleNumber === 21;
    else if (categoryFilter === 'NODEJS') matchesCategory = m.moduleNumber === 22;
    else if (categoryFilter === 'APIS') matchesCategory = m.moduleNumber === 23;
    else if (categoryFilter === 'DATABASE') matchesCategory = m.moduleNumber === 24;
    else if (categoryFilter === 'GIT') matchesCategory = m.moduleNumber === 16;
    else if (categoryFilter === 'JENKINS') matchesCategory = m.moduleNumber === 17;
    else if (categoryFilter === 'DOCKER') matchesCategory = m.moduleNumber === 18;
    else if (categoryFilter === 'K8S') matchesCategory = m.moduleNumber === 19;
    else if (categoryFilter === 'CICD') matchesCategory = m.moduleNumber === 20;

    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topics.some(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesLevel && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 w-full pb-16">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-400" /> {activeModules.length} Structured Modules
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              AWS Cloud + DevOps Pipelines + Full-Stack (Angular &amp; Node.js)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1.5 tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            Enterprise Cloud, DevOps &amp; Full-Stack Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed mt-1">
            Visual curriculum spanning AWS Cloud infrastructure, IAM, and GitOps CI/CD pipelines to Angular standalone frontend architecture, Node.js asynchronous backends, RESTful APIs, and system design.
          </p>
        </div>

        {/* Search, Level Filters & View Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Toggle */}
          <div className="flex items-center rounded-xl bg-slate-900/90 border border-white/[0.08] p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View (Full-Screen Multi-Column)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="List View (Stacked Rows)"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/20 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-400 w-48 sm:w-60 transition"
            />
          </div>

          {/* Difficulty Level Switcher */}
          <div className="flex items-center rounded-xl bg-slate-900/90 border border-amber-500/25 p-1 text-xs">
            {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                  filterLevel === lvl
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-glow-gold/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Category Chips Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 overflow-x-auto scrollbar-none w-full">
        <button
          onClick={() => setCategoryFilter('ALL')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'ALL'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>All Modules</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-bold">{activeModules.length}</span>
        </button>

        <button
          onClick={() => setCategoryFilter('FULLSTACK')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'FULLSTACK'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>⚡ Full-Stack (Angular &amp; Node)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500/30 text-rose-300 font-bold">4 Mods</span>
        </button>

        <button
          onClick={() => setCategoryFilter('ANGULAR')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'ANGULAR'
              ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🅰️ Angular</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500/30 text-red-300 font-bold">Mod 21</span>
        </button>

        <button
          onClick={() => setCategoryFilter('NODEJS')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'NODEJS'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🟢 Node.js</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/30 text-emerald-300 font-bold">Mod 22</span>
        </button>

        <button
          onClick={() => setCategoryFilter('APIS')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'APIS'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🛡️ REST APIs</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-500/30 text-blue-300 font-bold">Mod 23</span>
        </button>

        <button
          onClick={() => setCategoryFilter('DATABASE')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'DATABASE'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🗄️ Database &amp; System Design</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-500/30 text-purple-300 font-bold">Mod 24</span>
        </button>

        <button
          onClick={() => setCategoryFilter('AWS')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'AWS'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>☁️ AWS Cloud</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-bold">15 Mods</span>
        </button>

        <button
          onClick={() => setCategoryFilter('DEVOPS')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'DEVOPS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🚀 DevOps CI/CD</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-cyan-500/30 text-cyan-300 font-bold">5 Mods</span>
        </button>
      </div>

      {/* Modules Rendering: Responsive Multi-Column Grid or List */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredModules.map(m => {
          const isDevOps = m.moduleNumber >= 16 && m.moduleNumber <= 20;
          const isFullStack = m.moduleNumber >= 21;
          const isExpanded = expandedModules[m.moduleNumber] !== undefined ? expandedModules[m.moduleNumber] : true;

          const badgeColor = isFullStack
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            : isDevOps
            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
            : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

          return (
            <div
              key={m.id || m.moduleNumber}
              className="neo-card rounded-3xl overflow-hidden border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Module Card Header */}
              <div className="p-5 sm:p-6 border-b border-white/[0.06] bg-slate-950/40 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-xs font-black rounded-xl border ${badgeColor}`}>
                      Module {m.moduleNumber}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60">
                      {m.level}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {m.topics.length} {m.topics.length === 1 ? 'Topic' : 'Topics'}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleModuleExpanded(m.moduleNumber)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
                    title={isExpanded ? "Collapse Topics" : "Expand Topics"}
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {m.description}
                </p>
              </div>

              {/* Topics Drawer */}
              {isExpanded && (
                <div className="p-3 sm:p-4 bg-slate-950/60 divide-y divide-white/[0.04] flex-1">
                  {m.topics.map(t => (
                    <div
                      key={t.slug || t.id}
                      className="py-2.5 px-2.5 rounded-xl hover:bg-white/[0.03] transition space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-slate-200 hover:text-cyan-300 transition cursor-pointer" onClick={() => onSelectTopic(t.slug, 'topic-detail')}>
                              {t.title}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                              <Clock className="w-2.5 h-2.5" />
                              {t.estimatedMinutes || 35}m focus
                            </span>
                            <CostRiskBadge level={t.costRisk} />
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{t.summary}</p>
                        </div>
                      </div>

                      {/* Topic Action Bar */}
                      <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                        <button
                          onClick={() => setActiveDiagram(getArchitectureForTopic(t.slug, m.moduleNumber, t.title))}
                          className="px-2 py-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-[10px] font-bold transition flex items-center gap-1"
                          title="View Topic Architecture Diagram"
                        >
                          <Layers className="w-3 h-3 text-indigo-400" />
                          <span>Diagram</span>
                        </button>
                        <button
                          onClick={() => onSelectTopic(t.slug, 'topic-detail')}
                          className="px-2 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-[10px] font-bold transition flex items-center gap-1"
                          title="Watch YouTube Video"
                        >
                          <Youtube className="w-3 h-3 text-rose-400" />
                          <span>Video</span>
                        </button>
                        <button
                          onClick={() => onSelectTopic(t.slug, 'topic-detail')}
                          className="px-2 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-white border border-amber-500/30 text-[10px] font-bold transition flex items-center gap-1"
                          title="Read Notes & Focus Timer"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Notes</span>
                        </button>
                        <button
                          onClick={() => onSelectTopic(t.slug, 'topic-detail')}
                          className="px-2 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-500 text-amber-300 hover:text-white border border-amber-400/40 text-[10px] font-black transition flex items-center gap-1"
                          title={`Concentrate & Study (${t.estimatedMinutes || 35} mins Focus)`}
                        >
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{t.estimatedMinutes || 35}m Focus</span>
                        </button>
                        <button
                          onClick={() => onSelectTopic(t.slug, 'practice-lab')}
                          className="px-2 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/30 text-[10px] font-bold transition flex items-center gap-1"
                          title="Practice Lab"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>Lab</span>
                        </button>
                        <button
                          onClick={() => onSelectTopic(t.slug, 'quiz-center')}
                          className="px-2 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-white border border-cyan-500/30 text-[10px] font-bold transition flex items-center gap-1"
                          title="Take Quiz"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Quiz</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Visual Architecture Lightbox Modal (Full-Screen Responsive) */}
      {activeDiagram && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
          <div className="w-full max-w-7xl neo-card rounded-3xl border border-indigo-500/40 p-6 sm:p-8 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">{activeDiagram.title}</h3>
                  <span className="text-xs text-indigo-300 font-bold">{activeDiagram.category}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveDiagram(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold transition"
              >
                Close ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeDiagram.description}</p>

            <DiagramViewer
              svgString={activeDiagram.svg}
              title={activeDiagram.title}
              category={activeDiagram.category}
              flowSteps={activeDiagram.flowSteps}
              stepByStep={activeDiagram.stepByStep}
              interRelationships={activeDiagram.interRelationships}
              endToEndFlow={activeDiagram.endToEndFlow}
              moduleContext={activeDiagram.moduleContext}
            />
          </div>
        </div>
      )}
    </div>
  );
}

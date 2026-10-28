import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  BookOpen,
  Terminal,
  HelpCircle,
  Briefcase,
  Layers,
  ChevronRight,
  ShieldAlert,
  Search,
  Filter,
  Sparkles,
  Youtube,
  Play
} from 'lucide-react';
import CostRiskBadge from '../components/CostRiskBadge';
import DiagramViewer from '../components/DiagramViewer';
import { getArchitectureForTopic } from '../data/architectureData';

export default function LearningRoadmap({ modules, onSelectTopic, onSelectModule }) {
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // 'ALL' | 'AWS' | 'DEVOPS' | 'GIT' | 'JENKINS' | 'DOCKER' | 'K8S'
  const [activeDiagram, setActiveDiagram] = useState(null);

  if (!modules || modules.length === 0) {
    return <div className="p-8 text-center text-slate-400">Loading learning modules...</div>;
  }

  const filteredModules = modules.filter(m => {
    const matchesLevel = filterLevel === 'ALL' || m.level.toUpperCase() === filterLevel;
    const isDevOps = m.moduleNumber >= 16;
    let matchesCategory = true;
    if (categoryFilter === 'AWS') matchesCategory = !isDevOps;
    else if (categoryFilter === 'DEVOPS') matchesCategory = isDevOps;
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-400" /> {modules.length} Structured Modules
            </span>
            <span className="text-xs text-slate-400 font-medium">AWS Cloud + GitHub + Jenkins + Docker + K8s</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            Cloud &amp; DevOps Engineering Roadmap
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            From foundational AWS infrastructure and IAM to GitHub version control, Jenkins pipelines, Docker multi-stage builds, and Kubernetes orchestration.
          </p>
        </div>

        {/* Search & Level Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/20 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-400 w-48 sm:w-64 transition"
            />
          </div>

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

      {/* Category Tabs: Separated so learners can study one topic at a time without confusion */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setCategoryFilter('ALL')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'ALL'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>All Modules</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-bold">{modules.length}</span>
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
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-bold">15</span>
        </button>

        <button
          onClick={() => setCategoryFilter('GIT')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'GIT'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🌿 Git &amp; GitHub</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/30 text-amber-300 font-bold">Mod 16</span>
        </button>

        <button
          onClick={() => setCategoryFilter('JENKINS')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'JENKINS'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>⚙️ Jenkins CI/CD</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/30 text-amber-300 font-bold">Mod 17</span>
        </button>

        <button
          onClick={() => setCategoryFilter('DOCKER')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'DOCKER'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🐳 Docker</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/30 text-amber-300 font-bold">Mod 18</span>
        </button>

        <button
          onClick={() => setCategoryFilter('K8S')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'K8S'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>☸️ Kubernetes</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/30 text-amber-300 font-bold">Mod 19</span>
        </button>

        <button
          onClick={() => setCategoryFilter('CICD')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            categoryFilter === 'CICD'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>🚀 End-to-End Pipeline</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/30 text-amber-300 font-bold">Mod 20</span>
        </button>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filteredModules.map(m => {
          const isComplete = m.completionPercentage === 100;
          return (
            <div
              key={m.id}
              className="rounded-3xl neo-card overflow-hidden transition-all duration-300 hover:border-amber-500/40"
            >
              {/* Module Header Bar */}
              <div className="p-5 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-base flex-shrink-0 shadow-glow-gold/20 font-display">
                    #{m.moduleNumber}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-amber-400 uppercase tracking-wider">{m.level}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 font-medium">{m.totalTopics} {m.totalTopics === 1 ? 'Topic' : 'Topics'}</span>
                      {isComplete && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-extrabold text-white">{m.title}</h2>
                    <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">{m.description}</p>
                  </div>
                </div>

                {/* Module Actions & Completion Progress Indicator */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => setActiveDiagram(getArchitectureForTopic(m.topics[0]?.slug, m.moduleNumber, m.title))}
                    className="px-3 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    title="View Visual Module Architecture"
                  >
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Architecture</span>
                  </button>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-300">{m.completedTopics}/{m.totalTopics} done</span>
                    <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden mt-1 border border-amber-500/20">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all"
                        style={{ width: `${m.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics inside Module */}
              <div className="p-4 bg-slate-950/40 divide-y divide-white/[0.04]">
                {m.topics.map(t => {
                  return (
                    <div
                      key={t.id}
                      className="py-3 px-2 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white/[0.03] rounded-2xl transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-200">{t.title}</span>
                          <CostRiskBadge level={t.costRisk} />
                          {t.status === 'COMPLETED' ? (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                              Completed
                            </span>
                          ) : t.status === 'IN_PROGRESS' ? (
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded-full">
                              In Progress
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{t.summary}</p>
                        <p className="text-[11px] text-amber-300/90 font-medium italic">
                          💡 Key Takeaway: {t.keyTakeaway}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setActiveDiagram(getArchitectureForTopic(t.slug, m.moduleNumber, t.title))}
                          className="px-2.5 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-bold transition flex items-center gap-1.5"
                          title="View Topic Architecture Diagram"
                        >
                          <Layers className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Diagram</span>
                        </button>
                        <button
                          onClick={() => onSelectTopic(t.slug, 'topic-detail')}
                          className="px-2.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5"
                          title="Watch YouTube Masterclass"
                        >
                          <Youtube className="w-3.5 h-3.5 text-rose-400" />
                          <span>Video</span>
                        </button>
                        <button
                          onClick={() => onSelectTopic(t.slug, 'topic-detail')}
                          className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-white border border-amber-500/30 text-xs font-bold transition flex items-center gap-1.5"
                          title="Read Notes"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Notes</span>
                        </button>
                        <button
                          onClick={() => onSelectTopic(t.slug, 'practice-lab')}
                          className="px-2.5 py-1.5 rounded-xl bg-orange-500/15 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/30 text-xs font-bold transition flex items-center gap-1.5"
                          title="Practice Lab"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Lab</span>
                        </button>
                        <button
                          onClick={() => onSelectTopic(t.slug, 'quiz-center')}
                          className="px-2.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-white border border-cyan-500/30 text-xs font-bold transition flex items-center gap-1.5"
                          title="Quiz"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Quiz</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Architecture Lightbox Modal */}
      {activeDiagram && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="max-w-5xl w-full neo-card rounded-3xl border border-indigo-500/40 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">{activeDiagram.title}</h3>
                  <span className="text-xs text-indigo-300 font-bold">{activeDiagram.category}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveDiagram(null)}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold transition"
              >
                Close ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeDiagram.description}</p>

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

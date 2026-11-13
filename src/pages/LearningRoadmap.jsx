import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Layers, Search, Terminal } from 'lucide-react';
import { getArchitectureForTopic } from '../data/architectureData';
import { FALLBACK_MODULES } from '../data/fallbackModulesData';

export default function LearningRoadmap({ modules, onSelectTopic }) {
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [expandedModuleId, setExpandedModuleId] = useState(undefined);

  const activeModules = (modules && modules.length > 0) ? modules : FALLBACK_MODULES;

  const filteredModules = modules.filter(module => {
    const level = (module.level || '').toUpperCase();
    const matchesLevel = filterLevel === 'ALL' || level === filterLevel;
    const isDevOps = module.moduleNumber >= 16;
    const matchesCategory = categoryFilter === 'ALL' || (categoryFilter === 'DEVOPS' ? isDevOps : !isDevOps);
    const query = searchQuery.toLowerCase();
    const matchesSearch = module.title.toLowerCase().includes(query)
      || (module.description || '').toLowerCase().includes(query)
      || module.topics.some(topic => topic.title.toLowerCase().includes(query));

    return matchesLevel && matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <header className="space-y-2 border-b border-white/10 pb-5">
        <p className="text-xs font-semibold text-amber-400">LEARNING PATH / {modules.length} MODULES</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">Cloud &amp; DevOps roadmap</h1>
        <p className="text-sm text-slate-400 max-w-2xl">Follow the modules in order. Each chapter pairs a system diagram with short lessons and a practice lab.</p>
      </header>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex gap-1 border-b border-white/10" role="tablist" aria-label="Module category">
          {[
            ['ALL', 'All modules'],
            ['AWS', 'AWS cloud'],
            ['DEVOPS', 'DevOps tools']
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={categoryFilter === value}
              onClick={() => setCategoryFilter(value)}
              className={`px-3 py-2 text-xs font-semibold border-b-2 transition ${categoryFilter === value ? 'border-amber-400 text-amber-300' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              aria-label="Search modules and lessons"
              placeholder="Search modules or lessons"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-md bg-slate-900 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </label>
          <select
            aria-label="Filter by level"
            value={filterLevel}
            onChange={event => setFilterLevel(event.target.value)}
            className="px-3 py-2 rounded-md bg-slate-900 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map(level => (
              <option key={level} value={level}>{level === 'ALL' ? 'All levels' : level.charAt(0) + level.slice(1).toLowerCase()}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredModules.map((module, index) => {
          const isExpanded = expandedModuleId === undefined
            ? index === 0
            : expandedModuleId === module.id;
          const architecture = getArchitectureForTopic(module.topics[0]?.slug, module.moduleNumber, module.title);
          const completedTopics = module.completedTopics || 0;
          const totalTopics = module.totalTopics || module.topics.length;

          return (
            <section key={module.id} className="rounded-lg border border-white/10 bg-slate-900/65 overflow-hidden">
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => setExpandedModuleId(isExpanded ? null : module.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center gap-4 hover:bg-white/[0.03] transition"
              >
                <span className="w-10 h-10 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-sm font-bold text-amber-300 flex-shrink-0">
                  {String(module.moduleNumber).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-bold text-white">{module.title}</span>
                    {module.completionPercentage === 100 && <span className="text-[11px] text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Complete</span>}
                  </span>
                  <span className="block mt-1 text-xs text-slate-400">{completedTopics} of {totalTopics} lessons complete · {module.level}</span>
                </span>
                <span className="hidden sm:block w-24 h-1.5 rounded-full bg-slate-700 overflow-hidden flex-shrink-0">
                  <span className="block h-full bg-emerald-500" style={{ width: `${module.completionPercentage || 0}%` }} />
                </span>
                <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>

              {isExpanded && (
                <div className="border-t border-white/10">
                  <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-5 p-4 sm:p-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <h2 className="text-xs font-bold text-slate-200">Architecture overview</h2>
                        <span className="text-[10px] text-slate-500">{architecture.category}</span>
                      </div>
                      <div
                        role="img"
                        aria-label={`${module.title} architecture diagram`}
                        className="rounded-md overflow-hidden border border-white/10 bg-[#070b14] [&>svg]:block [&>svg]:w-full [&>svg]:h-auto"
                        dangerouslySetInnerHTML={{ __html: architecture.svg }}
                      />
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">{architecture.description}</p>
                      {architecture.flowSteps?.length > 0 && (
                        <p className="mt-2 text-[11px] text-cyan-300/90 leading-relaxed">Flow: {architecture.flowSteps.join('  →  ')}</p>
                      )}
                    </div>

                    <div>
                      <h2 className="text-xs font-bold text-slate-300 mb-2">Lessons</h2>
                      <ol className="divide-y divide-white/[0.08]">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topic.id} className="py-3 first:pt-1 flex items-start gap-3">
                            <span className="text-[11px] text-slate-500 pt-0.5">{String(topicIndex + 1).padStart(2, '0')}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-slate-200">{topic.title}</p>
                              <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">{topic.summary}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => onSelectTopic(topic.slug, 'topic-detail')}
                              className="px-2.5 py-1.5 rounded-md bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition flex items-center gap-1.5 flex-shrink-0"
                            >
                              <BookOpen className="w-3.5 h-3.5" /> Study
                            </button>
                          </li>
                        ))}
                      </ol>
                      {module.topics[0] && (
                        <button
                          type="button"
                          onClick={() => onSelectTopic(module.topics[0].slug, 'practice-lab')}
                          className="mt-3 px-3 py-2 rounded-md border border-white/15 text-slate-300 text-xs font-semibold hover:bg-white/[0.06] transition flex items-center gap-2"
                        >
                          <Terminal className="w-3.5 h-3.5" /> Practice first lesson
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>
          );
        })}
        {filteredModules.length === 0 && <p className="py-10 text-center text-sm text-slate-500">No modules match those filters.</p>}
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import {
  FolderGit2,
  Terminal,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Bot,
  Layers,
  ShieldCheck,
  ExternalLink,
  Code2,
  FileCode,
  Info,
  Search,
  BookOpen,
  Trash2,
  ArrowRight,
  Filter
} from 'lucide-react';
import { HANDS_ON_PROJECTS } from '../data/projectsData';

const TRACK_FILTERS = [
  { id: 'all', label: 'All 21 Projects', count: HANDS_ON_PROJECTS.length },
  { id: 'aws', label: '☁️ AWS Cloud (Mod 1-15)', count: HANDS_ON_PROJECTS.filter(p => p.trackId === 'aws').length },
  { id: 'git', label: '🐙 Git & GitHub (Mod 16)', count: HANDS_ON_PROJECTS.filter(p => p.trackId === 'git').length },
  { id: 'jenkins', label: '⚙️ Jenkins CI/CD (Mod 17)', count: HANDS_ON_PROJECTS.filter(p => p.trackId === 'jenkins' || p.id === 'module-17-project').length },
  { id: 'docker', label: '🐳 Docker (Mod 18)', count: HANDS_ON_PROJECTS.filter(p => p.trackId === 'docker').length },
  { id: 'kubernetes', label: '☸️ Kubernetes (Mod 19)', count: HANDS_ON_PROJECTS.filter(p => p.trackId === 'kubernetes').length },
  { id: 'cicd', label: '🚀 DevOps Mastery (Mod 20)', count: HANDS_ON_PROJECTS.filter(p => p.trackId === 'cicd').length },
  { id: 'linux', label: '🐧 Linux Foundation', count: HANDS_ON_PROJECTS.filter(p => p.trackId === 'linux').length },
  { id: 'iac', label: '📜 Terraform IaC (Mod 14)', count: HANDS_ON_PROJECTS.filter(p => p.trackId === 'iac').length },
];

export default function HandsOnProjects({ onNavigate, onSelectTopic, onAskAi }) {
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProjectId, setExpandedProjectId] = useState(HANDS_ON_PROJECTS[0]?.id);
  const [copiedCodeId, setCopiedCodeId] = useState(null);

  const filteredProjects = useMemo(() => {
    return HANDS_ON_PROJECTS.filter(project => {
      // Track filter
      if (selectedTrack !== 'all') {
        if (selectedTrack === 'jenkins' && project.id === 'module-17-project') {
          // match
        } else if (project.trackId !== selectedTrack) {
          return false;
        }
      }

      // Module filter
      if (selectedModuleFilter !== 'all') {
        const modNum = parseInt(selectedModuleFilter, 10);
        if (project.moduleNumber !== modNum) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesSummary = project.summary.toLowerCase().includes(q);
        const matchesModule = project.moduleTitle.toLowerCase().includes(q);
        const matchesSkills = project.skillsLearned.some(s => s.toLowerCase().includes(q));
        const matchesTopics = project.topicsCovered?.some(t => 
          t.topicTitle.toLowerCase().includes(q) || t.handsOnObjective.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesSummary && !matchesModule && !matchesSkills && !matchesTopics) {
          return false;
        }
      }

      return true;
    });
  }, [selectedTrack, selectedModuleFilter, searchQuery]);

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const toggleExpand = (id) => {
    setExpandedProjectId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card border-amber-500/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/35">
              Production Portfolio Track
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-300 font-semibold">Separate Hands-On Projects for Each Module &amp; Topic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            Module-by-Module Hands-On Industrial Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Every module (1 to 20 + Linux) includes a dedicated practical project with separated, topic-by-topic hands-on exercises, runnable code manifests, verification steps, and zero-cost Free Tier safety locks.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-3xl neo-card space-y-4">
        {/* Top Filter Controls: Module Dropdown + Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, command, skill, or project keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] focus:border-amber-400 text-xs text-white placeholder-slate-400 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <select
              value={selectedModuleFilter}
              onChange={(e) => setSelectedModuleFilter(e.target.value)}
              className="px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-slate-200 outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">All Modules (0 to 20)</option>
              <option value="0" className="bg-slate-900 text-white">Linux &amp; Shell Foundation</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map(modNum => (
                <option key={modNum} value={modNum} className="bg-slate-900 text-white">
                  Module {modNum}: {HANDS_ON_PROJECTS.find(p => p.moduleNumber === modNum)?.moduleTitle || `Module ${modNum}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Track Selection Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TRACK_FILTERS.map(track => {
            const isSelected = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                onClick={() => {
                  setSelectedTrack(track.id);
                  setSelectedModuleFilter('all');
                }}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-glow-gold'
                    : 'bg-white/[0.03] text-slate-300 border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <span>{track.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {track.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-5">
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center neo-card rounded-3xl border-dashed border-white/10 space-y-3">
            <FolderGit2 className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No projects found matching your filter</h3>
            <p className="text-xs text-slate-400">Try clearing the search query or selecting "All 21 Projects".</p>
            <button
              onClick={() => {
                setSelectedTrack('all');
                setSelectedModuleFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-900 font-extrabold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredProjects.map(project => {
            const isExpanded = expandedProjectId === project.id;
            const isCopied = copiedCodeId === project.id;

            return (
              <div
                key={project.id}
                className={`rounded-3xl neo-card border transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'border-amber-500/40 shadow-xl' : 'border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                {/* Project Accordion Header */}
                <div
                  onClick={() => toggleExpand(project.id)}
                  className="p-6 cursor-pointer flex items-start justify-between gap-4 select-none group"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-3 py-0.5 rounded-full text-[11px] font-black bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/35">
                        {project.moduleNumber === 0 ? 'Foundation Lab' : `Module ${project.moduleNumber} Project`}
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-xs font-bold text-indigo-300">{project.moduleTitle}</span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                        project.level === 'Beginner'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : project.level === 'Intermediate'
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                          : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                      }`}>
                        {project.level}
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        ~{project.estimatedHours} Hours
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-200 transition">
                      {project.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                      {project.summary}
                    </p>
                  </div>

                  <div className="p-2 rounded-2xl bg-white/[0.04] text-slate-400 group-hover:text-white transition flex-shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Expanded Project Body */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/[0.06] space-y-6">
                    {/* Skills Learned Badges */}
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                        Skills &amp; Technologies Mastered:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.skillsLearned.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-white/[0.03] text-slate-300 border border-white/[0.08]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* SEPARATE TOPIC-BY-TOPIC PRACTICAL HANDS-ON PRACTICE SECTION */}
                    {project.topicsCovered && project.topicsCovered.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                            <Layers className="w-4 h-4 text-emerald-400" />
                            Topic-by-Topic Separate Practical Hands-On Practice
                          </h3>
                          <span className="text-[11px] text-emerald-300 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            {project.topicsCovered.length} Practical {project.topicsCovered.length === 1 ? 'Topic' : 'Topics'}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {project.topicsCovered.map((topic, tIdx) => (
                            <div
                              key={tIdx}
                              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-3 hover:border-emerald-500/30 transition"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                                    {topic.topicNumber}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-extrabold text-white">
                                    {topic.topicTitle}
                                  </h4>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0">
                                  {topic.slug && onSelectTopic && (
                                    <>
                                      <button
                                        onClick={() => onSelectTopic(topic.slug, 'practice-lab')}
                                        className="px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white font-bold text-[11px] transition shadow-sm flex items-center gap-1"
                                      >
                                        <Terminal className="w-3 h-3" />
                                        Launch Lab
                                      </button>
                                      <button
                                        onClick={() => onSelectTopic(topic.slug, 'topic-detail')}
                                        className="px-3 py-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 font-bold text-[11px] border border-white/[0.08] transition flex items-center gap-1"
                                      >
                                        <BookOpen className="w-3 h-3" />
                                        Topic Notes
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Objective & Practical Exercise */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                <div className="p-3 rounded-xl bg-black/30 border border-white/[0.04]">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-1">
                                    Hands-On Objective:
                                  </span>
                                  <p className="text-slate-300 leading-relaxed">{topic.handsOnObjective}</p>
                                </div>

                                <div className="p-3 rounded-xl bg-black/30 border border-white/[0.04]">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block mb-1">
                                    Practical Action Steps:
                                  </span>
                                  <p className="text-slate-300 leading-relaxed">{topic.practicalExercise}</p>
                                </div>
                              </div>

                              {/* Practical Commands */}
                              {topic.commands && (
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-slate-400">
                                      Practical Terminal Commands:
                                    </span>
                                    <button
                                      onClick={() => handleCopyCode(`${project.id}-topic-${tIdx}`, topic.commands)}
                                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-white/[0.05] hover:bg-emerald-500 hover:text-white text-slate-400 transition flex items-center gap-1"
                                    >
                                      {copiedCodeId === `${project.id}-topic-${tIdx}` ? (
                                        <>
                                          <Check className="w-3 h-3 text-emerald-300" />
                                          <span className="text-emerald-300">Copied</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          <span>Copy Commands</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 font-mono text-xs text-emerald-300 overflow-x-auto">
                                    <pre className="whitespace-pre-wrap">{topic.commands}</pre>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step-by-Step Architecture Flow */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        Step-by-Step Architecture Flow
                      </h3>
                      <div className="space-y-2">
                        {project.architectureSteps.map((step, stepIdx) => (
                          <div
                            key={stepIdx}
                            className="p-3 rounded-2xl bg-slate-950/60 border border-white/[0.05] text-xs text-slate-200 flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              {stepIdx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Production Configuration Manifests / Scripts */}
                    {project.codeFiles && project.codeFiles.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-cyan-400" />
                          Production Code Manifests &amp; Scripts
                        </h3>

                        <div className="space-y-4">
                          {project.codeFiles.map((file, fIdx) => {
                            const fileCodeId = `${project.id}-file-${fIdx}`;
                            const isFileCopied = copiedCodeId === fileCodeId;

                            return (
                              <div key={fIdx} className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <FileCode className="w-4 h-4 text-amber-400" />
                                    <span className="text-xs font-mono font-bold text-white">{file.filename}</span>
                                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400">
                                      {file.language}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => handleCopyCode(fileCodeId, file.content)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                                      isFileCopied
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-white/[0.06] hover:bg-amber-500 hover:text-white text-slate-300'
                                    }`}
                                  >
                                    {isFileCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{isFileCopied ? 'Copied!' : 'Copy File Content'}</span>
                                  </button>
                                </div>

                                <p className="text-[11px] text-slate-400">{file.description}</p>

                                <div className="rounded-2xl bg-slate-950/95 border border-white/[0.08] p-4 font-mono text-xs text-amber-300 overflow-x-auto shadow-inner max-h-96">
                                  <pre className="whitespace-pre-wrap select-all">{file.content}</pre>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Verification Procedure */}
                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 font-black text-emerald-300 uppercase tracking-wide text-[11px]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Verification &amp; Test Procedure:
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {project.verification}
                      </p>
                    </div>

                    {/* Zero-Cost Free Tier Safety */}
                    {project.freeTierSafety && (
                      <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-1 text-xs">
                        <div className="flex items-center gap-2 font-black text-cyan-300 uppercase tracking-wide text-[11px]">
                          <ShieldCheck className="w-4 h-4 text-cyan-400" />
                          Cost Guard &amp; Zero-Cost Safety Notice:
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          {project.freeTierSafety}
                        </p>
                      </div>
                    )}

                    {/* Cleanup Commands */}
                    {project.cleanupCommands && (
                      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-black text-rose-300 uppercase tracking-wide text-[11px]">
                            <Trash2 className="w-4 h-4 text-rose-400" />
                            Clean Up &amp; Teardown (Run After Practice):
                          </div>
                          <button
                            onClick={() => handleCopyCode(`${project.id}-cleanup`, project.cleanupCommands)}
                            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-white/[0.05] hover:bg-rose-500 hover:text-white text-rose-300 transition flex items-center gap-1"
                          >
                            {copiedCodeId === `${project.id}-cleanup` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-300" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Cleanup</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 overflow-x-auto">
                          <code>{project.cleanupCommands}</code>
                        </div>
                      </div>
                    )}

                    {/* Action Row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => onNavigate && onNavigate('practice-lab')}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-bold text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5 border border-white/[0.08]"
                      >
                        <Terminal className="w-3.5 h-3.5 text-amber-400" />
                        Launch In-Browser Terminal Sandbox
                      </button>

                      {onNavigate && (
                        <button
                          onClick={() => onNavigate('ai-trainer')}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-xs font-bold text-white transition flex items-center justify-center gap-1.5 shadow-md shadow-indigo-900/40"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          Ask AI Trainer to Guide My Hands-On Practice
                        </button>
                      )}
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

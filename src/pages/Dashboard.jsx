import React from 'react';
import {
  Compass,
  Cloud,
  CheckCircle2,
  Clock,
  Award,
  Flame,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Terminal,
  HelpCircle,
  Briefcase,
  Sparkles,
  Bot,
  Code,
  FolderGit2,
  BookMarked,
  Layers,
  Server,
  Cpu,
  Database,
  Shield
} from 'lucide-react';
import CostRiskBadge from '../components/CostRiskBadge';

const DEFAULT_STATS = {
  streakDays: 3,
  overallPercentage: 35,
  completedTopicsCount: 16,
  totalTopics: 60,
  notesReadCount: 24,
  labsCompletedCount: 14,
  averageQuizScore: 92,
  quizzesPassedCount: 18,
  totalTimeSpentMinutes: 340,
  dueRevisions: 0,
  pendingCleanups: 0
};

export default function Dashboard({ stats, recentQuizzes, recentActivities, onNavigate, onSelectTopic }) {
  const activeStats = stats || DEFAULT_STATS;

  return (
    <div className="space-y-6 w-full pb-16">
      {/* High-Impact Panoramic Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl neo-card p-6 sm:p-8 lg:p-10 border-indigo-500/25">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wide bg-gradient-to-r from-indigo-500/25 via-purple-500/20 to-cyan-500/20 text-indigo-300 border border-indigo-400/40 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                AWS Cloud, DevOps &amp; Full-Stack Architect
              </span>
              <span className="flex items-center gap-1.5 text-xs text-orange-300 font-extrabold bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/30">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-500/40 animate-pulse" />
                {activeStats.streakDays || 1} Day Streak
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/35 flex items-center gap-1 shadow-sm">
                <Bot className="w-3.5 h-3.5 text-amber-400" /> Ollama AI Mentor Active
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Enterprise Cloud &amp; Full-Stack Command Center
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Unified mastery curriculum covering <span className="text-cyan-300 font-semibold">24 visual modules</span>: from AWS Cloud infrastructure and GitOps CI/CD pipelines to Angular standalone architecture, Node.js asynchronous backends, RESTful APIs, and system design.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap flex-shrink-0">
            <button
              onClick={() => onNavigate('ai-trainer')}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Bot className="w-4 h-4 stroke-[2.5]" />
              AI Live Trainer
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-95 text-white font-extrabold text-xs shadow-glow-indigo transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4 stroke-[2.5]" />
              24 Modules
            </button>
            <button
              onClick={() => onNavigate('free-tier-safety')}
              className="px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-indigo-500/30 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Safety Guard
            </button>
          </div>
        </div>
      </div>

      {/* 4 Wide Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Curriculum Progress */}
        <div className="neo-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Curriculum Progress</p>
              <h3 className="text-3xl font-black text-white mt-1.5 font-display">{activeStats.overallPercentage || 0}%</h3>
              <p className="text-[11px] text-slate-400 mt-1">{activeStats.completedTopicsCount || 0} of {activeStats.totalTopics || 60} topics mastered</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition duration-300">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: `${Math.max(5, activeStats.overallPercentage || 0)}%` }} />
          </div>
        </div>

        {/* Notes Mastered */}
        <div className="neo-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Theory &amp; Notes</p>
              <h3 className="text-3xl font-black text-cyan-300 mt-1.5 font-display">{activeStats.notesReadCount || 0}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Deep-dive notes &amp; visual SVGs</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition duration-300">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" style={{ width: `${Math.min(100, Math.max(5, ((activeStats.notesReadCount || 0) / (activeStats.totalTopics || 60)) * 100))}%` }} />
          </div>
        </div>

        {/* Practical Labs */}
        <div className="neo-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practical Labs</p>
              <h3 className="text-3xl font-black text-purple-300 mt-1.5 font-display">{activeStats.labsCompletedCount || 0}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Simulated tasks &amp; CLI workflows</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition duration-300">
              <Terminal className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${Math.min(100, Math.max(5, ((activeStats.labsCompletedCount || 0) / (activeStats.totalTopics || 60)) * 100))}%` }} />
          </div>
        </div>

        {/* Assessment Score */}
        <div className="neo-card p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assessment Average</p>
              <h3 className="text-3xl font-black text-emerald-300 mt-1.5 font-display">{activeStats.averageQuizScore || 0}%</h3>
              <p className="text-[11px] text-slate-400 mt-1">{activeStats.quizzesPassedCount || 0} technical quizzes cleared</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition duration-300">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" style={{ width: `${Math.max(5, activeStats.averageQuizScore || 0)}%` }} />
          </div>
        </div>
      </div>

      {/* 24-Module Full-Stack, AWS & DevOps Progress Bar */}
      <div className="neo-card p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              24-Module AWS, DevOps &amp; Full-Stack Curriculum Track
            </h3>
            <p className="text-xs text-slate-400">Total completion across theory notes, interactive labs, CLI commands, and incident scenarios</p>
          </div>
          <span className="text-sm font-black text-indigo-400 font-mono">{activeStats.overallPercentage || 0}%</span>
        </div>
        <div className="w-full h-3 bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-indigo-500/20">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-700 shadow-glow-indigo/50"
            style={{ width: `${Math.max(5, activeStats.overallPercentage || 0)}%` }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-slate-400 text-[11px]">Structured Modules</p>
            <p className="font-extrabold text-white text-sm mt-0.5">24 Total</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-slate-400 text-[11px]">Time Invested</p>
            <p className="font-extrabold text-white text-sm mt-0.5">{activeStats.totalTimeSpentMinutes || 0} mins</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-slate-400 text-[11px]">Reviews Due</p>
            <p className="font-extrabold text-indigo-300 text-sm mt-0.5">{activeStats.dueRevisions || 0}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-slate-400 text-[11px]">Cleanups Verified</p>
            <p className="font-extrabold text-emerald-400 text-sm mt-0.5">{activeStats.pendingCleanups === 0 ? 'All Clear ✓' : `${activeStats.pendingCleanups} Pending`}</p>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Panoramic Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 Width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 3 Core Curriculum Tracks Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Track 1: AWS Cloud */}
            <div
              onClick={() => onNavigate('roadmap')}
              className="neo-card p-5 rounded-2xl cursor-pointer hover:border-amber-500/40 transition group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                  <Cloud className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Modules 1-15
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition">AWS Cloud Architecture</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                IAM, VPC Networking, EC2 Compute, Auto Scaling, S3, RDS, Lambda, and CloudWatch Observability.
              </p>
            </div>

            {/* Track 2: DevOps CI/CD */}
            <div
              onClick={() => onNavigate('roadmap')}
              className="neo-card p-5 rounded-2xl cursor-pointer hover:border-cyan-500/40 transition group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
                  <Cpu className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black uppercase text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Modules 16-20
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition">DevOps &amp; GitOps CI/CD</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                Git/GitHub branch strategies, Jenkins automation pipelines, Docker multi-stage builds, and Kubernetes clusters.
              </p>
            </div>

            {/* Track 3: Full-Stack */}
            <div
              onClick={() => onNavigate('roadmap')}
              className="neo-card p-5 rounded-2xl cursor-pointer hover:border-purple-500/40 transition group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
                  <Layers className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black uppercase text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                  Modules 21-24
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white group-hover:text-purple-300 transition">Angular &amp; Node.js Full-Stack</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                Angular standalone components &amp; RxJS, Node.js event loop, secure RESTful APIs, and database engineering.
              </p>
            </div>
          </div>

          {/* Recommended Next Practice Topic Card */}
          <div className="neo-card p-6 sm:p-7 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Recommended Next Practice Topic
              </h3>
              <button
                onClick={() => onNavigate('roadmap')}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
              >
                View Full 24 Modules <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-indigo-400">Module 3</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-300 font-medium">DevOps Networking &amp; VPC</span>
                  <CostRiskBadge level="LOW" />
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-white">
                  DevOps Networking Fundamentals: OSI, TCP/IP, Subnetting &amp; Linux Diagnostic Tools
                </h4>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  Master the OSI 7-layer vs TCP/IP 4-layer models, calculate /24 to /25 subnets (126 usable hosts vs 123 in AWS VPC), understand CNAME vs ALIAS at the zone apex, and troubleshoot connection issues using ping, traceroute, dig, curl, netstat, and nmap.
                </p>
              </div>
              <div className="flex sm:flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => onSelectTopic('devops-networking-osi-tcpip-subnetting-cidr', 'topic-detail')}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white font-extrabold text-xs transition shadow-md"
                >
                  Read Notes
                </button>
                <button
                  onClick={() => onSelectTopic('devops-networking-osi-tcpip-subnetting-cidr', 'practice-lab')}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-bold text-xs border border-white/[0.08] transition"
                >
                  Practice Lab
                </button>
              </div>
            </div>
          </div>

          {/* Quick Launch Developer Toolkit */}
          <div className="neo-card p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              Quick Launch Developer Toolkit
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <button
                onClick={() => onNavigate('hands-on-projects')}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-emerald-500/40 text-left transition space-y-1 group"
              >
                <FolderGit2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition duration-200" />
                <p className="text-xs font-extrabold text-white">Hands-on Labs</p>
                <p className="text-[11px] text-slate-400 leading-tight">7 Real Projects</p>
              </button>

              <button
                onClick={() => onNavigate('definitions-glossary')}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-purple-500/40 text-left transition space-y-1 group"
              >
                <BookMarked className="w-5 h-5 text-purple-400 group-hover:scale-110 transition duration-200" />
                <p className="text-xs font-extrabold text-white">Definitions</p>
                <p className="text-[11px] text-slate-400 leading-tight">A-Z Concepts</p>
              </button>

              <button
                onClick={() => onNavigate('command-hub')}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-amber-500/40 text-left transition space-y-1 group"
              >
                <Code className="w-5 h-5 text-amber-400 group-hover:scale-110 transition duration-200" />
                <p className="text-xs font-extrabold text-white">Commands Hub</p>
                <p className="text-[11px] text-slate-400 leading-tight">CLI Cheatsheet</p>
              </button>

              <button
                onClick={() => onNavigate('scenario-practice')}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-indigo-500/30 text-left transition space-y-1 group"
              >
                <HelpCircle className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition duration-200" />
                <p className="text-xs font-extrabold text-white">Scenarios</p>
                <p className="text-[11px] text-slate-400 leading-tight">92 Production Incidents</p>
              </button>

              <button
                onClick={() => onNavigate('interview-prep')}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-cyan-500/30 text-left transition space-y-1 group"
              >
                <Briefcase className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition duration-200" />
                <p className="text-xs font-extrabold text-white">Interview Mode</p>
                <p className="text-[11px] text-slate-400 leading-tight">73 Technical Rubrics</p>
              </button>

              <button
                onClick={() => onNavigate('free-tier-safety')}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-emerald-500/30 text-left transition space-y-1 group"
              >
                <ShieldCheck className="w-5 h-5 text-teal-400 group-hover:scale-110 transition duration-200" />
                <p className="text-xs font-extrabold text-white">Cost Guard</p>
                <p className="text-[11px] text-slate-400 leading-tight">Zero-Cost Safety</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1/3 Width) */}
        <div className="space-y-6">
          {/* Live System Observability Status */}
          <div className="neo-card p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Safety &amp; Compliance Status
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-300">Free Tier Cost Guard</p>
                  <p className="text-[11px] text-slate-400">All local CLI mocks zero-cost verified</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-glow-emerald animate-pulse" />
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-300">Ollama AI Connection</p>
                  <p className="text-[11px] text-slate-400">Self-hosted local LLM ready</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-glow-gold animate-pulse" />
              </div>
            </div>
          </div>

          {/* Activity & Recent Quiz Feed */}
          <div className="neo-card p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              Recent Activity Feed
            </h3>

            <div className="space-y-3">
              {recentActivities && recentActivities.length > 0 ? (
                recentActivities.slice(0, 5).map(act => (
                  <div key={act.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                    <div className="text-xs space-y-0.5">
                      <p className="font-bold text-slate-200">
                        {act.actionType.replace('_', ' ')}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {act.metadata?.title || 'AWS Learning Activity'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center space-y-1">
                  <p className="text-xs text-slate-400">No activity recorded yet.</p>
                  <p className="text-[11px] text-slate-500">Pick any module to begin reading notes and practicing labs!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

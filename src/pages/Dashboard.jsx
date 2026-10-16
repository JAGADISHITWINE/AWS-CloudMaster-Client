import React from 'react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Award,
  Flame,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Terminal,
  HelpCircle,
  Briefcase,
  Zap,
  Sparkles
} from 'lucide-react';
import CostRiskBadge from '../components/CostRiskBadge';

export default function Dashboard({ stats, recentQuizzes, recentActivities, onNavigate, onSelectTopic }) {
  if (!stats) {
    return <div className="p-8 text-center text-slate-400">Loading learning analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* High-Impact Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl neo-card p-8 shadow-glow-indigo/10 border-indigo-500/25">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wide bg-gradient-to-r from-indigo-500/25 via-purple-500/20 to-cyan-500/20 text-indigo-300 border border-indigo-400/40 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                AWS Certified Solutions Architect &amp; Developer
              </span>
              <span className="flex items-center gap-1.5 text-xs text-orange-300 font-extrabold bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/30">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-500/40 animate-pulse" />
                {stats.streakDays} Day Streak!
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Your AWS Cloud Command Center
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Master the cloud through 15 visual modules, interactive mock interview rounds, real-world scenario troubleshooting, and zero-risk Free Tier hands-on labs.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:opacity-95 text-white font-extrabold text-xs shadow-glow-indigo transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4 stroke-[2.5]" />
              Continue Roadmap
            </button>
            <button
              onClick={() => onNavigate('free-tier-safety')}
              className="px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-indigo-500/30 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Safety Center
            </button>
          </div>
        </div>
      </div>

      {/* Modern KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Completion */}
        <div className="neo-card p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Curriculum Progress</p>
              <h3 className="text-3xl font-black text-white mt-1.5 font-display">{stats.overallPercentage}%</h3>
              <p className="text-[11px] text-slate-400 mt-1">{stats.completedTopicsCount} of {stats.totalTopics} topics mastered</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition duration-300">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Notes Read */}
        <div className="neo-card p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-emerald-400"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notes Mastered</p>
              <h3 className="text-3xl font-black text-cyan-300 mt-1.5 font-display">{stats.notesReadCount}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Structured theory &amp; diagrams</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition duration-300">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Labs Completed */}
        <div className="neo-card p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practical Labs</p>
              <h3 className="text-3xl font-black text-purple-300 mt-1.5 font-display">{stats.labsCompletedCount}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Zero-cost simulated tasks</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition duration-300">
              <Terminal className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quiz Pass Rate */}
        <div className="neo-card p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assessment Score</p>
              <h3 className="text-3xl font-black text-emerald-300 mt-1.5 font-display">{stats.averageQuizScore}%</h3>
              <p className="text-[11px] text-slate-400 mt-1">{stats.quizzesPassedCount} assessments passed</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition duration-300">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar & Quick Start Bar */}
      <div className="neo-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              15-Module Certification Progress
            </h3>
            <p className="text-xs text-slate-400">Total completion across notes, labs, and scenario assessments</p>
          </div>
          <span className="text-sm font-black text-indigo-400 font-mono">{stats.overallPercentage}%</span>
        </div>
        <div className="w-full h-3 bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-indigo-500/20">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-700 shadow-glow-indigo/50"
            style={{ width: `${Math.max(5, stats.overallPercentage)}%` }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-slate-400 text-[11px]">Modules</p>
            <p className="font-extrabold text-white text-sm mt-0.5">15 Total</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-slate-400 text-[11px]">Time Invested</p>
            <p className="font-extrabold text-white text-sm mt-0.5">{stats.totalTimeSpentMinutes} mins</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-slate-400 text-[11px]">Reviews Due</p>
            <p className="font-extrabold text-indigo-300 text-sm mt-0.5">{stats.dueRevisions || 0}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <p className="text-slate-400 text-[11px]">Cleanups Verified</p>
            <p className="font-extrabold text-emerald-400 text-sm mt-0.5">{stats.pendingCleanups === 0 ? 'All Clear ✓' : `${stats.pendingCleanups} Pending`}</p>
          </div>
        </div>
      </div>

      {/* Quick Launch Learning Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Topic To Study */}
        <div className="lg:col-span-2 neo-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Recommended Next Practice Topic
            </h3>
            <button
              onClick={() => onNavigate('roadmap')}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
            >
              View Full 15 Modules <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400">Module 2</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-300 font-medium">IAM &amp; Policy Evaluation</span>
                <CostRiskBadge level="LOW" />
              </div>
              <h4 className="text-base font-extrabold text-white">IAM Fundamentals &amp; Least-Privilege Role Sandbox</h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Learn why IAM Roles are preferred over long-term access keys, test the STS token rotation flow, and run policy evaluation simulations.
              </p>
            </div>
            <div className="flex sm:flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => onSelectTopic('iam-fundamentals-and-policy-evaluation', 'topic-detail')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white font-extrabold text-xs transition shadow-md"
              >
                Read Notes
              </button>
              <button
                onClick={() => onSelectTopic('iam-fundamentals-and-policy-evaluation', 'practice-lab')}
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-bold text-xs border border-white/[0.08] transition"
              >
                Practice Lab
              </button>
            </div>
          </div>

          {/* Feature Quick Launch Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              onClick={() => onNavigate('scenario-practice')}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-indigo-500/30 text-left transition space-y-1 group"
            >
              <HelpCircle className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition duration-200" />
              <p className="text-xs font-extrabold text-white">Scenario Practice</p>
              <p className="text-[11px] text-slate-400 leading-tight">Solve real-world troubleshooting production failures.</p>
            </button>

            <button
              onClick={() => onNavigate('interview-prep')}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-cyan-500/30 text-left transition space-y-1 group"
            >
              <Briefcase className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition duration-200" />
              <p className="text-xs font-extrabold text-white">Mock Interview Mode</p>
              <p className="text-[11px] text-slate-400 leading-tight">Submit answers and get scored against technical rubrics.</p>
            </button>

            <button
              onClick={() => onNavigate('free-tier-safety')}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-emerald-500/30 text-left transition space-y-1 group"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition duration-200" />
              <p className="text-xs font-extrabold text-white">Cost Guard</p>
              <p className="text-[11px] text-slate-400 leading-tight">Verify cleanup checklists and monitor budgets.</p>
            </button>
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
              recentActivities.slice(0, 4).map(act => (
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
              <p className="text-xs text-slate-500">No activities recorded yet. Start reading notes to track your study streak!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  TrendingUp,
  AlertTriangle,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Terminal,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

export default function ProgressAnalytics({ onSelectTopic }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProgressAnalytics()
      .then(res => setAnalytics(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading progress analytics...</div>;
  }

  const { topicMastery, weakTopics } = analytics || {};

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Performance Metrics
          </span>
          <span className="text-xs text-slate-400 font-medium">Knowledge Retention &amp; Mastery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          Progress Analytics &amp; Mastery
        </h1>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Track your domain-level competency across all 15 modules and identify weak areas for targeted revision.
        </p>
      </div>

      {/* Weak Topics Callout if any */}
      {weakTopics && weakTopics.length > 0 && (
        <div className="p-6 rounded-3xl neo-card border-amber-500/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Recommended Revision Focus: {weakTopics.length} Topics Need Practice</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {weakTopics.map(w => (
              <div key={w.topicId} className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white line-clamp-1">{w.title}</span>
                  <span className="text-[11px] text-amber-400 font-bold">Mastery: {w.masteryPercentage}%</span>
                </div>
                <button
                  onClick={() => onSelectTopic(w.topicId, 'quiz-center')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-[11px] font-black transition shadow-sm"
                >
                  Retake
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mastery Grid by Topic */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-4 shadow-lg border-amber-500/20">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-amber-400" />
          15-Topic Competency Breakdown
        </h3>

        <div className="space-y-3">
          {topicMastery?.map(t => (
            <div key={t.topicId} className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">Module {t.moduleNumber}:</span>
                  <span className="font-bold text-white">{t.title}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                  <span className={t.notesRead ? 'text-emerald-400 font-bold' : ''}>
                    {t.notesRead ? '✓ Notes Read' : '○ Notes Unread'}
                  </span>
                  <span>•</span>
                  <span className={t.labCompleted ? 'text-emerald-400 font-bold' : ''}>
                    {t.labCompleted ? '✓ Lab Done' : '○ Lab Pending'}
                  </span>
                  <span>•</span>
                  <span className={t.quizPassed ? 'text-emerald-400 font-bold' : ''}>
                    {t.quizPassed ? `✓ Quiz Passed (${t.latestQuizScore}%)` : '○ Quiz Incomplete'}
                  </span>
                  <span className="font-mono font-bold text-white bg-slate-900 border border-white/[0.08] px-2.5 py-0.5 rounded-lg">
                    {t.masteryPercentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/[0.05]">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    t.masteryPercentage === 100
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : t.masteryPercentage >= 50
                      ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                      : 'bg-gradient-to-r from-orange-600 to-amber-600'
                  }`}
                  style={{ width: `${t.masteryPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

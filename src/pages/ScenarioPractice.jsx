import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Send,
  Eye,
  Award,
  ChevronRight,
  ChevronLeft,
  Clock,
  Sparkles,
  Tag
} from 'lucide-react';
import { api } from '../services/api';

export default function ScenarioPractice({ onNavigate }) {
  const [scenarios, setScenarios] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [revealedHints, setRevealedHints] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getScenarios()
      .then(res => {
        setScenarios(res.scenarios || []);
        if (res.scenarios?.length > 0) {
          setSelectedId(res.scenarios[0].id);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    api.getScenario(selectedId)
      .then(res => {
        setActiveScenario(res.scenario);
        setUserAnswer(res.scenario.previousAttempts?.[0]?.submittedText || '');
        setResult(res.scenario.hasAttempted ? {
          score: res.scenario.previousAttempts?.[0]?.scoreGiven || 80,
          feedback: res.scenario.previousAttempts?.[0]?.feedback || "Previously completed solution.",
          recommendedSolution: res.scenario.recommendedSolution
        } : null);
        setRevealedHints(0);
      })
      .catch(err => console.error(err));
  }, [selectedId]);

  const handleSubmitAnswer = async () => {
    if (!userAnswer || userAnswer.trim().length < 15) {
      alert('Please write out your troubleshooting steps in detail (at least 15 characters).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitScenario(selectedId, userAnswer);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert('Failed to submit answer: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevealNextHint = () => {
    if (activeScenario && revealedHints < activeScenario.hints.length) {
      setRevealedHints(prev => prev + 1);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading real-world troubleshooting scenarios...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Real-World Incident Simulator
          </span>
          <span className="text-xs text-slate-400 font-medium">Production Troubleshooting Challenges</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          AWS Scenario-Based Practice
        </h1>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Diagnose real outage scenarios, write your troubleshooting methodology, and verify against senior cloud architect solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Scenarios Selector List */}
        <div className="lg:col-span-4 space-y-2.5">
          <p className="text-[11px] font-black text-amber-400 uppercase tracking-wider px-1">Active Scenarios</p>
          <div className="space-y-2.5">
            {scenarios.map(s => {
              const isSelected = selectedId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400/50 text-white shadow-glow-gold/20'
                      : 'neo-card text-slate-300 hover:border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-extrabold text-amber-400">{s.difficulty}</span>
                    {s.isSolved && (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold line-clamp-2">{s.title}</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {s.tags?.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md border border-white/[0.06]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Scenario Detailed Workspace */}
        {activeScenario && (
          <div className="lg:col-span-8 space-y-5">
            {/* Problem Statement Card */}
            <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-4 border-amber-500/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Incident Challenge • {activeScenario.difficulty}
                </span>
                <span className="text-xs text-slate-300 font-medium">{activeScenario.topic?.title}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white">{activeScenario.title}</h2>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-amber-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {activeScenario.prompt}
              </div>

              {/* Progressive Hints Section */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    Progressive Investigation Hints ({revealedHints}/{activeScenario.hints?.length || 0})
                  </span>
                  {activeScenario.hints && revealedHints < activeScenario.hints.length && (
                    <button
                      onClick={handleRevealNextHint}
                      className="text-xs font-extrabold text-amber-400 hover:text-amber-300 underline"
                    >
                      Reveal Next Hint →
                    </button>
                  )}
                </div>

                {revealedHints > 0 ? (
                  <div className="space-y-2">
                    {activeScenario.hints?.slice(0, revealedHints).map((hint, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
                        {hint}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">
                    Stuck? You can reveal progressive hints one by one without spoiling the complete answer.
                  </p>
                )}
              </div>
            </div>

            {/* Answer Input Workspace */}
            <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-amber-400" />
                Submit Your Troubleshooting &amp; Architecture Solution
              </h3>
              <p className="text-xs text-slate-300">
                Write down your step-by-step diagnostic checklist, firewall configurations, and architecture changes before viewing the model answer.
              </p>

              <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Example: 1. Inspect the EC2 Security Group inbound rules for port 80... 2. Check the subnet route table to ensure 0.0.0.0/0 targets the Internet Gateway... 3. Verify stateless NACL ephemeral ports..."
                className="w-full p-4 rounded-2xl bg-slate-950/90 border border-amber-500/20 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  {userAnswer.length} characters written
                </span>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white font-black text-xs shadow-glow-gold transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {submitting ? 'Evaluating...' : 'Submit & Reveal Solution'}
                </button>
              </div>
            </div>

            {/* Evaluation Result & Recommended Solution */}
            {result && (
              <div className="p-6 sm:p-8 rounded-3xl neo-card border-emerald-500/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <span>Evaluation Score: {result.score} / 100</span>
                  </div>
                  <span className="text-xs text-slate-400">Instant Automated Assessment</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs sm:text-sm text-emerald-200">
                  {result.feedback}
                </div>

                {/* Recommended Architecture Solution */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Recommended Architecture &amp; Resolution Walkthrough
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/[0.06] text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                    {result.recommendedSolution}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

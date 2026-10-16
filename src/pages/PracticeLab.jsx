import React, { useState, useEffect } from 'react';
import {
  Terminal,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  Play,
  Key,
  Layers,
  HelpCircle,
  ChevronLeft,
  Trash2,
  Check,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import CostRiskBadge from '../components/CostRiskBadge';
import CliSimulator from '../components/CliSimulator';
import { api } from '../services/api';

export default function PracticeLab({ topicSlug, onNavigate, onSelectTopic }) {
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isCleanedUp, setIsCleanedUp] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState(1);

  useEffect(() => {
    if (!topicSlug) return;
    setLoading(true);
    api.getLab(topicSlug)
      .then(res => {
        setLab(res.lab);
        setCompletedSteps(res.lab?.userProgress?.completedSteps || []);
        setIsCleanedUp(res.lab?.userProgress?.isCleanedUp || false);
      })
      .catch(err => {
        console.error('Failed to load lab:', err);
      })
      .finally(() => setLoading(false));
  }, [topicSlug]);

  const handleToggleStep = async (stepNum) => {
    if (!lab) return;
    try {
      const res = await api.toggleLabStep(lab.id, stepNum);
      setCompletedSteps(res.completedSteps);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyCleanup = async () => {
    if (!lab) return;
    try {
      await api.markLabCleanup(lab.id);
      setIsCleanedUp(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading interactive practice lab...</div>;
  }

  if (!lab) {
    return (
      <div className="p-8 text-center text-slate-400 space-y-3">
        <p>No practical lab configured for this topic yet.</p>
        <button onClick={() => onNavigate('roadmap')} className="text-amber-400 text-xs font-bold">
          Return to Learning Roadmap
        </button>
      </div>
    );
  }

  const currentStep = lab.steps?.find(s => s.stepNumber === activeStepTab) || lab.steps[0];
  const progressPercent = lab.steps?.length > 0 ? Math.round((completedSteps.length / lab.steps.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('roadmap')}
          className="text-xs font-bold text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Roadmap
        </button>

        <div className="flex items-center gap-2">
          <CostRiskBadge level={lab.costRiskLevel} />
          {lab.freeTierEligible && (
            <span className="text-[11px] font-black text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Free Tier Eligible
            </span>
          )}
        </div>
      </div>

      {/* Lab Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-3.5 border-amber-500/30">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 uppercase tracking-wider">
            {lab.level} Practice Lab
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-300 font-semibold">~{lab.estimatedMinutes} minutes</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-amber-300 font-bold">{lab.topic?.title}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          {lab.title}
        </h1>

        {/* Cost warning alert if medium or high */}
        {lab.paidAlternativeWarning && (
          <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-amber-200 flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed shadow-lg">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-amber-300 uppercase tracking-wide text-[11px]">Cost &amp; Quota Safeguard:</p>
              <p className="mt-0.5 text-slate-200">{lab.paidAlternativeWarning}</p>
            </div>
          </div>
        )}

        {/* Checklist Progress Bar */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs mb-1 font-bold">
            <span className="text-slate-300">Lab Execution Progress</span>
            <span className="text-amber-400">{completedSteps.length} of {lab.steps?.length || 0} steps ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-amber-500/20">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-300 shadow-glow-gold/30"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Prerequisites & Required IAM Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl neo-card space-y-2">
          <span className="text-xs sm:text-sm font-extrabold text-amber-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Prerequisites &amp; Environment
          </span>
          <p className="text-xs sm:text-sm text-slate-300 leading-snug">{lab.prerequisites}</p>
        </div>

        <div className="p-5 rounded-2xl neo-card space-y-2">
          <span className="text-xs sm:text-sm font-extrabold text-cyan-400 flex items-center gap-1.5">
            <Key className="w-4 h-4" />
            Required IAM Permissions (Least-Privilege)
          </span>
          <p className="text-xs font-mono text-cyan-300 break-all select-all">{lab.requiredPermissions}</p>
        </div>
      </div>

      {/* Step Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2.5 overflow-x-auto">
        {lab.steps?.map(s => {
          const isDone = completedSteps.includes(s.stepNumber);
          const isCurrent = activeStepTab === s.stepNumber;
          return (
            <button
              key={s.stepNumber}
              onClick={() => setActiveStepTab(s.stepNumber)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 flex-shrink-0 ${
                isCurrent
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-glow-gold/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/[0.05]'
              }`}
            >
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black ${
                isDone ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {isDone ? '✓' : s.stepNumber}
              </span>
              <span>Step {s.stepNumber}: {s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Details */}
      {currentStep && (
        <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Step {currentStep.stepNumber}</span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">{currentStep.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{currentStep.description}</p>
            </div>

            <button
              onClick={() => handleToggleStep(currentStep.stepNumber)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow flex-shrink-0 ${
                completedSteps.includes(currentStep.stepNumber)
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/[0.08]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {completedSteps.includes(currentStep.stepNumber) ? 'Step Completed ✓' : 'Mark Step Done'}
            </button>
          </div>

          {/* Console Instructions */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-amber-500/20 space-y-1.5">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              AWS Management Console Instructions:
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{currentStep.consoleInstruction}</p>
          </div>

          {/* Interactive Safe Cloud CLI Simulator */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              AWS CLI Command &amp; Safe Local Simulator:
            </h4>
            <CliSimulator
              sampleCommand={currentStep.cliCommand}
              expectedOutput={currentStep.expectedOutput}
              simulationScript={lab.safeSimulationScript}
            />
          </div>

          {/* Verification Tip & Troubleshooting */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-1">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Verification Step
              </span>
              <p className="text-xs text-slate-300">{currentStep.verificationTip}</p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-1">
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                Troubleshooting Common Errors
              </span>
              <p className="text-xs text-slate-300">{currentStep.troubleshooting}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Resource Cleanup & Teardown Checklist */}
      <section className="p-6 rounded-3xl neo-card border-rose-500/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-extrabold text-white">Mandatory Resource Cleanup &amp; Zero-Cost Checklist</h3>
          </div>
          <button
            onClick={handleVerifyCleanup}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              isCleanedUp
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {isCleanedUp ? 'Teardown Verified ✓' : 'Confirm Teardown Complete'}
          </button>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{lab.cleanupGuide}</p>
      </section>

      {/* Next Step Nav */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => onSelectTopic(lab.topic?.slug, 'topic-detail')}
          className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-bold transition"
        >
          ← Review Topic Notes
        </button>

        <button
          onClick={() => onSelectTopic(lab.topic?.slug, 'quiz-center')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white text-xs font-black shadow-glow-gold flex items-center gap-2 transition"
        >
          Take Topic Quiz Assessment →
        </button>
      </div>
    </div>
  );
}

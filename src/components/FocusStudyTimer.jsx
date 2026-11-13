import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Coffee,
  Sparkles,
  Volume2,
  VolumeX,
  Sliders,
  CheckCircle2,
  Flame,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  Info
} from 'lucide-react';

// Web Audio API pure tone chime (no external mp3 files required)
const playChime = (type = 'focus-complete') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    if (type === 'focus-complete') {
      // Inspiring harmonic chime: C5, E5, G5, C6
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.11);

        gain.gain.setValueAtTime(0.001, now + idx * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.11 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.11);
        osc.stop(now + idx * 0.11 + 0.6);
      });
    } else {
      // Gentle soothing break reminder: G5, E5, C5
      const freqs = [783.99, 659.25, 523.25];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.11);

        gain.gain.setValueAtTime(0.001, now + idx * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.16, now + idx * 0.11 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.11 + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.11);
        osc.stop(now + idx * 0.11 + 0.6);
      });
    }
  } catch (err) {
    console.warn('Audio chime unavailable:', err);
  }
};

const FOCUS_TIPS = [
  'Deep Focus: Trace the architecture diagram data flow step-by-step from client to storage.',
  'Pro Tip: Mentally explain the key architectural difference between this service and alternatives.',
  'Concentration: Pay close attention to CLI commands and the flags used in production.',
  'Security Mindset: Notice the IAM policies and security group port configurations.',
  'Cost Awareness: Note down the Free Tier limits to prevent accidental cloud billing.',
  'Active Recall: Try summarizing the key takeaway without looking at the notes.',
  'Interview Prep: Read the model answers to understand how senior cloud architects structure solutions.'
];

const BREAK_TIPS = [
  'Interval Break: Relax your eyes by looking at an object 20 feet away for 20 seconds.',
  'Interval Break: Stand up, stretch your shoulders, and drink a glass of fresh water.',
  'Interval Break: Take 3 slow, deep diaphragmatic breaths to reset your mental focus.',
  'Interval Break: Rest your hands and wrists before diving into the next study interval.'
];

export default function FocusStudyTimer({
  topic,
  isDistractionFree = false,
  onToggleDistractionFree
}) {
  const estimatedTopicMins = topic?.estimatedMinutes || 35;

  // Retrieve stored preferences
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('aws_focus_timer_prefs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      preset: 'topic',
      customFocusMins: estimatedTopicMins,
      customBreakMins: 5,
      soundEnabled: true,
      autoAdvance: false,
      targetCycles: 4
    };
  });

  const [preset, setPreset] = useState(preferences.preset || 'topic');
  const [customFocusMins, setCustomFocusMins] = useState(preferences.customFocusMins || estimatedTopicMins);
  const [customBreakMins, setCustomBreakMins] = useState(preferences.customBreakMins || 5);
  const [soundEnabled, setSoundEnabled] = useState(preferences.soundEnabled ?? true);
  const [autoAdvance, setAutoAdvance] = useState(preferences.autoAdvance ?? false);
  const [targetCycles, setTargetCycles] = useState(preferences.targetCycles || 4);

  // Determine current duration based on preset
  const getDurations = useCallback((selectedPreset) => {
    switch (selectedPreset) {
      case 'topic':
        return { focus: estimatedTopicMins * 60, break: 5 * 60 };
      case 'pomodoro':
        return { focus: 25 * 60, break: 5 * 60 };
      case 'deep':
        return { focus: 50 * 60, break: 10 * 60 };
      case 'sprint':
        return { focus: 15 * 60, break: 3 * 60 };
      case 'custom':
      default:
        return { focus: customFocusMins * 60, break: customBreakMins * 60 };
    }
  }, [estimatedTopicMins, customFocusMins, customBreakMins]);

  // Active timer state
  const [phase, setPhase] = useState('focus'); // 'focus' | 'break'
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getDurations(preset).focus);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalFocusedSeconds, setTotalFocusedSeconds] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isMiniDockVisible, setIsMiniDockVisible] = useState(false);
  const [isMiniDockCollapsed, setIsMiniDockCollapsed] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const timerRef = useRef(null);
  const originalTitleRef = useRef(document.title);

  // Sync preset changes with timeLeft if not running
  const changePreset = (newPreset) => {
    setPreset(newPreset);
    const durs = getDurations(newPreset);
    if (!isRunning) {
      setTimeLeft(phase === 'focus' ? durs.focus : durs.break);
    }
  };

  // Save preferences
  useEffect(() => {
    try {
      localStorage.setItem('aws_focus_timer_prefs', JSON.stringify({
        preset,
        customFocusMins,
        customBreakMins,
        soundEnabled,
        autoAdvance,
        targetCycles
      }));
    } catch (e) {}
  }, [preset, customFocusMins, customBreakMins, soundEnabled, autoAdvance, targetCycles]);

  // Load / save topic specific focus stats
  useEffect(() => {
    if (!topic?.slug) return;
    try {
      const savedStats = localStorage.getItem(`aws_focus_stats_${topic.slug}`);
      if (savedStats) {
        const parsed = JSON.parse(savedStats);
        setTotalFocusedSeconds(parsed.totalSeconds || 0);
        setCompletedCycles(parsed.completedCycles || 0);
      }
    } catch (e) {}
  }, [topic?.slug]);

  const saveTopicFocusStats = useCallback((addedSeconds, addedCycles = 0) => {
    if (!topic?.slug) return;
    try {
      const key = `aws_focus_stats_${topic.slug}`;
      const saved = localStorage.getItem(key);
      const parsed = saved ? JSON.parse(saved) : { totalSeconds: 0, completedCycles: 0 };
      const updated = {
        totalSeconds: (parsed.totalSeconds || 0) + addedSeconds,
        completedCycles: (parsed.completedCycles || 0) + addedCycles,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(updated));
      setTotalFocusedSeconds(updated.totalSeconds);
      if (addedCycles > 0) {
        setCompletedCycles(updated.completedCycles);
      }
    } catch (e) {}
  }, [topic?.slug]);

  // Track window scroll to trigger mini-dock
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 380) {
        setIsMiniDockVisible(true);
      } else {
        setIsMiniDockVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timer Tick Mechanism
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Interval Finished!
            handleIntervalComplete();
            return 0;
          }
          if (phase === 'focus') {
            saveTopicFocusStats(1, 0);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, phase, saveTopicFocusStats]);

  // Update browser document title while active
  useEffect(() => {
    if (isRunning) {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      const badge = phase === 'focus' ? '🎯 Focus' : '☕ Break';
      document.title = `(${formatted} ${badge}) ${topic?.title || 'Study'} | Cloud Master`;
    } else {
      document.title = originalTitleRef.current;
    }
    return () => {
      document.title = originalTitleRef.current;
    };
  }, [isRunning, timeLeft, phase, topic?.title]);

  // Interval Completion Handler
  const handleIntervalComplete = () => {
    if (soundEnabled) {
      playChime(phase === 'focus' ? 'focus-complete' : 'break-complete');
    }

    const durs = getDurations(preset);

    if (phase === 'focus') {
      // Focus Interval Completed!
      const newCycle = currentCycle < targetCycles ? currentCycle + 1 : 1;
      setCurrentCycle(newCycle);
      saveTopicFocusStats(0, 1);
      setPhase('break');
      setTimeLeft(durs.break);
      setTipIndex(prev => (prev + 1) % BREAK_TIPS.length);
      if (!autoAdvance) {
        setIsRunning(false);
      }
    } else {
      // Break Interval Completed!
      setPhase('focus');
      setTimeLeft(durs.focus);
      setTipIndex(prev => (prev + 1) % FOCUS_TIPS.length);
      if (!autoAdvance) {
        setIsRunning(false);
      }
    }
  };

  // Toggle Play / Pause
  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  // Reset current phase
  const handleReset = () => {
    setIsRunning(false);
    const durs = getDurations(preset);
    setTimeLeft(phase === 'focus' ? durs.focus : durs.break);
  };

  // Skip to next interval phase
  const handleSkip = () => {
    const durs = getDurations(preset);
    if (phase === 'focus') {
      setPhase('break');
      setTimeLeft(durs.break);
      setTipIndex(prev => (prev + 1) % BREAK_TIPS.length);
    } else {
      setPhase('focus');
      setTimeLeft(durs.focus);
      setTipIndex(prev => (prev + 1) % FOCUS_TIPS.length);
    }
  };

  // Quick adjustment (+5 min / -5 min)
  const adjustMinutes = (deltaMins) => {
    setTimeLeft(prev => Math.max(60, prev + deltaMins * 60));
  };

  // Formatter for MM:SS
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Total duration of current phase
  const currentTotalDuration = phase === 'focus'
    ? getDurations(preset).focus
    : getDurations(preset).break;

  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentTotalDuration - timeLeft) / currentTotalDuration) * 100)
  );

  // SVG Circular Gauge calculations
  const strokeWidth = 10;
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <>
      {/* 🎯 MAIN FOCUS STUDY STATION CARD */}
      <div className="rounded-3xl neo-card border-amber-500/30 overflow-hidden shadow-2xl relative">
        {/* Glowing top ambient gradient */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 ${
          phase === 'focus'
            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400'
            : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400'
        }`} />

        <div className="p-5 sm:p-7 space-y-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-2xl border transition-all ${
                phase === 'focus'
                  ? 'bg-amber-500/15 border-amber-500/35 text-amber-400 shadow-glow-gold'
                  : 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400'
              }`}>
                {phase === 'focus' ? <Timer className="w-5 h-5 animate-pulse" /> : <Coffee className="w-5 h-5 animate-bounce" />}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-black text-white font-display">
                    Concentration &amp; Study Interval Timer
                  </h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                    phase === 'focus'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/35'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/35'
                  }`}>
                    {phase === 'focus' ? '🎯 Focus Mode' : '☕ Rest Interval'}
                  </span>
                  {isRunning && (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Active Session
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Set your deep focus duration for this topic, followed by structured rest intervals to maximize retention.
                </p>
              </div>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newSound = !soundEnabled;
                  setSoundEnabled(newSound);
                  if (newSound) playChime('focus-complete');
                }}
                className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                  soundEnabled
                    ? 'bg-slate-900 text-amber-400 border-amber-500/30 hover:bg-slate-800'
                    : 'bg-slate-900/60 text-slate-500 border-white/[0.08] hover:text-slate-300'
                }`}
                title={soundEnabled ? 'Chime sound is ON' : 'Chime sound is MUTED'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline text-[11px]">{soundEnabled ? 'Chime ON' : 'Muted'}</span>
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                  showSettings
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900 text-slate-300 border-white/[0.08] hover:border-amber-500/30'
                }`}
                title="Customize intervals & durations"
              >
                <Sliders className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Configure</span>
                {showSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {onToggleDistractionFree && (
                <button
                  onClick={onToggleDistractionFree}
                  className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                    isDistractionFree
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-glow-indigo'
                      : 'bg-slate-900 text-slate-300 border-white/[0.08] hover:border-indigo-500/30'
                  }`}
                  title="Distraction-Free Focus Reading Mode"
                >
                  {isDistractionFree ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span className="hidden md:inline text-[11px]">
                    {isDistractionFree ? 'Exit Focus Mode' : 'Distraction-Free'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Preset Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Presets:
            </span>

            {/* Topic Target Preset */}
            <button
              onClick={() => changePreset('topic')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 border ${
                preset === 'topic'
                  ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border-white/[0.06] hover:text-slate-200'
              }`}
            >
              <span>Topic Target</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-mono">
                {estimatedTopicMins}m / 5m
              </span>
            </button>

            {/* Pomodoro 25/5 */}
            <button
              onClick={() => changePreset('pomodoro')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 border ${
                preset === 'pomodoro'
                  ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border-white/[0.06] hover:text-slate-200'
              }`}
            >
              <span>Pomodoro</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-mono">
                25m / 5m
              </span>
            </button>

            {/* Deep Work 50/10 */}
            <button
              onClick={() => changePreset('deep')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 border ${
                preset === 'deep'
                  ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border-white/[0.06] hover:text-slate-200'
              }`}
            >
              <span>Deep Work</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-mono">
                50m / 10m
              </span>
            </button>

            {/* Sprint 15/3 */}
            <button
              onClick={() => changePreset('sprint')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 border ${
                preset === 'sprint'
                  ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border-white/[0.06] hover:text-slate-200'
              }`}
            >
              <span>Sprint</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-mono">
                15m / 3m
              </span>
            </button>

            {/* Custom */}
            <button
              onClick={() => {
                changePreset('custom');
                setShowSettings(true);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 border ${
                preset === 'custom'
                  ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 border-white/[0.06] hover:text-slate-200'
              }`}
            >
              <span>Custom Interval</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-mono">
                {customFocusMins}m / {customBreakMins}m
              </span>
            </button>
          </div>

          {/* Interactive Settings Drawer (Expandable) */}
          {showSettings && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> Custom Interval Configuration
                </span>
                <span className="text-[11px] text-slate-400">Settings save automatically</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Focus Duration Slider */}
                <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1">
                      🎯 Focus Duration:
                    </span>
                    <span className="font-mono font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                      {customFocusMins} mins
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="90"
                    step="5"
                    value={customFocusMins}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomFocusMins(val);
                      if (preset === 'custom' && !isRunning && phase === 'focus') {
                        setTimeLeft(val * 60);
                      }
                    }}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>5m</span>
                    <span>25m</span>
                    <span>45m</span>
                    <span>90m</span>
                  </div>
                </div>

                {/* Break Interval Slider */}
                <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1">
                      ☕ Rest Interval:
                    </span>
                    <span className="font-mono font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                      {customBreakMins} mins
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={customBreakMins}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomBreakMins(val);
                      if (preset === 'custom' && !isRunning && phase === 'break') {
                        setTimeLeft(val * 60);
                      }
                    }}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1m</span>
                    <span>5m</span>
                    <span>15m</span>
                    <span>30m</span>
                  </div>
                </div>

                {/* Target Interval Cycles & Automation */}
                <div className="space-y-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300">Cycles per Session:</span>
                    <select
                      value={targetCycles}
                      onChange={(e) => setTargetCycles(Number(e.target.value))}
                      className="bg-slate-900 border border-white/[0.1] rounded px-2 py-0.5 text-xs text-amber-300 font-bold"
                    >
                      <option value="2">2 Intervals</option>
                      <option value="3">3 Intervals</option>
                      <option value="4">4 Intervals (Standard)</option>
                      <option value="6">6 Intervals</option>
                      <option value="8">8 Intervals (Power)</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 pt-1">
                    <input
                      type="checkbox"
                      checked={autoAdvance}
                      onChange={(e) => setAutoAdvance(e.target.checked)}
                      className="accent-amber-500 rounded"
                    />
                    <span>Auto-advance intervals seamlessly</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Central Timer Display & Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Circular Countdown Gauge */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background Track Circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.06)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  {/* Animated Progress Circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke={phase === 'focus' ? 'url(#amberGradient)' : 'url(#emeraldGradient)'}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-500 ease-linear"
                  />
                  {/* SVG Gradients */}
                  <defs>
                    <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Center Digital Time & Phase */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 ${
                    phase === 'focus'
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-emerald-400 bg-emerald-500/10'
                  }`}>
                    {phase === 'focus' ? 'Concentrating' : 'Resting'}
                  </span>
                  <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white drop-shadow-md">
                    {formatTime(timeLeft)}
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 mt-1">
                    {Math.round(progressPercent)}% completed
                  </span>
                </div>
              </div>

              {/* Quick +5m / -5m Adjusters */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => adjustMinutes(-5)}
                  disabled={timeLeft <= 300}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-[11px] font-bold transition disabled:opacity-40"
                  title="Subtract 5 minutes"
                >
                  -5m
                </button>
                <span className="text-[11px] text-slate-500 font-mono">Quick Adjust</span>
                <button
                  onClick={() => adjustMinutes(5)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white text-[11px] font-bold transition"
                  title="Add 5 minutes"
                >
                  +5m
                </button>
              </div>
            </div>

            {/* Right: Controls, Intervals Tracker & Motivational Tip */}
            <div className="lg:col-span-7 space-y-4">
              {/* Primary Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={toggleTimer}
                  className={`px-6 py-3.5 rounded-2xl font-black text-sm transition-all flex items-center gap-2.5 shadow-xl flex-1 sm:flex-none justify-center ${
                    isRunning
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/40 ring-2 ring-amber-400/40'
                      : phase === 'focus'
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white shadow-glow-gold'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white shadow-emerald-900/30'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>Pause Focus</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>{timeLeft === currentTotalDuration ? 'Start Concentrating' : 'Resume Session'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition"
                  title="Reset Interval"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={handleSkip}
                  className="px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition text-xs font-bold flex items-center gap-1.5"
                  title={`Skip to ${phase === 'focus' ? 'Rest Interval' : 'Focus Interval'}`}
                >
                  <SkipForward className="w-4 h-4 text-amber-400" />
                  <span>{phase === 'focus' ? 'Skip to Rest Interval' : 'Back to Focus'}</span>
                </button>
              </div>

              {/* Interval Cycle Progress Bar & Indicators */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="font-extrabold text-white">Interval Cycle Progress</span>
                  </div>
                  <span className="font-mono text-amber-400 font-black">
                    Cycle {currentCycle} of {targetCycles}
                  </span>
                </div>

                {/* Cycle Visual Pills */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {Array.from({ length: targetCycles }).map((_, idx) => {
                    const isDone = idx < currentCycle - 1;
                    const isCurrent = idx === currentCycle - 1;
                    return (
                      <div
                        key={idx}
                        className={`h-2.5 rounded-full transition-all ${
                          isDone
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm'
                            : isCurrent
                            ? phase === 'focus'
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse ring-1 ring-amber-400/60'
                              : 'bg-emerald-400 ring-1 ring-emerald-400/60'
                            : 'bg-white/[0.06]'
                        }`}
                        title={`Cycle ${idx + 1}`}
                      />
                    );
                  })}
                </div>

                {/* Session Stats Counter */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Total Completed Cycles: <strong className="text-white">{completedCycles}</strong></span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Topic Focus Time: <strong className="text-amber-300 font-mono">{Math.floor(totalFocusedSeconds / 60)} mins</strong></span>
                  </span>
                </div>
              </div>

              {/* Dynamic Focus / Break Tip Banner */}
              <div className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-colors ${
                phase === 'focus'
                  ? 'bg-amber-950/20 border-amber-500/25 text-amber-200'
                  : 'bg-emerald-950/20 border-emerald-500/25 text-emerald-200'
              }`}>
                <div className="mt-0.5 flex-shrink-0">
                  {phase === 'focus' ? (
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Coffee className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <p className="text-xs leading-relaxed">
                  {phase === 'focus' ? FOCUS_TIPS[tipIndex % FOCUS_TIPS.length] : BREAK_TIPS[tipIndex % BREAK_TIPS.length]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 FLOATING MINI-DOCK (Appears bottom-center when scrolling through notes, leaving Ask AI Trainer completely unobstructed) */}
      {isMiniDockVisible && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 z-40 animate-in slide-in-from-bottom duration-300 max-w-[calc(100vw-2rem)] select-none">
          <div className={`neo-card rounded-2xl sm:rounded-full border shadow-2xl p-2.5 sm:px-4 sm:py-2.5 bg-slate-950/95 backdrop-blur-2xl flex items-center gap-3 transition-all duration-300 ${
            phase === 'focus'
              ? 'border-amber-500/40 shadow-amber-950/40'
              : 'border-emerald-500/40 shadow-emerald-950/40'
          }`}>
            {isMiniDockCollapsed ? (
              <button
                onClick={() => setIsMiniDockCollapsed(false)}
                className="flex items-center gap-2 text-xs font-bold text-white hover:text-amber-300 p-1"
                title="Expand Concentration Study Timer"
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black border ${
                  phase === 'focus'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {phase === 'focus' ? '🎯' : '☕'}
                </div>
                <span className="font-mono font-black text-amber-300">{formatTime(timeLeft)}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold hidden sm:inline">({phase})</span>
              </button>
            ) : (
              <>
                {/* Mini Circle Status */}
                <div
                  onClick={() => window.scrollTo({ top: 120, behavior: 'smooth' })}
                  className="cursor-pointer flex items-center gap-2 group"
                  title="Click to jump to main Study Station"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                    phase === 'focus'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {phase === 'focus' ? '🎯' : '☕'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-black text-white group-hover:text-amber-300 transition">
                        {formatTime(timeLeft)}
                      </span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        phase === 'focus'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {phase === 'focus' ? 'Focus Interval' : 'Rest Interval'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[150px] sm:max-w-[200px]">
                      {topic?.title || 'Concentration Study'}
                    </div>
                  </div>
                </div>

                {/* Mini Controls */}
                <div className="flex items-center gap-1.5 pl-2 border-l border-white/[0.1]">
                  <button
                    onClick={toggleTimer}
                    className={`px-3 py-1.5 rounded-full text-white font-bold text-xs transition flex items-center gap-1.5 ${
                      isRunning
                        ? 'bg-amber-600 hover:bg-amber-500 text-white shadow'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                    }`}
                    title={isRunning ? 'Pause Timer' : 'Resume Timer'}
                  >
                    {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span className="hidden sm:inline">{isRunning ? 'Pause' : 'Start'}</span>
                  </button>

                  <button
                    onClick={handleSkip}
                    className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition text-xs font-bold flex items-center gap-1"
                    title={`Skip to ${phase === 'focus' ? 'Rest Interval' : 'Focus Interval'}`}
                  >
                    <SkipForward className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden md:inline">Skip</span>
                  </button>

                  <button
                    onClick={() => setIsMiniDockCollapsed(true)}
                    className="p-1.5 rounded-full text-slate-500 hover:text-slate-300 transition"
                    title="Minimize to Pill"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Flame, Sparkles, Volume2 } from 'lucide-react';

const PUNCH_DIALOGUES = [
  "🔥 Kanna, panni dhan kootama varum... Singam single ah dhan varum! Finish this AWS lab!",
  "⚡ Naan oru thadava sonna, nooru thadava sonna madhiri! Cloud architect in the making!",
  "🕶️ Idhu epdi irukku? Keep practicing, zero-bill mastery is yours!",
  "💥 En vazhi, thani vazhi! Build your own cloud empire!",
  "🦁 Kashtapadama edhuvum kedaikaadhu, kedaichadhu ennaikum nikaadhu! Keep pushing!",
  "🔥 Aandavan solran, Arunachalam mudikiran! Complete today's targets!",
  "⚡ Ketta paiyan sir indha Kaali! Deploy with full confidence!"
];

export default function ThalaivarMotivator({ activeTab, selectedTopicSlug }) {
  const [isWalking, setIsWalking] = useState(false);
  const [dialogue, setDialogue] = useState(PUNCH_DIALOGUES[0]);
  const prevTopicRef = useRef(selectedTopicSlug);
  const timerRef = useRef(null);

  const playBgm = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const notes = [
        { f: 587.33, d: 0.15, t: 0.0 },   // D5
        { f: 659.25, d: 0.15, t: 0.15 },  // E5
        { f: 783.99, d: 0.25, t: 0.30 },  // G5
        { f: 880.00, d: 0.30, t: 0.55 },  // A5
        { f: 1046.50, d: 0.50, t: 0.85 }  // C6
      ];

      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + n.t);
        osc.stop(ctx.currentTime + n.t + n.d);
      });
    } catch (e) {
      console.debug('Audio not allowed yet', e);
    }
  };

  const triggerWalk = (customMessage) => {
    if (isWalking) return;
    const msg = customMessage || PUNCH_DIALOGUES[Math.floor(Math.random() * PUNCH_DIALOGUES.length)];
    setDialogue(msg);
    setIsWalking(true);
    playBgm();

    setTimeout(() => {
      setIsWalking(false);
    }, 10000);
  };

  // 1. Continuous Auto-Motivation Loop every 10 to 15 minutes (No button click needed!)
  useEffect(() => {
    const scheduleNextPeriodicWalk = () => {
      const minMinutes = 10;
      const maxMinutes = 15;
      const randomMinutes = minMinutes + Math.random() * (maxMinutes - minMinutes);
      const delayMs = randomMinutes * 60 * 1000;

      console.log(`[Thalaivar Engine] Next auto-walk scheduled in ${randomMinutes.toFixed(1)} mins`);

      timerRef.current = setTimeout(() => {
        const periodicQuotes = [
          "⏰ 10+ minutes of laser focus! Kashtapadama edhuvum kedaikaadhu, keep going!",
          "⚡ Singam single ah dhan varum! Stay locked into your cloud journey!",
          "🕶️ Idhu epdi irukku? Great progress on AWS, conquer the next topic!",
          "🔥 Focus mode! Naan oru thadava sonna, nooru thadava sonna madhiri!"
        ];
        const line = periodicQuotes[Math.floor(Math.random() * periodicQuotes.length)];
        triggerWalk(line);
        scheduleNextPeriodicWalk();
      }, delayMs);
    };

    scheduleNextPeriodicWalk();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 2. Auto-Trigger on Module / Topic Transitions without clicking any button!
  useEffect(() => {
    if (prevTopicRef.current && prevTopicRef.current !== selectedTopicSlug) {
      triggerWalk("🎉 Module advanced! Kanna, singam single ah dhan varum! Let's conquer the next topic!");
    }
    prevTopicRef.current = selectedTopicSlug;
  }, [selectedTopicSlug]);

  // 3. Listen for custom events dispatched when quizzes or labs finish
  useEffect(() => {
    const handleModuleDone = (e) => {
      const customText = e.detail?.text || "🔥 Module completed! Naan oru thadava sonna, nooru thadava sonna madhiri! Moving to next level!";
      triggerWalk(customText);
    };

    window.addEventListener('thalaivar_celebrate', handleModuleDone);
    return () => window.removeEventListener('thalaivar_celebrate', handleModuleDone);
  }, []);

  return (
    <>
      {/* Optional Manual Summon Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => triggerWalk()}
          disabled={isWalking}
          className="group relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-xs shadow-glow-gold hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/40"
          title="Auto-walks every 10-15m &amp; on module completion. Click to trigger anytime!"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">🕶️</span>
          <span>Mass Motivation</span>
          <Flame className="w-4 h-4 text-yellow-200 fill-yellow-200/40 animate-pulse" />
        </button>
      </div>

      {/* Walking Stage Across Screen */}
      {isWalking && (
        <div className="fixed bottom-0 left-0 w-screen h-52 pointer-events-none z-50 overflow-hidden">
          <div className="thalaivar-walking-track flex flex-col items-center absolute bottom-4">
            {/* Speech Bubble */}
            <div className="relative mb-3 px-5 py-2.5 rounded-2xl bg-slate-950/95 border-2 border-amber-400 text-amber-300 text-xs font-black shadow-[0_0_25px_rgba(251,191,36,0.6)] animate-pulse whitespace-nowrap">
              {dialogue}
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-amber-400" />
            </div>

            {/* Stylized Rajinikanth Avatar Character */}
            <div className="thalaivar-swag-bounce relative flex flex-col items-center">
              {/* Head & Sunglasses */}
              <div className="w-11 h-10 bg-stone-900 rounded-t-2xl relative shadow-md border border-stone-700">
                {/* Hair Wave */}
                <div className="absolute -top-1.5 -left-1 -right-1 h-5 bg-stone-950 rounded-t-2xl transform -rotate-3" />
                {/* Sunglasses */}
                <div className="absolute top-3.5 left-1.5 flex gap-1 z-10">
                  <div className="w-3.5 h-2 bg-black rounded-sm border border-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
                  <div className="w-3.5 h-2 bg-black rounded-sm border border-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
                </div>
                {/* Mustache */}
                <div className="absolute bottom-2 left-3 w-5 h-1 bg-black rounded-full" />
              </div>

              {/* Blazer & Shawl */}
              <div className="w-14 h-12 bg-stone-900 rounded-md relative -mt-0.5 border border-stone-700 shadow-xl">
                <div className="absolute inset-x-4 top-0 bottom-0 bg-white/90" />
                {/* Shawl Angavastram Swag Flick */}
                <div className="absolute -left-2 top-0.5 w-3.5 h-11 bg-gradient-to-b from-amber-500 to-amber-700 rounded-md border border-amber-400 shadow-md animate-wiggle origin-top" />
              </div>

              {/* Legs Walking */}
              <div className="flex gap-3 -mt-0.5">
                <div className="w-3 h-9 bg-stone-900 rounded-full thalaivar-left-leg border border-stone-800" />
                <div className="w-3 h-9 bg-stone-900 rounded-full thalaivar-right-leg border border-stone-800" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

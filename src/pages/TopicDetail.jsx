import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Terminal,
  ShieldAlert,
  Coins,
  AlertTriangle,
  Lightbulb,
  Check,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  Sparkles,
  Zap,
  Play,
  Youtube,
  ExternalLink,
  Bot
} from 'lucide-react';
import DiagramViewer from '../components/DiagramViewer';
import { api } from '../services/api';
import { YOUTUBE_TOPIC_VIDEOS } from '../data/youtubeData';
import { getArchitectureForTopic } from '../data/architectureData';

export default function TopicDetail({ topicSlug, onSelectTopic, onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markingRead, setMarkingRead] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!topicSlug) return;
    setLoading(true);
    Promise.all([
      api.getNotes(topicSlug),
      api.getTopic(topicSlug)
    ])
      .then(([notesRes, topicRes]) => {
        setData({
          notes: notesRes.notes,
          topic: topicRes.topic
        });
        setIsRead(topicRes.topic?.userProgress?.notesRead || false);
      })
      .catch(err => {
        console.error('Failed to load topic notes:', err);
      })
      .finally(() => setLoading(false));
  }, [topicSlug]);

  const handleMarkAsRead = async () => {
    if (!data?.topic) return;
    setMarkingRead(true);
    try {
      await api.markNotesRead(data.topic.id, 120);
      setIsRead(true);
    } catch (err) {
      console.error('Error marking as read:', err);
    } finally {
      setMarkingRead(false);
    }
  };

  const handleToggleBookmark = async () => {
    if (!data?.topic) return;
    try {
      const res = await api.toggleBookmark('NOTE', data.topic.id);
      setIsBookmarked(res.isBookmarked);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading structured topic notes...</div>;
  }

  if (!data?.notes) {
    return <div className="p-8 text-center text-slate-400">No notes found for this topic.</div>;
  }

  const { notes, topic } = data;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('roadmap')}
          className="text-xs font-bold text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Roadmap
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-900/90 text-slate-300 border-amber-500/20 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>

          <button
            onClick={handleMarkAsRead}
            disabled={isRead || markingRead}
            className={`px-4 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition ${
              isRead
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isRead ? 'Completed Notes ✓' : markingRead ? 'Saving...' : 'Mark as Read'}
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-3.5 border-amber-500/30">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/35">
            Module {topic.module?.moduleNumber || 1}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-300 font-semibold">{topic.module?.title}</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{topic.difficulty}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          {topic.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">{topic.summary}</p>

        {/* Golden Takeaway banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/40 flex items-start gap-3.5 text-amber-200 shadow-lg">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5 fill-amber-400/20" />
          </div>
          <div className="text-xs sm:text-sm">
            <span className="font-black text-amber-300 tracking-wide uppercase text-[11px] block mb-0.5">Key Architecture Takeaway</span>
            <span className="text-slate-200">{topic.keyTakeaway}</span>
          </div>
        </div>
      </div>

      {/* 📺 Curated YouTube Masterclass & Video Tutorial */}
      {(() => {
        const video = YOUTUBE_TOPIC_VIDEOS[topic.slug] || YOUTUBE_TOPIC_VIDEOS[topicSlug];
        if (!video) return null;
        return (
          <section className="p-6 rounded-3xl neo-card border-rose-500/30 bg-gradient-to-br from-rose-950/20 via-slate-950 to-slate-900/90 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
                  <Youtube className="w-5 h-5 text-rose-500 fill-rose-500/20" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/25">
                      Curated Masterclass
                    </span>
                    <span className="text-slate-600 text-xs">•</span>
                    <span className="text-xs font-semibold text-slate-300">{video.channel}</span>
                    <span className="text-slate-600 text-xs">•</span>
                    <span className="text-xs text-amber-400 font-bold">{video.duration}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                    {video.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-rose-900/30"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('ai-trainer')}
                    className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-indigo-300 border border-indigo-500/30 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Bot className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Ask AI About Video</span>
                  </button>
                )}
              </div>
            </div>

            {/* Video Player Embed / Responsive Preview */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl bg-black aspect-video max-w-3xl mx-auto">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Chapters / Key Topics Covered */}
            {video.chapters && video.chapters.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                  Key Video Chapters:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {video.chapters.map((chap, i) => (
                    <a
                      key={i}
                      href={`${video.youtubeUrl}&t=${chap.time.replace(':', 'm')}s`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-rose-500/40 text-xs transition flex flex-col group"
                    >
                      <span className="text-rose-400 font-mono font-bold text-[11px] group-hover:underline">
                        ⏱ {chap.time}
                      </span>
                      <span className="text-slate-300 text-[11px] font-medium truncate mt-0.5">
                        {chap.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      })()}

      {/* 1. Beginner-Friendly Explanation */}
      <section className="p-6 rounded-3xl neo-card space-y-3">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          1. Intuitive Explanation (Beginner Friendly)
        </h2>
        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
          <p>{notes.simpleExplanation}</p>
        </div>
      </section>

      {/* 2. Core Concepts & Definitions */}
      <section className="p-6 rounded-3xl neo-card space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          2. Core Concepts, Terminology &amp; Definitions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {notes.coreConcepts?.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 transition space-y-1">
              <span className="font-extrabold text-amber-300 text-xs sm:text-sm">{c.term}</span>
              <p className="text-xs text-slate-300 leading-snug">{c.definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Architecture Diagram & Visual Explanation */}
      {(() => {
        const arch = getArchitectureForTopic(topic.slug, topic.moduleId, topic.title);
        const svgContent = notes.architectureSvg || arch.svg;
        return (
          <section className="p-6 rounded-3xl neo-card space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                3. Visual Architecture &amp; System Flow Map
              </h2>
              <span className="text-[11px] font-bold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
                {arch.category}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{arch.description}</p>
            <DiagramViewer
              svgString={svgContent}
              title={arch.title}
              category={arch.category}
              flowSteps={arch.flowSteps}
              stepByStep={arch.stepByStep}
              interRelationships={arch.interRelationships}
              endToEndFlow={arch.endToEndFlow}
              moduleContext={arch.moduleContext}
            />
          </section>
        );
      })()}

      {/* 4. How it Works Internally */}
      <section className="p-6 rounded-3xl neo-card space-y-3">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-orange-400" />
          4. How It Works Under The Hood
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{notes.internalsExplanation}</p>
      </section>

      {/* 5. Essential CLI Commands */}
      {notes.cliExamples && notes.cliExamples.length > 0 && (
        <section className="p-6 rounded-3xl neo-card space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              5. Essential CLI Commands &amp; Production Syntax
            </h2>
            {onNavigate && (
              <button
                onClick={() => onNavigate('command-hub')}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
              >
                Open Commands Hub →
              </button>
            )}
          </div>
          <div className="space-y-2.5">
            {notes.cliExamples.map((cli, i) => {
              const cmdText = cli.command || '';
              const badge = cmdText.startsWith('git')
                ? 'Git CLI'
                : cmdText.startsWith('kubectl')
                ? 'kubectl'
                : cmdText.startsWith('docker')
                ? 'Docker CLI'
                : cmdText.startsWith('curl') && cmdText.includes('jenkins')
                ? 'Jenkins API'
                : 'AWS CLI';
              return (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20 font-mono text-xs space-y-1.5 shadow-inner">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] font-sans">
                    <span className="font-semibold text-slate-300">{cli.explanation}</span>
                    <span className="text-[10px] bg-amber-500/15 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">{badge}</span>
                  </div>
                  <p className="text-amber-300 break-all select-all font-semibold">$ {cli.command}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Best Practices, Security & Cost Considerations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Security Considerations */}
        <div className="p-5 sm:p-6 rounded-3xl neo-card space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-400">
            <ShieldAlert className="w-4 h-4" />
            <span>Security Best Practices</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{notes.securityNotes}</p>
        </div>

        {/* Cost & Free Tier Guardrails */}
        <div className="p-5 sm:p-6 rounded-3xl neo-card space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400">
            <Coins className="w-4 h-4" />
            <span>Cost Implications &amp; Free Tier Safety</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{notes.costImplications}</p>
        </div>
      </div>

      {/* 7. Common Pitfalls & Mistakes */}
      {notes.commonMistakes && notes.commonMistakes.length > 0 && (
        <section className="p-6 rounded-3xl neo-card space-y-3 border-rose-500/30">
          <h2 className="text-base font-extrabold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Common Pitfalls &amp; Mistakes To Avoid
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {notes.commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 8. Quick Revision Checklist */}
      <section className="p-6 rounded-3xl neo-card space-y-3">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          Quick Revision Checklist
        </h2>
        <div className="space-y-2">
          {notes.quickRevision?.map((r, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Action Footer */}
      <div className="p-5 rounded-3xl neo-card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAsRead}
            disabled={isRead || markingRead}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              isRead
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isRead ? 'Completed Notes ✓' : 'Mark Notes as Read'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTopic(topic.slug, 'practice-lab')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white text-xs font-black transition flex items-center gap-2 shadow-glow-gold"
          >
            <Terminal className="w-4 h-4" />
            Go to Practice Lab →
          </button>
        </div>
      </div>
    </div>
  );
}

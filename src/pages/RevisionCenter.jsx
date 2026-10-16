import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Smile,
  Meh,
  Frown,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

export default function RevisionCenter({ onSelectTopic, onNavigate }) {
  const [revisions, setRevisions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.getDueRevisions(),
      api.getBookmarks()
    ])
      .then(([revRes, bookRes]) => {
        setRevisions(revRes.revisions || []);
        setBookmarks(bookRes.bookmarks || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleCompleteReview = async (id, easeRating) => {
    try {
      await api.completeRevision(id, easeRating);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading revision queue &amp; bookmarks...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Spaced Repetition &amp; Saved Items
          </span>
          <span className="text-xs text-slate-400 font-medium">Active Recall Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          Revision Center
        </h1>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Reinforce long-term cloud memory using spaced repetition algorithms. Rate how easily you recall concepts to adjust scheduling intervals.
        </p>
      </div>

      {/* Due Reviews Queue */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-4 border-amber-500/30 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-extrabold text-white">
              Topics Scheduled for Revision ({revisions.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">SuperMemo Spaced Repetition</span>
        </div>

        {revisions.length > 0 ? (
          <div className="space-y-3">
            {revisions.map(rev => {
              const reviewDate = new Date(rev.nextReviewDate);
              const isOverdue = reviewDate <= new Date();

              return (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-400">{rev.topic?.module?.title}</span>
                      <span className="text-slate-600">•</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isOverdue
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isOverdue ? 'Due Today' : `Next: ${reviewDate.toLocaleDateString()}`}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{rev.topic?.title}</h4>
                    <p className="text-xs text-amber-300/90 italic">💡 {rev.topic?.keyTakeaway}</p>
                  </div>

                  {/* Ease Rating Action buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleCompleteReview(rev.id, 1)}
                      className="px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[11px] font-bold flex items-center gap-1 transition"
                      title="Hard: review again tomorrow"
                    >
                      <Frown className="w-3.5 h-3.5" /> Hard
                    </button>
                    <button
                      onClick={() => handleCompleteReview(rev.id, 2)}
                      className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-800 text-[11px] font-bold flex items-center gap-1 transition"
                      title="Good: interval expands"
                    >
                      <Meh className="w-3.5 h-3.5" /> Good
                    </button>
                    <button
                      onClick={() => handleCompleteReview(rev.id, 3)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 text-[11px] font-bold flex items-center gap-1 transition"
                      title="Easy: master tier interval"
                    >
                      <Smile className="w-3.5 h-3.5" /> Easy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No topics due for revision right now. Complete more topic quizzes to populate your spaced repetition queue!</p>
        )}
      </div>

      {/* Bookmarked Content */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-4 shadow-lg border-amber-500/20">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-extrabold text-white">
            Saved Bookmarks ({bookmarks.length})
          </h3>
        </div>

        {bookmarks.length > 0 ? (
          <div className="space-y-2.5">
            {bookmarks.map(b => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">{b.itemType}</span>
                  <p className="font-semibold text-white">Item ID: {b.itemId}</p>
                  {b.notes && <p className="text-slate-400">{b.notes}</p>}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date(b.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No bookmarks saved yet. Click the bookmark icon on topic notes to save them for quick reference.</p>
        )}
      </div>
    </div>
  );
}

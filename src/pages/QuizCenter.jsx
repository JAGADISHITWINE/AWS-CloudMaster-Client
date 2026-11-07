import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { FALLBACK_QUIZZES } from '../data/fallbackQuizzesData';
import { FALLBACK_MODULES } from '../data/fallbackModulesData';

export default function QuizCenter({ topicSlug, onSelectTopic, onNavigate }) {
  const getInitialQuiz = (slug) => {
    if (!slug) return null;
    const topicQuizzes = FALLBACK_QUIZZES.filter(q => q.topicSlug === slug);
    if (topicQuizzes.length > 0) {
      return {
        success: true,
        topic: { id: slug, title: slug.replace(/-/g, ' ') },
        totalQuestions: topicQuizzes.length,
        passingScorePercentage: 70,
        questions: topicQuizzes
      };
    }
    return null;
  };

  const [quizData, setQuizData] = useState(() => getInitialQuiz(topicSlug));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: optionKey }
  const [showHint, setShowHint] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    if (!topicSlug) return;
    const initial = getInitialQuiz(topicSlug);
    if (initial) {
      setQuizData(initial);
      setLoading(false);
    } else {
      setLoading(true);
    }

    setQuizResult(null);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowHint(false);
    setTimerSeconds(0);

    api.getTopicQuiz(topicSlug)
      .then(res => {
        const topicQuizzes = FALLBACK_QUIZZES.filter(q => q.topicSlug === topicSlug);
        if (res && res.questions && res.questions.length >= 25) {
          setQuizData(res);
        } else if (topicQuizzes.length > 0) {
          setQuizData({
            success: true,
            topic: { id: topicSlug, title: topicSlug.replace(/-/g, ' ') },
            totalQuestions: topicQuizzes.length,
            passingScorePercentage: 70,
            questions: topicQuizzes
          });
        } else if (res && res.questions && res.questions.length > 0) {
          setQuizData(res);
        }
      })
      .catch(err => {
        console.warn('Backend API unavailable, using offline fallback quiz:', err.message);
        const topicQuizzes = FALLBACK_QUIZZES.filter(q => q.topicSlug === topicSlug);
        if (topicQuizzes.length > 0) {
          setQuizData({
            success: true,
            topic: { id: topicSlug, title: topicSlug.replace(/-/g, ' ') },
            totalQuestions: topicQuizzes.length,
            passingScorePercentage: 70,
            questions: topicQuizzes
          });
        }
      })
      .finally(() => setLoading(false));
  }, [topicSlug]);

  // Quiz timer
  useEffect(() => {
    if (quizResult || loading) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [quizResult, loading]);

  const handleSelectOption = (questionId, optionKey) => {
    if (quizResult) return; // Locked after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!quizData?.questions) return;
    const answersPayload = Object.entries(selectedAnswers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }));

    setSubmitting(true);
    try {
      if (quizData.topic?.id && !quizData.topic.id.includes('-')) {
        const res = await api.submitQuiz(quizData.topic.id, answersPayload, timerSeconds);
        setQuizResult(res.result || res);
        if ((res.result?.passed ?? res.passed)) {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        }
      } else {
        // Offline / local fallback scoring
        let correctCount = 0;
        const detailedResults = quizData.questions.map(q => {
          const chosenKey = selectedAnswers[q.id];
          const correctOpt = q.options?.find(o => o.isCorrect);
          const isCorrect = correctOpt && chosenKey === correctOpt.optionKey;
          if (isCorrect) correctCount++;
          return {
            questionId: q.id,
            title: q.title,
            prompt: q.prompt,
            explanation: q.explanation,
            selectedOption: chosenKey,
            correctOptionKey: correctOpt?.optionKey,
            isCorrect,
            options: q.options
          };
        });
        const scorePercentage = Math.round((correctCount / quizData.questions.length) * 100);
        const passed = scorePercentage >= 70;
        setQuizResult({
          score: scorePercentage,
          passed,
          correctCount,
          totalQuestions: quizData.questions.length,
          detailedResults
        });
        if (passed) {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        }
      }
    } catch (err) {
      console.warn('API submission failed, evaluating locally:', err.message);
      let correctCount = 0;
      const detailedResults = quizData.questions.map(q => {
        const chosenKey = selectedAnswers[q.id];
        const correctOpt = q.options?.find(o => o.isCorrect);
        const isCorrect = correctOpt && chosenKey === correctOpt.optionKey;
        if (isCorrect) correctCount++;
        return {
          questionId: q.id,
          title: q.title,
          prompt: q.prompt,
          explanation: q.explanation,
          selectedOption: chosenKey,
          correctOptionKey: correctOpt?.optionKey,
          isCorrect,
          options: q.options
        };
      });
      const scorePercentage = Math.round((correctCount / quizData.questions.length) * 100);
      const passed = scorePercentage >= 70;
      setQuizResult({
        score: scorePercentage,
        passed,
        correctCount,
        totalQuestions: quizData.questions.length,
        detailedResults
      });
      if (passed) {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setQuizResult(null);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowHint(false);
    setTimerSeconds(0);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading topic certification quiz...</div>;
  }

  if (!quizData?.questions || quizData.questions.length === 0) {
    return (
      <div className="space-y-6 w-full max-w-6xl mx-auto pb-16">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('roadmap')}
            className="text-xs font-bold text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Roadmap
          </button>
        </div>
        <div className="p-8 text-center text-slate-400 space-y-4 neo-card rounded-3xl border-amber-500/20">
          <Award className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-xl sm:text-2xl font-black text-white">Select a Topic to Start Your Certification Quiz</h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Choose any topic from our 24 structured modules below to test your technical mastery with multiple-choice questions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-left pt-4">
            {FALLBACK_MODULES.map(m => (
              <div key={m.moduleNumber} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <p className="text-xs font-bold text-amber-300">Module {m.moduleNumber}: {m.title}</p>
                <div className="space-y-1">
                  {m.topics.map(t => (
                    <button
                      key={t.slug}
                      onClick={() => onSelectTopic(t.slug, 'quiz-center')}
                      className="w-full text-left p-2 rounded-lg hover:bg-amber-500/10 text-slate-300 hover:text-amber-300 text-xs transition flex items-center justify-between"
                    >
                      <span className="truncate pr-2">{t.title}</span>
                      <ArrowRight className="w-3 h-3 flex-shrink-0 text-amber-400" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const questions = quizData.questions;
  const currentQ = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const formatTime = (sec) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto pb-16">
      {/* Top Navigation & Quick Topic Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('roadmap')}
          className="text-xs font-bold text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Roadmap
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Switch Topic:</span>
            <select
              value={topicSlug || ''}
              onChange={(e) => onSelectTopic(e.target.value, 'quiz-center')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-slate-200 font-medium focus:outline-none focus:border-amber-400 max-w-xs truncate"
            >
              {FALLBACK_MODULES.map(m => (
                <optgroup key={m.moduleNumber} label={`Module ${m.moduleNumber}: ${m.title}`}>
                  {m.topics.map(t => (
                    <option key={t.slug} value={t.slug}>
                      {t.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-amber-500/20 text-xs text-amber-300 font-mono shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTime(timerSeconds)}</span>
          </div>

          <span className="text-xs text-slate-400 font-bold">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-3 border-amber-500/30">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Assessment &amp; Quiz Center
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-300 font-semibold">{quizData.topic?.title}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          Knowledge Check &amp; Certification Practice
        </h1>

        {/* Question stepper pills */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto">
          {questions.map((q, idx) => {
            const hasAnswered = !!selectedAnswers[q.id];
            const isCurrent = currentIndex === idx;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowHint(false);
                }}
                className={`w-8 h-8 rounded-xl text-xs font-extrabold transition flex items-center justify-center flex-shrink-0 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-glow-gold/40'
                    : hasAnswered
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/[0.05]'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card (One question at a time) */}
      {!quizResult ? (
        <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              {currentQ.type.replace('_', ' ')} • {currentQ.difficulty}
            </span>
            {currentQ.hints && currentQ.hints.length > 0 && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-white leading-relaxed">{currentQ.prompt}</h3>

          {/* Hint Dropdown */}
          {showHint && currentQ.hints && (
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs sm:text-sm text-amber-200">
              💡 {currentQ.hints[0]}
            </div>
          )}

          {/* Interactive Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options?.map(opt => {
              const isSelected = selectedAnswers[currentQ.id] === opt.optionKey;
              return (
                <button
                  key={opt.optionKey}
                  onClick={() => handleSelectOption(currentQ.id, opt.optionKey)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-glow-gold/20'
                      : 'bg-slate-950/80 border-white/[0.06] text-slate-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {opt.optionKey}
                  </span>
                  <span className="leading-relaxed">{opt.optionText}</span>
                </button>
              );
            })}
          </div>

          {/* Next / Previous Stepper */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                  setShowHint(false);
                }
              }}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </button>

            {isLast ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                {submitting ? 'Calculating Score...' : 'Submit Assessment'}
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                  setShowHint(false);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white shadow-glow-gold flex items-center gap-1.5 transition"
              >
                Next Question <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-white/[0.06]">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg ${
                quizResult.passed
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}>
                {quizResult.score}%
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {quizResult.passed ? '🎉 Assessment Passed!' : '📚 Review Recommended'}
                </h3>
                <p className="text-xs text-slate-400">
                  {quizResult.passed
                    ? 'Congratulations! You met the 70% passing threshold for this topic.'
                    : 'Passing score is 70%. Review the explanations below and retake when ready.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleRetake}
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-bold border border-white/[0.08] flex items-center gap-2 transition shadow flex-shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> Retake Quiz
            </button>
          </div>

          {/* Detailed Question Review & Explanations */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-white">Question Explanations &amp; Answers:</h4>
            {quizResult.detailedResults?.map((r, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2.5 ${
                  r.isCorrect
                    ? 'bg-emerald-950/20 border-emerald-800/40'
                    : 'bg-rose-950/20 border-rose-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Question {i + 1}: {r.prompt}</span>
                  {r.isCorrect ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+100%)
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1 font-bold">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pl-2">
                  {r.options?.map(opt => {
                    const isUserChoice = r.selectedOption === opt.optionKey;
                    const isCorrectOpt = opt.isCorrect;
                    return (
                      <div
                        key={opt.optionKey}
                        className={`p-2.5 rounded-xl text-xs flex items-center justify-between ${
                          isCorrectOpt
                            ? 'bg-emerald-900/40 text-emerald-200 font-semibold border border-emerald-800/60'
                            : isUserChoice
                            ? 'bg-rose-900/40 text-rose-200 font-semibold border border-rose-800/60'
                            : 'text-slate-400'
                        }`}
                      >
                        <span>{opt.optionKey}. {opt.optionText}</span>
                        {isCorrectOpt && <span className="text-[10px] uppercase font-bold text-emerald-400">Correct Answer</span>}
                        {isUserChoice && !isCorrectOpt && <span className="text-[10px] uppercase font-bold text-rose-400">Your Selection</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-400">Explanation: </span>
                  {r.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

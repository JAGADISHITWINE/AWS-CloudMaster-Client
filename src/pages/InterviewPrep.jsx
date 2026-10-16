import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Award,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Send,
  Sparkles,
  ChevronRight,
  Filter,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { api } from '../services/api';

export default function InterviewPrep({ onNavigate }) {
  const [questions, setQuestions] = useState([]);
  const [filterDifficulty, setFilterDifficulty] = useState('ALL');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isMockMode, setIsMockMode] = useState(false);
  const [answerInput, setAnswerInput] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getInterviewQuestions()
      .then(res => {
        setQuestions(res.questions || []);
        if (res.questions?.length > 0) {
          setActiveQuestion(res.questions[0]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q);
    setAnswerInput('');
    setEvaluationResult(null);
  };

  const handleEvaluateMock = async () => {
    if (!answerInput || answerInput.trim().length < 15) {
      alert('Please provide a more complete answer (at least 15 characters).');
      return;
    }

    setEvaluating(true);
    try {
      const res = await api.evaluateMockAnswer(activeQuestion.id, answerInput, activeQuestion.topicId);
      setEvaluationResult(res.evaluation);
    } catch (err) {
      console.error(err);
      alert('Evaluation error: ' + err.message);
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading AWS interview preparation bank...</div>;
  }

  const filteredQuestions = questions.filter(q => {
    return filterDifficulty === 'ALL' || q.difficulty.toUpperCase() === filterDifficulty;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Technical Interview Coach
            </span>
            <span className="text-xs text-slate-400 font-medium">Solutions Architect &amp; DevOps</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            AWS Cloud Interview Preparation
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Study real interview questions by level or practice under pressure in interactive Mock Interview Mode with rubric scoring.
          </p>
        </div>

        {/* Mock Mode Switch */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-2xl bg-slate-900/90 p-1 border border-amber-500/25 text-xs shadow-inner">
            <button
              onClick={() => setIsMockMode(false)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                !isMockMode ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-glow-gold/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Study Bank
            </button>
            <button
              onClick={() => setIsMockMode(true)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                isMockMode ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-glow-gold/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Mock Interview Mode
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Questions Directory */}
        <div className="lg:col-span-4 space-y-3">
          {/* Difficulty Filter */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider">Question Bank</span>
            <div className="flex gap-1 text-[11px] rounded-xl bg-slate-900 p-1 border border-white/[0.06]">
              {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setFilterDifficulty(lvl)}
                  className={`px-2 py-0.5 rounded-lg font-bold ${
                    filterDifficulty === lvl ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lvl.charAt(0) + lvl.slice(1, 3).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredQuestions.map(q => {
              const isSelected = activeQuestion?.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400/50 text-white shadow-glow-gold/20'
                      : 'neo-card text-slate-300 hover:border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-extrabold text-amber-400">{q.difficulty}</span>
                    <span className="text-[10px] text-slate-400">{q.topic?.title}</span>
                  </div>
                  <h4 className="text-xs font-bold line-clamp-2">{q.title}</h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Details / Mock Interview Stage */}
        {activeQuestion && (
          <div className="lg:col-span-8 space-y-5">
            {/* Question Card */}
            <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-4 border-amber-500/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Technical Interview Question • {activeQuestion.difficulty}
                </span>
                <span className="text-xs text-slate-300 font-medium">{activeQuestion.topic?.title}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white">{activeQuestion.title}</h2>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-amber-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {activeQuestion.prompt}
              </div>

              {/* Rubric Criteria overview */}
              {activeQuestion.rubric?.criteria && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider">
                    Target Evaluation Rubric
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeQuestion.rubric.criteria.map((c, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] text-[11px] space-y-0.5">
                        <span className="font-bold text-amber-300">{c.name} ({c.weight}%)</span>
                        <p className="text-slate-400 leading-snug">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mode 1: Interactive Mock Interview Mode */}
            {isMockMode ? (
              <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Interactive Mock Interview Response
                  </h3>
                  <p className="text-xs text-slate-300">
                    Articulate your answer clearly as you would in a live technical interview. The platform evaluates your reasoning, technical terms, and trade-off analysis.
                  </p>
                </div>

                <textarea
                  rows={7}
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Type your verbal response here. Example: 'In AWS, an Availability Zone is a cluster of isolated data centers with independent power and networking, whereas a Region is a broader geographic boundary...'"
                  className="w-full p-4 rounded-2xl bg-slate-950/90 border border-amber-500/20 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans leading-relaxed"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{answerInput.length} characters</span>
                  <button
                    onClick={handleEvaluateMock}
                    disabled={evaluating}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white font-black text-xs shadow-glow-gold transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {evaluating ? 'Analyzing Rubrics...' : 'Evaluate My Answer'}
                  </button>
                </div>

                {/* Rubric Evaluation Output */}
                {evaluationResult && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4 mt-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-black text-white">Score: {evaluationResult.score} / 100</span>
                        <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                          {evaluationResult.qualitativeRating}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-1">
                        <span className="font-bold text-emerald-400">Demonstrated Strengths:</span>
                        <p className="text-slate-300 leading-snug">{evaluationResult.strengths}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1">
                        <span className="font-bold text-amber-300">Areas for Improvement:</span>
                        <p className="text-slate-300 leading-snug">{evaluationResult.areasForImprovement}</p>
                      </div>
                    </div>

                    {/* Criteria breakdowns */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Criteria Breakdown</span>
                      {evaluationResult.criteriaResults?.map((c, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-white/[0.06] flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-200">{c.name}</span>
                            <p className="text-[11px] text-slate-400">{c.feedback}</p>
                          </div>
                          <span className="font-mono font-bold text-amber-400">{c.scoreEarned} / {c.weight} pts</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-slate-500 italic pt-2 border-t border-slate-800">
                      {evaluationResult.disclaimer}
                    </p>

                    {/* Model Answer Toggle */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        Model Senior Architect Answer:
                      </h4>
                      <div className="p-4 rounded-xl bg-slate-900 border border-white/[0.06] text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-sans">
                        {evaluationResult.recommendedModelAnswer}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Mode 2: Study Bank Mode (Immediate Full Model Answer) */
              <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-4">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Model Architectural Answer &amp; Follow-Up Questions
                </h3>
                <div className="p-4 rounded-2xl bg-slate-950 border border-white/[0.06] text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed font-sans">
                  {activeQuestion.recommendedSolution}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

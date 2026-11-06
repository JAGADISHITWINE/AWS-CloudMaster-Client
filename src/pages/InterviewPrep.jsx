import React, { useState, useEffect, useMemo } from 'react';
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
  Search,
  Server,
  Network,
  HardDrive,
  Shield,
  Database,
  Scale,
  Zap,
  Activity,
  Code,
  Workflow,
  Globe,
  Tag,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import {
  INTERVIEW_CATEGORIES,
  getAllInterviewQuestions,
  evaluateMockAnswerClient
} from '../data/interviewQuestionsData';

// Icon mapping helper for categories
const CATEGORY_ICONS = {
  ALL: Layers,
  AWS_GLOBAL_INFRA: Globe,
  EC2_COMPUTE: Server,
  VPC_NETWORKING: Network,
  STORAGE: HardDrive,
  IAM_SECURITY: Shield,
  DATABASES: Database,
  ELB_AUTOSCALING: Scale,
  SERVERLESS: Zap,
  MONITORING: Activity,
  TERRAFORM_IAC: Code,
  DEVOPS_CICD: Workflow,
  FULLSTACK_DEVELOPMENT: Layers,
  ANGULAR_FRONTEND: Code,
  NODEJS_BACKEND: Server,
  APIS_INTEGRATION: Shield,
  DATABASE_SYSTEM_DESIGN: Database
};

export default function InterviewPrep({ onNavigate }) {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [filterDifficulty, setFilterDifficulty] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isMockMode, setIsMockMode] = useState(false);
  const [answerInput, setAnswerInput] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize data from API with client fallback
  useEffect(() => {
    setLoading(true);
    api.getInterviewQuestions()
      .then(res => {
        if (res.questions && res.questions.length > 0) {
          // Merge API questions with rich client metadata if available
          const localQuestions = getAllInterviewQuestions();
          const localMap = new Map(localQuestions.map(q => [q.title.toLowerCase().trim(), q]));
          
          const enriched = res.questions.map(q => {
            const local = localMap.get(q.title?.toLowerCase().trim());
            return {
              ...q,
              category: local?.category || (q.tags?.includes('VPC') ? 'VPC_NETWORKING' : q.tags?.includes('EC2') ? 'EC2_COMPUTE' : 'AWS_GLOBAL_INFRA'),
              categoryLabel: local?.categoryLabel || q.topic?.module?.title || 'AWS Architecture',
              rubric: q.rubric || local?.rubric || { criteria: [] },
              hints: q.hints || local?.hints || []
            };
          });

          // Also append any local questions not yet present in backend
          const existingTitles = new Set(enriched.map(q => q.title.toLowerCase().trim()));
          localQuestions.forEach(lq => {
            if (!existingTitles.has(lq.title.toLowerCase().trim())) {
              enriched.push(lq);
            }
          });

          setQuestions(enriched);
          if (enriched.length > 0) setActiveQuestion(enriched[0]);
        } else {
          const fallback = getAllInterviewQuestions();
          setQuestions(fallback);
          if (fallback.length > 0) setActiveQuestion(fallback[0]);
        }
      })
      .catch(err => {
        console.warn('Backend API unavailable, using offline interview question bank:', err.message);
        const fallback = getAllInterviewQuestions();
        setQuestions(fallback);
        if (fallback.length > 0) setActiveQuestion(fallback[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { ALL: questions.length };
    INTERVIEW_CATEGORIES.forEach(cat => {
      if (cat.id !== 'ALL') {
        counts[cat.id] = questions.filter(q => q.category === cat.id).length;
      }
    });
    return counts;
  }, [questions]);

  // Filtered questions based on Category, Difficulty, and Search
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // 1. Category Filter
      const matchesCategory = selectedCategory === 'ALL' || q.category === selectedCategory;

      // 2. Difficulty Filter
      const qDiff = (q.difficulty || 'Intermediate').toUpperCase();
      const matchesDifficulty = filterDifficulty === 'ALL' || qDiff === filterDifficulty;

      // 3. Search Query
      const qText = `${q.title} ${q.prompt || ''} ${q.explanation || ''} ${q.topicTitle || ''} ${q.topic?.title || ''}`.toLowerCase();
      const matchesSearch = !searchQuery.trim() || qText.includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [questions, selectedCategory, filterDifficulty, searchQuery]);

  // Keep active question in sync with filtered list if needed
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const stillInList = filteredQuestions.some(q => q.id === activeQuestion?.id);
      if (!stillInList) {
        setActiveQuestion(filteredQuestions[0]);
        setAnswerInput('');
        setEvaluationResult(null);
      }
    }
  }, [filteredQuestions, activeQuestion]);

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
      // Try backend evaluation first
      const res = await api.evaluateMockAnswer(activeQuestion.id, answerInput, activeQuestion.topicId);
      if (res && res.evaluation) {
        setEvaluationResult(res.evaluation);
      } else {
        throw new Error('Fallback to client rubric engine');
      }
    } catch (err) {
      console.info('Evaluating using client-side heuristic rubric engine:', err.message);
      // Run deterministic client-side evaluation
      const evalRes = evaluateMockAnswerClient(activeQuestion, answerInput);
      setEvaluationResult(evalRes);
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 space-y-3">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-300">Loading Classified Interview Preparation Bank...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Topic-Classified Interview Coach
            </span>
            <span className="text-xs text-slate-400 font-medium">AWS Solutions Architect &amp; DevOps</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            AWS &amp; DevOps Technical Interview Preparation
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Classified by domain topic: Practice real questions with architecture rubrics, key hints, and interactive mock scoring.
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

      {/* TOPIC CLASSIFICATION SELECTOR BAR */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
          <span className="flex items-center gap-1.5 text-amber-400 text-[11px] uppercase tracking-wider font-black">
            <Filter className="w-3.5 h-3.5" /> Classify by Topic Domain:
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            Showing {filteredQuestions.length} of {questions.length} questions
          </span>
        </div>

        {/* Horizontal Category Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500/20">
          {INTERVIEW_CATEGORIES.map(cat => {
            const Icon = CATEGORY_ICONS[cat.id] || Layers;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400/60 shadow-glow-gold/30'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-white/[0.08] hover:border-amber-500/30'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-400'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-white/[0.08] text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar & Difficulty Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-2xl bg-slate-900/60 border border-white/[0.06]">
        {/* Search Input */}
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search interview topics (e.g., 'NAT Gateway', 'User Data', 'Terraform', 'Status Checks', 'S3')..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/90 border border-white/[0.08] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="sm:col-span-4 flex items-center justify-end gap-1 text-[11px]">
          {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilterDifficulty(lvl)}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition ${
                filterDifficulty === lvl
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-white/[0.05]'
              }`}
            >
              {lvl.charAt(0) + lvl.slice(1, 3).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Questions Directory */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider">
              Questions List ({filteredQuestions.length})
            </span>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredQuestions.length === 0 ? (
              <div className="p-8 rounded-2xl neo-card text-center text-xs text-slate-400 space-y-2">
                <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto" />
                <p>No questions match your current filters.</p>
                <button
                  onClick={() => { setSelectedCategory('ALL'); setFilterDifficulty('ALL'); setSearchQuery(''); }}
                  className="text-amber-400 font-bold underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredQuestions.map(q => {
                const isSelected = activeQuestion?.id === q.id;
                const diffColor =
                  q.difficulty === 'Beginner'
                    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                    : q.difficulty === 'Advanced'
                    ? 'text-purple-400 border-purple-500/30 bg-purple-500/10'
                    : 'text-amber-400 border-amber-500/30 bg-amber-500/10';

                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(q)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 space-y-2 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400/50 text-white shadow-glow-gold/20'
                        : 'neo-card text-slate-300 hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] gap-1">
                      <span className={`font-black px-2 py-0.5 rounded-full border ${diffColor}`}>
                        {q.difficulty}
                      </span>
                      <span className="text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full font-semibold truncate max-w-[170px]">
                        {q.categoryLabel || q.topic?.module?.title}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold leading-snug line-clamp-2">{q.title}</h4>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span className="truncate max-w-[180px]">{q.topicTitle || q.topic?.title}</span>
                      {q.rubric?.criteria && (
                        <span className="text-amber-400/80 font-mono font-semibold">
                          {q.rubric.criteria.length} Rubrics
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Question Details / Mock Interview Stage */}
        {activeQuestion && (
          <div className="lg:col-span-8 space-y-5">
            {/* Question Card */}
            <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-4 border-amber-500/30 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    {activeQuestion.categoryLabel} • {activeQuestion.difficulty}
                  </span>
                </div>
                <span className="text-xs text-slate-300 font-medium bg-slate-900 px-3 py-1 rounded-full border border-white/[0.08]">
                  {activeQuestion.topicTitle || activeQuestion.topic?.title}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-white">{activeQuestion.title}</h2>

              {/* Scenario Prompt */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-amber-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {activeQuestion.prompt}
              </div>

              {/* Interviewer Testing Focus */}
              {activeQuestion.explanation && (
                <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-white/[0.04]">
                  <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300">Interviewer Intent:</strong> {activeQuestion.explanation}
                  </span>
                </div>
              )}

              {/* Quick Hints */}
              {activeQuestion.hints && activeQuestion.hints.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider block">
                    Key Architectural Anchor Points:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeQuestion.hints.map((h, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-white/[0.05]">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rubric Criteria overview */}
              {activeQuestion.rubric?.criteria && activeQuestion.rubric.criteria.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider">
                    Target Evaluation Rubric (100% Total)
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
                    Articulate your verbal answer as you would in an interview round. The scoring engine evaluates your architecture depth, key configuration parameters, and trade-offs.
                  </p>
                </div>

                <textarea
                  rows={7}
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Type your structured answer here. Example: 'In AWS, a NAT Gateway provides outbound-only internet connectivity for instances in private subnets while blocking inbound traffic...'"
                  className="w-full p-4 rounded-2xl bg-slate-950/90 border border-amber-500/20 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans leading-relaxed"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{answerInput.length} characters</span>
                  <button
                    onClick={handleEvaluateMock}
                    disabled={evaluating}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white font-black text-xs shadow-glow-gold transition flex items-center gap-2 disabled:opacity-50"
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
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Model Senior Architect Answer &amp; Deep-Dive Solution
                  </h3>
                  <button
                    onClick={() => setIsMockMode(true)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
                  >
                    Practice This in Mock Mode →
                  </button>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-white/[0.06] text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed font-sans shadow-inner">
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

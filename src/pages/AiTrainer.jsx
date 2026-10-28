import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Terminal,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  BookOpen,
  Wrench,
  HelpCircle,
  Code2,
  Trash2,
  ExternalLink,
  ChevronDown,
  Info,
  Zap,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { api } from '../services/api';

const QUICK_PROMPTS = [
  { label: '📦 Multi-Stage Dockerfile', text: 'Write a production multi-stage Dockerfile for Node.js using alpine and explain layer caching.', mode: 'architect' },
  { label: '🚢 Kubernetes Architecture', text: 'Explain the Kubernetes Control Plane and Worker Node components with an airport analogy.', mode: 'tutor' },
  { label: '🛠️ Debug CrashLoopBackOff', text: 'My Kubernetes pod is in CrashLoopBackOff with exit code 137. How do I fix it?', mode: 'debugger' },
  { label: '🔄 Git Rebase vs Merge', text: 'Explain git rebase vs merge with diagrams and the golden rule of rebasing.', mode: 'tutor' },
  { label: '⚙️ Jenkins Production Pipeline', text: 'Create a Declarative Jenkinsfile with stages: lint, test, docker build, Trivy scan, and AWS ECR push.', mode: 'architect' },
  { label: '🎯 Mock Interview', text: 'Interview me on Kubernetes Pod scheduling, taints, and tolerations.', mode: 'interviewer' }
];

export default function AiTrainer({ initialTopic = null }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **Hello! I am your AI Cloud & DevOps Trainer.**

I am powered by **Ollama Open-Source AI** (with built-in offline intelligence) to help you master **AWS Cloud, GitHub, Jenkins, Docker, and Kubernetes**.

How can I train you today?
- 🧑‍🏫 **Ask concept questions** with real-world analogies
- 🛠️ **Paste terminal error logs** (CrashLoopBackOff, OOMKilled, Docker errors)
- 🎯 **Practice mock technical interviews**
- ⚡ **Generate production Dockerfiles, Jenkinsfiles, and Kubernetes manifests**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'builtin'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState('tutor'); // 'tutor' | 'debugger' | 'interviewer' | 'architect'
  const [selectedModel, setSelectedModel] = useState('llama3.2');
  const [availableModels, setAvailableModels] = useState([]);
  const [ollamaStatus, setOllamaStatus] = useState({ online: false, host: 'http://localhost:11434', message: 'Checking...' });
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [showOllamaSetupModal, setShowOllamaSetupModal] = useState(false);
  const messagesEndRef = useRef(null);

  // Check Ollama health and list models on mount
  useEffect(() => {
    checkOllamaHealth();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const checkOllamaHealth = () => {
    api.getAiHealth()
      .then(res => {
        setOllamaStatus({
          online: !!res.ollamaOnline,
          host: res.host || 'http://localhost:11434',
          latencyMs: res.latencyMs,
          message: res.message
        });
        if (res.availableModels && res.availableModels.length > 0) {
          setAvailableModels(res.availableModels);
          if (!res.availableModels.includes(selectedModel)) {
            setSelectedModel(res.availableModels[0]);
          }
        } else {
          loadModelCatalog();
        }
      })
      .catch(() => {
        setOllamaStatus({
          online: false,
          host: 'http://localhost:11434',
          message: 'Built-in DevOps AI Knowledge Engine is Active'
        });
        loadModelCatalog();
      });
  };

  const loadModelCatalog = () => {
    api.getAiModels()
      .then(res => {
        if (res.models && Array.isArray(res.models)) {
          setAvailableModels(res.models.map(m => m.name || m));
        }
      })
      .catch(() => {
        setAvailableModels(['llama3.2', 'deepseek-r1', 'mistral', 'codellama', 'qwen2.5-coder', 'phi3']);
      });
  };

  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map(m => ({ role: m.role, content: m.content }));
      const response = await api.chatWithAi({
        message: text,
        model: selectedModel,
        mode: selectedMode,
        topic: initialTopic || '',
        history: historyPayload
      });

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: response.source,
        model: response.model || selectedModel,
        durationMs: response.totalDurationMs
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Connection Note:** ${err.message || 'Unable to contact AI endpoint.'}\n\nPlease verify that the backend is running. If using local Ollama, ensure it is started with \`ollama run llama3.2\`.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: `Conversation cleared. What topic or challenge shall we work through next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to render markdown and code blocks cleanly
  const renderMessageContent = (content, msgId) => {
    // Split by code blocks ```lang ... ```
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const lang = lines[0].trim();
        const code = lines.slice(1).join('\n') || lines[0];
        const blockId = `${msgId}-code-${index}`;

        return (
          <div key={index} className="my-3 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-amber-400 uppercase">{lang || 'CODE'}</span>
              <button
                onClick={() => handleCopyText(code, blockId)}
                className="flex items-center gap-1 hover:text-white transition px-2 py-0.5 rounded bg-slate-800"
              >
                {copiedCodeId === blockId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCodeId === blockId ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 text-slate-200 overflow-x-auto leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Simple markdown bold and formatting
      const formattedLines = part.split('\n').map((line, lIdx) => {
        if (line.startsWith('### ')) {
          return <h3 key={lIdx} className="text-base font-black text-amber-300 mt-2 mb-1">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={lIdx} className="text-lg font-black text-white mt-2 mb-1">{line.replace('## ', '')}</h2>;
        }
        if (line.startsWith('> ')) {
          return <blockquote key={lIdx} className="border-l-2 border-amber-500/50 pl-3 italic text-slate-300 my-1">{line.replace('> ', '')}</blockquote>;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <li key={lIdx} className="ml-4 list-disc text-slate-300 my-0.5">
              {line.replace(/^[-*]\s+/, '')}
            </li>
          );
        }

        // Inline bolding
        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={lIdx} className="my-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />;
      });

      return <div key={index}>{formattedLines}</div>;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] max-w-6xl mx-auto space-y-3">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 border border-amber-500/25 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-slate-950 font-black">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-1.5 font-display">
                DevOps &amp; Cloud AI Trainer
                <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Ollama 100% Free
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Interactive live mentor for AWS Cloud, GitHub, Jenkins, Docker &amp; Kubernetes.
            </p>
          </div>
        </div>

        {/* Model & Status Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Indicator */}
          <div
            onClick={() => setShowOllamaSetupModal(true)}
            className="cursor-pointer px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition"
            title="Click for Ollama Setup Guide"
          >
            <span className={`w-2 h-2 rounded-full ${ollamaStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300 text-[11px]">
              {ollamaStatus.online ? `Ollama Online (${ollamaStatus.latencyMs}ms)` : 'Built-in Engine (Standby)'}
            </span>
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-amber-400" />
          </div>

          {/* Model Selector */}
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-slate-950/90 border border-amber-500/25 text-xs text-slate-200 font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {(availableModels.length > 0 ? availableModels : ['llama3.2', 'deepseek-r1', 'mistral', 'codellama', 'qwen2.5-coder', 'phi3']).map(m => (
                <option key={m} value={m}>Model: {m}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={checkOllamaHealth}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Refresh Ollama Connection"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={clearChat}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 transition"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 px-1">
        {[
          { id: 'tutor', label: '🧑‍🏫 Concept Guide & Tutor', desc: 'Explains concepts intuitively with real analogies' },
          { id: 'debugger', label: '🛠️ DevOps Log Debugger', desc: 'Paste terminal errors & stack traces for fixes' },
          { id: 'interviewer', label: '🎯 Mock Interviewer', desc: 'Real scenario questions with scoring rubrics' },
          { id: 'architect', label: '⚡ IaC & Pipeline Architect', desc: 'Generates Dockerfiles, Jenkinsfiles & K8s YAMLs' },
        ].map(mode => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedMode === mode.id
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Main Chat Conversation Window */}
      <div className="flex-1 bg-slate-950/80 border border-amber-500/15 rounded-2xl p-4 overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                : 'bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950'
            }`}>
              {msg.role === 'user' ? 'ME' : <Bot className="w-4 h-4 text-slate-950" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs shadow-md leading-relaxed ${
              msg.role === 'user'
                ? 'bg-indigo-600/30 border border-indigo-500/40 text-slate-100 rounded-tr-none'
                : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              {msg.role === 'assistant' ? (
                <div>
                  {renderMessageContent(msg.content, msg.id)}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {msg.source === 'ollama_local' ? `Ollama (${msg.model || 'Local'})` : 'DevOps AI Knowledge Engine'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-[10px] text-indigo-300/70 text-right mt-1">{msg.timestamp}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-slate-950">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-amber-300 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>DevOps AI Trainer is thinking &amp; generating step-by-step guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        <span className="text-[10px] font-black uppercase text-amber-400/80 whitespace-nowrap pl-1">Suggested:</span>
        {QUICK_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedMode(p.mode);
              handleSendMessage(p.text);
            }}
            className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-amber-300 whitespace-nowrap transition"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-slate-900/90 border border-amber-500/25 rounded-2xl p-2 flex items-center gap-2 shadow-xl">
        <textarea
          rows="2"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={
            selectedMode === 'debugger'
              ? 'Paste terminal logs or error trace (e.g. CrashLoopBackOff, code 137, npm error)...'
              : selectedMode === 'interviewer'
              ? 'Ask for an interview question or submit your mock answer...'
              : selectedMode === 'architect'
              ? 'Request a pipeline or manifest (e.g., "Multi-stage Dockerfile for React and Nginx")...'
              : 'Ask any question about AWS Cloud, GitHub, Jenkins, Docker, or Kubernetes...'
          }
          className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none leading-relaxed font-sans"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/25"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>

      {/* Ollama Setup Modal */}
      {showOllamaSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">How to Run Ollama (100% Free &amp; Local)</h3>
              </div>
              <button
                onClick={() => setShowOllamaSetupModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>Ollama</strong> is a free, open-source tool that allows you to run powerful Large Language Models (like Llama 3.2, DeepSeek-R1, and Mistral) directly on your local CPU or GPU with zero subscription fees.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="font-bold text-amber-300">Step 1: Install Ollama (Linux / Mac / Windows)</p>
                <div className="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-lg font-mono text-[11px]">
                  <code>curl -fsSL https://ollama.com/install.sh | sh</code>
                  <button
                    onClick={() => handleCopyText('curl -fsSL https://ollama.com/install.sh | sh', 'install-cmd')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedCodeId === 'install-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="font-bold text-amber-300">Step 2: Run Free Llama 3.2 Model</p>
                <div className="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-lg font-mono text-[11px]">
                  <code>ollama run llama3.2</code>
                  <button
                    onClick={() => handleCopyText('ollama run llama3.2', 'run-cmd')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedCodeId === 'run-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                ✨ Once Ollama is running on port 11434, this platform will automatically route your chat directly to your local model!
                If Ollama is not running, our built-in DevOps AI Knowledge Engine provides instant answers with zero setup required.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setShowOllamaSetupModal(false);
                  checkOllamaHealth();
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition"
              >
                Close &amp; Check Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

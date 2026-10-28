import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw, Copy, Check, MessageSquare } from 'lucide-react';
import { api } from '../services/api';

export default function AiAssistantDrawer({ activeTab, selectedTopicSlug }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am your AI DevOps Trainer. Need help with this topic, commands, or troubleshooting?',
      timestamp: 'Now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const textToSend = input;
    setInput('');
    setLoading(true);

    try {
      const res = await api.chatWithAi({
        message: textToSend,
        topic: selectedTopicSlug,
        mode: 'tutor'
      });

      const aiMsg = {
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ AI Trainer response temporarily unavailable. Check backend connection.',
          timestamp: 'Now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-2xl shadow-orange-500/30 hover:scale-105 transition-transform duration-200 border border-amber-300/40 group"
          title="Open AI DevOps Trainer"
        >
          <Bot className="w-5 h-5 text-slate-950 animate-bounce" />
          <span className="hidden sm:inline">Ask AI Trainer</span>
          <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-slate-950 text-amber-300 font-bold">Ollama</span>
        </button>
      )}

      {/* Floating Drawer / Popover Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[520px] bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp backdrop-blur-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-amber-500/20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                  AI Live Trainer
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[10px] text-slate-400">Context: {selectedTopicSlug || activeTab}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[90%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-indigo-600/40 text-slate-100 border border-indigo-500/30'
                      : 'bg-slate-900 text-slate-200 border border-slate-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
                <span className="text-[9px] text-slate-500 mt-0.5 px-1">{m.timestamp}</span>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-amber-400 bg-slate-900 p-2 rounded-xl border border-slate-800 w-fit">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>AI Trainer thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-2 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about this lab, Docker, K8s, Jenkins..."
              className="flex-1 bg-slate-950 px-3 py-2 rounded-xl text-xs text-white border border-slate-800 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:opacity-40 transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

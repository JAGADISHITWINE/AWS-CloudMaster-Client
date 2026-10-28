import React, { useState } from 'react';
import {
  Layers,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  ArrowRight,
  GitCommit,
  Network,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Sparkles,
  Link2
} from 'lucide-react';

export default function DiagramViewer({
  svgString,
  title,
  category,
  flowSteps,
  stepByStep,
  interRelationships,
  endToEndFlow,
  moduleContext
}) {
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' | 'stepByStep' | 'relations' | 'flow' | 'context'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!svgString) return null;

  const handleCopySvg = () => {
    navigator.clipboard.writeText(svgString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="rounded-3xl border border-indigo-500/30 neo-card overflow-hidden shadow-2xl my-4 transition duration-200 hover:border-indigo-500/50">
        {/* Main Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-950 via-[#0d1424] to-slate-950 border-b border-indigo-500/20 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-white block font-display tracking-tight">
                {title || 'Visual Architecture & Flow Diagram'}
              </span>
              {category && (
                <span className="text-[11px] text-indigo-300 font-bold uppercase tracking-wider">{category}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            <button
              onClick={handleCopySvg}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 transition flex items-center gap-1.5 border border-white/[0.08]"
              title="Copy SVG Vector Code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SVG' : 'Copy SVG'}</span>
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 transition flex items-center gap-1.5 border border-indigo-500/40"
              title="Expand Fullscreen Modal"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full View</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation for Deep Architecture Breakdown */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-950/80 border-b border-white/[0.06] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'canvas'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visual Diagram</span>
          </button>

          <button
            onClick={() => setActiveTab('stepByStep')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'stepByStep'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Step-by-Step Components</span>
            {stepByStep && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-black">
                {stepByStep.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('relations')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'relations'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>How They Relate</span>
          </button>

          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'flow'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>End-to-End Traffic Flow</span>
          </button>

          {moduleContext && (
            <button
              onClick={() => setActiveTab('context')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'context'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Module Chain Context</span>
            </button>
          )}
        </div>

        {/* Tab 1: Visual Canvas (SVG) */}
        {activeTab === 'canvas' && (
          <div className="space-y-0">
            <div
              className="p-4 sm:p-6 flex justify-center items-center bg-[#070b14] overflow-x-auto select-none"
              dangerouslySetInnerHTML={{ __html: svgString }}
            />

            {/* Quick Flow Pills below canvas */}
            {flowSteps && flowSteps.length > 0 && (
              <div className="px-5 py-3.5 bg-slate-950/70 border-t border-white/[0.06] space-y-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                  Quick Data Path Sequence:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {flowSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-white/[0.03] border border-white/[0.07] text-slate-200 flex items-center gap-1.5"
                    >
                      <span className="w-4 h-4 rounded-full bg-indigo-500/25 text-indigo-300 text-[10px] flex items-center justify-center font-black">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Step-by-Step Architecture Component Breakdown */}
        {activeTab === 'stepByStep' && (
          <div className="p-5 sm:p-6 bg-slate-950/90 space-y-4">
            <div className="border-b border-white/[0.06] pb-3">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Step-by-Step Architecture Components &amp; Responsibilities
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Every building block in this architecture has a single dedicated responsibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {stepByStep && stepByStep.length > 0 ? (
                stepByStep.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-indigo-500/35 transition space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                        {item.step || idx + 1}
                      </span>
                      <h5 className="text-xs sm:text-sm font-extrabold text-white">{item.component}</h5>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-wider text-indigo-300 block">
                          What It Does:
                        </span>
                        <p className="text-slate-300 leading-relaxed">{item.role}</p>
                      </div>

                      {item.why && (
                        <div className="pt-1">
                          <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 block">
                            Why It Is Placed Here:
                          </span>
                          <p className="text-slate-400 leading-relaxed italic">{item.why}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-6 text-center text-slate-400 text-xs">
                  Component details available in the visual diagram tab.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: How They Are Related (Inter-Relationships & Handshakes) */}
        {activeTab === 'relations' && (
          <div className="p-5 sm:p-6 bg-slate-950/90 space-y-4">
            <div className="border-b border-white/[0.06] pb-3">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Link2 className="w-4 h-4 text-cyan-400" />
                Component Inter-Relationships, Bridges &amp; Protocols
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                How each component talks to the next component, which protocols they use, and how security boundaries are respected.
              </p>
            </div>

            <div className="space-y-3">
              {interRelationships && interRelationships.length > 0 ? (
                interRelationships.map((rel, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/35 transition space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold">
                          {rel.from}
                        </span>
                        <ArrowRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                          {rel.to}
                        </span>
                      </div>

                      {rel.protocol && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/[0.05] text-slate-400 border border-white/[0.06] self-start sm:self-auto">
                          {rel.protocol}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{rel.relation}</p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-xs">
                  Component relationships detailed in the architecture summary.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: End-to-End Traffic & Execution Flow */}
        {activeTab === 'flow' && (
          <div className="p-5 sm:p-6 bg-slate-950/90 space-y-4">
            <div className="border-b border-white/[0.06] pb-3">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Workflow className="w-4 h-4 text-emerald-400" />
                Chronological End-to-End Traffic / Execution Flow
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Tracing a request or code commit step-by-step from trigger to completion.
              </p>
            </div>

            <div className="space-y-3">
              {endToEndFlow && endToEndFlow.length > 0 ? (
                endToEndFlow.map((stage, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/35 transition flex items-start gap-3.5"
                  >
                    <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-xs sm:text-sm font-extrabold text-white">{stage.stage}</h5>
                        {stage.action && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-black/40 text-emerald-300 border border-emerald-500/20">
                            {stage.action}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{stage.details}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-xs">
                  Review the flow steps sequence above the diagram canvas.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Module Chain Context */}
        {activeTab === 'context' && moduleContext && (
          <div className="p-5 sm:p-6 bg-slate-950/90 space-y-4">
            <div className="border-b border-white/[0.06] pb-3">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-purple-400" />
                Curriculum Progression: How This Module Fits in the Chain
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Why this module is placed here and how it builds on previous concepts to enable the next tier.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Preceding Foundation:</span>
                <p className="text-xs font-bold text-slate-200">{moduleContext.prevModule || 'Foundational Linux & Networking'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1">
                <span className="text-[10px] font-black uppercase text-indigo-400 block">Current Focus:</span>
                <p className="text-xs font-extrabold text-white">{moduleContext.thisModule || title}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Unlocks Next Module:</span>
                <p className="text-xs font-bold text-slate-200">{moduleContext.nextModule || 'Automated CI/CD & Orchestration'}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-purple-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-purple-300 block mb-1">Architectural Bridge:</strong>
              {moduleContext.connectionReason}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-extrabold text-white">{title}</h3>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5 text-xs font-bold"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Close Fullscreen</span>
            </button>
          </div>

          <div className="flex-1 max-w-7xl mx-auto w-full neo-card rounded-3xl border border-indigo-500/30 overflow-auto p-6 sm:p-10 flex items-center justify-center bg-[#070b14]">
            <div
              className="w-full max-w-5xl"
              dangerouslySetInnerHTML={{ __html: svgString }}
            />
          </div>
        </div>
      )}
    </>
  );
}

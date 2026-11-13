import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, RefreshCw } from 'lucide-react';

export default function CliSimulator({ simulationScript, sampleCommand, expectedOutput }) {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setOutput('Initiating safe local sandbox simulation (AWS, Git, Docker, K8s, Jenkins)...\n');

    setTimeout(() => {
      if (simulationScript) {
        const lines = simulationScript
          .split('\n')
          .filter(l => !l.startsWith('#!'))
          .map(l => l.replace(/^echo\s+"?/, '').replace(/"?$/, ''))
          .join('\n');
        setOutput(lines + '\n\n✨ [SIMULATION SUCCESS] Test completed with ZERO cloud charges incurred.');
      } else if (expectedOutput) {
        setOutput(`$ ${sampleCommand}\n\n${expectedOutput}\n\n✨ [SIMULATION SUCCESS] Exit code 0.`);
      } else {
        setOutput(`$ ${sampleCommand}\nExecution successful. 0 billable resources created.`);
      }
      setIsRunning(false);
    }, 600);
  };

  const handleCopy = () => {
    if (sampleCommand) {
      navigator.clipboard.writeText(sampleCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] hover:border-cyan-500/30 bg-[#070b14] shadow-2xl overflow-hidden font-mono text-sm transition-colors duration-200">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs text-slate-300 font-sans ml-2 flex items-center gap-1.5 font-bold">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Cloud &amp; DevOps CLI Sandbox (Zero-Cost Safe Environment)
          </span>
        </div>
        <div className="flex items-center gap-2">
          {sampleCommand && (
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition"
              title="Copy Command"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="px-3.5 py-1.5 text-xs font-black rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-95 text-white flex items-center gap-1.5 transition shadow-glow-cyan/20"
          >
            {isRunning ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
            {isRunning ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 bg-[#070b14] text-slate-200 min-h-[160px] max-h-[300px] overflow-y-auto space-y-2">
        {sampleCommand && (
          <div className="flex items-start gap-2 text-cyan-300 font-medium">
            <span className="text-emerald-400 select-none">$</span>
            <span className="break-all">{sampleCommand}</span>
          </div>
        )}

        {output ? (
          <pre className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-mono mt-2 bg-slate-900/60 p-3.5 rounded-xl border border-white/[0.06]">
            {output}
          </pre>
        ) : (
          <div className="text-xs text-slate-500 italic pt-2">
            Click 'Run Simulation' to execute safe mock validation without running live CLI commands.
          </div>
        )}
      </div>
    </div>
  );
}

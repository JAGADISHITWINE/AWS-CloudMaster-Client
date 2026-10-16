import React from 'react';
import { Layers } from 'lucide-react';

export default function DiagramViewer({ svgString, title }) {
  if (!svgString) return null;

  return (
    <div className="rounded-2xl border border-amber-500/20 neo-card overflow-hidden shadow-xl my-4">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1424] border-b border-amber-500/15">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          {title || 'AWS Architecture Flow Diagram'}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">Interactive Visual Map</span>
      </div>
      <div
        className="p-5 flex justify-center items-center bg-slate-950/80 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    </div>
  );
}

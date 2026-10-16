import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function CostRiskBadge({ level = 'LOW', showText = true }) {
  if (level === 'HIGH') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950/80 text-red-400 border border-red-800/60 shadow-sm">
        <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
        {showText && 'High Cost Risk'}
      </span>
    );
  }

  if (level === 'MEDIUM') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60 shadow-sm">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
        {showText && 'Medium Cost Risk'}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 shadow-sm">
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
      {showText && 'Free Tier Safe'}
    </span>
  );
}

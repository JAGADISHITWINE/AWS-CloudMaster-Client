import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Coins,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Sliders,
  DollarSign,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

export default function FreeTierSafety() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [budgetLimit, setBudgetLimit] = useState(5.0);
  const [freeTierOnly, setFreeTierOnly] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadSafetyData();
  }, []);

  const loadSafetyData = () => {
    setLoading(true);
    api.getSafetyCenter()
      .then(res => {
        setData(res);
        setBudgetLimit(res.settings?.monthlyBudgetLimit || 5.0);
        setFreeTierOnly(res.settings?.isFreeTierOnlyMode ?? true);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleSaveSettings = async () => {
    setUpdating(true);
    setSaveSuccess(false);
    try {
      await api.updateSafetySettings({
        monthlyBudgetLimit: budgetLimit,
        isFreeTierOnlyMode: freeTierOnly
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to update safety settings: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleVerifyCleanup = async (recordId) => {
    try {
      await api.verifyCleanupRecord(recordId);
      loadSafetyData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading Free Tier Safety Center...</div>;
  }

  const { settings, cleanupRecords, commonCostPitfalls, officialLinks } = data || {};

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero-Cost Protection Center
          </span>
          <span className="text-xs text-slate-400 font-medium">FinOps &amp; Free Tier Guardrails</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          AWS Free Tier &amp; Cost Safety Center
        </h1>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Learn AWS with complete peace of mind. Monitor configured budget limits, track resource teardown checklists, and avoid unexpected cloud bills.
        </p>
      </div>

      {/* Safety Status Banner */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card border-emerald-500/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Free Tier Guardrails: ACTIVE</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            All labs on this platform prioritize simulated commands, local mocks, and free-tier eligible resources (t2/t3.micro, 30GB EBS, 5GB S3, 25GB DynamoDB). No AWS root credentials are ever asked or stored.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href={officialLinks?.awsFreeTierGuide || 'https://aws.amazon.com/free/'}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] text-xs font-bold flex items-center gap-1.5 transition"
          >
            AWS Free Tier Limits <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
          <a
            href={officialLinks?.awsBillingDashboard || 'https://console.aws.amazon.com/billing/home'}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition"
          >
            AWS Billing Console <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Budget Monitor & Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl neo-card space-y-4">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            Monthly Safety Budget Limit
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Target Ceiling:</span>
              <span className="text-xl font-black text-white font-mono">${budgetLimit.toFixed(2)} / month</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$0.00 (Zero Spend)</span>
              <span>$10.00</span>
              <span>$20.00</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <span className="text-xs font-bold text-slate-300">Free Tier Only Mode</span>
            <input
              type="checkbox"
              checked={freeTierOnly}
              onChange={(e) => setFreeTierOnly(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded"
            />
          </div>

          <button
            onClick={handleSaveSettings}
            disabled={updating}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white font-black text-xs transition shadow-glow-gold"
          >
            {updating ? 'Saving...' : saveSuccess ? 'Settings Saved ✓' : 'Save Safety Guardrails'}
          </button>
        </div>

        {/* Top 5 Paid Traps in AWS */}
        <div className="md:col-span-2 p-6 rounded-3xl neo-card space-y-3.5">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Common Accidental AWS Cost Pitfalls (Beware!)
          </h3>
          <div className="space-y-2.5">
            {commonCostPitfalls?.map((p, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.06] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white">{p.resource}</span>
                    <span className="text-[10px] bg-rose-950/80 text-rose-300 font-bold px-2 py-0.5 rounded-md border border-rose-800/60">
                      {p.hourlyCost}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{p.warning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lab Cleanup & Teardown Records */}
      <div className="p-6 sm:p-8 rounded-3xl neo-card space-y-4 shadow-lg border-amber-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-extrabold text-white">Lab Resource Teardown &amp; Verification Tracker</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Ensures no test resources linger in your AWS account</span>
        </div>

        {cleanupRecords && cleanupRecords.length > 0 ? (
          <div className="space-y-2.5">
            {cleanupRecords.map(rec => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{rec.resourceName}</span>
                    <span className="text-[10px] bg-amber-500/15 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-500/30">
                      {rec.serviceName} • {rec.region}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{rec.lab?.title}</p>
                </div>

                <div className="flex items-center gap-3">
                  {rec.status === 'VERIFIED' ? (
                    <span className="text-emerald-400 font-extrabold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Cleaned &amp; Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => handleVerifyCleanup(rec.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-[11px] shadow transition"
                    >
                      Verify Teardown
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No resources currently pending cleanup. Your account footprint is clean.</p>
        )}
      </div>
    </div>
  );
}

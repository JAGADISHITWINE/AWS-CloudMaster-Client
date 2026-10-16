import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Clock,
  Calendar,
  ShieldCheck,
  Save,
  CheckCircle2,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

export default function Settings({ user, onProfileUpdated }) {
  const [name, setName] = useState(user?.name || '');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(user?.dailyGoalMinutes || 45);
  const [targetDate, setTargetDate] = useState(
    user?.targetDate ? new Date(user.targetDate).toISOString().split('T')[0] : '2026-12-31'
  );
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setDailyGoalMinutes(user.dailyGoalMinutes || 45);
      if (user.targetDate) {
        setTargetDate(new Date(user.targetDate).toISOString().split('T')[0]);
      }
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      const res = await api.updateProfile({
        name,
        dailyGoalMinutes,
        targetDate
      });
      onProfileUpdated(res.user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to update settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/35 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Account Preferences
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          Platform Settings
        </h1>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Customize your daily learning target, goal exam completion date, and study preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl neo-card space-y-5 shadow-xl border-amber-500/30">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-amber-400" />
          Profile &amp; Study Schedule
        </h3>

        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-950/90 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Daily Study Target (Minutes)</label>
            <input
              type="number"
              min="15"
              max="240"
              step="15"
              value={dailyGoalMinutes}
              onChange={(e) => setDailyGoalMinutes(parseInt(e.target.value))}
              className="w-full p-3.5 rounded-2xl bg-slate-950/90 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">Recommended for AWS Solutions Architect: 45 to 60 mins/day.</p>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Target Certification Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-950/90 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          {success ? (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved!
            </span>
          ) : <span />}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white font-black text-xs shadow-glow-gold transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

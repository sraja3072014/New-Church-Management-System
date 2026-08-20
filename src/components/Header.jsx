import React, { useState, useEffect } from 'react';
import { Church, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export default function Header({ 
  activeTab = 'dashboard', 
  currentChurchName = 'Main Cathedral HQ', 
  pastorName = 'Senior Pastor' 
}) {
  // Clean dynamic title formatting
  const pagetitle = activeTab === 'dashboard'
    ? 'Main Dashboard'
    : activeTab.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }) + ' • ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentDateTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full px-6 py-3 rounded-3xl bg-slate-900/40 backdrop-blur-2xl flex items-center justify-between border border-white/10 shadow-xl select-none">
      
      {/* Dynamic Active Page Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
          <Sparkles size={18} />
        </div>
        <div>
          <h2 className="text-base font-black capitalize text-white tracking-wide">
            {pagetitle}
          </h2>
          <div className="flex items-center gap-1.5 text-[10px] text-orange-300 font-semibold mt-0.5">
            <Building2 size={12} className="text-orange-400" />
            <span>{currentChurchName}</span>
          </div>
        </div>
      </div>

      {/* Pastor Profile & Real-Time Clock */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-xs font-bold text-white tracking-wide">{pastorName}</span>
            <ShieldCheck size={14} className="text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[10px] font-semibold text-orange-300 shadow-[0_0_12px_rgba(251,146,60,0.25)] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{currentDateTime}</span>
          </div>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-rose-500 to-purple-600 p-[1.5px] shadow-lg shadow-orange-500/25 shrink-0">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-bold text-white text-sm">
            {(pastorName || 'P').charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

    </header>
  );
}
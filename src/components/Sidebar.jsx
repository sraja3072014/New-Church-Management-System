import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, CalendarCheck, 
  CalendarDays, Tv, Flame, FileText, 
  Settings, ChevronRight, Sparkles, UserCheck
} from 'lucide-react';

export default function Sidebar({ activeTab = 'dashboard', setActiveTab, churchProfile = {} }) {
  const safeProfile = churchProfile || {};

  // 1. Synchronized State with Fallbacks
  const [churchTitle, setChurchTitle] = useState(() => {
    if (safeProfile.churchName) return safeProfile.churchName;
    const activeTitle = localStorage.getItem('app_active_church_title');
    if (activeTitle) return activeTitle;
    try {
      const saved = localStorage.getItem('app_main_church_info');
      if (saved) return JSON.parse(saved).name;
    } catch (e) {}
    return 'CATHEDRAL HQ';
  });

  const [churchLogo, setChurchLogo] = useState(() => {
    return localStorage.getItem('app_logo') || localStorage.getItem('app_main_church_logo') || null;
  });

  useEffect(() => {
    const handleSync = () => {
      const activeTitle = localStorage.getItem('app_active_church_title');
      let title = activeTitle;
      if (!title) {
        try {
          const saved = localStorage.getItem('app_main_church_info');
          if (saved) title = JSON.parse(saved).name;
        } catch (e) {}
      }
      setChurchTitle(title || safeProfile.churchName || 'CATHEDRAL HQ');
      setChurchLogo(localStorage.getItem('app_logo') || localStorage.getItem('app_main_church_logo') || null);
    };

    window.addEventListener('churchDataUpdated', handleSync);
    return () => window.removeEventListener('churchDataUpdated', handleSync);
  }, [safeProfile.churchName]);

  const systemBrand = safeProfile.systemBrand || 'CHURCH OS';
  const version = safeProfile.version || 'Cathedral Core v2.0';
  const branchType = safeProfile.branchType || 'Main Campus HQ';

  // Navigation Items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'visitors', label: 'Visitors', icon: UserCheck },
    { id: 'prayer', label: 'Prayer', icon: Flame },
    { id: 'events', label: 'Events', icon: CalendarDays },
    { id: 'livestream', label: 'Live Stream', icon: Tv },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen shrink-0 border-r border-white/10 bg-[#0e1322]/85 backdrop-blur-2xl flex flex-col justify-between p-4 z-40 select-none text-slate-200">
      
      <div className="space-y-5">
        
        {/* 🌟 CENTERED LOGO & CHURCH NAME BRANDING BOX */}
        <div className="p-4 rounded-3xl bg-white/[0.03] border border-white/10 shadow-[0_0_20px_rgba(255,107,0,0.06)] flex flex-col items-center text-center space-y-3">
          
          {/* 1. Centered Church Logo with Ambient Glow */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#ff6b00] to-[#f43f5e] opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-14 h-14 rounded-2xl bg-slate-950 border border-white/20 flex items-center justify-center overflow-hidden shadow-xl">
              {churchLogo ? (
                <img src={churchLogo} alt="Church Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-[#ff6b00] to-[#f43f5e] flex items-center justify-center text-white">
                  <Sparkles size={24} />
                </div>
              )}
            </div>
          </div>

          {/* 2. Church Name Placed Directly Under Logo */}
          <div className="w-full">
            <h2 className="text-xs font-black tracking-wider text-white uppercase truncate px-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {churchTitle}
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                {branchType}
              </span>
            </div>
          </div>

          {/* System Brand & Version Tag */}
          <div className="w-full pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-orange-400/90 font-mono font-bold px-1">
            <span className="truncate">{systemBrand}</span>
            <span className="text-slate-500 shrink-0">{version}</span>
          </div>

        </div>

        {/* Dynamic Navigation Items */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || 
              (item.id === 'members' && activeTab === 'members_list') ||
              (item.id === 'attendance' && (activeTab === 'attendance_registry' || activeTab === 'attendance_marker')) ||
              (item.id === 'reports' && activeTab === 'reports_dashboard');

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab && setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] text-white shadow-[0_0_15px_rgba(255,107,0,0.35)] border border-white/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={isActive ? 'text-white' : 'text-orange-400/70'} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight size={14} className="text-white" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status */}
      <div className="p-3 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Status</span>
        </div>
        <span className="text-emerald-400 font-mono font-bold">Encrypted & Online</span>
      </div>

    </aside>
  );
}
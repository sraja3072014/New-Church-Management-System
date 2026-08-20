import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, CalendarCheck, Users, 
  CalendarDays, Tv, Settings, Sparkles, UserCheck, Flame
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [churchTitle, setChurchTitle] = useState(() => {
    const activeTitle = localStorage.getItem('app_active_church_title');
    if (activeTitle) return activeTitle;
    try {
      const saved = localStorage.getItem('app_main_church_info');
      if (saved) return JSON.parse(saved).name;
    } catch (e) {}
    return 'CATHEDRAL HQ';
  });

  const [churchLogo, setChurchLogo] = useState(() => {
    return localStorage.getItem('app_main_church_logo') || null;
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
      setChurchTitle(title || 'CATHEDRAL HQ');
      setChurchLogo(localStorage.getItem('app_main_church_logo') || null);
    };

    window.addEventListener('churchDataUpdated', handleSync);
    return () => window.removeEventListener('churchDataUpdated', handleSync);
  }, []);

  // Menu items with shortcut indicators
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck},
    { id: 'members', label: 'Members', icon: Users},
    { id: 'visitors', label: 'Visitors', icon: UserCheck },
    { id: 'prayer', label: 'Prayer', icon: Flame },
    { id: 'events', label: 'Events', icon: CalendarDays },
    { id: 'livestream', label: 'Live Stream', icon: Tv, isLiveBadge: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
     <aside className="w-56 min-h-screen bg-[111827]/75 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col justify-between shrink-0 select-none z-20 shadow-[inset_0_0_30px_rgba(255,107,0,0.06),0_0_35px_rgba(255,107,0,0.12)]">
      <div className="space-y-8 pt-2">
        
        {/* Dynamic Church Brand Header with Frosted Glass Glow */}
        <div className="flex items-center gap-3 px-2 py-2 rounded-2xl bg-gradient-to-r from-orange-500/10 via-rose-500/10 to-transparent border border-white/10 shadow-[0_0_20px_rgba(255,107,0,0.15)] backdrop-blur-md">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff6b00] to-[#f43f5e] flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_15px_rgba(255,107,0,0.5)] text-white font-bold text-sm">
            {churchLogo ? (
              <img src={churchLogo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              churchTitle.charAt(0).toUpperCase()
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider truncate" title={churchTitle}>
              {churchTitle}
            </h2>
            <p className="text-[10px] text-orange-400/80 truncate font-medium">Church MS</p>
          </div>
        </div>


        {/* NAVIGATION ITEMS WITH LOWER SPACING & SHORTCUT BADGES */}
        <nav className="space-y-2 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || 
              (item.id === 'attendance' && (activeTab === 'attendance_registry' || activeTab === 'attendance_marker')) ||
              (item.id === 'members' && activeTab === 'members_list') ||
              (item.id === 'prayer' && activeTab === 'prayer_altar');

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab && setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] text-white font-bold shadow-[0_0_20px_rgba(255,107,0,0.4)] scale-[1.02] border border-white/20'
                    : 'text-slate-300 bg-white/[0.02] border border-white/5 hover:text-white hover:bg-white/[0.06] hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon size={16} className={isActive ? 'text-white' : 'text-orange-400'} />}
                  <span>{item.label}</span>
                </div>
                </button>
            );
          })}
        </nav>

      </div>

      {/* Bottom System Status */}
  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px]">
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    <span className="text-slate-300 font-bold">System Online</span>
  </div>
  <span className="text-[10px] text-orange-400 font-mono font-bold">CMS v1.0</span>
</div>
    </aside>
  );
}
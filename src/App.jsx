import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Dashboards
import MainDashboard from './pages/MainDashboard';
import MembersDashboard from './pages/MembersDashboard';
import AttendanceDashboard from './pages/AttendanceDashboard';
import VisitorsDashboard from './pages/VisitorsDashboard';
import EventsDashboard from './pages/EventsDashboard';
import LiveStreamDashboard from './pages/LiveStreamDashboard';
import PrayerDashboard from './pages/PrayerDashboard';
import ReportDashboard from './pages/ReportDashboard';
import SettingsDashboard from './pages/SettingsDashboard';

const defaultChurchProfile = {
  churchName: 'Central Cathedral Headquarters',
  branchType: 'Main Church HQ',
  pastorName: 'Rev. Senior Pastor',
  systemBrand: 'Nope Search Cathedral Management System',
  version: 'Cathedral Core v2.0',
  themeMode: 'dark',
  accentColorId: 'sunset_orange',
  accentColor: '#f97316'
};

export default function App() {
  const [activeTab, setActiveTab] = useState('settings'); // அல்லது 'dashboard'

  // Dynamic Profile State (from localStorage)
  const [churchProfile, setChurchProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('app_church_profile_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultChurchProfile;
  });

  // ✅ Master Save Handler for Settings and Theme Tab
  const handleUpdateChurchProfile = (newProfile) => {
    const updated = { ...churchProfile, ...newProfile };
    setChurchProfile(updated);
    try {
      localStorage.setItem('app_church_profile_config', JSON.stringify(updated));
    } catch (e) {
      console.error('Storage error:', e);
    }
  };

  const currentProfile = churchProfile || defaultChurchProfile;
  const isDark = currentProfile.themeMode !== 'light';

  return (
    <div className={`relative flex h-screen w-screen overflow-hidden text-slate-200 select-none transition-colors duration-500 ${
      isDark ? 'bg-[#0a0c16]' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* 🌌 EXACT VIDEO BACKGROUND MESH & AMBIENT GLOWS (Dark Mode Only) */}
      {isDark ? (
        <>
          <div 
            className="pointer-events-none absolute inset-0 z-0 opacity-90"
            style={{
              background: `
                radial-gradient(circle at 15% 85%, rgba(13, 59, 102, 0.45) 0%, transparent 50%),
                radial-gradient(circle at 85% 75%, rgba(88, 28, 77, 0.45) 0%, transparent 50%),
                radial-gradient(circle at 50% 20%, rgba(59, 24, 95, 0.35) 0%, transparent 60%),
                radial-gradient(circle at 80% 20%, rgba(68, 25, 45, 0.25) 0%, transparent 50%),
                linear-gradient(135deg, #090b14 0%, #0e111f 50%, #0b0d18 100%)
              `
            }}
          />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-[550px] w-[550px] rounded-full bg-[#0d4b75]/25 blur-[130px] filter"></div>
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-[550px] w-[550px] rounded-full bg-[#701a55]/25 blur-[140px] filter"></div>
          <div className="pointer-events-none absolute -top-32 left-1/3 h-[500px] w-[500px] rounded-full bg-[#431c6e]/20 blur-[130px] filter"></div>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-orange-300/30 to-rose-300/30 blur-[120px] filter"></div>
          <div className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-sky-200/40 to-indigo-200/40 blur-[130px] filter"></div>
        </>
      )}

      {/* 1. Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        churchProfile={currentProfile}
        isDark={isDark}
      />

      {/* 2. Main Container */}
      <div className="relative z-10 flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
          activeTab={activeTab} 
          churchProfile={currentProfile}
          isDark={isDark}
        />

        <main className="flex-1 overflow-y-auto p-6 sm:p-8 pb-16 custom-scrollbar w-full">
          {activeTab === 'dashboard' && (
            <MainDashboard onNavigateTab={setActiveTab} churchProfile={currentProfile} />
          )}
          {activeTab === 'members' && (
            <MembersDashboard onNavigateTab={setActiveTab} churchProfile={currentProfile} />
          )}
          {activeTab === 'attendance' && (
            <AttendanceDashboard onNavigateTab={setActiveTab} churchProfile={currentProfile} />
          )}
          {activeTab === 'visitors' && (
            <VisitorsDashboard onNavigateTab={setActiveTab} churchProfile={currentProfile} />
          )}
          {activeTab === 'events' && (
            <EventsDashboard onNavigateTab={setActiveTab} churchProfile={currentProfile} />
          )}
          {activeTab === 'livestream' && (
            <LiveStreamDashboard onNavigateTab={setActiveTab} churchProfile={currentProfile} />
          )}
          {activeTab === 'prayer' && (
            <PrayerDashboard onNavigateTab={setActiveTab} churchProfile={currentProfile} />
          )}
          {activeTab === 'reports' && (
            <ReportDashboard onNavigateTab={setActiveTab} churchProfile={currentProfile} />
          )}
          
          {/* ✅ Correct Settings Router passing onSaveProfile */}
          {activeTab === 'settings' && (
            <SettingsDashboard 
              churchProfile={currentProfile} 
              onSaveProfile={handleUpdateChurchProfile} 
            />
          )}
        </main>
      </div>

    </div>
  );
}
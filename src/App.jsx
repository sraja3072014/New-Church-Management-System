import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SettingsDashboard from './pages/SettingsDashboard';
import MainDashboard from './pages/MainDashboard';
import MembersDashboard from './pages/MembersDashboard';
import AttendanceDashboard from './pages/AttendanceDashboard';
import VisitorsDashboard from './pages/VisitorsDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* 1. Left Fixed Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Right Main Application Shell */}
      <div className="ml-05 flex-1 flex flex-col h-screen overflow-hidden">
   
       {/* Top Header - LOCKED AT TOP */}
        <div className="shrink-0 pt-4 pb-4 px-8">
       <Header activeTab={activeTab} currentChurchName="Nope Search Main Cathedral" 
            pastorName="Rev. Senior Pastor" 
          />
        </div>
        {/* Dynamic Body Content - ONLY THIS SCROLLS */}
        <main className="flex-5 overflow-y-auto px-4 pb-12 custom-scrollbar">
          {activeTab === 'dashboard' ? (<MainDashboard />) : null}
          {activeTab === 'settings' ? (<SettingsDashboard />) : null}
          {activeTab === 'members' ? (<MembersDashboard />) : null}
          {(activeTab === 'attendance' || activeTab === 'attendance_registry' || activeTab === 'attendance_marker') && (
          <AttendanceDashboard onNavigateTab={setActiveTab} /> )}
          {activeTab === 'members_list' && <MembersDashboard />}
          {activeTab === 'visitors' && <VisitorsDashboard />}
        </main>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SettingsDashboard from './pages/SettingsDashboard';
import MainDashboard from './pages/MainDashboard';
import MembersDashboard from './pages/MembersDashboard';
import AttendanceDashboard from './pages/AttendanceDashboard';
import VisitorsDashboard from './pages/VisitorsDashboard';
import EventsDashboard from './pages/EventsDashboard'; // 1. சரியான Import
import LiveStreamDashboard from './pages/LiveStreamDashboard';


export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* 1. Left Fixed Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Right Main Application Shell */}
      <div className="ml-05 flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <div className="shrink-0 pt-4 pb-4 px-8">
          <Header 
            activeTab={activeTab} 
            currentChurchName="Nope Search Main Cathedral" 
            pastorName="Rev. Senior Pastor" 
          />
        </div>

        {/* Dynamic Body Content */}
        <main className="flex-1 overflow-y-auto px-4 pb-12 custom-scrollbar">
          {activeTab === 'dashboard' && <MainDashboard onNavigateTab={setActiveTab} />}
          {activeTab === 'settings' && <SettingsDashboard onNavigateTab={setActiveTab} />}
          {(activeTab === 'members' || activeTab === 'members_list') && <MembersDashboard onNavigateTab={setActiveTab} />}
          {(activeTab === 'attendance' || activeTab === 'attendance_registry' || activeTab === 'attendance_marker') && (
            <AttendanceDashboard onNavigateTab={setActiveTab} />
          )}
          {activeTab === 'visitors' && <VisitorsDashboard onNavigateTab={setActiveTab} />}
          
          {/* 2. Events கண்டிஷன் (எல்லா விதமான Key-களுக்கும்): */}
          {(activeTab === 'events' || activeTab === 'event' || activeTab === 'events_dashboard' || activeTab === 'calendar') && (
            <EventsDashboard onNavigateTab={setActiveTab} />
          )}
          {activeTab === 'livestream' && <LiveStreamDashboard />}
          
        </main>
      </div>
    </div>
  );
}
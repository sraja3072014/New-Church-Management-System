import React, { useState } from 'react';
import { 
  Calendar, QrCode, Clock, Users, ShieldCheck, 
  Plus, Edit2, Trash2, X, Check, Save, ToggleLeft, ToggleRight,
  AlertTriangle, UserCheck, Sparkles, CheckCircle2, Baby, GitBranch
} from 'lucide-react';

export default function AttendanceSettingsTab({ onTriggerSuccess }) {
<<<<<<< HEAD
  // 1. Service Sessions Master with Multi-Campus & Tracking Mode[cite: 5]
=======
  // 1. Service Sessions Master with Multi-Campus & Tracking Mode
>>>>>>> 51282b6 (Initial commit)
  const [serviceSessions, setServiceSessions] = useState(() => {
    const saved = localStorage.getItem('app_attendance_sessions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, name: '1st Sunday Early Worship (Tamil)', day: 'Sunday', startTime: '06:30', endTime: '08:30', targetCampus: 'Main Cathedral HQ', trackMode: 'QR & Individual Search', expectedCapacity: 600, isActive: true },
      { id: 2, name: '2nd Sunday Main Celebration (Bilingual)', day: 'Sunday', startTime: '09:00', endTime: '11:30', targetCampus: 'Main Cathedral HQ', trackMode: 'QR & Individual Search', expectedCapacity: 1200, isActive: true },
      { id: 3, name: 'Sunday School & Kids Church', day: 'Sunday', startTime: '09:00', endTime: '11:00', targetCampus: 'Main Cathedral HQ', trackMode: 'Classroom Register', expectedCapacity: 250, isActive: true },
      { id: 4, name: 'Evening Youth & Miracle Service', day: 'Sunday', startTime: '18:00', endTime: '20:00', targetCampus: 'Koduvai Town Branch', trackMode: 'QR & Individual Search', expectedCapacity: 350, isActive: true },
      { id: 5, name: 'Midweek Fasting & Prayer', day: 'Wednesday', startTime: '10:30', endTime: '13:00', targetCampus: 'Main Cathedral HQ', trackMode: 'Headcount Summary Only', expectedCapacity: 400, isActive: true }
    ];
  });

<<<<<<< HEAD
  // 2. Attendance Rules & Hardware Workflow Config[cite: 5]
=======
  // 2. Attendance Rules & Hardware Workflow Config
>>>>>>> 51282b6 (Initial commit)
  const [attendanceConfig, setAttendanceConfig] = useState(() => {
    const saved = localStorage.getItem('app_attendance_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      enableQrKioskCheckin: true,
      enableFamilyOneClickCheckin: true,
      enableChildSecurityPickupCode: true,
      allowHeadcountEntry: true,
      preventDuplicateCheckinSameService: true,
      absenteeThresholdSundays: '3',
      autoAssignAbsenteeVisitTask: true,
      sendAbsenteeCareSms: true
    };
  });

<<<<<<< HEAD
  // Modal State[cite: 5]
=======
  // Modal State
>>>>>>> 51282b6 (Initial commit)
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [sessionForm, setSessionForm] = useState({
    name: '',
    day: 'Sunday',
    startTime: '09:00',
    endTime: '11:00',
    targetCampus: 'Main Cathedral HQ',
    trackMode: 'QR & Individual Search',
    expectedCapacity: 500
  });

<<<<<<< HEAD
  // Master Save Handler[cite: 5]
=======
  // Master Save Handler
>>>>>>> 51282b6 (Initial commit)
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_attendance_sessions', JSON.stringify(serviceSessions));
    localStorage.setItem('app_attendance_config', JSON.stringify(attendanceConfig));
    onTriggerSuccess('Attendance Sessions, QR Scanning Modes & Care Rules saved!');
  };

<<<<<<< HEAD
  // Session Handlers[cite: 5]
=======
  // Session Handlers
>>>>>>> 51282b6 (Initial commit)
  const handleOpenSessionModal = (session = null) => {
    if (session) {
      setEditingSessionId(session.id);
      setSessionForm({ ...session });
    } else {
      setEditingSessionId(null);
      setSessionForm({
        name: '',
        day: 'Sunday',
        startTime: '09:00',
        endTime: '11:00',
        targetCampus: 'Main Cathedral HQ',
        trackMode: 'QR & Individual Search',
        expectedCapacity: 500
      });
    }
    setIsSessionModalOpen(true);
  };

  const handleSaveSession = (e) => {
    e.preventDefault();
    if (!sessionForm.name.trim()) return;

    if (editingSessionId) {
      const updated = serviceSessions.map(s => s.id === editingSessionId ? { ...s, ...sessionForm } : s);
      setServiceSessions(updated);
      localStorage.setItem('app_attendance_sessions', JSON.stringify(updated));
      onTriggerSuccess('Service slot updated successfully!');
    } else {
      const newSession = {
        id: Date.now(),
        ...sessionForm,
        isActive: true
      };
      const updated = [...serviceSessions, newSession];
      setServiceSessions(updated);
      localStorage.setItem('app_attendance_sessions', JSON.stringify(updated));
      onTriggerSuccess('New church service slot created!');
    }
    setIsSessionModalOpen(false);
  };

  const handleDeleteSession = (id) => {
    if (window.confirm("Are you sure you want to delete this service session schedule?")) {
      const updated = serviceSessions.filter(s => s.id !== id);
      setServiceSessions(updated);
      localStorage.setItem('app_attendance_sessions', JSON.stringify(updated));
      onTriggerSuccess('Service session schedule removed.');
    }
  };

  const handleToggleSession = (id) => {
    const updated = serviceSessions.map(s => {
      if (s.id === id) {
        const next = !s.isActive;
        onTriggerSuccess(`Session status changed to ${next ? 'Active' : 'Paused'}`);
        return { ...s, isActive: next };
      }
      return s;
    });
    setServiceSessions(updated);
    localStorage.setItem('app_attendance_sessions', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">

<<<<<<< HEAD
        {/* Master Top Card[cite: 5] */}
=======
        {/* Master Top Card */}
>>>>>>> 51282b6 (Initial commit)
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="text-orange-400" size={22} />
                Worship Service Sessions & Attendance Master
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
<<<<<<< HEAD
                Configure worship slots, QR check-in scanners, child safety pickup codes, and automated absentee tracking[cite: 5]
              </p>
            </div>

            {/* Glowing Buttons Header */}
=======
                Configure worship slots, QR check-in scanners, child safety pickup codes, and automated absentee tracking
              </p>
            </div>

>>>>>>> 51282b6 (Initial commit)
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenSessionModal()}
<<<<<<< HEAD
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer transition-all active:scale-95 shrink-0"
              >
                <Plus size={15} />
=======
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
              >
                <Plus size={14} />
>>>>>>> 51282b6 (Initial commit)
                <span>+ Add Service Slot</span>
              </button>

              <button
                type="submit"
<<<<<<< HEAD
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(255,107,0,0.45)] border border-white/20 cursor-pointer transition-all active:scale-95 shrink-0"
=======
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
>>>>>>> 51282b6 (Initial commit)
              >
                <Save size={15} />
                <span>Save All Rules</span>
              </button>
            </div>
          </div>

<<<<<<< HEAD
          {/* 1. Service Sessions Master Table[cite: 5] */}
=======
          {/* 1. Service Sessions Master Table */}
>>>>>>> 51282b6 (Initial commit)
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                <Clock size={15} />
                <span>1. Active Worship Sessions & Multi-Campus Schedules</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">
<<<<<<< HEAD
                {serviceSessions.filter(s => s.isActive).length} Active Services[cite: 5]
=======
                {serviceSessions.filter(s => s.isActive).length} Active Services
>>>>>>> 51282b6 (Initial commit)
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                    <th className="p-3.5">Service Name</th>
                    <th className="p-3.5">Day & Timing</th>
                    <th className="p-3.5">Campus Linkage</th>
                    <th className="p-3.5">Tracking Mode</th>
                    <th className="p-3.5">Capacity</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {serviceSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white text-xs">{session.name}</td>
                      <td className="p-3.5 font-mono text-slate-300">
                        <span className="text-orange-400 font-bold">{session.day}</span> • {session.startTime} - {session.endTime}
                      </td>
                      <td className="p-3.5 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <GitBranch size={12} className="text-orange-400 shrink-0" />
                          <span>{session.targetCampus}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300">
                          {session.trackMode}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 font-mono">{session.expectedCapacity} Seats</td>
                      <td className="p-3.5">
                        <button
                          type="button"
                          onClick={() => handleToggleSession(session.id)}
                          className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                            session.isActive
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-500 border border-white/5'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${session.isActive ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                          <span>{session.isActive ? 'Active' : 'Paused'}</span>
                        </button>
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenSessionModal(session)}
<<<<<<< HEAD
                            className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 cursor-pointer transition-all active:scale-95"
=======
                            className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
>>>>>>> 51282b6 (Initial commit)
                            title="Edit Slot"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSession(session.id)}
<<<<<<< HEAD
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 cursor-pointer transition-all active:scale-95"
=======
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
>>>>>>> 51282b6 (Initial commit)
                            title="Delete Slot"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

<<<<<<< HEAD
          {/* 2. QR Scanner & Check-in Hardware Modes[cite: 5] */}
=======
          {/* 2. QR Scanner & Check-in Hardware Modes */}
>>>>>>> 51282b6 (Initial commit)
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <QrCode size={15} />
              <span>2. QR Scanner & Check-in Workflow Modes</span>
            </h4>

            <div className="space-y-3">
<<<<<<< HEAD
              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-orange-500/30 transition-all">
=======
              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
>>>>>>> 51282b6 (Initial commit)
                <input
                  type="checkbox"
                  checked={attendanceConfig.enableQrKioskCheckin}
                  onChange={(e) => setAttendanceConfig({ ...attendanceConfig, enableQrKioskCheckin: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Enable Self-Service QR Kiosk Scanner Mode at Church Entrances</span>
<<<<<<< HEAD
                  <span className="text-[11px] text-slate-400">Allows believers to scan their Digital Member QR code using entrance tablets[cite: 5]</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-orange-500/30 transition-all">
=======
                  <span className="text-[11px] text-slate-400">Allows believers to scan their Digital Member QR code using entrance tablets</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
>>>>>>> 51282b6 (Initial commit)
                <input
                  type="checkbox"
                  checked={attendanceConfig.enableFamilyOneClickCheckin}
                  onChange={(e) => setAttendanceConfig({ ...attendanceConfig, enableFamilyOneClickCheckin: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Family Fast-Track 1-Click Check-in</span>
<<<<<<< HEAD
                  <span className="text-[11px] text-slate-400">Scanning household head's card provides a single button to mark all family members present[cite: 5]</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-orange-500/30 transition-all">
=======
                  <span className="text-[11px] text-slate-400">Scanning household head's card provides a single button to mark all family members present</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
>>>>>>> 51282b6 (Initial commit)
                <input
                  type="checkbox"
                  checked={attendanceConfig.allowHeadcountEntry}
                  onChange={(e) => setAttendanceConfig({ ...attendanceConfig, allowHeadcountEntry: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Enable Fast Headcount Entry (Men / Women / Children Counters)</span>
<<<<<<< HEAD
                  <span className="text-[11px] text-slate-400">Allows ushers to record total auditorium crowd without individual names for large conventions[cite: 5]</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-orange-500/30 transition-all">
=======
                  <span className="text-[11px] text-slate-400">Allows ushers to record total auditorium crowd without individual names for large conventions</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
>>>>>>> 51282b6 (Initial commit)
                <input
                  type="checkbox"
                  checked={attendanceConfig.preventDuplicateCheckinSameService}
                  onChange={(e) => setAttendanceConfig({ ...attendanceConfig, preventDuplicateCheckinSameService: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Prevent Duplicate Check-in during Same Service Slot</span>
<<<<<<< HEAD
                  <span className="text-[11px] text-slate-400">Alerts usher if a believer card is scanned multiple times within 60 minutes[cite: 5]</span>
=======
                  <span className="text-[11px] text-slate-400">Alerts usher if a believer card is scanned multiple times within 60 minutes</span>
>>>>>>> 51282b6 (Initial commit)
                </div>
              </label>
            </div>
          </div>

<<<<<<< HEAD
          {/* 3. Sunday School & Child Safety Security[cite: 5] */}
=======
          {/* 3. Sunday School & Child Safety Security */}
>>>>>>> 51282b6 (Initial commit)
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Baby size={15} />
              <span>3. Sunday School & Child Safety Pickup Security</span>
            </h4>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={attendanceConfig.enableChildSecurityPickupCode}
                  onChange={(e) => setAttendanceConfig({ ...attendanceConfig, enableChildSecurityPickupCode: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Generate Secure Guardian Matching Code on Child Check-in</span>
<<<<<<< HEAD
                  <span className="text-[11px] text-slate-400">Sends a 4-digit security token to parent; child is only released when code matches teacher terminal[cite: 5]</span>
=======
                  <span className="text-[11px] text-slate-400">Sends a 4-digit security token to parent; child is only released when code matches teacher terminal</span>
>>>>>>> 51282b6 (Initial commit)
                </div>
              </label>
            </div>
          </div>

<<<<<<< HEAD
          {/* 4. Absentee Detection & Pastoral Alerts[cite: 5] */}
=======
          {/* 4. Absentee Detection & Pastoral Alerts */}
>>>>>>> 51282b6 (Initial commit)
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={15} />
              <span>4. Absentee Detection & Automated Pastoral Follow-up</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Absentee Alert Threshold</label>
                <select
                  value={attendanceConfig.absenteeThresholdSundays}
                  onChange={(e) => setAttendanceConfig({ ...attendanceConfig, absenteeThresholdSundays: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="2">2 Consecutive Sunday Services Missed</option>
                  <option value="3">3 Consecutive Sunday Services Missed (Standard)</option>
                  <option value="4">4 Consecutive Sunday Services Missed (1 Month)</option>
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attendanceConfig.autoAssignAbsenteeVisitTask}
                    onChange={(e) => setAttendanceConfig({ ...attendanceConfig, autoAssignAbsenteeVisitTask: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
<<<<<<< HEAD
                  <span>Auto-create Pastoral Home Visit Task for Area Cell Leader[cite: 5]</span>
=======
                  <span>Auto-create Pastoral Home Visit Task for Area Cell Leader</span>
>>>>>>> 51282b6 (Initial commit)
                </label>

                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attendanceConfig.sendAbsenteeCareSms}
                    onChange={(e) => setAttendanceConfig({ ...attendanceConfig, sendAbsenteeCareSms: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
<<<<<<< HEAD
                  <span>Send "We Missed You" caring WhatsApp greeting on Monday morning[cite: 5]</span>
=======
                  <span>Send "We Missed You" caring WhatsApp greeting on Monday morning</span>
>>>>>>> 51282b6 (Initial commit)
                </label>
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
<<<<<<< HEAD
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white text-xs font-bold rounded-2xl shadow-[0_0_20px_rgba(255,107,0,0.45)] border border-white/20 cursor-pointer transition-all active:scale-95"
=======
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
>>>>>>> 51282b6 (Initial commit)
            >
              <Save size={15} />
              <span>Save & Apply Attendance Rules</span>
            </button>
          </div>

        </div>

      </form>

<<<<<<< HEAD
      {/* Add / Edit Service Session Modal[cite: 5] */}
=======
      {/* Add / Edit Service Session Modal */}
>>>>>>> 51282b6 (Initial commit)
      {isSessionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="text-orange-400" size={18} />
<<<<<<< HEAD
                {editingSessionId ? 'Edit Worship Service Slot' : 'Create New Service Slot'}[cite: 5]
=======
                {editingSessionId ? 'Edit Worship Service Slot' : 'Create New Service Slot'}
>>>>>>> 51282b6 (Initial commit)
              </h3>
              <button onClick={() => setIsSessionModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSession} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Service Slot Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1st Sunday Tamil Worship Service"
                  value={sessionForm.name}
                  onChange={(e) => setSessionForm({ ...sessionForm, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Day of Week *</label>
                  <select
                    value={sessionForm.day}
                    onChange={(e) => setSessionForm({ ...sessionForm, day: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Sunday">Sunday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Start Time *</label>
                  <input
                    type="time"
                    required
                    value={sessionForm.startTime}
                    onChange={(e) => setSessionForm({ ...sessionForm, startTime: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">End Time *</label>
                  <input
                    type="time"
                    required
                    value={sessionForm.endTime}
                    onChange={(e) => setSessionForm({ ...sessionForm, endTime: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Campus Location</label>
                  <select
                    value={sessionForm.targetCampus}
                    onChange={(e) => setSessionForm({ ...sessionForm, targetCampus: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Main Cathedral HQ">Main Cathedral HQ</option>
                    <option value="Koduvai Town Branch">Koduvai Town Branch</option>
                    <option value="Kangeyam City Branch">Kangeyam City Branch</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Tracking Method</label>
                  <select
                    value={sessionForm.trackMode}
                    onChange={(e) => setSessionForm({ ...sessionForm, trackMode: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="QR & Individual Search">QR Code Scan & Search</option>
                    <option value="Headcount Summary Only">Headcount Summary Only</option>
                    <option value="Classroom Register">Classroom Register</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-slate-300 font-medium">Expected Seating Capacity</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    value={sessionForm.expectedCapacity}
                    onChange={(e) => setSessionForm({ ...sessionForm, expectedCapacity: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsSessionModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
<<<<<<< HEAD
                  className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer transition-all active:scale-95"
                >
                  {editingSessionId ? 'Update Session' : 'Save Session'}[cite: 5]
=======
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  {editingSessionId ? 'Update Session' : 'Save Session'}
>>>>>>> 51282b6 (Initial commit)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { 
  Calendar, QrCode, Clock, Users, ShieldCheck, 
  Plus, Edit2, Trash2, X, Check, Save, ToggleLeft, ToggleRight,
  AlertTriangle, UserCheck, Sparkles, CheckCircle2, Baby
} from 'lucide-react';

export default function AttendanceTab({ onTriggerSuccess }) {
  // 1. Service Sessions Master (Add / Edit / Delete)
  const [serviceSessions, setServiceSessions] = useState(() => {
    const saved = localStorage.getItem('app_attendance_sessions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, name: '1st Sunday Early Worship (Tamil)', day: 'Sunday', startTime: '06:30', endTime: '08:30', targetCampus: 'Main Cathedral HQ', expectedCapacity: 600, isActive: true },
      { id: 2, name: '2nd Sunday Main Celebration (Bilingual)', day: 'Sunday', startTime: '09:00', endTime: '11:30', targetCampus: 'Main Cathedral HQ', expectedCapacity: 1200, isActive: true },
      { id: 3, name: 'Sunday School & Kids Church', day: 'Sunday', startTime: '09:00', endTime: '11:00', targetCampus: 'Main Cathedral HQ', expectedCapacity: 250, isActive: true },
      { id: 4, name: 'Evening Youth & Miracle Service', day: 'Sunday', startTime: '18:00', endTime: '20:00', targetCampus: 'Koduvai Town Branch', expectedCapacity: 350, isActive: true },
      { id: 5, name: 'Midweek Fasting & Prayer', day: 'Wednesday', startTime: '10:30', endTime: '13:00', targetCampus: 'Main Cathedral HQ', expectedCapacity: 400, isActive: true }
    ];
  });

  // 2. Attendance Rules & System Config
  const [attendanceConfig, setAttendanceConfig] = useState(() => {
    const saved = localStorage.getItem('app_attendance_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      enableQrKioskCheckin: true,
      enableFamilyOneClickCheckin: true,
      enableChildSecurityPickupCode: true,
      absenteeThresholdSundays: '3',
      autoAssignAbsenteeVisitTask: true,
      sendAbsenteeCareSms: true,
      preventDuplicateCheckinSameService: true,
      allowVisitorQuickRegistration: true
    };
  });

  // Modal State for Adding/Editing Sessions
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [sessionForm, setSessionForm] = useState({
    name: '',
    day: 'Sunday',
    startTime: '09:00',
    endTime: '11:00',
    targetCampus: 'Main Cathedral HQ',
    expectedCapacity: 500
  });

  // Master Save
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_attendance_sessions', JSON.stringify(serviceSessions));
    localStorage.setItem('app_attendance_config', JSON.stringify(attendanceConfig));
    onTriggerSuccess('Attendance Sessions and Service Check-in Rules saved successfully!');
  };

  // Session Handlers
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
      onTriggerSuccess('Service session updated successfully!');
    } else {
      const newSession = {
        id: Date.now(),
        ...sessionForm,
        isActive: true
      };
      const updated = [...serviceSessions, newSession];
      setServiceSessions(updated);
      localStorage.setItem('app_attendance_sessions', JSON.stringify(updated));
      onTriggerSuccess('New church service session created!');
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

        {/* Master Top Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="text-orange-400" size={22} />
                Church Service Sessions & Attendance Master
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure worship slots, QR check-in scanners, child safety codes, and absentee tracking rules
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenSessionModal()}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
              >
                <Plus size={14} />
                <span>+ Add Service Slot</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
              >
                <Save size={15} />
                <span>Save All Rules</span>
              </button>
            </div>
          </div>

          {/* 1. Service Sessions Master Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                <Clock size={15} />
                <span>1. Active Worship Sessions & Weekly Schedules</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">
                {serviceSessions.filter(s => s.isActive).length} Active Services
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                    <th className="p-3.5">Service Name</th>
                    <th className="p-3.5">Day & Timing</th>
                    <th className="p-3.5">Assigned Campus</th>
                    <th className="p-3.5">Expected Capacity</th>
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
                      <td className="p-3.5 text-slate-300">{session.targetCampus}</td>
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
                            className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                            title="Edit Slot"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSession(session.id)}
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
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

          {/* 2. Check-in Hardware & QR Kiosk Modes */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <QrCode size={15} />
              <span>2. QR Scanner & Check-in Workflow Modes</span>
            </h4>

            <div className="space-y-3">
              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={attendanceConfig.enableQrKioskCheckin}
                  onChange={(e) => setAttendanceConfig({ ...attendanceConfig, enableQrKioskCheckin: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Enable Self-Service QR Kiosk Scanner Mode at Church Entrances</span>
                  <span className="text-[11px] text-slate-400">Allows believers to scan their Digital Member QR code using entrance tablets</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={attendanceConfig.enableFamilyOneClickCheckin}
                  onChange={(e) => setAttendanceConfig({ ...attendanceConfig, enableFamilyOneClickCheckin: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Family Fast-Track Check-in</span>
                  <span className="text-[11px] text-slate-400">Scanning the family head's card provides a single button to check-in all household members</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={attendanceConfig.preventDuplicateCheckinSameService}
                  onChange={(e) => setAttendanceConfig({ ...attendanceConfig, preventDuplicateCheckinSameService: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Prevent Duplicate Check-in during Same Service Slot</span>
                  <span className="text-[11px] text-slate-400">Alerts usher if a believer card is scanned multiple times within 60 minutes</span>
                </div>
              </label>
            </div>
          </div>

          {/* 3. Child Safety & Sunday School Check-in */}
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
                  <span className="text-[11px] text-slate-400">Prints / sends a 4-digit security token to parent; child is only released when code matches</span>
                </div>
              </label>
            </div>
          </div>

          {/* 4. Absentee Tracking & Pastoral Alerts */}
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
                  <span>Auto-create Pastoral Home Visit Task for Area Cell Leader</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attendanceConfig.sendAbsenteeCareSms}
                    onChange={(e) => setAttendanceConfig({ ...attendanceConfig, sendAbsenteeCareSms: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
                  <span>Send "We Missed You" caring WhatsApp greeting on Monday morning</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save & Apply Attendance Rules</span>
            </button>
          </div>

        </div>

      </form>

      {/* Add / Edit Service Session Modal */}
      {isSessionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="text-orange-400" size={18} />
                {editingSessionId ? 'Edit Worship Service Slot' : 'Create New Service Slot'}
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
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  {editingSessionId ? 'Update Session' : 'Save Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
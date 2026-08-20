import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, Users, UserPlus, CheckCircle2, 
  Search, HeartHandshake, Check, Filter, X
} from 'lucide-react';

export default function AttendanceDashboard({ onNavigateTab }) {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedService, setSelectedService] = useState('Sunday 1st Morning Service (07:00 AM)');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  // 1. விசுவாசிகள் டேட்டாவை பாதுகாப்பாக ஏற்றுதல் (Default Fallback உடன்)
  const [families] = useState(() => {
    try {
      const saved = localStorage.getItem('app_members_family_database');
      return saved ? JSON.parse(saved) : [
        {
          familyId: 'FAM-101',
          familyName: 'David Kumar & Household',
          headMember: { memberId: 'CAT-00101', name: 'David Kumar', phone: '+91 98765 11223', roleInFamily: 'Head of Family' },
          members: [
            { memberId: 'CAT-00102', name: 'Sarah David', phone: '+91 98765 11224', roleInFamily: 'Spouse' }
          ]
        }
      ];
    } catch {
      return [];
    }
  });

  // 2. அட்டென்டன்ஸ் ரெக்கார்ட்ஸ்
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(`attendance_${selectedDate}_${selectedService}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 3. விசிட்டர்ஸ் டேட்டா
  const [visitors, setVisitors] = useState(() => {
    try {
      const saved = localStorage.getItem('app_visitors_database');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal State
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [visitorForm, setVisitorForm] = useState({
    name: '',
    phone: '',
    area: '',
    broughtBy: '',
    prayerRequest: '',
    category: 'First Time Visitor'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // விசுவாசியை மார்க் செய்தல்
  const handleToggleAttendance = (memberId, name, type = 'Member') => {
    const currentStatus = attendanceRecords[memberId]?.status;
    const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';

    const updated = {
      ...attendanceRecords,
      [memberId]: {
        memberId,
        name,
        type,
        status: newStatus,
        markedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    };

    setAttendanceRecords(updated);
    localStorage.setItem(`attendance_${selectedDate}_${selectedService}`, JSON.stringify(updated));
  };

  // முழு குடும்பத்தையும் மார்க் செய்தல்
  const handleQuickFamilyMark = (fam) => {
    const head = fam?.headMember;
    const subMembers = fam?.members || [];
    const allFamMembers = head ? [head, ...subMembers] : [...subMembers];

    const isAllPresent = allFamMembers.every(m => attendanceRecords[m?.memberId]?.status === 'Present');
    const targetStatus = isAllPresent ? 'Absent' : 'Present';

    const updated = { ...attendanceRecords };
    allFamMembers.forEach(m => {
      if (m?.memberId) {
        updated[m.memberId] = {
          memberId: m.memberId,
          name: m.name,
          type: 'Member',
          status: targetStatus,
          markedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
    });

    setAttendanceRecords(updated);
    localStorage.setItem(`attendance_${selectedDate}_${selectedService}`, JSON.stringify(updated));
    showToast(`${fam?.familyName || 'குடும்பம்'} அனைவருக்கும் ${targetStatus} மார்க் செய்யப்பட்டது!`);
  };

  // விசிட்டரை சேமித்தல்
  const handleSaveQuickVisitor = (e) => {
    e.preventDefault();
    if (!visitorForm.name.trim() || !visitorForm.phone.trim()) return;

    const newVisitorId = `VIS-${Date.now().toString().slice(-4)}`;
    const newVisitorData = {
      id: newVisitorId,
      visitorCode: newVisitorId,
      ...visitorForm,
      firstVisitDate: selectedDate,
      serviceAttended: selectedService,
      followUpStage: 'New Contact',
      createdAt: new Date().toISOString()
    };

    const updatedVisitors = [newVisitorData, ...visitors];
    setVisitors(updatedVisitors);
    localStorage.setItem('app_visitors_database', JSON.stringify(updatedVisitors));

    const updatedAttendance = {
      ...attendanceRecords,
      [newVisitorId]: {
        memberId: newVisitorId,
        name: visitorForm.name,
        type: 'Visitor',
        status: 'Present',
        markedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    };
    setAttendanceRecords(updatedAttendance);
    localStorage.setItem(`attendance_${selectedDate}_${selectedService}`, JSON.stringify(updatedAttendance));

    setIsVisitorModalOpen(false);
    setVisitorForm({ name: '', phone: '', area: '', broughtBy: '', prayerRequest: '', category: 'First Time Visitor' });
    showToast(`புது விசுவாசி ${newVisitorData.name} சேர்க்கப்பட்டார்!`);
  };

  // விசுவாசிகளை பாதுகாப்பாக பிரித்தெடுத்தல் (Safe Flattening)
  const allBelievers = [];
  (families || []).forEach(fam => {
    if (fam && fam.headMember) {
      allBelievers.push({ ...fam.headMember, familyName: fam.familyName, isHead: true, rawFamily: fam });
    }
    if (fam && Array.isArray(fam.members)) {
      fam.members.forEach(mem => {
        if (mem) allBelievers.push({ ...mem, familyName: fam.familyName, isHead: false, rawFamily: fam });
      });
    }
  });

  const totalPresentCount = Object.values(attendanceRecords || {}).filter(r => r?.status === 'Present').length;
  const regularBelieversPresent = Object.values(attendanceRecords || {}).filter(r => r?.status === 'Present' && r?.type === 'Member').length;
  const visitorsPresent = Object.values(attendanceRecords || {}).filter(r => r?.status === 'Present' && r?.type === 'Visitor').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full select-none text-slate-200">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP HEADER & SERVICE SELECTOR */}
      <div className="rounded-3xl p-6 sm:p-8 space-y-6 bg-slate-900/60 border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider">
                Sunday Service Registry
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              <CalendarCheck className="text-orange-400" size={26} />
              <span>Service Attendance & Visitor Check-in</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              விசுவாசிகளின் ஆராதனை வருகைப்பதிவு மற்றும் புதிய ஆத்துமாக்களின் உடனடி வரவேற்புப் பதிவு.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-900 border border-white/10 px-3.5 py-2 rounded-2xl text-xs text-slate-200 font-bold focus:outline-none cursor-pointer font-mono"
            />

            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="bg-slate-900 border border-white/10 px-3.5 py-2 rounded-2xl text-xs text-slate-200 font-bold focus:outline-none cursor-pointer"
            >
              <option value="Sunday 1st Morning Service (07:00 AM)">Sunday 1st Morning Service (07:00 AM)</option>
              <option value="Sunday 2nd English Service (09:30 AM)">Sunday 2nd English Service (09:30 AM)</option>
              <option value="Sunday Evening Youth Service (06:00 PM)">Sunday Evening Youth Service (06:00 PM)</option>
            </select>

            <button
              type="button"
              onClick={() => setIsVisitorModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-2xl text-xs font-bold shadow-lg border border-white/20 cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <UserPlus size={15} />
              <span>+ Quick New Visitor</span>
            </button>
          </div>
        </div>

        {/* 2. METRICS COUNTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total Present</span>
            <div className="text-2xl font-black text-white font-mono">{totalPresentCount}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Regular Members</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">{regularBelieversPresent}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-rose-500/20 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">New Visitors</span>
            <div className="text-2xl font-black text-rose-400 font-mono">{visitorsPresent}</div>
          </div>
        </div>

        {/* 3. SEARCH & FILTERS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by Name or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                activeTab === 'all' ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400 border border-white/5'
              }`}
            >
              All Members ({allBelievers.length})
            </button>
            <button 
              onClick={() => setActiveTab('visitors')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                activeTab === 'visitors' ? 'bg-rose-500 text-white' : 'bg-slate-900 text-slate-400 border border-white/5'
              }`}
            >
              Visitors ({visitors.length})
            </button>
          </div>
        </div>

        {/* ATTENDANCE TABLE */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                <th className="p-3.5">Name & ID</th>
                <th className="p-3.5">Family / Type</th>
                <th className="p-3.5">Phone</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeTab !== 'visitors' && allBelievers
                .filter(b => {
                  const q = searchQuery.toLowerCase();
                  return b.name?.toLowerCase().includes(q) || (b.phone && b.phone.includes(q));
                })
                .map((believer) => {
                  const isPresent = attendanceRecords[believer.memberId]?.status === 'Present';

                  return (
                    <tr key={believer.memberId} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-bold text-white">
                        {believer.name} {believer.isHead && <span className="text-[10px] text-orange-400 font-normal">(Head)</span>}
                        <div className="text-[10px] text-slate-400 font-mono font-normal">{believer.memberId}</div>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {believer.familyName}
                        {believer.isHead && (
                          <button
                            type="button"
                            onClick={() => handleQuickFamilyMark(believer.rawFamily)}
                            className="block text-[10px] text-orange-400 font-bold mt-0.5 hover:underline cursor-pointer"
                          >
                            Mark Family →
                          </button>
                        )}
                      </td>
                      <td className="p-3.5 font-mono text-slate-300">{believer.phone || 'N/A'}</td>
                      <td className="p-3.5">
                        {isPresent ? (
                          <span className="text-emerald-400 font-bold text-[11px]">✓ Present</span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Absent</span>
                        )}
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleAttendance(believer.memberId, believer.name, 'Member')}
                          className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                            isPresent ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 border border-white/10'
                          }`}
                        >
                          {isPresent ? 'Marked ✓' : 'Mark Present'}
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {/* VISITORS */}
              {visitors
                .filter(v => v.name?.toLowerCase().includes(searchQuery.toLowerCase()) || (v.phone && v.phone.includes(searchQuery)))
                .map((vis) => {
                  const isPresent = attendanceRecords[vis.id]?.status === 'Present';

                  return (
                    <tr key={vis.id} className="hover:bg-white/[0.02] bg-rose-500/[0.02]">
                      <td className="p-3.5 font-bold text-white">
                        {vis.name} <span className="text-[10px] text-rose-400 font-normal">(Visitor)</span>
                        <div className="text-[10px] text-slate-400 font-mono font-normal">{vis.visitorCode || vis.id}</div>
                      </td>
                      <td className="p-3.5 text-rose-300">{vis.category || 'Seeker'}</td>
                      <td className="p-3.5 font-mono text-slate-300">{vis.phone}</td>
                      <td className="p-3.5">
                        {isPresent ? <span className="text-emerald-400 font-bold text-[11px]">✓ Present</span> : <span className="text-slate-500 text-[11px]">Absent</span>}
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleAttendance(vis.id, vis.name, 'Visitor')}
                          className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                            isPresent ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300 border border-white/10'
                          }`}
                        >
                          {isPresent ? 'Visitor ✓' : 'Mark Visitor'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD VISITOR */}
      {isVisitorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#0e1322] border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HeartHandshake className="text-rose-400" size={18} />
                <span>Quick Sunday Visitor Check-in</span>
              </h3>
              <button onClick={() => setIsVisitorModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveQuickVisitor} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Visitor Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anandha Raj"
                  value={visitorForm.name}
                  onChange={(e) => setVisitorForm({ ...visitorForm, name: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-rose-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Mobile Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 00000"
                    value={visitorForm.phone}
                    onChange={(e) => setVisitorForm({ ...visitorForm, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium">Area / Locality</label>
                  <input
                    type="text"
                    placeholder="e.g. Town Circle"
                    value={visitorForm.area}
                    onChange={(e) => setVisitorForm({ ...visitorForm, area: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Brought / Invited By</label>
                <input
                  type="text"
                  placeholder="e.g. David Kumar"
                  value={visitorForm.broughtBy}
                  onChange={(e) => setVisitorForm({ ...visitorForm, broughtBy: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsVisitorModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save & Mark Present
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
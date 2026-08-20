import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, TrendingUp, DollarSign, 
  CalendarCheck, ArrowUpRight, PlusCircle, Sparkles, Filter, 
  ChevronRight, Receipt, Wallet, HeartHandshake, X, Search, Check, UserPlus, Clock
} from 'lucide-react';

export default function MainDashboard({ onNavigateTab }) {
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedPeriod, setSelectedPeriod] = useState('this_week');

  // Quick Attendance Modal State
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('existing'); // 'existing' | 'new'
  const [searchMember, setSearchMember] = useState('');
  
  // State for selecting the service in the pop-up (Service / Event Selector)
  const [selectedService, setSelectedService] = useState('Sunday 1st Morning Service (07:00 AM)');
  const todayDate = new Date().toISOString().split('T')[0];

  // 1. Data States (Members & Visitors)[cite: 1, 3]
  const [families] = useState(() => {
    try {
      const saved = localStorage.getItem('app_members_family_database');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [visitors, setVisitors] = useState(() => {
    try {
      const saved = localStorage.getItem('app_visitors_database');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State for loading attendance records for the selected service
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(`attendance_${todayDate}_${selectedService}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // When the service changes, the corresponding attendance loads automatically.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`attendance_${todayDate}_${selectedService}`);
      setAttendanceRecords(saved ? JSON.parse(saved) : {});
    } catch {
      setAttendanceRecords({});
    }
  }, [selectedService]);

  const [financeSummary] = useState({
    tithe: 84500,
    sundayOffering: 42300,
    buildingFund: 35000,
    thanksgiving: 18200,
    totalExpenses: 62400,
    growthRate: '+12.4%'
  });

  // New Visitor Form State
  const [newVisitorForm, setNewVisitorForm] = useState({
    name: '',
    phone: '',
    area: '',
    broughtBy: '',
    prayerRequest: ''
  });

  // 2. Extracting believers with a unique ID (Strict Unique Key)[cite: 1, 3]
  const allBelievers = [];
  (families || []).forEach((fam, fIdx) => {
    const fId = fam?.familyId || `FAM-${fIdx + 101}`;
    
    // Head of Family[cite: 1, 3]
    if (fam?.headMember) {
      allBelievers.push({
        ...fam.headMember,
        uniqueId: `HEAD_${fId}_${fam.headMember.memberId || fam.headMember.name || fIdx}`,
      name: fam.headMember.name || 'Family Head',
      familyName: fam.familyName || 'Household',
      roleInFamily: 'Head of Family',
      phone: fam.headMember.phone || ''
    });
  }

    // 2. Sub-members (Strictly isolated by Family ID + Index + Name)
  if (fam?.members && Array.isArray(fam.members)) {
    fam.members.forEach((m, mIdx) => {
      allBelievers.push({
        ...m,
        uniqueId: `SUB_${fId}_IDX${mIdx}_${m.memberId || m.name || 'mem'}`,
        name: m.name || 'Family Member',
        familyName: fam.familyName || 'Household',
        roleInFamily: m.roleInFamily || 'Member',
        phone: m.phone || fam?.headMember?.phone || ''
      });
    });
  }
});

  // 3. Marking a specific person as present
  const handleMarkPresent = (uniqueId, name, type = 'Member') => {
    const key = `attendance_${todayDate}_${selectedService}`;
    const isCurrentlyPresent = attendanceRecords[uniqueId]?.status === 'Present';
    const nextStatus = isCurrentlyPresent ? 'Absent' : 'Present';

    const updated = {
      ...attendanceRecords,
      [uniqueId]: {
        memberId: uniqueId,
        name,
        type,
        service: selectedService,
        status: nextStatus,
        markedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    };

    setAttendanceRecords(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  // 4. Adding a new visitor to the visitor pipeline and attendance.
  const handleSaveNewVisitor = (e) => {
    e.preventDefault();
    if (!newVisitorForm.name.trim() || !newVisitorForm.phone.trim()) return;

    const newId = `VIS-${Date.now().toString().slice(-4)}`;

    const newRecord = {
      id: newId,
      visitorCode: newId,
      name: newVisitorForm.name,
      phone: newVisitorForm.phone,
      area: newVisitorForm.area || 'Locality',
      broughtBy: newVisitorForm.broughtBy || 'Self',
      prayerRequest: newVisitorForm.prayerRequest || 'General Prayer',
      category: 'First Time Visitor',
      firstVisitDate: todayDate,
      serviceAttended: selectedService,
      followUpStage: 'new_contact', // It will appear correctly in the visitors pipeline.
      createdAt: new Date().toISOString()
    };

    // Adding the new visitor to the visitors database
    const updatedVisitors = [newRecord, ...visitors];
    setVisitors(updatedVisitors);
    localStorage.setItem('app_visitors_database', JSON.stringify(updatedVisitors));

    // Marking the new visitor as present for the selected service
    handleMarkPresent(newId, newVisitorForm.name, 'Visitor');

    setNewVisitorForm({ name: '', phone: '', area: '', broughtBy: '', prayerRequest: '' });
    setModalTab('existing');
    alert('The new believer was registered, and their attendance at the service was recorded.!');
  };

  const totalFamiliesCount = families.length;
  const totalBelieversCount = allBelievers.length;
  const totalIncome = financeSummary.tithe + financeSummary.sundayOffering + financeSummary.buildingFund + financeSummary.thanksgiving;
  const netSavings = totalIncome - financeSummary.totalExpenses;
  const presentCount = Object.values(attendanceRecords).filter(r => r.status === 'Present').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full select-none text-slate-200">
      
      {/* 1. TOP HEADER */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                Live Executive Cockpit
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              <Sparkles className="text-orange-400" size={24} />
              <span>Church Central Intelligence</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-slate-900 border border-white/10 px-3 py-2 rounded-2xl text-xs">
              <Building2 size={14} className="text-orange-400" />
              <select 
                value={selectedBranch} 
                onChange={(e) => setSelectedBranch(e.target.value)} 
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900">All Campuses</option>
                <option value="Main Cathedral HQ" className="bg-slate-900">Main Cathedral HQ</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. 4 PRIMARY METRIC TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => onNavigateTab?.('members_list')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-orange-500/40 cursor-pointer transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Members</span>
              <Users className="text-orange-400" size={20} />
            </div>
            <div className="text-2xl font-black text-white font-mono">{totalBelieversCount}</div>
            <div className="text-[11px] text-orange-400 font-bold flex items-center justify-between">
              <span>{totalFamiliesCount} Families</span>
              <span className="flex items-center">View <ArrowUpRight size={12} /></span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Collections</span>
              <DollarSign className="text-emerald-400" size={20} />
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">₹{totalIncome.toLocaleString()}</div>
            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp size={12} /> {financeSummary.growthRate}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Expenses</span>
              <Receipt className="text-rose-400" size={20} />
            </div>
            <div className="text-2xl font-black text-rose-400 font-mono">₹{financeSummary.totalExpenses.toLocaleString()}</div>
            <span className="text-[11px] text-slate-400">Surplus: ₹{netSavings.toLocaleString()}</span>
          </div>

          <div 
            onClick={() => setIsAttendanceModalOpen(true)}
            className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Service Turnout</span>
              <CalendarCheck className="text-indigo-400" size={20} />
            </div>
            <div className="text-2xl font-black text-indigo-300 font-mono">{presentCount} Present</div>
            <div className="text-[11px] text-indigo-400 font-bold flex items-center justify-between">
              <span>Launch Quick Marker</span>
              <ArrowUpRight size={12} />
            </div>
          </div>

        </div>
      </div>

      {/* 3. QUICK ACTIONS & LAUNCH ATTENDANCE BUTTON */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CalendarCheck className="text-orange-400" size={18} />
                <span>Sunday Attendance Operations</span>
              </h3>
              <p className="text-[11px] text-slate-400">Open the marker to record immediate attendance by service.</p>
            </div>

            <button
              type="button"
              onClick={() => setIsAttendanceModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
            >
              <span>Launch Attendance Marker</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/20">
              <span className="text-xs text-slate-400 font-bold">Checked In ({selectedService.split('(')[0]})</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{presentCount}</div>
            </div>
            <div 
              onClick={() => onNavigateTab?.('visitors')}
              className="p-4 rounded-2xl bg-slate-900 border border-rose-500/20 cursor-pointer hover:bg-slate-800 transition-all"
            >
              <span className="text-xs text-slate-400 font-bold">Total Seekers in Pipeline</span>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">{visitors.length}</div>
            </div>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Quick Navigation</h4>
          <button
            onClick={() => onNavigateTab?.('members_list')}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-orange-500/40 text-white text-xs font-bold cursor-pointer"
          >
            <span className="flex items-center gap-2"><Users size={15} className="text-orange-400" /> Members Directory</span>
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => onNavigateTab?.('visitors')}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-rose-500/40 text-white text-xs font-bold cursor-pointer"
          >
            <span className="flex items-center gap-2"><HeartHandshake size={15} className="text-rose-400" /> Visitors Pipeline</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 4. SMART ATTENDANCE POP-UP MODAL WITH SERVICE SCROLLER */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-[#0e1322] border border-white/20 shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <CalendarCheck className="text-orange-400" size={20} />
                <div>
                  <h3 className="text-base font-bold text-white">Quick Attendance & Service Marker</h3>
                  <p className="text-[11px] text-slate-400">Date: <span className="text-orange-400 font-mono">{todayDate}</span></p>
                </div>
              </div>
              <button onClick={() => setIsAttendanceModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* SERVICE SCROLLER / EVENT SELECTOR BAR */}
            <div className="space-y-1.5 p-3 rounded-2xl bg-slate-900/90 border border-white/10">
              <label className="text-[11px] font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={13} />
                <span>Select Target Worship Service / Event:</span>
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="Sunday 1st Morning Service (07:00 AM)">Sunday 1st Morning Service (07:00 AM)</option>
                <option value="Sunday 2nd English Service (09:30 AM)">Sunday 2nd English Service (09:30 AM)</option>
                <option value="Sunday Evening Youth Service (06:00 PM)">Sunday Evening Youth Service (06:00 PM)</option>
                <option value="Midweek Fasting Prayer (Wednesday)">Midweek Fasting Prayer (Wednesday)</option>
                <option value="Special Revival & Night Vigil">Special Revival & Night Vigil</option>
              </select>
            </div>

            {/* Modal Tabs */}
            <div className="flex rounded-xl bg-slate-900 p-1 border border-white/5">
              <button
                onClick={() => setModalTab('existing')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'existing' ? 'bg-orange-500 text-white' : 'text-slate-400'
                }`}
              >
                Existing Congregation ({allBelievers.length})
              </button>
              <button
                onClick={() => setModalTab('new')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'new' ? 'bg-rose-500 text-white' : 'text-slate-400'
                }`}
              >
                + New Believer / Visitor
              </button>
            </div>

            {/* TAB 1: EXISTING BELIEVERS LIST WITH INDEPENDENT MARKING */}
            {modalTab === 'existing' ? (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search member name, family, or phone..."
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto divide-y divide-white/5 pr-1">
                  {allBelievers
                    .filter(b => b.name?.toLowerCase().includes(searchMember.toLowerCase()) || b.phone?.includes(searchMember) || b.familyName?.toLowerCase().includes(searchMember.toLowerCase()))
                    .map((b) => {
                      const isMarked = attendanceRecords[b.uniqueId]?.status === 'Present';
                      return (
                        <div key={b.uniqueId} className="flex items-center justify-between py-2.5 px-2 hover:bg-white/[0.02] rounded-xl transition-colors">
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{b.name}</span>
                              <span className="text-[10px] text-orange-400 font-normal">({b.roleInFamily})</span>
                            </div>
                            <div className="text-[10px] text-slate-400">{b.familyName} • {b.phone || 'No phone'}</div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleMarkPresent(b.uniqueId, b.name, 'Member')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 ${
                              isMarked 
                                ? 'bg-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
                            }`}
                          >
                            {isMarked ? 'Present ✓' : 'Mark Present'}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              /* TAB 2: NEW VISITOR INTAKE FORM */
              <form onSubmit={handleSaveNewVisitor} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">New Seeker / Visitor Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Peter"
                    value={newVisitorForm.name}
                    onChange={(e) => setNewVisitorForm({ ...newVisitorForm, name: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-rose-500 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-300 font-medium">Mobile Phone *</label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98765..."
                      value={newVisitorForm.phone}
                      onChange={(e) => setNewVisitorForm({ ...newVisitorForm, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-medium">Area / Town</label>
                    <input
                      type="text"
                      placeholder="e.g. Gandhipuram"
                      value={newVisitorForm.area}
                      onChange={(e) => setNewVisitorForm({ ...newVisitorForm, area: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Invited / Brought By</label>
                  <input
                    type="text"
                    placeholder="e.g. Bro. David Kumar"
                    value={newVisitorForm.broughtBy}
                    onChange={(e) => setNewVisitorForm({ ...newVisitorForm, broughtBy: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Prayer Request</label>
                  <textarea
                    rows={2}
                    placeholder="Prayer for job / deliverance..."
                    value={newVisitorForm.prayerRequest}
                    onChange={(e) => setNewVisitorForm({ ...newVisitorForm, prayerRequest: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer"
                  >
                    Save Seeker & Check-in to {selectedService.split('(')[0]}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
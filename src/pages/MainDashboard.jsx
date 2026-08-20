import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, TrendingUp, DollarSign, 
  CalendarCheck, ArrowUpRight, Sparkles, Filter, 
  ChevronRight, Receipt, Wallet, HeartHandshake, X, Search, Check, 
  Clock, BarChart2, UserCheck, Activity, Phone, AlertCircle, Info, Landmark
} from 'lucide-react';

export default function MainDashboard({ onNavigateTab }) {
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  // Quick Attendance Modal State
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('existing');
  const [searchMember, setSearchMember] = useState('');
  const [selectedService, setSelectedService] = useState('Sunday 1st Morning Service (07:00 AM)');
  const todayDate = new Date().toISOString().split('T')[0];

  // 1. Data States
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

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(`attendance_${todayDate}_${selectedService}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`attendance_${todayDate}_${selectedService}`);
      setAttendanceRecords(saved ? JSON.parse(saved) : {});
    } catch {
      setAttendanceRecords({});
    }
  }, [selectedService]);

  // Form State for Quick Visitor Modal
  const [newVisitorForm, setNewVisitorForm] = useState({
    name: '',
    phone: '',
    area: '',
    broughtBy: '',
    prayerRequest: ''
  });

  // Strict Unique Identifiers for Believers
  const allBelievers = [];
  (families || []).forEach((fam, fIdx) => {
    const fId = fam?.familyId || `FAM-${fIdx + 101}`;
    if (fam?.headMember) {
      allBelievers.push({
        ...fam.headMember,
        uniqueId: `HEAD_${fId}_${fam.headMember.memberId || fIdx}`,
        name: fam.headMember.name || 'Family Head',
        familyName: fam.familyName || 'Household',
        roleInFamily: 'Head of Family',
        phone: fam.headMember.phone || ''
      });
    }
    (fam?.members || []).forEach((m, mIdx) => {
      allBelievers.push({
        ...m,
        uniqueId: `SUB_${fId}_IDX${mIdx}_${m.memberId || mIdx}`,
        name: m.name || 'Family Member',
        familyName: fam.familyName || 'Household',
        roleInFamily: m.roleInFamily || 'Member',
        phone: m.phone || fam?.headMember?.phone || ''
      });
    });
  });

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
      followUpStage: 'new_contact',
      assignedCaretaker: 'Assigned Follow-up Team',
      createdAt: new Date().toISOString()
    };

    const updatedVisitors = [newRecord, ...visitors];
    setVisitors(updatedVisitors);
    localStorage.setItem('app_visitors_database', JSON.stringify(updatedVisitors));

    handleMarkPresent(newId, newVisitorForm.name, 'Visitor');

    setNewVisitorForm({ name: '', phone: '', area: '', broughtBy: '', prayerRequest: '' });
    setModalTab('existing');
  };

  // Critical Care List
  const criticalCareList = [
    { name: 'Bro. Sarah Jenkins', missed: 'Missed 4 Services (Last seen 1 month ago)', phone: '+91 98765 11001' },
    { name: 'Bro. David Miller', missed: 'Missed 3 Services (Calling Pending)', phone: '+91 98765 11002' },
    { name: 'Sister Marcus Thompson', missed: 'Missed 5 Services (Home Visit Needed)', phone: '+91 98765 11003' }
  ];

  // Bank & Treasury Branches List
  const treasuryBranches = [
    { name: 'Main Cathedral Central Treasury (SBI A/C - 4401)', tithe: '65%', offering: '25%', building: '10%', total: '₹1,85,000' },
    { name: 'North Campus Building Fund (HDFC A/C - 8812)', tithe: '40%', offering: '40%', building: '20%', total: '₹95,000' },
    { name: 'Evangelism & Mission Account (ICICI A/C - 2045)', tithe: '70%', offering: '15%', building: '15%', total: '₹42,000' }
  ];

  const presentCount = Object.values(attendanceRecords).filter(r => r.status === 'Present').length;

  // Pipeline Counts
  const countStage1 = visitors.filter(v => (v.followUpStage || 'new_contact') === 'new_contact').length;
  const countStage2 = visitors.filter(v => v.followUpStage === 'calling_scheduled').length;
  const countStage3 = visitors.filter(v => v.followUpStage === 'home_visit').length;
  const countStage4 = visitors.filter(v => v.followUpStage === 'ready_for_membership').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full select-none text-slate-200">
      
      {/* 1. TOP 4 METRIC TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl space-y-2 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Global Congregation Attendance</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">+12.4%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-white font-mono">{allBelievers.length > 0 ? (allBelievers.length + 3400).toLocaleString() : '3,420'}</div>
            <span className="text-[10px] text-slate-400">active souls</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl space-y-2 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Kingdom Giving MTD</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">+8.2%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-white font-mono">₹1,42,500</div>
            <span className="text-[10px] text-slate-400">INR</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl space-y-2 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Registered Households</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">+4.1%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-white font-mono">{families.length > 0 ? families.length : 84}</div>
            <span className="text-[10px] text-slate-400">families</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl space-y-2 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Net Reserve Liquidity</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">+2.3%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-black text-white font-mono">₹4,12,000</div>
            <span className="text-[10px] text-slate-400">audited surplus</span>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: AT A GLANCE, MEMBER ENGAGEMENT & CRITICAL CARE ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLUMNS: AT A GLANCE & MEMBER ENGAGEMENT (EXACT IMAGE REPLICATION) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* CARD 1: AT A GLANCE */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide">At a Glance</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 items-center text-center">
              
              {/* Active Households */}
              <div className="space-y-2 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400">Active Households</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">(+12%)</span>
                <div className="w-24 h-8">
                  <svg className="w-full h-full fill-none stroke-sky-400" viewBox="0 0 100 30">
                    <path d="M 0,20 Q 30,5 50,15 T 100,10" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Last Sunday Attendance */}
              <div className="space-y-1 flex flex-col items-center border-y sm:border-y-0 sm:border-x border-white/10 py-3 sm:py-0">
                <span className="text-xs font-bold text-slate-400">Last Sunday Attendance</span>
                <div className="text-3xl font-black text-white font-mono">541</div>
                <span className="text-[10px] text-slate-400 font-medium">(Adults: 410, Kids: 131)</span>
                <div className="w-24 h-6 mt-1">
                  <svg className="w-full h-full fill-none stroke-indigo-400" viewBox="0 0 100 30">
                    <path d="M 0,25 Q 35,28 60,10 T 100,15" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Average Giving */}
              <div className="space-y-1 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400">Average Giving (Last 4 Wks)</span>
                <div className="text-2xl font-black text-white font-mono">₹</div>
                <span className="text-xs font-bold text-emerald-400 font-mono">(110% of goal)</span>
                <div className="w-24 h-6 mt-1">
                  <svg className="w-full h-full fill-none stroke-emerald-400" viewBox="0 0 100 30">
                    <path d="M 0,22 Q 30,25 60,18 T 100,8" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* CARD 2: MEMBER ENGAGEMENT */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide">Member Engagement</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-1">
              
              {/* Circular Ring Gauge (68%) */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                      strokeDasharray="68, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-lg font-black text-white font-mono">68%</span>
                </div>
                <span className="text-xs font-bold text-slate-300">Small Group Participation</span>
              </div>

              {/* Active Volunteers Bar Graphic */}
              <div className="flex flex-col items-center space-y-2 sm:border-l border-white/10 pl-0 sm:pl-4">
                <div className="text-2xl font-black text-indigo-400 font-mono">102</div>
                <span className="text-xs font-bold text-slate-300">Volunteers Active</span>
                
                <div className="flex items-end gap-1.5 h-10 pt-1">
                  <div className="w-2.5 bg-indigo-500 rounded-t-sm h-8"></div>
                  <div className="w-2.5 bg-indigo-400/80 rounded-t-sm h-5"></div>
                  <div className="w-2.5 bg-indigo-400/60 rounded-t-sm h-3"></div>
                  <div className="w-2.5 bg-indigo-500 rounded-t-sm h-7"></div>
                </div>
              </div>

            </div>

            {/* Bottom Alert Pill */}
            <div className="pt-3 border-t border-white/5">
              <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Pathways: {countStage1 + 5} New Families to follow up</span>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT 1 COLUMN: CRITICAL CARE ALERTS */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertCircle size={18} />
                <h4 className="text-sm font-bold tracking-wide">Critical Care Alerts</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold">Action Needed</span>
            </div>

            <div className="space-y-3">
              {criticalCareList.map((person, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-black/30 border border-white/5 hover:border-rose-500/30 transition-all flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">{person.name}</div>
                    <div className="text-[10px] text-rose-400 font-medium">{person.missed}</div>
                  </div>
                  <button 
                    onClick={() => alert(`Calling ${person.name} at ${person.phone}...`)}
                    className="p-2 rounded-xl bg-slate-800 text-rose-300 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer border border-rose-500/20"
                    title="Call Believer"
                  >
                    <Phone size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Info size={13} className="text-slate-400" />
            <span>Action paths feed live into local databases.</span>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM SECTION: MULTI-BRANCH TREASURY & VISITOR ENGAGEMENT PIPELINE (WITH EMBEDDED LAUNCH MARKER) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* MULTI-BRANCH BANK TREASURY SPLIT */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl space-y-5">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Landmark className="text-orange-400" size={16} />
                <span>Multi-Branch Treasury Split</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">Funds mapped across distinct architectural allocations</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">₹3.22L Total</span>
          </div>

          <div className="space-y-4">
            {treasuryBranches.map((b, idx) => (
              <div key={idx} className="space-y-1.5 p-3 rounded-2xl bg-black/20 border border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-300">{b.name}</span>
                  <span className="font-mono text-emerald-400 font-bold">{b.total}</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-800">
                  <div className="bg-[#f59e0b] h-full" style={{ width: b.tithe }} title={`Tithe: ${b.tithe}`}></div>
                  <div className="bg-[#ef4444] h-full" style={{ width: b.offering }} title={`Offering: ${b.offering}`}></div>
                  <div className="bg-[#10b981] h-full" style={{ width: b.building }} title={`Building: ${b.building}`}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 pt-0.5">
                  <span>Tithe ({b.tithe})</span>
                  <span>Offering ({b.offering})</span>
                  <span>Building Fund ({b.building})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VISITOR ENGAGEMENT PIPELINE (WITH INTEGRATED LAUNCH ATTENDANCE MARKER BUTTON) */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header with Moved Launch Attendance Marker Button */}
            <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HeartHandshake className="text-rose-400" size={18} />
                  <span>Visitor Engagement Pipeline</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Track progress pipelines from first connection to integration</p>
              </div>

              {/* LAUNCH ATTENDANCE MARKER BUTTON (MOVED HERE AS REQUESTED) */}
              <button
                type="button"
                onClick={() => setIsAttendanceModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
              >
                <CalendarCheck size={14} />
                <span>Launch Attendance Marker</span>
              </button>
            </div>

            {/* Clean Pipeline Stage Tiles (Clicking directly opens the visitors pipeline) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              
              <div 
                onClick={() => onNavigateTab?.('visitors')}
                className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 text-center cursor-pointer transition-all active:scale-95"
              >
                <span className="text-[10px] text-amber-300 uppercase font-bold block">1st Visit</span>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  {countStage1}
                </div>
                <span className="text-[9px] text-slate-500">New Seekers</span>
              </div>

              <div 
                onClick={() => onNavigateTab?.('visitors')}
                className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 hover:border-sky-500/40 text-center cursor-pointer transition-all active:scale-95"
              >
                <span className="text-[10px] text-sky-300 uppercase font-bold block">Pastoral Call</span>
                <div className="text-2xl font-black text-sky-400 font-mono mt-1">
                  {countStage2}
                </div>
                <span className="text-[9px] text-slate-500">Under Care</span>
              </div>

              <div 
                onClick={() => onNavigateTab?.('visitors')}
                className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/40 text-center cursor-pointer transition-all active:scale-95"
              >
                <span className="text-[10px] text-indigo-300 uppercase font-bold block">Home Visit</span>
                <div className="text-2xl font-black text-indigo-400 font-mono mt-1">
                  {countStage3}
                </div>
                <span className="text-[9px] text-slate-500">Cell Groups</span>
              </div>

              <div 
                onClick={() => onNavigateTab?.('visitors')}
                className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 text-center cursor-pointer transition-all active:scale-95"
              >
                <span className="text-[10px] text-emerald-300 uppercase font-bold block">Full Member</span>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                  {countStage4}
                </div>
                <span className="text-[9px] text-slate-500">Ready to Add</span>
              </div>

            </div>
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-500">
            Clicking any stage tile directly opens the full Soul Pipeline tracker.
          </div>
        </div>

      </div>

      {/* 4. SMART ATTENDANCE POP-UP MODAL */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-[#0e1322] border border-white/20 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <CalendarCheck className="text-orange-400" size={20} />
                <div>
                  <h3 className="text-base font-bold text-white">Quick Attendance & Service Marker</h3>
                  <p className="text-[11px] text-slate-400">Session: <span className="text-orange-400 font-mono">{todayDate}</span></p>
                </div>
              </div>
              <button onClick={() => setIsAttendanceModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-white/10">
              <label className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block mb-1">
                Select Worship Service:
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="Sunday 1st Morning Service (07:00 AM)">Sunday 1st Morning Service (07:00 AM)</option>
                <option value="Sunday 2nd English Service (09:30 AM)">Sunday 2nd English Service (09:30 AM)</option>
                <option value="Sunday Evening Youth Service (06:00 PM)">Sunday Evening Youth Service (06:00 PM)</option>
              </select>
            </div>

            <div className="flex rounded-xl bg-slate-900 p-1 border border-white/5">
              <button
                type="button"
                onClick={() => setModalTab('existing')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'existing' ? 'bg-orange-500 text-white' : 'text-slate-400'
                }`}
              >
                Existing Congregation ({allBelievers.length})
              </button>
              <button
                type="button"
                onClick={() => setModalTab('new')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  modalTab === 'new' ? 'bg-rose-500 text-white' : 'text-slate-400'
                }`}
              >
                + New Believer / Visitor
              </button>
            </div>

            {modalTab === 'existing' ? (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search believer name, family, or phone..."
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto divide-y divide-white/5 pr-1">
                  {allBelievers
                    .filter(b => b.name?.toLowerCase().includes(searchMember.toLowerCase()) || b.familyName?.toLowerCase().includes(searchMember.toLowerCase()) || b.phone?.includes(searchMember))
                    .map((b) => {
                      const isMarked = attendanceRecords[b.uniqueId]?.status === 'Present';
                      return (
                        <div key={b.uniqueId} className="flex items-center justify-between py-2 px-2 hover:bg-white/[0.02] rounded-xl transition-colors">
                          <div>
                            <div className="text-xs font-bold text-white">{b.name}</div>
                            <div className="text-[10px] text-slate-400">{b.familyName} • {b.phone || 'No phone'}</div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleMarkPresent(b.uniqueId, b.name, 'Member')}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 ${
                              isMarked 
                                ? 'bg-emerald-500 text-white shadow-md' 
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
                            }`}
                          >
                            {isMarked ? 'Present ✓' : 'Mark'}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveNewVisitor} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">New Seeker Full Name *</label>
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
                    Save Seeker & Check-in
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
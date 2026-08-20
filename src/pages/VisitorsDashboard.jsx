import React, { useState } from 'react';
import { 
  HeartHandshake, UserPlus, Phone, MapPin, Calendar, 
  CheckCircle2, Edit3, Trash2, Search, ArrowRight, UserCheck, X, Clock
} from 'lucide-react';

export default function VisitorsDashboard({ onNavigateTab }) {
  const stages = [
    { id: 'new_contact', label: '1. New Seeker / 1st Visit', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
    { id: 'calling_scheduled', label: '2. Pastoral Call & Care', badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
    { id: 'home_visit', label: '3. Home Visit / Cell Group', badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' },
    { id: 'ready_for_membership', label: '4. Ready for Full Membership', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' }
  ];

  const [visitors, setVisitors] = useState(() => {
    try {
      const saved = localStorage.getItem('app_visitors_database');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState('');

  // Stage Update Modal State
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [activeVisitor, setActiveVisitor] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    nextStage: 'calling_scheduled',
    assignedCaretaker: '',
    careNotes: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Open Update Modal
  const handleOpenUpdateModal = (vis) => {
    setActiveVisitor(vis);
    setUpdateForm({
      nextStage: vis.followUpStage === 'new_contact' ? 'calling_scheduled' : vis.followUpStage === 'calling_scheduled' ? 'home_visit' : 'ready_for_membership',
      assignedCaretaker: vis.assignedCaretaker || '',
      careNotes: vis.careNotes || ''
    });
    setIsUpdateModalOpen(true);
  };

  // Save Updated Stage
  const handleSaveStageUpdate = (e) => {
    e.preventDefault();
    if (!activeVisitor) return;

    const updated = visitors.map(v => {
      if (v.id === activeVisitor.id) {
        return {
          ...v,
          followUpStage: updateForm.nextStage,
          assignedCaretaker: updateForm.assignedCaretaker,
          careNotes: updateForm.careNotes,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return v;
    });

    setVisitors(updated);
    localStorage.setItem('app_visitors_database', JSON.stringify(updated));
    setIsUpdateModalOpen(false);
    showToast(`${activeVisitor.name} Their follow-up status was changed.!`);
  };

  // Convert to Full Believer Member
  const handleConvertToMember = (vis) => {
    if (!window.confirm(`${vis.name} Should they be added to the membership list as full believers?`)) return;

    try {
      const savedMembers = localStorage.getItem('app_members_family_database');
      const families = savedMembers ? JSON.parse(savedMembers) : [];

      const nextNum = families.length + 101;
      const newFamilyMember = {
        familyId: `FAM-${nextNum}`,
        familyName: `${vis.name} & Household`,
        headMember: {
          memberId: `CAT-00${nextNum}`,
          name: vis.name,
          roleInFamily: 'Head of Family',
          gender: 'Male',
          phone: vis.phone,
          status: 'Active',
          campus: 'Main Cathedral HQ'
        },
        members: []
      };

      const updatedFamilies = [newFamilyMember, ...families];
      localStorage.setItem('app_members_family_database', JSON.stringify(updatedFamilies));

      const updatedVisitors = visitors.filter(v => v.id !== vis.id);
      setVisitors(updatedVisitors);
      localStorage.setItem('app_visitors_database', JSON.stringify(updatedVisitors));

      showToast(`${vis.name} was converted to a full believer and added to the members list!`);
    } catch {
      alert('Error converting to member');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Should this record be deleted?')) {
      const updated = visitors.filter(v => v.id !== id);
      setVisitors(updated);
      localStorage.setItem('app_visitors_database', JSON.stringify(updated));
      showToast('Record deleted.');
    }
  };

  const filteredVisitors = visitors.filter(v => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = v.name?.toLowerCase().includes(q) || v.phone?.includes(q) || v.area?.toLowerCase().includes(q);
    const matchesStage = selectedStageFilter === 'ALL' || (v.followUpStage || 'new_contact') === selectedStageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full select-none text-slate-200">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider">
                Soul Care Pipeline Tracker
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              <HeartHandshake className="text-rose-400" size={26} />
              <span>Visitors & Follow-up Management</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              New visitor arrivals, follow-up statuses, and care management records.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search Seeker by Name, Area, or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedStageFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStageFilter === 'ALL' ? 'bg-rose-500 text-white' : 'bg-slate-900 text-slate-400 border border-white/5'
              }`}
            >
              All Souls ({visitors.length})
            </button>
            {stages.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedStageFilter(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedStageFilter === s.id ? 'bg-rose-500 text-white' : 'bg-slate-900 text-slate-400 border border-white/5'
                }`}
              >
                {s.label.split('.')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Visitors List Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                <th className="p-3.5">Seeker Name & ID</th>
                <th className="p-3.5">First Visit & Service</th>
                <th className="p-3.5">Prayer Request / Area</th>
                <th className="p-3.5">Current Stage</th>
                <th className="p-3.5">Assigned Caretaker</th>
                <th className="p-3.5 text-center">Pipeline Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 italic">
                    There are no new visitors in this section.
                  </td>
                </tr>
              ) : (
                filteredVisitors.map((vis) => {
                  const currentStageObj = stages.find(s => s.id === (vis.followUpStage || 'new_contact'));

                  return (
                    <tr key={vis.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-white text-xs">{vis.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{vis.phone}</div>
                      </td>

                      <td className="p-3.5">
                        <div className="text-slate-200 font-medium">{vis.firstVisitDate || 'Recent'}</div>
                        <div className="text-[10px] text-rose-400">{vis.serviceAttended || '1st Service'}</div>
                      </td>

                      <td className="p-3.5 max-w-xs">
                        <div className="text-slate-300 italic truncate">"{vis.prayerRequest || 'General Prayer'}"</div>
                        <div className="text-[10px] text-slate-500">{vis.area} • Brought by: {vis.broughtBy || 'Self'}</div>
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${currentStageObj?.badge}`}>
                          {currentStageObj?.label}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="text-slate-200 font-medium">{vis.assignedCaretaker || 'Not Assigned'}</div>
                        {vis.careNotes && <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{vis.careNotes}</div>}
                      </td>

                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenUpdateModal(vis)}
                            className="px-3 py-1 rounded-xl bg-gradient-to-r from-orange-500/20 to-rose-500/20 hover:from-orange-500/30 hover:to-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold cursor-pointer transition-all flex items-center gap-1"
                          >
                            <Edit3 size={12} />
                            <span>Update Stage</span>
                          </button>

                          {vis.followUpStage === 'ready_for_membership' && (
                            <button
                              type="button"
                              onClick={() => handleConvertToMember(vis)}
                              className="px-3 py-1 rounded-xl bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md flex items-center gap-1 active:scale-95"
                            >
                              <UserCheck size={12} />
                              <span>Make Member</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(vis.id)}
                            className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* STAGE UPDATE ACTION MODAL */}
      {isUpdateModalOpen && activeVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#0e1322] border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit3 className="text-rose-400" size={18} />
                  <span>Update Follow-up Stage</span>
                </h3>
                <p className="text-xs text-slate-400">Seeker: <strong className="text-white">{activeVisitor.name}</strong></p>
              </div>
              <button onClick={() => setIsUpdateModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStageUpdate} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Select Next Care Stage *</label>
                <select
                  value={updateForm.nextStage}
                  onChange={(e) => setUpdateForm({ ...updateForm, nextStage: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer font-bold"
                >
                  {stages.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Assigned Pastor / Elder / Caretaker</label>
                <input
                  type="text"
                  placeholder="e.g. Bro. Stephen Raj"
                  value={updateForm.assignedCaretaker}
                  onChange={(e) => setUpdateForm({ ...updateForm, assignedCaretaker: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Follow-up Call / Visit Remarks</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Spoke over phone, prayed for healing. Planning for home visit."
                  value={updateForm.careNotes}
                  onChange={(e) => setUpdateForm({ ...updateForm, careNotes: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save & Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
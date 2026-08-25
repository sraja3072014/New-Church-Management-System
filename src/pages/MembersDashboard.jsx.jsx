import React, { useState } from 'react';
import { 
  Users, UserCheck, Heart, Search, 
  Trash2, Phone, Mail, Crown,
  UserPlus, Award, Filter, Eye, CheckCircle2,
  User, X
} from 'lucide-react';

export default function MembersDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [membersList, setMembersList] = useState([
    {
      id: 1,
      name: 'Rev. Senior Pastor',
      memberId: 'MEM-001',
      role: 'Senior Pastor',
      category: 'pastors',
      stage: 'Practicing Member',
      familyHead: 'Self (Head)',
      phone: '+91 98765 43210',
      email: 'pastor@church.org',
      branch: 'Nope Search Main Cathedral',
      joinDate: '2010-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Pastor Assistant A',
      memberId: 'MEM-002',
      role: 'Associate Pastor',
      category: 'pastors',
      stage: 'Practicing Member',
      familyHead: 'Self (Head)',
      phone: '+91 98765 00001',
      email: 'pastora@church.org',
      branch: 'Koduvai Town Branch',
      joinDate: '2015-06-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Bro. David (Care Cell)',
      memberId: 'MEM-003',
      role: 'Care Cell Leader',
      category: 'leaders',
      stage: 'Baptized Member',
      familyHead: 'Self (Head)',
      phone: '+91 98765 11111',
      email: 'david@church.org',
      branch: 'Nope Search Main Cathedral',
      joinDate: '2018-03-10',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Sis. Sarah (Youth Wing)',
      memberId: 'MEM-004',
      role: 'Youth Leader',
      category: 'leaders',
      stage: 'Baptized Member',
      familyHead: 'Bro. David (Daughter)',
      phone: '+91 98765 22222',
      email: 'sarah@church.org',
      branch: 'Nope Search Main Cathedral',
      joinDate: '2020-08-12',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Bro. Samuel & Family',
      memberId: 'MEM-005',
      role: 'Church Member',
      category: 'members',
      stage: 'Practicing Member',
      familyHead: 'Self (Head)',
      phone: '+91 98765 33333',
      email: 'samuel@gmail.com',
      branch: 'Kangeyam City Branch',
      joinDate: '2022-01-05',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Bro. Rajesh (Visitor)',
      memberId: 'MEM-006',
      role: 'New Seeker',
      category: 'new_believers',
      stage: 'New Seeker',
      familyHead: 'Self (Head)',
      phone: '+91 98765 44444',
      email: 'rajesh@gmail.com',
      branch: 'Koduvai Town Branch',
      joinDate: '2026-06-10',
      status: 'Follow-up Needed'
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    role: 'Church Member',
    category: 'members',
    stage: 'Baptized Member',
    familyHead: 'Self (Head)',
    phone: '',
    email: '',
    branch: 'Nope Search Main Cathedral'
  });

  const triggerToast = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.phone) {
      alert('Please enter Name and Phone number');
      return;
    }

    const memberToAdd = {
      ...newMember,
      id: Date.now(),
      memberId: `MEM-00${membersList.length + 1}`,
      joinDate: new Date().toISOString().split('T')[0],
      status: newMember.category === 'new_believers' ? 'Follow-up Needed' : 'Active'
    };

    setMembersList([memberToAdd, ...membersList]);
    setIsAddModalOpen(false);
    setNewMember({
      name: '',
      role: 'Church Member',
      category: 'members',
      stage: 'Baptized Member',
      familyHead: 'Self (Head)',
      phone: '',
      email: '',
      branch: 'Nope Search Main Cathedral'
    });
    triggerToast('New Believer / Member added successfully!');
  };

  const handleDeleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this member profile?")) {
      setMembersList(membersList.filter(m => m.id !== id));
      triggerToast('Member profile removed.');
    }
  };

  const filteredMembers = membersList.filter(m => {
    const matchesTab = activeTab === 'all' || m.category === activeTab;
    const matchesStage = stageFilter === 'all' || m.stage === stageFilter;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.phone.includes(searchQuery) || 
                          m.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesStage && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {successMsg && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn shadow-lg">
          <CheckCircle2 size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Believers', count: membersList.length, icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
          { label: 'Pastoral Team', count: membersList.filter(m => m.category === 'pastors').length, icon: Crown, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
          { label: 'Ministry Leaders', count: membersList.filter(m => m.category === 'leaders').length, icon: Award, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
          { label: 'New Believers', count: membersList.filter(m => m.category === 'new_believers').length, icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`p-4 rounded-3xl border glass-panel flex items-center justify-between ${stat.bg}`}>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-black text-white mt-0.5">{stat.count}</h3>
              </div>
              <div className={`p-2.5 rounded-2xl bg-white/5 ${stat.color}`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Tabs */}
      <div className="glass-panel p-1.5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'All Believers', icon: Users },
            { id: 'pastors', label: 'Pastoral Team', icon: Crown },
            { id: 'leaders', label: 'Leaders & Elders', icon: Award },
            { id: 'members', label: 'Church Members', icon: UserCheck },
            { id: 'new_believers', label: 'New Believers (Seekers)', icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-orange-600' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
        >
          <UserPlus size={15} />
          <span>+ Add Believer / Leader</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by name, role, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/70 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={14} className="text-slate-400 shrink-0" />
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-slate-900/70 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer w-full sm:w-auto"
          >
            <option value="all">All Spiritual Stages</option>
            <option value="Practicing Member">Practicing Members</option>
            <option value="Baptized Member">Baptized Members</option>
            <option value="New Seeker">New Seekers / Visitors</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="glass-card rounded-3xl p-6 space-y-4">
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                  <th className="p-3.5 font-semibold">Believer Profile</th>
                  <th className="p-3.5 font-semibold">Church Role</th>
                  <th className="p-3.5 font-semibold">Spiritual Stage</th>
                  <th className="p-3.5 font-semibold">Family Hierarchy</th>
                  <th className="p-3.5 font-semibold">Contact Line</th>
                  <th className="p-3.5 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-xs">{member.name}</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span className="text-orange-400">{member.memberId}</span>
                        <span>•</span>
                        <span>{member.branch}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        member.category === 'pastors'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : member.category === 'leaders'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : member.category === 'new_believers'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          member.stage === 'Practicing Member' ? 'bg-emerald-400' :
                          member.stage === 'Baptized Member' ? 'bg-sky-400' : 'bg-amber-400 animate-pulse'
                        }`} />
                        <span>{member.stage}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-300 text-xs">
                      {member.familyHead}
                    </td>
                    <td className="p-3.5 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Phone size={12} />
                        <span>{member.phone}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{member.email}</div>
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 cursor-pointer"
                          title="View Profile Details"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
                          title="Delete Member"
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
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="text-orange-400" size={18} />
                Register New Believer / Minister
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="text-xs text-slate-300 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bro. John Wesley"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Category Group *</label>
                  <select
                    value={newMember.category}
                    onChange={(e) => setNewMember({ ...newMember, category: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="members">Church Member</option>
                    <option value="pastors">Pastoral Team</option>
                    <option value="leaders">Ministry Leader / Elder</option>
                    <option value="new_believers">New Believer (Seeker)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Designation / Role Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Care Cell Leader, Deacon, Elder..."
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Spiritual Stage</label>
                  <select
                    value={newMember.stage}
                    onChange={(e) => setNewMember({ ...newMember, stage: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Practicing Member">Practicing Member</option>
                    <option value="Baptized Member">Baptized Member</option>
                    <option value="New Seeker">New Seeker / Visitor</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Family Hierarchy Link</label>
                  <input
                    type="text"
                    placeholder="e.g. Self (Head) or Head Name"
                    value={newMember.familyHead}
                    onChange={(e) => setNewMember({ ...newMember, familyHead: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Primary Phone *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 00000"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="member@church.org"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  Register Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <User className="text-orange-400" size={18} />
                Believer Profile Record
              </h3>
              <button onClick={() => setSelectedMember(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <h4 className="text-sm font-bold text-white">{selectedMember.name}</h4>
                <p className="text-orange-400 font-mono text-[11px]">{selectedMember.memberId}</p>
                <p className="text-slate-400">{selectedMember.role} • {selectedMember.branch}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-900/60">
                  <span className="text-slate-400 block">Spiritual Stage:</span>
                  <span className="font-bold text-white">{selectedMember.stage}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60">
                  <span className="text-slate-400 block">Family Head:</span>
                  <span className="font-bold text-white">{selectedMember.familyHead}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60">
                  <span className="text-slate-400 block">Phone:</span>
                  <span className="font-bold text-emerald-400">{selectedMember.phone}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60">
                  <span className="text-slate-400 block">Join Date:</span>
                  <span className="font-bold text-white">{selectedMember.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
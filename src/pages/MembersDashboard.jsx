import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Edit2, Trash2, Phone, Mail, 
  Layers, Plus, X, Save, CheckCircle2, Heart, Sparkles,
  Calendar, ShieldCheck, QrCode
} from 'lucide-react';

export default function MembersDashboard() {
  // 1. Load Dynamic Settings Config with Safe Fallbacks[cite: 6, 7]
  const defaultFamilyRoles = [
    { id: 1, roleName: 'Head of Family', isPrimaryHead: true },
    { id: 2, roleName: 'Spouse / Wife / Husband', isPrimaryHead: false },
    { id: 3, roleName: 'Father / Mother', isPrimaryHead: false },
    { id: 4, roleName: 'Son / Daughter', isPrimaryHead: false },
    { id: 5, roleName: 'Grandfather / Grandmother', isPrimaryHead: false },
    { id: 6, roleName: 'Uncle / Aunt', isPrimaryHead: false },
    { id: 7, roleName: 'Brother / Sister', isPrimaryHead: false }
  ];

  const defaultPolicies = [
    { id: 'blood_group', label: 'Blood Group', enabled: true, isMandatory: false },
    { id: 'wedding_anniversary', label: 'Wedding Anniversary Date', enabled: true, isMandatory: false },
    { id: 'baptism_details', label: 'Water Baptism Date & Church', enabled: true, isMandatory: false },
    { id: 'holy_spirit_baptism', label: 'Holy Spirit Baptism Confirmation', enabled: true, isMandatory: false },
    { id: 'emergency_contact', label: 'Emergency Contact Person & Phone', enabled: true, isMandatory: true }
  ];

  const defaultTalents = [
    { id: 1, name: 'Worship Team & Vocals', enabled: true },
    { id: 2, name: 'Instrumentalist (Keyboard / Drums / Guitar)', enabled: true },
    { id: 3, name: 'Sunday School & Kids Ministry', enabled: true },
    { id: 4, name: 'Media, Sound & Live Broadcast', enabled: true },
    { id: 5, name: 'Intercessory Prayer Team', enabled: true }
  ];

  const defaultFamilies = [
    {
      familyId: 'FAM-101',
      familyName: 'David Kumar & Household',
      headMember: {
        memberId: 'CAT-00101',
        name: 'David Kumar',
        roleInFamily: 'Head of Family',
        gender: 'Male',
        dob: '1984-05-12',
        phone: '+91 98765 11223',
        email: 'david.kumar@gmail.com',
        bloodGroup: 'O+',
        campus: 'Main Cathedral HQ',
        baptismDate: '2004-11-15',
        holySpiritBaptism: true,
        weddingAnniversary: '2010-09-18',
        emergencyContact: 'Paul Raj (+91 98765 00001)',
        ministryTalents: ['Worship Team & Vocals', 'Intercessory Prayer Team'],
        status: 'Active'
      },
      members: [
        {
          memberId: 'CAT-00102',
          name: 'Sarah David',
          roleInFamily: 'Spouse / Wife / Husband',
          gender: 'Female',
          dob: '1988-08-22',
          phone: '+91 98765 11224',
          bloodGroup: 'A+',
          baptismDate: '2008-04-10',
          holySpiritBaptism: true,
          ministryTalents: ['Sunday School & Kids Ministry'],
          status: 'Active'
        }
      ]
    }
  ];

  // States with Safe LocalStorage Hydration[cite: 6, 7]
  const [familyRoles] = useState(() => {
    try {
      const saved = localStorage.getItem('app_reg_custom_family_roles_en');
      return saved ? JSON.parse(saved) : defaultFamilyRoles;
    } catch {
      return defaultFamilyRoles;
    }
  });

  const [fieldPolicies] = useState(() => {
    try {
      const saved = localStorage.getItem('app_reg_intake_field_policies_en');
      return saved ? JSON.parse(saved) : defaultPolicies;
    } catch {
      return defaultPolicies;
    }
  });

  const [ministryTalentsList] = useState(() => {
    try {
      const saved = localStorage.getItem('app_reg_ministry_talents_en');
      return saved ? JSON.parse(saved) : defaultTalents;
    } catch {
      return defaultTalents;
    }
  });

  const [families, setFamilies] = useState(() => {
    try {
      const saved = localStorage.getItem('app_members_family_database');
      return saved ? JSON.parse(saved) : defaultFamilies;
    } catch {
      return defaultFamilies;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFamilyId, setExpandedFamilyId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Modals State
  const [isHeadModalOpen, setIsHeadModalOpen] = useState(false);
  const [editingFamilyId, setEditingFamilyId] = useState(null);

  const [isSubMemberModalOpen, setIsSubMemberModalOpen] = useState(false);
  const [targetFamilyForSubMember, setTargetFamilyForSubMember] = useState(null);

  // Form States[cite: 6]
  const [headForm, setHeadForm] = useState({
    name: '',
    gender: 'Male',
    dob: '',
    phone: '',
    email: '',
    campus: 'Main Cathedral HQ',
    bloodGroup: 'O+',
    weddingAnniversary: '',
    baptismDate: '',
    holySpiritBaptism: false,
    emergencyContact: '',
    ministryTalents: []
  });

  const [subMemberForm, setSubMemberForm] = useState({
    name: '',
    roleInFamily: 'Son / Daughter',
    gender: 'Female',
    dob: '',
    phone: '',
    bloodGroup: 'O+',
    baptismDate: '',
    holySpiritBaptism: false,
    ministryTalents: []
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const isFieldEnabled = (fieldId) => {
    const policy = fieldPolicies.find(p => p.id === fieldId);
    return policy ? policy.enabled : true;
  };

  const isFieldMandatory = (fieldId) => {
    const policy = fieldPolicies.find(p => p.id === fieldId);
    return policy ? policy.isMandatory : false;
  };

  const handleToggleExpand = (fId) => {
    setExpandedFamilyId(expandedFamilyId === fId ? null : fId);
  };

  // Open Head Modal[cite: 6]
  const handleOpenHeadModal = (family = null) => {
    if (family) {
      setEditingFamilyId(family.familyId);
      setHeadForm({
        ...family.headMember,
        ministryTalents: family.headMember?.ministryTalents || []
      });
    } else {
      setEditingFamilyId(null);
      setHeadForm({
        name: '',
        gender: 'Male',
        dob: '',
        phone: '',
        email: '',
        campus: 'Main Cathedral HQ',
        bloodGroup: 'O+',
        weddingAnniversary: '',
        baptismDate: '',
        holySpiritBaptism: false,
        emergencyContact: '',
        ministryTalents: []
      });
    }
    setIsHeadModalOpen(true);
  };

  // Save Head[cite: 6]
  const handleSaveHead = (e) => {
    e.preventDefault();
    if (!headForm.name.trim() || !headForm.phone.trim()) return;

    let updatedFamilies;
    if (editingFamilyId) {
      updatedFamilies = families.map(f => {
        if (f.familyId === editingFamilyId) {
          return {
            ...f,
            familyName: `${headForm.name} & Household`,
            headMember: { ...f.headMember, ...headForm }
          };
        }
        return f;
      });
      showToast('Family Head record updated successfully!');
    } else {
      const nextIdNum = families.length + 101;
      const newFamily = {
        familyId: `FAM-${nextIdNum}`,
        familyName: `${headForm.name} & Household`,
        headMember: {
          ...headForm,
          memberId: `CAT-00${nextIdNum}`,
          roleInFamily: 'Head of Family',
          status: 'Active'
        },
        members: []
      };
      updatedFamilies = [newFamily, ...families];
      showToast('New Believer Family registered successfully!');
    }

    setFamilies(updatedFamilies);
    localStorage.setItem('app_members_family_database', JSON.stringify(updatedFamilies));
    setIsHeadModalOpen(false);
  };

  // Open Add Sub-Member[cite: 6]
  const handleOpenAddSubMember = (family) => {
    setTargetFamilyForSubMember(family);
    setSubMemberForm({
      name: '',
      roleInFamily: familyRoles.find(r => !r.isPrimaryHead)?.roleName || 'Son / Daughter',
      gender: 'Female',
      dob: '',
      phone: '',
      bloodGroup: 'O+',
      baptismDate: '',
      holySpiritBaptism: false,
      ministryTalents: []
    });
    setIsSubMemberModalOpen(true);
  };

  // Save Sub-Member[cite: 6]
  const handleSaveSubMember = (e) => {
    e.preventDefault();
    if (!subMemberForm.name.trim() || !targetFamilyForSubMember) return;

    const newSubMember = {
      ...subMemberForm,
      memberId: `CAT-${Date.now().toString().slice(-5)}`,
      status: 'Active'
    };

    const updatedFamilies = families.map(f => {
      if (f.familyId === targetFamilyForSubMember.familyId) {
        return {
          ...f,
          members: [...(f.members || []), newSubMember]
        };
      }
      return f;
    });

    setFamilies(updatedFamilies);
    localStorage.setItem('app_members_family_database', JSON.stringify(updatedFamilies));
    setExpandedFamilyId(targetFamilyForSubMember.familyId);
    setIsSubMemberModalOpen(false);
    showToast(`Added ${newSubMember.name} to family!`);
  };

  // Delete Handlers[cite: 6]
  const handleDeleteFamily = (familyId) => {
    if (window.confirm("Are you sure you want to delete this family record?")) {
      const updated = families.filter(f => f.familyId !== familyId);
      setFamilies(updated);
      localStorage.setItem('app_members_family_database', JSON.stringify(updated));
      showToast('Family record removed.');
    }
  };

  const handleDeleteSubMember = (familyId, memberId) => {
    if (window.confirm("Remove this member from the family unit?")) {
      const updated = families.map(f => {
        if (f.familyId === familyId) {
          return {
            ...f,
            members: (f.members || []).filter(m => m.memberId !== memberId)
          };
        }
        return f;
      });
      setFamilies(updated);
      localStorage.setItem('app_members_family_database', JSON.stringify(updated));
      showToast('Member removed from family.');
    }
  };

  const filteredFamilies = (families || []).filter(f => {
    const q = (searchQuery || '').toLowerCase();
    const headName = f.headMember?.name?.toLowerCase() || '';
    const headPhone = f.headMember?.phone || '';
    const headId = f.headMember?.memberId?.toLowerCase() || '';
    const matchesHead = headName.includes(q) || headPhone.includes(q) || headId.includes(q);
    const matchesMembers = (f.members || []).some(m => (m?.name?.toLowerCase() || '').includes(q) || (m?.memberId?.toLowerCase() || '').includes(q));
    return matchesHead || matchesMembers;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      {/* Toast Notification[cite: 6] */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-5 py-3 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Card[cite: 6] */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Users className="text-orange-400" size={24} />
              <span>Church Believers & Family Directory</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Manage household head profiles, expanded family trees, ministry talents, and digital membership badges
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenHeadModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(255,107,0,0.45)] border border-white/20 cursor-pointer transition-all active:scale-95 shrink-0"
          >
            <UserPlus size={16} />
            <span>+ Register New Believer Family</span>
          </button>
        </div>

        {/* Search & Counters[cite: 6] */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by Name, Phone, or CAT ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/70 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto">
            <div className="px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2 shrink-0">
              <span className="text-slate-400 text-xs font-medium">Families:</span>
              <span className="text-orange-400 text-xs font-bold font-mono">{families.length}</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-2 shrink-0">
              <span className="text-slate-400 text-xs font-medium">Total Believers:</span>
              <span className="text-emerald-400 text-xs font-bold font-mono">
                {families.reduce((acc, f) => acc + 1 + (f.members?.length || 0), 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Members Directory Table[cite: 6] */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                <th className="p-3.5 w-12 text-center">Tree</th>
                <th className="p-3.5">Family Head Identity</th>
                <th className="p-3.5">Family Bundle</th>
                <th className="p-3.5">Contact Line</th>
                <th className="p-3.5">Campus</th>
                <th className="p-3.5">Talents & Ministry</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Family Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredFamilies.map((fam) => {
                const isExpanded = expandedFamilyId === fam.familyId;
                const head = fam.headMember || {};
                const subMembers = fam.members || [];

                return (
                  <React.Fragment key={fam.familyId}>
                    {/* PRIMARY ROW: FAMILY HEAD[cite: 6] */}
                    <tr className={`transition-colors ${isExpanded ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}>
                      <td className="p-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleExpand(fam.familyId)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isExpanded
                              ? 'bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] text-white shadow-[0_0_12px_rgba(255,107,0,0.5)] border-white/20'
                              : 'bg-slate-800/80 hover:bg-slate-700 text-orange-400 border-white/10'
                          }`}
                          title="Expand/Collapse Family Tree"
                        >
                          <Layers size={14} className={isExpanded ? 'rotate-90 transition-transform' : ''} />
                        </button>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-white text-xs flex items-center gap-1.5">
                          <span>{head.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[9px] font-bold uppercase tracking-wider border border-orange-500/30">
                            Family Head
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          ID: <span className="text-orange-400">{head.memberId}</span> • {head.gender}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300">
                          <Users size={11} className="text-orange-400" />
                          <span>1 Head + {subMembers.length} Members</span>
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-mono text-slate-300">{head.phone}</div>
                        {head.email && <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{head.email}</div>}
                      </td>

                      <td className="p-3.5 text-slate-300 text-xs">{head.campus || 'Main Cathedral HQ'}</td>

                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {head.ministryTalents && head.ministryTalents.length > 0 ? (
                            head.ministryTalents.map((t, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[9px] font-medium">
                                {t}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-[10px]">No talents</span>
                          )}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>Active</span>
                        </span>
                      </td>

                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenAddSubMember(fam)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500/15 to-rose-500/15 hover:from-orange-500/30 hover:to-rose-500/30 text-orange-300 border border-orange-500/30 text-[10px] font-bold cursor-pointer"
                            title="Add Family Member"
                          >
                            <Plus size={12} />
                            <span>+ Member</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenHeadModal(fam)}
                            className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 cursor-pointer"
                          >
                            <Edit2 size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteFamily(fam.familyId)}
                            className="p-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* EXPANDED SUB-TREE ROW[cite: 6] */}
                    {isExpanded && (
                      <tr className="bg-[#0b0f19]/80 animate-fadeIn">
                        <td colSpan={8} className="p-4 pl-12">
                          <div className="p-4 rounded-2xl bg-white/[0.02] border border-orange-500/20 shadow-[inset_0_0_20px_rgba(255,107,0,0.05)] space-y-3">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                              <h4 className="text-xs font-bold text-orange-400 flex items-center gap-2">
                                <Users size={14} />
                                <span>Household Family Tree for {head.name} ({subMembers.length} Members)</span>
                              </h4>

                              <button
                                type="button"
                                onClick={() => handleOpenAddSubMember(fam)}
                                className="text-xs font-bold text-orange-300 hover:text-white flex items-center gap-1 cursor-pointer"
                              >
                                <Plus size={13} />
                                <span>Add Another Member</span>
                              </button>
                            </div>

                            {subMembers.length === 0 ? (
                              <p className="text-xs text-slate-500 italic py-2">
                                No additional family members registered yet under this household. Click "+ Member" to add spouse or children.
                              </p>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {subMembers.map((member) => (
                                  <div
                                    key={member.memberId}
                                    className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-start justify-between gap-2 hover:border-orange-500/30 transition-all"
                                  >
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <h5 className="text-xs font-bold text-white">{member.name}</h5>
                                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] text-orange-300 font-semibold">
                                          {member.roleInFamily}
                                        </span>
                                      </div>

                                      <div className="text-[10px] text-slate-400 font-mono">
                                        ID: {member.memberId} • Blood: {member.bloodGroup || 'N/A'}
                                      </div>

                                      {member.phone && (
                                        <div className="text-[10px] text-slate-400 font-mono">
                                          Phone: {member.phone}
                                        </div>
                                      )}
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleDeleteSubMember(fam.familyId, member.memberId)}
                                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                                      title="Remove from Family"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: REGISTER / EDIT FAMILY HEAD[cite: 6] */}
      {isHeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="text-orange-400" size={18} />
                {editingFamilyId ? 'Edit Family Head Profile' : 'Register New Believer & Household Unit'}
              </h3>
              <button onClick={() => setIsHeadModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveHead} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="text-xs text-slate-300 font-medium">Head of Family Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Kumar"
                    value={headForm.name}
                    onChange={(e) => setHeadForm({ ...headForm, name: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Primary Mobile Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={headForm.phone}
                    onChange={(e) => setHeadForm({ ...headForm, phone: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="member@gmail.com"
                    value={headForm.email}
                    onChange={(e) => setHeadForm({ ...headForm, email: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Gender</label>
                  <select
                    value={headForm.gender}
                    onChange={(e) => setHeadForm({ ...headForm, gender: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Date of Birth</label>
                  <input
                    type="date"
                    value={headForm.dob}
                    onChange={(e) => setHeadForm({ ...headForm, dob: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Policy-driven Intake Fields[cite: 6, 7] */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  Configured Intake Questions
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {isFieldEnabled('blood_group') && (
                    <div>
                      <label className="text-xs text-slate-300 font-medium">Blood Group</label>
                      <select
                        value={headForm.bloodGroup}
                        onChange={(e) => setHeadForm({ ...headForm, bloodGroup: e.target.value })}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                      >
                        {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {isFieldEnabled('wedding_anniversary') && (
                    <div>
                      <label className="text-xs text-slate-300 font-medium">Wedding Anniversary Date</label>
                      <input
                        type="date"
                        value={headForm.weddingAnniversary}
                        onChange={(e) => setHeadForm({ ...headForm, weddingAnniversary: e.target.value })}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                      />
                    </div>
                  )}

                  {isFieldEnabled('baptism_details') && (
                    <div>
                      <label className="text-xs text-slate-300 font-medium">Water Baptism Date</label>
                      <input
                        type="date"
                        value={headForm.baptismDate}
                        onChange={(e) => setHeadForm({ ...headForm, baptismDate: e.target.value })}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                      />
                    </div>
                  )}

                  {isFieldEnabled('emergency_contact') && (
                    <div>
                      <label className="text-xs text-slate-300 font-medium">
                        Emergency Contact Person & Phone {isFieldMandatory('emergency_contact') ? '*' : ''}
                      </label>
                      <input
                        type="text"
                        required={isFieldMandatory('emergency_contact')}
                        placeholder="e.g. Paul (+91 98765 00000)"
                        value={headForm.emergencyContact}
                        onChange={(e) => setHeadForm({ ...headForm, emergencyContact: e.target.value })}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                      />
                    </div>
                  )}

                  {isFieldEnabled('holy_spirit_baptism') && (
                    <div className="md:col-span-2 pt-1">
                      <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={headForm.holySpiritBaptism}
                          onChange={(e) => setHeadForm({ ...headForm, holySpiritBaptism: e.target.checked })}
                          className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                        />
                        <span>Received Holy Spirit Baptism & Anointing Confirmation</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Ministry Talents[cite: 6, 7] */}
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-medium block">
                  Ministry Talents & Placement Preferences
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-900/60 rounded-xl border border-white/5">
                  {(ministryTalentsList || []).filter(t => t?.enabled).map(t => {
                    const isSelected = (headForm.ministryTalents || []).includes(t.name);
                    return (
                      <label key={t.id} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            const updated = isSelected 
                              ? (headForm.ministryTalents || []).filter(x => x !== t.name)
                              : [...(headForm.ministryTalents || []), t.name];
                            setHeadForm({ ...headForm, ministryTalents: updated });
                          }}
                          className="w-3.5 h-3.5 accent-orange-500 rounded"
                        />
                        <span className="truncate">{t.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsHeadModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer"
                >
                  {editingFamilyId ? 'Update Family Head' : 'Save Household'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD SUB-FAMILY MEMBER[cite: 6] */}
      {isSubMemberModalOpen && targetFamilyForSubMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="text-orange-400" size={18} />
                  Add Family Member
                </h3>
                <p className="text-[11px] text-slate-400">
                  Adding to: <strong className="text-orange-400">{targetFamilyForSubMember.familyName}</strong>
                </p>
              </div>
              <button onClick={() => setIsSubMemberModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSubMember} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Member Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah David / Joshua"
                  value={subMemberForm.name}
                  onChange={(e) => setSubMemberForm({ ...subMemberForm, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Relationship to Head *</label>
                  <select
                    value={subMemberForm.roleInFamily}
                    onChange={(e) => setSubMemberForm({ ...subMemberForm, roleInFamily: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer font-bold"
                  >
                    {(familyRoles || []).filter(r => !r.isPrimaryHead).map(r => (
                      <option key={r.id} value={r.roleName}>{r.roleName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Gender</label>
                  <select
                    value={subMemberForm.gender}
                    onChange={(e) => setSubMemberForm({ ...subMemberForm, gender: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Contact Phone (Optional)</label>
                  <input
                    type="text"
                    placeholder="+91 98765 00000"
                    value={subMemberForm.phone}
                    onChange={(e) => setSubMemberForm({ ...subMemberForm, phone: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Date of Birth</label>
                  <input
                    type="date"
                    value={subMemberForm.dob}
                    onChange={(e) => setSubMemberForm({ ...subMemberForm, dob: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsSubMemberModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer"
                >
                  Add to Family
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
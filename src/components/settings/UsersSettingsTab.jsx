import React, { useState } from 'react';
import { 
  Users, UserCheck, ShieldAlert, Plus, Search, Edit2, 
  Trash2, X, Check, KeyRound, Mail, Phone, GitBranch, 
  Shield, Briefcase, Calendar, UserCog, CheckCircle2, Save
} from 'lucide-react';

export default function UsersSettingsTab({ onTriggerSuccess }) {
  // 1. Portal Users State with LocalStorage Sync
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('app_portal_users_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, name: 'Rev. Senior Pastor', email: 'seniorpastor@nopesearch.org', phone: '+91 98765 43210', role: 'Super Admin', branchAccess: 'All Branches (HQ)', status: 'Active', lastActive: 'Just now' },
      { id: 2, name: 'Pastor Assistant A', email: 'pastora@nopesearch.org', phone: '+91 98765 00001', role: 'Branch Pastor', branchAccess: 'Koduvai Town Branch', status: 'Active', lastActive: '2 hours ago' },
      { id: 3, name: 'Bro. David (Finance Lead)', email: 'accounts@nopesearch.org', phone: '+91 98765 11111', role: 'Accountant', branchAccess: 'All Branches (HQ)', status: 'Active', lastActive: 'Yesterday' },
      { id: 4, name: 'Sis. Sarah (Media & PR)', email: 'media@nopesearch.org', phone: '+91 98765 22222', role: 'Media Leader', branchAccess: 'All Branches (HQ)', status: 'Active', lastActive: '3 days ago' }
    ];
  });

  // 2. Church Staff Directory State
  const [staffList, setStaffList] = useState(() => {
    const saved = localStorage.getItem('app_church_staff_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 101, staffId: 'STF-001', name: 'Rev. Senior Pastor', designation: 'Senior Pastor', department: 'Pastoral Care & Ministry', employmentType: 'Full-Time', branch: 'Nope Search Main Cathedral', phone: '+91 98765 43210', email: 'pastor@church.org', joinDate: '2015-01-10', status: 'Active' },
      { id: 102, staffId: 'STF-002', name: 'Pastor Assistant A', designation: 'Associate Pastor', department: 'Pastoral Care & Ministry', employmentType: 'Full-Time', branch: 'Koduvai Town Branch', phone: '+91 98765 00001', email: 'pastora@church.org', joinDate: '2018-06-15', status: 'Active' },
      { id: 103, staffId: 'STF-003', name: 'Bro. David', designation: 'Chief Accountant & Admin', department: 'Accounts & Finance', employmentType: 'Full-Time', branch: 'Nope Search Main Cathedral', phone: '+91 98765 11111', email: 'david@church.org', joinDate: '2020-03-01', status: 'Active' },
      { id: 104, staffId: 'STF-004', name: 'Sis. Sarah', designation: 'Media & Streaming Engineer', department: 'Media, Sound & IT', employmentType: 'Part-Time', branch: 'Nope Search Main Cathedral', phone: '+91 98765 22222', email: 'sarah@church.org', joinDate: '2022-08-12', status: 'Active' }
    ];
  });

  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Ministry Staff',
    branchAccess: 'All Branches (HQ)',
    status: 'Active',
    password: ''
  });

  const [staffSearch, setStaffSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [staffForm, setStaffForm] = useState({
    staffId: '',
    name: '',
    designation: '',
    department: 'Pastoral Care & Ministry',
    employmentType: 'Full-Time',
    branch: 'Nope Search Main Cathedral',
    phone: '',
    email: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Active'
  });

  // Master Save Handler
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_portal_users_list', JSON.stringify(usersList));
    localStorage.setItem('app_church_staff_list', JSON.stringify(staffList));
    onTriggerSuccess?.('Users, Administrator accounts & Staff records saved successfully!');
  };

  // User Actions
  const handleOpenUserModal = (user = null) => {
    if (user) {
      setEditingUserId(user.id);
      setUserForm({ ...user, password: '' });
    } else {
      setEditingUserId(null);
      setUserForm({
        name: '',
        email: '',
        phone: '',
        role: 'Ministry Staff',
        branchAccess: 'All Branches (HQ)',
        status: 'Active',
        password: ''
      });
    }
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.email.trim()) return;

    let updatedUsers;
    if (editingUserId) {
      updatedUsers = usersList.map(u => u.id === editingUserId ? { ...u, ...userForm } : u);
      onTriggerSuccess?.('User account updated successfully!');
    } else {
      const newUser = {
        ...userForm,
        id: Date.now(),
        lastActive: 'Never'
      };
      updatedUsers = [...usersList, newUser];
      onTriggerSuccess?.('New Portal User / Admin created successfully!');
    }

    setUsersList(updatedUsers);
    localStorage.setItem('app_portal_users_list', JSON.stringify(updatedUsers));
    setIsUserModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this administrator account?")) {
      const updated = usersList.filter(u => u.id !== id);
      setUsersList(updated);
      localStorage.setItem('app_portal_users_list', JSON.stringify(updated));
      onTriggerSuccess?.('User account removed.');
    }
  };

  const handleToggleUserStatus = (id) => {
    const updated = usersList.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        onTriggerSuccess?.(`User status changed to ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    setUsersList(updated);
    localStorage.setItem('app_portal_users_list', JSON.stringify(updated));
  };

  // Staff Actions
  const handleOpenStaffModal = (staff = null) => {
    if (staff) {
      setEditingStaffId(staff.id);
      setStaffForm({ ...staff });
    } else {
      setEditingStaffId(null);
      setStaffForm({
        staffId: `STF-${String(staffList.length + 1).padStart(3, '0')}`,
        name: '',
        designation: '',
        department: 'Pastoral Care & Ministry',
        employmentType: 'Full-Time',
        branch: 'Nope Search Main Cathedral',
        phone: '',
        email: '',
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      });
    }
    setIsStaffModalOpen(true);
  };

  const handleSaveStaff = (e) => {
    e.preventDefault();
    if (!staffForm.name.trim() || !staffForm.designation.trim()) return;

    let updatedStaff;
    if (editingStaffId) {
      updatedStaff = staffList.map(s => s.id === editingStaffId ? { ...s, ...staffForm } : s);
      onTriggerSuccess?.('Staff profile updated successfully!');
    } else {
      const newStaff = { ...staffForm, id: Date.now() };
      updatedStaff = [...staffList, newStaff];
      onTriggerSuccess?.('New Staff Member registered successfully!');
    }

    setStaffList(updatedStaff);
    localStorage.setItem('app_church_staff_list', JSON.stringify(updatedStaff));
    setIsStaffModalOpen(false);
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm("Are you sure you want to remove this staff profile?")) {
      const updated = staffList.filter(s => s.id !== id);
      setStaffList(updated);
      localStorage.setItem('app_church_staff_list', JSON.stringify(updated));
      onTriggerSuccess?.('Staff record removed.');
    }
  };

  const handleToggleStaffStatus = (id) => {
    const updated = staffList.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'On Leave' : 'Active';
        onTriggerSuccess?.(`Staff status updated to ${nextStatus}`);
        return { ...s, status: nextStatus };
      }
      return s;
    });
    setStaffList(updated);
    localStorage.setItem('app_church_staff_list', JSON.stringify(updated));
  };

  const filteredUsers = usersList
    .filter(u => roleFilter === 'all' || u.role === roleFilter)
    .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()));

  const filteredStaff = staffList
    .filter(s => departmentFilter === 'all' || s.department === departmentFilter)
    .filter(s => s.name.toLowerCase().includes(staffSearch.toLowerCase()) || s.designation.toLowerCase().includes(staffSearch.toLowerCase()) || s.staffId.toLowerCase().includes(staffSearch.toLowerCase()));

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      
      {/* Top Header Actions */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSaveAll}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 active:scale-95 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer transition-all"
        >
          <Save size={15} />
          <span>Save Users & Staff Settings</span>
        </button>
      </div>

      {/* BOX 1: PORTAL USERS & ADMIN ACCOUNTS */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserCog className="text-orange-400" size={22} />
              Portal Users & Administrator Accounts
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage authorized dashboard accounts, assign system roles, and campus access
            </p>
          </div>

          <button
            onClick={() => handleOpenUserModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
          >
            <Plus size={15} />
            <span>+ Add / Invite Admin</span>
          </button>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Users' },
              { id: 'Super Admin', label: 'Super Admins' },
              { id: 'Branch Pastor', label: 'Pastors' },
              { id: 'Accountant', label: 'Finance' },
              { id: 'Media Leader', label: 'Media' },
              { id: 'Ministry Staff', label: 'Staff' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  roleFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full bg-slate-900/70 border border-white/10 rounded-2xl pl-9 pr-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                <th className="p-3.5">User Identity</th>
                <th className="p-3.5">Portal Role</th>
                <th className="p-3.5">Campus Access</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Last Active</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-white text-xs flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {user.role === 'Super Admin' && (
                        <ShieldAlert size={12} className="text-rose-400" title="Super Administrator" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{user.email} • {user.phone}</div>
                  </td>

                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      user.role === 'Super Admin'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : user.role === 'Branch Pastor'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : user.role === 'Accountant'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="p-3.5 text-slate-300 text-xs">
                    <div className="flex items-center gap-1.5">
                      <GitBranch size={12} className="text-orange-400 shrink-0" />
                      <span>{user.branchAccess}</span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <button
                      onClick={() => handleToggleUserStatus(user.id)}
                      className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                        user.status === 'Active'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                      title="Click to toggle status"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                      <span>{user.status}</span>
                    </button>
                  </td>

                  <td className="p-3.5 text-slate-400 font-mono text-[11px]">{user.lastActive}</td>

                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenUserModal(user)}
                        className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                        title="Edit User"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                        title="Delete User"
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

      {/* BOX 2: CHURCH STAFF & PERSONNEL DIRECTORY */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="text-orange-400" size={22} />
              Church Staff & Personnel Directory
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage salaried ministers, administrators, media crew, and facility personnel
            </p>
          </div>

          <button
            onClick={() => handleOpenStaffModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
          >
            <Plus size={15} />
            <span>+ Add Staff Member</span>
          </button>
        </div>

        {/* Staff Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Departments' },
              { id: 'Pastoral Care & Ministry', label: 'Pastoral Team' },
              { id: 'Accounts & Finance', label: 'Accounts' },
              { id: 'Media, Sound & IT', label: 'Media & Tech' },
              { id: 'Maintenance & Facilities', label: 'Maintenance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDepartmentFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  departmentFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search staff name, role, ID..."
              value={staffSearch}
              onChange={(e) => setStaffSearch(e.target.value)}
              className="w-full bg-slate-900/70 border border-white/10 rounded-2xl pl-9 pr-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Staff Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                <th className="p-3.5">Staff Identity</th>
                <th className="p-3.5">Department & Type</th>
                <th className="p-3.5">Assigned Campus</th>
                <th className="p-3.5">Contact Line</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-white text-xs">{staff.name}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-0.5">
                      <span className="text-orange-400">{staff.staffId}</span>
                      <span>•</span>
                      <span>{staff.designation}</span>
                    </div>
                  </td>

                  <td className="p-3.5 space-y-0.5">
                    <div className="text-slate-200 font-medium">{staff.department}</div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] text-slate-400 uppercase font-semibold">
                      {staff.employmentType}
                    </span>
                  </td>

                  <td className="p-3.5 text-slate-300 text-xs">
                    <div className="flex items-center gap-1.5">
                      <GitBranch size={12} className="text-orange-400 shrink-0" />
                      <span>{staff.branch}</span>
                    </div>
                  </td>

                  <td className="p-3.5 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Phone size={12} />
                      <span>{staff.phone}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{staff.email}</div>
                  </td>

                  <td className="p-3.5">
                    <button
                      onClick={() => handleToggleStaffStatus(staff.id)}
                      className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                        staff.status === 'Active'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                      title="Click to toggle status"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      <span>{staff.status}</span>
                    </button>
                  </td>

                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenStaffModal(staff)}
                        className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                        title="Edit Staff"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(staff.id)}
                        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                        title="Delete Staff"
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

      {/* USER MODAL */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="text-orange-400" size={18} />
                {editingUserId ? 'Edit Administrator Account' : 'Add New Administrator / Staff Account'}
              </h3>
              <button onClick={() => setIsUserModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pastor David Kumar"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Login Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="david@church.org"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 00000"
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Portal Access Role *</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Super Admin">Super Admin (Full HQ Access)</option>
                    <option value="Branch Pastor">Branch Pastor</option>
                    <option value="Accountant">Accountant (Finance Lead)</option>
                    <option value="Media Leader">Media Leader</option>
                    <option value="Ministry Staff">Ministry Staff</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Campus / Branch Access</label>
                  <select
                    value={userForm.branchAccess}
                    onChange={(e) => setUserForm({ ...userForm, branchAccess: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="All Branches (HQ)">All Branches (HQ)</option>
                    <option value="Koduvai Town Branch">Koduvai Town Branch</option>
                    <option value="Kangeyam City Branch">Kangeyam City Branch</option>
                  </select>
                </div>
              </div>

              {!editingUserId && (
                <div>
                  <label className="text-xs text-slate-300 font-medium">Default Password</label>
                  <input
                    type="password"
                    placeholder="Enter default login password..."
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  {editingUserId ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STAFF MODAL */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="text-orange-400" size={18} />
                {editingStaffId ? 'Edit Staff Profile' : 'Register New Staff Personnel'}
              </h3>
              <button onClick={() => setIsStaffModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Staff ID *</label>
                  <input
                    type="text"
                    required
                    value={staffForm.staffId}
                    onChange={(e) => setStaffForm({ ...staffForm, staffId: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-slate-300 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bro. David"
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Designation / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Associate Pastor..."
                    value={staffForm.designation}
                    onChange={(e) => setStaffForm({ ...staffForm, designation: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Department</label>
                  <select
                    value={staffForm.department}
                    onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Pastoral Care & Ministry">Pastoral Care & Ministry</option>
                    <option value="Accounts & Finance">Accounts & Finance</option>
                    <option value="Media, Sound & IT">Media, Sound & IT</option>
                    <option value="Administration & Office">Administration & Office</option>
                    <option value="Maintenance & Facilities">Maintenance & Facilities</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Employment Type</label>
                  <select
                    value={staffForm.employmentType}
                    onChange={(e) => setStaffForm({ ...staffForm, employmentType: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Honorarium / Voluntary">Honorarium / Voluntary</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Campus Assignment</label>
                  <select
                    value={staffForm.branch}
                    onChange={(e) => setStaffForm({ ...staffForm, branch: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Nope Search Main Cathedral">Nope Search Main Cathedral</option>
                    <option value="Koduvai Town Branch">Koduvai Town Branch</option>
                    <option value="Kangeyam City Branch">Kangeyam City Branch</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Primary Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98765 00000"
                    value={staffForm.phone}
                    onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Official Email</label>
                  <input
                    type="email"
                    placeholder="staff@church.org"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsStaffModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  {editingStaffId ? 'Update Staff Profile' : 'Register Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
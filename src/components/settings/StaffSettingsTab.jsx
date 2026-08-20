import React, { useState } from 'react';
import { 
  UserCheck, Plus, Search, Edit2, Trash2, X, Check,
  Mail, Phone, GitBranch, Briefcase, Calendar, ShieldCheck
} from 'lucide-react';

export default function StaffSettingsTab({ onTriggerSuccess }) {
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      staffId: 'STF-001',
      name: 'Rev. Senior Pastor',
      designation: 'Senior Pastor',
      department: 'Pastoral Care & Ministry',
      employmentType: 'Full-Time',
      branch: 'Nope Search Main Cathedral',
      phone: '+91 98765 43210',
      email: 'pastor@church.org',
      joinDate: '2015-01-10',
      status: 'Active'
    },
    {
      id: 2,
      staffId: 'STF-002',
      name: 'Pastor Assistant A',
      designation: 'Associate Pastor',
      department: 'Pastoral Care & Ministry',
      employmentType: 'Full-Time',
      branch: 'Koduvai Town Branch',
      phone: '+91 98765 00001',
      email: 'pastora@church.org',
      joinDate: '2018-06-15',
      status: 'Active'
    },
    {
      id: 3,
      staffId: 'STF-003',
      name: 'Bro. David',
      designation: 'Chief Accountant & Admin',
      department: 'Accounts & Finance',
      employmentType: 'Full-Time',
      branch: 'Nope Search Main Cathedral',
      phone: '+91 98765 11111',
      email: 'david@church.org',
      joinDate: '2020-03-01',
      status: 'Active'
    },
    {
      id: 4,
      staffId: 'STF-004',
      name: 'Sis. Sarah',
      designation: 'Media & Streaming Engineer',
      department: 'Media, Sound & IT',
      employmentType: 'Part-Time',
      branch: 'Nope Search Main Cathedral',
      phone: '+91 98765 22222',
      email: 'sarah@church.org',
      joinDate: '2022-08-12',
      status: 'Active'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = (staff = null) => {
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
    setIsModalOpen(true);
  };

  const handleSaveStaff = (e) => {
    e.preventDefault();
    if (!staffForm.name.trim() || !staffForm.designation.trim()) return;

    if (editingStaffId) {
      setStaffList(staffList.map(s => s.id === editingStaffId ? { ...s, ...staffForm } : s));
      onTriggerSuccess('Staff profile updated successfully!');
    } else {
      setStaffList([...staffList, { ...staffForm, id: Date.now() }]);
      onTriggerSuccess('New Staff Member registered successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm("Are you sure you want to remove this staff profile?")) {
      setStaffList(staffList.filter(s => s.id !== id));
      onTriggerSuccess('Staff record removed.');
    }
  };

  const handleToggleStatus = (id) => {
    setStaffList(staffList.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'On Leave' : 'Active';
        onTriggerSuccess(`Staff status updated to ${nextStatus}`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const filteredStaff = staffList
    .filter(s => departmentFilter === 'all' || s.department === departmentFilter)
    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.designation.toLowerCase().includes(searchQuery.toLowerCase()) || s.staffId.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Main Staff Card */}
      <div className="glass-card rounded-3xl p-8 space-y-6">
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
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
          >
            <Plus size={15} />
            <span>+ Add Staff Member</span>
          </button>
        </div>

        {/* Search & Department Filters */}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/70 border border-white/10 rounded-2xl pl-9 pr-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Directory Table */}
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
                      onClick={() => handleToggleStatus(staff.id)}
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
                        onClick={() => handleOpenModal(staff)}
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

      {/* Add / Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="text-orange-400" size={18} />
                {editingStaffId ? 'Edit Staff Profile' : 'Register New Staff Personnel'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
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
                  onClick={() => setIsModalOpen(false)}
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
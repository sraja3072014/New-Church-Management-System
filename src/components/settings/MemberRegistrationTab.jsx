import React, { useState } from 'react';
import { 
  UserPlus, Check, X, Save, Plus, Edit2, Trash2, Sliders, 
  Users, Heart, Sparkles, Award, GitBranch, Calendar, ShieldCheck
} from 'lucide-react';

export default function MemberRegistrationTab({ onTriggerSuccess }) {
  // 1. Core Registration Automation Configuration
  const [formConfig, setFormConfig] = useState(() => {
    const saved = localStorage.getItem('app_member_registration_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      requirePhoneVerification: true,
      autoGenerateMemberId: true,
      memberIdPrefix: 'CAT',
      allowOnlineSelfRegistration: true,
      notifyPastorOnNewRegistration: true,
      enableFamilyGrouping: true,
      captureMinistryTalents: true
    };
  });

  // 2. Pure Clean English Family Relationships List
  const [familyRoles, setFamilyRoles] = useState(() => {
    const saved = localStorage.getItem('app_reg_custom_family_roles_en');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, roleName: 'Head of Family', isPrimaryHead: true },
      { id: 2, roleName: 'Spouse / Wife', isPrimaryHead: false },
      { id: 3, roleName: 'Son', isPrimaryHead: false },
      { id: 4, roleName: 'Daughter', isPrimaryHead: false },
      { id: 5, roleName: 'Father', isPrimaryHead: false },
      { id: 6, roleName: 'Mother', isPrimaryHead: false },
      { id: 7, roleName: 'Grandfather', isPrimaryHead: false },
      { id: 8, roleName: 'Grandmother', isPrimaryHead: false },
      { id: 9, roleName: 'Uncle', isPrimaryHead: false },
      { id: 10, roleName: 'Aunt', isPrimaryHead: false },
      { id: 11, roleName: 'Brother', isPrimaryHead: false },
      { id: 12, roleName: 'Sister', isPrimaryHead: false },
      { id: 13, roleName: 'Brother-in-law', isPrimaryHead: false },
      { id: 14, roleName: 'Sister-in-law', isPrimaryHead: false },
      { id: 15, roleName: 'Guardian', isPrimaryHead: false },
      { id: 16, roleName: 'Dependent', isPrimaryHead: false }
    ];
  });

  // 3. Intake Question Fields Policy (English Only with Glowing UI Controls)
  const [intakeFieldPolicies, setIntakeFieldPolicies] = useState(() => {
    const saved = localStorage.getItem('app_reg_intake_field_policies_en');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'blood_group', label: 'Blood Group', fieldType: 'Dropdown', enabled: true, isMandatory: false },
      { id: 'wedding_anniversary', label: 'Wedding Anniversary Date', fieldType: 'Date Picker', enabled: true, isMandatory: false },
      { id: 'baptism_details', label: 'Water Baptism Date & Church', fieldType: 'Date & Text', enabled: true, isMandatory: false },
      { id: 'holy_spirit_baptism', label: 'Holy Spirit Baptism Confirmation', fieldType: 'Yes / No Checkbox', enabled: true, isMandatory: false },
      { id: 'emergency_contact', label: 'Emergency Contact Person & Phone', fieldType: 'Phone & Name', enabled: true, isMandatory: true },
      { id: 'occupation_profession', label: 'Occupation & Professional Background', fieldType: 'Text Box', enabled: true, isMandatory: false },
      { id: 'previous_church', label: 'Previous Church / Denomination Background', fieldType: 'Text Box', enabled: false, isMandatory: false }
    ];
  });

  // 4. Ministry Interests & Talents (Clean English)
  const [ministryTalents, setMinistryTalents] = useState(() => {
    const saved = localStorage.getItem('app_reg_ministry_talents_en');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, name: 'Worship Team & Vocals', category: 'Music & Choir', enabled: true },
      { id: 2, name: 'Instrumentalist (Keyboard / Drums / Guitar)', category: 'Music & Choir', enabled: true },
      { id: 3, name: 'Sunday School & Kids Ministry', category: 'Teaching', enabled: true },
      { id: 4, name: 'Youth Fellowship & Campus Leader', category: 'Pastoral', enabled: true },
      { id: 5, name: 'Media, Sound & Live Broadcast', category: 'Technical', enabled: true },
      { id: 6, name: 'Ushering & Hospitality', category: 'Service', enabled: true },
      { id: 7, name: 'Intercessory Prayer Team', category: 'Prayer', enabled: true },
      { id: 8, name: 'Village Outreach & Evangelism', category: 'Evangelism', enabled: true },
      { id: 9, name: 'Medical & First-Aid Volunteer', category: 'Social Care', enabled: true }
    ];
  });

  // Modals
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [roleForm, setRoleForm] = useState({ roleName: '', isPrimaryHead: false });

  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);
  const [newTalent, setNewTalent] = useState({ name: '', category: 'Music & Choir' });

  const [isNewFieldModalOpen, setIsNewFieldModalOpen] = useState(false);
  const [newFieldForm, setNewFieldForm] = useState({ label: '', fieldType: 'Text Box', isMandatory: false });

  // Master Save Handler
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_member_registration_config', JSON.stringify(formConfig));
    localStorage.setItem('app_reg_custom_family_roles_en', JSON.stringify(familyRoles));
    localStorage.setItem('app_reg_intake_field_policies_en', JSON.stringify(intakeFieldPolicies));
    localStorage.setItem('app_reg_ministry_talents_en', JSON.stringify(ministryTalents));
    onTriggerSuccess?.('Registration Engine, Family Relationships & Field Policies saved successfully!');
  };

  // --- Dynamic Family Roles Handlers ---
  const handleOpenRoleModal = (role = null) => {
    if (role) {
      setEditingRoleId(role.id);
      setRoleForm({ roleName: role.roleName, isPrimaryHead: role.isPrimaryHead });
    } else {
      setEditingRoleId(null);
      setRoleForm({ roleName: '', isPrimaryHead: false });
    }
    setIsRoleModalOpen(true);
  };

  const handleSaveRole = (e) => {
    e.preventDefault();
    if (!roleForm.roleName.trim()) return;

    let updatedRoles;
    if (editingRoleId) {
      updatedRoles = familyRoles.map(r => r.id === editingRoleId ? { ...r, ...roleForm } : r);
      onTriggerSuccess?.('Family relationship role updated!');
    } else {
      const newRole = { id: Date.now(), ...roleForm };
      updatedRoles = [...familyRoles, newRole];
      onTriggerSuccess?.('New relationship role added to dropdown directory!');
    }

    setFamilyRoles(updatedRoles);
    localStorage.setItem('app_reg_custom_family_roles_en', JSON.stringify(updatedRoles));
    setIsRoleModalOpen(false);
  };

  const handleDeleteRole = (id) => {
    if (window.confirm("Remove this relationship role from the registration dropdown?")) {
      const updated = familyRoles.filter(r => r.id !== id);
      setFamilyRoles(updated);
      localStorage.setItem('app_reg_custom_family_roles_en', JSON.stringify(updated));
      onTriggerSuccess?.('Relationship role removed.');
    }
  };

  // --- Intake Fields Policy Handlers ---
  const handleToggleFieldEnabled = (id) => {
    const updated = intakeFieldPolicies.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f);
    setIntakeFieldPolicies(updated);
    localStorage.setItem('app_reg_intake_field_policies_en', JSON.stringify(updated));
  };

  const handleToggleFieldMandatory = (id) => {
    const updated = intakeFieldPolicies.map(f => f.id === id ? { ...f, isMandatory: !f.isMandatory } : f);
    setIntakeFieldPolicies(updated);
    localStorage.setItem('app_reg_intake_field_policies_en', JSON.stringify(updated));
  };

  const handleDeleteFieldPolicy = (id) => {
    if (window.confirm("Remove this intake field from the policy list?")) {
      const updated = intakeFieldPolicies.filter(f => f.id !== id);
      setIntakeFieldPolicies(updated);
      localStorage.setItem('app_reg_intake_field_policies_en', JSON.stringify(updated));
      onTriggerSuccess?.('Intake question removed from form.');
    }
  };

  const handleAddNewCustomField = (e) => {
    e.preventDefault();
    if (!newFieldForm.label.trim()) return;

    const newField = {
      id: `custom_${Date.now()}`,
      label: newFieldForm.label,
      fieldType: newFieldForm.fieldType,
      enabled: true,
      isMandatory: newFieldForm.isMandatory
    };

    const updated = [...intakeFieldPolicies, newField];
    setIntakeFieldPolicies(updated);
    localStorage.setItem('app_reg_intake_field_policies_en', JSON.stringify(updated));
    setNewFieldForm({ label: '', fieldType: 'Text Box', isMandatory: false });
    setIsNewFieldModalOpen(false);
    onTriggerSuccess?.('Custom question added to registration policy list!');
  };

  // --- Talent Handlers ---
  const handleAddTalent = (e) => {
    e.preventDefault();
    if (!newTalent.name.trim()) return;
    const updated = [...ministryTalents, { id: Date.now(), ...newTalent, enabled: true }];
    setMinistryTalents(updated);
    localStorage.setItem('app_reg_ministry_talents_en', JSON.stringify(updated));
    setNewTalent({ name: '', category: 'Music & Choir' });
    setIsTalentModalOpen(false);
    onTriggerSuccess?.('New Ministry Talent added!');
  };

  const handleToggleTalent = (id) => {
    const updated = ministryTalents.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t);
    setMinistryTalents(updated);
    localStorage.setItem('app_reg_ministry_talents_en', JSON.stringify(updated));
  };

  const handleDeleteTalent = (id) => {
    const updated = ministryTalents.filter(t => t.id !== id);
    setMinistryTalents(updated);
    localStorage.setItem('app_reg_ministry_talents_en', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <form onSubmit={handleSaveAll} className="space-y-8">

        {/* 1. MASTER WORKFLOW & FAMILY TREE CONFIGURATION */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <UserPlus className="text-orange-400" size={22} />
                Member & Family Registration Setup
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure custom family relationships, field intake policies, and ministry placement directories
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_20px_rgba(255,107,0,0.45)] border border-white/20 cursor-pointer transition-all active:scale-95 shrink-0"
            >
              <Save size={15} />
              <span>Save Registration Setup</span>
            </button>
          </div>

          {/* Core Automation Workflows */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders size={15} />
              <span>1. Registration Workflow Automation</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 cursor-pointer hover:border-orange-500/30 transition-all">
                <div>
                  <span className="text-xs font-bold text-white block">Auto-Generate Believer Member ID Code</span>
                  <span className="text-[11px] text-slate-400">Generates unique permanent church IDs (e.g. CAT-00142)</span>
                </div>
                <input
                  type="checkbox"
                  checked={formConfig.autoGenerateMemberId}
                  onChange={(e) => setFormConfig({ ...formConfig, autoGenerateMemberId: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
              </label>

              <label className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 cursor-pointer hover:border-orange-500/30 transition-all">
                <div>
                  <span className="text-xs font-bold text-white block">Enable 1-Click Family Bundle Registration</span>
                  <span className="text-[11px] text-slate-400">Bundle spouse, children, and parents under a single family unit</span>
                </div>
                <input
                  type="checkbox"
                  checked={formConfig.enableFamilyGrouping}
                  onChange={(e) => setFormConfig({ ...formConfig, enableFamilyGrouping: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* 2. DYNAMIC FAMILY RELATIONSHIPS */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="text-orange-400" size={20} />
                Family Hierarchy Relationships Directory
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Add, edit, or customize any relationship terms for dropdown selection in member profiles
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenRoleModal()}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer transition-all active:scale-95 shrink-0"
            >
              <Plus size={14} />
              <span>+ Add Relationship Term</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {familyRoles.map((role) => (
              <div
                key={role.id}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-orange-500/40 hover:shadow-[0_0_15px_rgba(255,107,0,0.15)] transition-all flex items-center justify-between gap-2"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h5 className="text-xs font-bold text-white truncate" title={role.roleName}>
                    {role.roleName}
                  </h5>
                  <span className="text-[10px] text-slate-400">
                    {role.isPrimaryHead ? '★ Primary Household Head' : 'Family Unit Member'}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenRoleModal(role)}
                    className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 cursor-pointer transition-all active:scale-95"
                    title="Edit Role Name"
                  >
                    <Edit2 size={13} />
                  </button>
                  {!role.isPrimaryHead && (
                    <button
                      type="button"
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 cursor-pointer transition-all active:scale-95"
                      title="Delete Role"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. INTAKE FIELD POLICIES (GLOWING TOGGLES & MANDATORY RULES) */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Heart className="text-orange-400" size={20} />
                Intake Questions & Field Policy Checklist
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Enable or disable questions (Blood Group, Wedding Date, Baptism Details) in the member registration form
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsNewFieldModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer transition-all active:scale-95 shrink-0"
            >
              <Plus size={14} />
              <span>+ Add Custom Field</span>
            </button>
          </div>

          {/* Intake Fields Policy Table */}
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                  <th className="p-3.5">Registration Field Name</th>
                  <th className="p-3.5">Field Type</th>
                  <th className="p-3.5">Include in Form</th>
                  <th className="p-3.5">Mandatory</th>
                  <th className="p-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {intakeFieldPolicies.map((field) => (
                  <tr key={field.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold text-white text-xs">{field.label}</td>
                    <td className="p-3.5 font-mono text-[11px] text-orange-400">{field.fieldType}</td>

                    {/* Enable / Disable Glowing Pill Switch */}
                    <td className="p-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleFieldEnabled(field.id)}
                        className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                          field.enabled 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                            : 'bg-slate-800 text-slate-500 border border-white/5'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${field.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
                        <span>{field.enabled ? 'Enabled in Form' : 'Hidden / Disabled'}</span>
                      </button>
                    </td>

                    {/* Mandatory Glowing Pill Switch */}
                    <td className="p-3.5">
                      <button
                        type="button"
                        disabled={!field.enabled}
                        onClick={() => handleToggleFieldMandatory(field.id)}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                          field.isMandatory 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                            : 'bg-slate-800 text-slate-400 border border-white/5'
                        }`}
                      >
                        <span>{field.isMandatory ? 'Mandatory (*)' : 'Optional'}</span>
                      </button>
                    </td>

                    {/* Delete Action Button */}
                    <td className="p-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteFieldPolicy(field.id)}
                        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 cursor-pointer transition-all active:scale-95"
                        title="Remove Question"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. MINISTRY TALENTS & SKILL PROFILES */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="text-orange-400" size={20} />
                Spiritual Talents & Ministry Placements Directory
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Volunteering options to auto-allocate believers to Choir, Media, Sunday School, or Prayer teams
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsTalentModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer transition-all active:scale-95 shrink-0"
            >
              <Plus size={14} />
              <span>+ Add Ministry Talent</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ministryTalents.map((talent) => (
              <div
                key={talent.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-2 ${
                  talent.enabled 
                    ? 'bg-slate-900/70 border-white/10 hover:border-orange-500/40 hover:shadow-[0_0_15px_rgba(255,107,0,0.15)]' 
                    : 'bg-slate-900/30 border-white/5 opacity-50'
                }`}
              >
                <div>
                  <h5 className="text-xs font-bold text-white">{talent.name}</h5>
                  <span className="text-[10px] text-orange-400 font-mono mt-0.5 block">{talent.category}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleToggleTalent(talent.id)}
                    className={`p-1.5 rounded-lg text-xs cursor-pointer transition-all ${
                      talent.enabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-500 border border-white/5'
                    }`}
                    title={talent.enabled ? 'Active Talent' : 'Disabled'}
                  >
                    <Check size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTalent(talent.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 cursor-pointer transition-all active:scale-95"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Master Footer Save */}
          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white text-xs font-bold rounded-2xl shadow-[0_0_20px_rgba(255,107,0,0.45)] border border-white/20 cursor-pointer transition-all active:scale-95"
            >
              <Save size={15} />
              <span>Save & Apply Registration Engine</span>
            </button>
          </div>
        </div>

      </form>

      {/* MODAL 1: ADD / EDIT FAMILY RELATIONSHIP TERM */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="text-orange-400" size={18} />
                {editingRoleId ? 'Edit Relationship Term' : 'Add Relationship Term'}
              </h3>
              <button onClick={() => setIsRoleModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Relationship Term (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Uncle / Sibling / Cousin"
                  value={roleForm.roleName}
                  onChange={(e) => setRoleForm({ ...roleForm, roleName: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={roleForm.isPrimaryHead}
                  onChange={(e) => setRoleForm({ ...roleForm, isPrimaryHead: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <span>Set as Primary Household Head Role</span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer"
                >
                  {editingRoleId ? 'Update Term' : 'Save Relationship'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD INTAKE QUESTION FIELD */}
      {isNewFieldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Heart className="text-orange-400" size={18} />
                Add New Intake Question
              </h3>
              <button onClick={() => setIsNewFieldModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddNewCustomField} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Question / Field Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Occupation or National ID"
                  value={newFieldForm.label}
                  onChange={(e) => setNewFieldForm({ ...newFieldForm, label: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Input Format Type</label>
                <select
                  value={newFieldForm.fieldType}
                  onChange={(e) => setNewFieldForm({ ...newFieldForm, fieldType: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="Text Box">Short Text Box</option>
                  <option value="Dropdown">Dropdown Selection</option>
                  <option value="Date Picker">Date Picker</option>
                  <option value="Yes / No Checkbox">Yes / No Checkbox</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newFieldForm.isMandatory}
                  onChange={(e) => setNewFieldForm({ ...newFieldForm, isMandatory: e.target.checked })}
                  className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                />
                <span>Make this field mandatory in registration form</span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsNewFieldModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer"
                >
                  Add Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD MINISTRY TALENT */}
      {isTalentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="text-orange-400" size={18} />
                Add Ministry Talent Profile
              </h3>
              <button onClick={() => setIsTalentModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTalent} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Talent / Ministry Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Video Editing & Live Streaming"
                  value={newTalent.name}
                  onChange={(e) => setNewTalent({ ...newTalent, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Ministry Department Category</label>
                <select
                  value={newTalent.category}
                  onChange={(e) => setNewTalent({ ...newTalent, category: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="Music & Choir">Music & Choir</option>
                  <option value="Teaching">Teaching & Sunday School</option>
                  <option value="Technical">Technical, Audio & Media</option>
                  <option value="Prayer">Intercessory Prayer</option>
                  <option value="Evangelism">Evangelism & Missions</option>
                  <option value="Service">Ushering & Hospitality</option>
                  <option value="Social Care">Medical & Social Welfare</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsTalentModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 cursor-pointer"
                >
                  Add Talent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
import React, { useState } from 'react';
import { 
  Crown, Music, Award, Plus, Trash2, Edit2, 
  Save, X, Check, ArrowRight, ShieldCheck, Flag, Tag
} from 'lucide-react';

export default function MemberDirectoryTab({ onTriggerSuccess }) {
  const [activeTab, setActiveTab] = useState('roles');

  // ================= 1. ROLES & DESIGNATIONS STATE =================
  const [rolesList, setRolesList] = useState([
    { id: 1, title: 'Reverend', tier: 'Clergy / Pastoral', badge: 'High Honor', desc: 'Ordained senior minister in charge' },
    { id: 2, title: 'Senior Pastor', tier: 'Clergy / Pastoral', badge: 'HQ Head', desc: 'Main leader of the church' },
    { id: 3, title: 'Associate Pastor', tier: 'Clergy / Pastoral', badge: 'Ministry Head', desc: 'Assists senior pastor in core pastoral care' },
    { id: 4, title: 'Assistant Pastor', tier: 'Clergy / Pastoral', badge: 'Branch Pastor', desc: 'In-charge of branch / satellite churches' },
    { id: 5, title: 'Church Elder', tier: 'Leadership Board', badge: 'Board Member', desc: 'Spiritual guidance and governance' },
    { id: 6, title: 'Deacon', tier: 'Leadership Board', badge: 'Service Board', desc: 'Church operations and member care' },
    { id: 7, title: 'Care Cell Leader', tier: 'Cell Ministry', badge: 'Area Leader', desc: 'Leads local home prayer fellowships' },
    { id: 8, title: 'Church Member', tier: 'Congregation', badge: 'Member', desc: 'General baptized or active believer' }
  ]);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [roleForm, setRoleForm] = useState({ title: '', tier: 'Clergy / Pastoral', badge: '', desc: '' });

  // ================= 2. MINISTRY WINGS STATE =================
  const [ministriesList, setMinistriesList] = useState([
    { id: 1, name: 'Worship & Choir', code: 'MIN-CHOIR', leader: 'Bro. David', desc: 'Leading congregational praise & worship' },
    { id: 2, name: 'Musicians & Instruments', code: 'MIN-MUSIC', leader: 'Bro. Alex', desc: 'Keyboard, drums, guitars & live band' },
    { id: 3, name: 'Media, Sound & Live Streaming', code: 'MIN-MEDIA', leader: 'Sis. Sarah', desc: 'Audio console, video cameras, streaming & projection' },
    { id: 4, name: 'Youth Fellowship', code: 'MIN-YOUTH', leader: 'Bro. Joshua', desc: 'Youth meetings, campus outreach & retreats' },
    { id: 5, name: 'Sunday School & Child Ministry', code: 'MIN-KIDS', leader: 'Sis. Rachel', desc: 'Bible teaching, VBS & child discipleship' },
    { id: 6, name: 'Ushering & Hospitality Team', code: 'MIN-USHER', leader: 'Bro. Samuel', desc: 'Welcoming visitors, order & seating' }
  ]);
  const [editingMinistryId, setEditingMinistryId] = useState(null);
  const [ministryForm, setMinistryForm] = useState({ name: '', code: '', leader: '', desc: '' });

  // ================= 3. SPIRITUAL STAGES STATE =================
  const [stagesList, setStagesList] = useState([
    { 
      id: 1, 
      stepOrder: 1,
      stage: 'New Seeker / Visitor', 
      actionRequired: 'Immediate Pastoral Call & 48-hr Home Visit', 
      tag: 'Step 1: Welcome',
      colorScheme: 'rose',
      votingEligible: false,
      ministryEligible: false
    },
    { 
      id: 2, 
      stepOrder: 2,
      stage: 'Regular Believer & Discipleship Trainee', 
      actionRequired: 'Enroll in New Believers Foundation Class & Cell Group', 
      tag: 'Step 2: Discipleship',
      colorScheme: 'amber',
      votingEligible: false,
      ministryEligible: false
    },
    { 
      id: 3, 
      stepOrder: 3,
      stage: 'Water Baptized Believer', 
      actionRequired: 'Water Baptism Preparation & Spiritual Gifts Assessment', 
      tag: 'Step 3: Baptism',
      colorScheme: 'sky',
      votingEligible: false,
      ministryEligible: true
    },
    { 
      id: 4, 
      stepOrder: 4,
      stage: 'Holy Spirit Baptized & Anointed', 
      actionRequired: 'Spiritual Warfare, Prayer Ministry & Intercession Wing', 
      tag: 'Step 4: Anointing',
      colorScheme: 'purple',
      votingEligible: true,
      ministryEligible: true
    },
    { 
      id: 5, 
      stepOrder: 5,
      stage: 'Full Communicant / Practicing Member', 
      actionRequired: 'Lord Table Communion, Ministry Leadership & Annual Voting', 
      tag: 'Step 5: Full Member',
      colorScheme: 'emerald',
      votingEligible: true,
      ministryEligible: true
    }
  ]);
  const [editingStageId, setEditingStageId] = useState(null);
  const [stageForm, setStageForm] = useState({
    stage: '',
    actionRequired: '',
    tag: '',
    colorScheme: 'emerald',
    votingEligible: false,
    ministryEligible: false
  });

  // Handlers for Roles
  const handleSaveRole = (e) => {
    e.preventDefault();
    if (!roleForm.title.trim()) return;
    if (editingRoleId) {
      setRolesList(rolesList.map(r => r.id === editingRoleId ? { ...r, ...roleForm } : r));
      setEditingRoleId(null);
      onTriggerSuccess('Designation / Role updated successfully!');
    } else {
      setRolesList([...rolesList, { ...roleForm, id: Date.now(), badge: roleForm.badge || 'Custom' }]);
      onTriggerSuccess('New Designation / Role added successfully!');
    }
    setRoleForm({ title: '', tier: 'Clergy / Pastoral', badge: '', desc: '' });
  };

  // Handlers for Ministries
  const handleSaveMinistry = (e) => {
    e.preventDefault();
    if (!ministryForm.name.trim()) return;
    if (editingMinistryId) {
      setMinistriesList(ministriesList.map(m => m.id === editingMinistryId ? { ...m, ...ministryForm } : m));
      setEditingMinistryId(null);
      onTriggerSuccess('Ministry Field updated successfully!');
    } else {
      setMinistriesList([...ministriesList, { ...ministryForm, id: Date.now(), code: ministryForm.code || `MIN-${Date.now().toString().slice(-4)}` }]);
      onTriggerSuccess('New Ministry Field created successfully!');
    }
    setMinistryForm({ name: '', code: '', leader: '', desc: '' });
  };

  // Handlers for Stages
  const handleSaveStage = (e) => {
    e.preventDefault();
    if (!stageForm.stage.trim()) return;
    if (editingStageId) {
      setStagesList(stagesList.map(s => s.id === editingStageId ? { ...s, ...stageForm } : s));
      setEditingStageId(null);
      onTriggerSuccess('Spiritual Stage updated successfully!');
    } else {
      const newStep = stagesList.length + 1;
      setStagesList([...stagesList, { ...stageForm, id: Date.now(), stepOrder: newStep, tag: stageForm.tag || `Step ${newStep}` }]);
      onTriggerSuccess('New Spiritual Stage created successfully!');
    }
    setStageForm({ stage: '', actionRequired: '', tag: '', colorScheme: 'emerald', votingEligible: false, ministryEligible: false });
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Capsule Sub-Tabs */}
      <div className="glass-panel p-1.5 rounded-2xl flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'roles', label: '1. Pastoral & Leadership Roles', icon: Crown },
            { id: 'ministries', label: '2. Ministry Wings & Fields', icon: Music },
            { id: 'stages', label: '3. Believer Spiritual Stages', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isTabActive ? 'bg-white text-slate-900 shadow-md font-bold' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} className={isTabActive ? 'text-orange-600' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onTriggerSuccess('Member Directory Setup saved successfully!')}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
        >
          <Save size={14} />
          <span>Save Directory Setup</span>
        </button>
      </div>

      {/* ================= 1. ROLES & DESIGNATIONS TAB ================= */}
      {activeTab === 'roles' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Table Card */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Crown className="text-orange-400" size={22} />
                  Church Designations & Pastoral Hierarchy Master
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Titles and leadership levels configured for your church
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-bold text-orange-400">
                {rolesList.length} Roles Active
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                    <th className="p-3.5">Designation Title</th>
                    <th className="p-3.5">Hierarchy Tier</th>
                    <th className="p-3.5">Badge / Level</th>
                    <th className="p-3.5">Role Description</th>
                    <th className="p-3.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {rolesList.map((r) => (
                    <tr key={r.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white text-xs">{r.title}</td>
                      <td className="p-3.5 text-orange-300 font-medium">{r.tier}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-semibold uppercase">
                          {r.badge || 'General'}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 text-xs">{r.desc || '—'}</td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => { setEditingRoleId(r.id); setRoleForm({ title: r.title, tier: r.tier, badge: r.badge, desc: r.desc }); }}
                            className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                            title="Edit Role"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => { setRolesList(rolesList.filter(x => x.id !== r.id)); onTriggerSuccess('Role removed.'); }}
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                            title="Delete Role"
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

          {/* Form Card */}
          <form onSubmit={handleSaveRole} className="glass-card rounded-3xl p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                {editingRoleId ? <Edit2 size={16} /> : <Plus size={16} />}
                <span>{editingRoleId ? 'Edit Designation Details' : 'Add New Custom Designation'}</span>
              </h4>
              {editingRoleId && (
                <button
                  type="button"
                  onClick={() => { setEditingRoleId(null); setRoleForm({ title: '', tier: 'Clergy / Pastoral', badge: '', desc: '' }); }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <X size={13} /> Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Designation Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Associate Pastor..."
                  value={roleForm.title}
                  onChange={(e) => setRoleForm({ ...roleForm, title: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Hierarchy Group</label>
                <select
                  value={roleForm.tier}
                  onChange={(e) => setRoleForm({ ...roleForm, tier: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="Clergy / Pastoral">Clergy / Pastoral Team</option>
                  <option value="Leadership Board">Leadership Board / Elders</option>
                  <option value="Cell Ministry">Care Cell / Area Leaders</option>
                  <option value="Congregation">Congregation & Members</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Badge Label</label>
                <input
                  type="text"
                  placeholder="e.g. Branch Head..."
                  value={roleForm.badge}
                  onChange={(e) => setRoleForm({ ...roleForm, badge: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div className="md:col-span-3">
                <label className="text-xs font-medium text-slate-300">Responsibilities Description</label>
                <input
                  type="text"
                  placeholder="Summary of responsibilities..."
                  value={roleForm.desc}
                  onChange={(e) => setRoleForm({ ...roleForm, desc: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                {editingRoleId ? <Check size={15} /> : <Plus size={15} />}
                <span>{editingRoleId ? 'Update Designation' : 'Save Designation'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= 2. MINISTRY WINGS TAB ================= */}
      {activeTab === 'ministries' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Table Card */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Music className="text-orange-400" size={22} />
                  Ministry Wings & Believer Talent Fields Master
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage choir, music, media, youth wings, and children ministries
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-bold text-orange-400">
                {ministriesList.length} Wings Active
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                    <th className="p-3.5">Ministry Wing</th>
                    <th className="p-3.5">Code</th>
                    <th className="p-3.5">Leader In-Charge</th>
                    <th className="p-3.5">Purpose</th>
                    <th className="p-3.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {ministriesList.map((m) => (
                    <tr key={m.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white text-xs">{m.name}</td>
                      <td className="p-3.5 font-mono text-orange-400 text-[11px]">{m.code}</td>
                      <td className="p-3.5 text-slate-300">{m.leader || 'Not Assigned'}</td>
                      <td className="p-3.5 text-slate-400 text-xs">{m.desc || '—'}</td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => { setEditingMinistryId(m.id); setMinistryForm({ name: m.name, code: m.code, leader: m.leader, desc: m.desc }); }}
                            className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                            title="Edit Ministry"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => { setMinistriesList(ministriesList.filter(x => x.id !== m.id)); onTriggerSuccess('Ministry removed.'); }}
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                            title="Delete Ministry"
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

          {/* Form Card */}
          <form onSubmit={handleSaveMinistry} className="glass-card rounded-3xl p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                {editingMinistryId ? <Edit2 size={16} /> : <Plus size={16} />}
                <span>{editingMinistryId ? 'Edit Ministry Wing Details' : 'Add New Ministry Wing'}</span>
              </h4>
              {editingMinistryId && (
                <button
                  type="button"
                  onClick={() => { setEditingMinistryId(null); setMinistryForm({ name: '', code: '', leader: '', desc: '' }); }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <X size={13} /> Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-slate-300">Ministry Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drama & Choreography..."
                  value={ministryForm.name}
                  onChange={(e) => setMinistryForm({ ...ministryForm, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Leader In-Charge</label>
                <input
                  type="text"
                  placeholder="e.g. Bro. Alex..."
                  value={ministryForm.leader}
                  onChange={(e) => setMinistryForm({ ...ministryForm, leader: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div className="md:col-span-3">
                <label className="text-xs font-medium text-slate-300">Purpose / Meeting Schedule</label>
                <input
                  type="text"
                  placeholder="Short description..."
                  value={ministryForm.desc}
                  onChange={(e) => setMinistryForm({ ...ministryForm, desc: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                {editingMinistryId ? <Check size={15} /> : <Plus size={15} />}
                <span>{editingMinistryId ? 'Update Ministry Wing' : 'Save Ministry Wing'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= 3. SPIRITUAL STAGES TAB ================= */}
      {activeTab === 'stages' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Table Card */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="text-orange-400" size={22} />
                  Believer Spiritual Lifecycle & Care Milestones
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Growth stages of your congregation with pastoral care goals and privileges
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-bold text-orange-400">
                {stagesList.length} Stages Configured
              </span>
            </div>

            {/* Stepper Preview */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                {stagesList.map((st, idx) => (
                  <React.Fragment key={st.id}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-white/10">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">{st.stage.split('(')[0]}</span>
                    </div>
                    {idx < stagesList.length - 1 && (
                      <ArrowRight size={14} className="text-slate-500 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                    <th className="p-3.5">Step #</th>
                    <th className="p-3.5">Spiritual Stage</th>
                    <th className="p-3.5">Pastoral Follow-up Goal</th>
                    <th className="p-3.5">Privileges</th>
                    <th className="p-3.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {stagesList.map((s, idx) => (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-orange-400 text-xs">#{idx + 1}</td>
                      <td className="p-3.5 font-bold text-white text-xs">{s.stage}</td>
                      <td className="p-3.5 text-slate-300 text-xs">{s.actionRequired}</td>
                      <td className="p-3.5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={s.ministryEligible ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                            {s.ministryEligible ? '✓ Ministry' : '—'}
                          </span>
                          <span>•</span>
                          <span className={s.votingEligible ? 'text-purple-400 font-semibold' : 'text-slate-500'}>
                            {s.votingEligible ? '✓ Voting' : '—'}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => { setEditingStageId(s.id); setStageForm({ ...s }); }}
                            className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                            title="Edit Stage"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => { setStagesList(stagesList.filter(x => x.id !== s.id)); onTriggerSuccess('Stage removed.'); }}
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                            title="Delete Stage"
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

          {/* Form Card */}
          <form onSubmit={handleSaveStage} className="glass-card rounded-3xl p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                {editingStageId ? <Edit2 size={16} /> : <Plus size={16} />}
                <span>{editingStageId ? 'Edit Spiritual Stage' : 'Add New Spiritual Stage'}</span>
              </h4>
              {editingStageId && (
                <button
                  type="button"
                  onClick={() => { setEditingStageId(null); setStageForm({ stage: '', actionRequired: '', tag: '', colorScheme: 'emerald', votingEligible: false, ministryEligible: false }); }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <X size={13} /> Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Spiritual Stage Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anointed Believer..."
                  value={stageForm.stage}
                  onChange={(e) => setStageForm({ ...stageForm, stage: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Step Tag Label</label>
                <input
                  type="text"
                  placeholder="e.g. Step 4: Discipleship..."
                  value={stageForm.tag}
                  onChange={(e) => setStageForm({ ...stageForm, tag: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-medium text-slate-300">Pastoral Care Goal / Follow-up Action</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule Home Visit, Water Baptism Preparation..."
                  value={stageForm.actionRequired}
                  onChange={(e) => setStageForm({ ...stageForm, actionRequired: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stageForm.ministryEligible}
                    onChange={(e) => setStageForm({ ...stageForm, ministryEligible: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
                  <span>Ministry Participation Eligible</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stageForm.votingEligible}
                    onChange={(e) => setStageForm({ ...stageForm, votingEligible: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
                  <span>Church Voting Rights</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                {editingStageId ? <Check size={15} /> : <Plus size={15} />}
                <span>{editingStageId ? 'Update Stage' : 'Save Stage'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
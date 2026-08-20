import React, { useState } from 'react';
import { 
  LayoutGrid, Plus, Trash2, Edit2, X, Check,
  Zap, ArrowRight, ToggleLeft, ToggleRight, Sparkles, Sliders
} from 'lucide-react';

export default function ModulesRulesTab({ onTriggerSuccess }) {
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' or 'rules'

  // 1. MODULES STATE (Fully Editable & Deletable)
  const [modulesList, setModulesList] = useState([
    { id: 'mod_members', name: 'Member Directory & Family Tree', category: 'Core People', desc: 'Manage households, spiritual stages, and relationships', enabled: true },
    { id: 'mod_attendance', name: 'QR Attendance & Absentee Tracker', category: 'Operations', desc: 'Track Sunday service check-ins and generate absentee lists', enabled: true },
    { id: 'mod_finance', name: 'Tithes, Pledges & 80G Receipts', category: 'Accounts', desc: 'Multi-bank accounts, donor statements, and ledger accounting', enabled: true },
    { id: 'mod_pastoral', name: 'Pastoral Care & Home Visit Logs', category: 'Ministry', desc: 'Confidential prayer logs, counseling, and hospital visits', enabled: true },
    { id: 'mod_sms', name: 'WhatsApp & SMS Broadcast Engine', category: 'Communications', desc: 'Circular announcements, emergency alerts, and auto-wishes', enabled: true },
    { id: 'mod_sunday_school', name: 'Sunday School & Kids Ministry', category: 'Child Ministry', desc: 'Class-wise student registers, teachers, and VBS attendance', enabled: true }
  ]);

  // 2. RULES STATE
  const [rulesList, setRulesList] = useState([
    {
      id: 1,
      ruleName: '3-Sundays Absentee Care Alert',
      triggerEvent: 'Member absent for 3 consecutive Sunday services',
      actionTriggered: 'Auto-create Pastoral Visit Task & Alert Area Cell Leader',
      category: 'Pastoral Care',
      isActive: true
    },
    {
      id: 2,
      ruleName: 'Birthday & Anniversary Morning Wishes',
      triggerEvent: 'Member Birthday / Wedding Anniversary at 07:00 AM IST',
      actionTriggered: 'Send Personalized WhatsApp Blessing & Scripture Banner',
      category: 'Engagement',
      isActive: true
    },
    {
      id: 3,
      ruleName: 'Instant Tithe / Donation 80G Receipt',
      triggerEvent: 'New online or cash giving entry verified in system',
      actionTriggered: 'Send WhatsApp & Email PDF Tax Receipt with Download Link',
      category: 'Finance',
      isActive: true
    }
  ]);

  // Modals
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [moduleForm, setModuleForm] = useState({ name: '', category: 'Custom Modules', desc: '' });

  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState(null);
  const [ruleForm, setRuleForm] = useState({ ruleName: '', triggerEvent: '', actionTriggered: '', category: 'Pastoral Care' });

  // Module Handlers
  const handleOpenModuleModal = (mod = null) => {
    if (mod) {
      setEditingModuleId(mod.id);
      setModuleForm({ name: mod.name, category: mod.category, desc: mod.desc });
    } else {
      setEditingModuleId(null);
      setModuleForm({ name: '', category: 'Custom Modules', desc: '' });
    }
    setIsModuleModalOpen(true);
  };

  const handleSaveModule = (e) => {
    e.preventDefault();
    if (!moduleForm.name.trim()) return;

    if (editingModuleId) {
      setModulesList(modulesList.map(m => m.id === editingModuleId ? { ...m, ...moduleForm } : m));
      onTriggerSuccess('Module updated successfully!');
    } else {
      const newMod = {
        id: `mod_${Date.now()}`,
        name: moduleForm.name,
        category: moduleForm.category,
        desc: moduleForm.desc || 'Custom church module',
        enabled: true
      };
      setModulesList([...modulesList, newMod]);
      onTriggerSuccess('New module created successfully!');
    }
    setIsModuleModalOpen(false);
  };

  const handleDeleteModule = (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      setModulesList(modulesList.filter(m => m.id !== id));
      onTriggerSuccess('Module removed.');
    }
  };

  const handleToggleModule = (id) => {
    setModulesList(modulesList.map(m => {
      if (m.id === id) {
        const next = !m.enabled;
        onTriggerSuccess(`Module status changed to ${next ? 'Active' : 'Disabled'}`);
        return { ...m, enabled: next };
      }
      return m;
    }));
  };

  // Rule Handlers
  const handleOpenRuleModal = (rule = null) => {
    if (rule) {
      setEditingRuleId(rule.id);
      setRuleForm({ ruleName: rule.ruleName, triggerEvent: rule.triggerEvent, actionTriggered: rule.actionTriggered, category: rule.category });
    } else {
      setEditingRuleId(null);
      setRuleForm({ ruleName: '', triggerEvent: '', actionTriggered: '', category: 'Pastoral Care' });
    }
    setIsRuleModalOpen(true);
  };

  const handleSaveRule = (e) => {
    e.preventDefault();
    if (!ruleForm.ruleName.trim()) return;

    if (editingRuleId) {
      setRulesList(rulesList.map(r => r.id === editingRuleId ? { ...r, ...ruleForm } : r));
      onTriggerSuccess('Automation rule updated!');
    } else {
      const newR = { ...ruleForm, id: Date.now(), isActive: true };
      setRulesList([...rulesList, newR]);
      onTriggerSuccess('New Automation rule activated!');
    }
    setIsRuleModalOpen(false);
  };

  const handleDeleteRule = (id) => {
    if (window.confirm("Delete this automation rule?")) {
      setRulesList(rulesList.filter(r => r.id !== id));
      onTriggerSuccess('Rule deleted.');
    }
  };

  const handleToggleRule = (id) => {
    setRulesList(rulesList.map(r => {
      if (r.id === id) {
        const next = !r.isActive;
        onTriggerSuccess(`Rule status changed to ${next ? 'Active' : 'Paused'}`);
        return { ...r, isActive: next };
      }
      return r;
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub Header Tabs */}
      <div className="glass-panel p-1.5 rounded-2xl flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'modules'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutGrid size={14} className={activeTab === 'modules' ? 'text-orange-600' : 'text-slate-400'} />
            <span>1. Modules Switchboard & Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap size={14} className={activeTab === 'rules' ? 'text-orange-600' : 'text-slate-400'} />
            <span>2. Automated Church Rules</span>
          </button>
        </div>

        <button
          onClick={() => activeTab === 'modules' ? handleOpenModuleModal() : handleOpenRuleModal()}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
        >
          <Plus size={14} />
          <span>{activeTab === 'modules' ? '+ Add New Module' : '+ Create Rule'}</span>
        </button>
      </div>

      {/* ================= 1. TAB: MODULES ================= */}
      {activeTab === 'modules' && (
        <div className="glass-card rounded-3xl p-8 space-y-6 animate-fadeIn">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <LayoutGrid className="text-orange-400" size={22} />
                System Modules Management
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Create new functional modules, edit descriptions, or toggle active system engines
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-bold text-orange-400">
              {modulesList.filter(m => m.enabled).length} of {modulesList.length} Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modulesList.map((mod) => (
              <div
                key={mod.id}
                className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  mod.enabled
                    ? 'bg-slate-900/80 border-white/10 hover:border-orange-500/30'
                    : 'bg-slate-900/40 border-white/5 opacity-60'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white">{mod.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-semibold text-slate-300 uppercase">
                      {mod.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{mod.desc}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleOpenModuleModal(mod)}
                    className="p-1.5 text-slate-400 hover:text-indigo-400 cursor-pointer"
                    title="Edit Module"
                  >
                    <Edit2 size={14} />
                  </button>

                  <button
                    onClick={() => handleDeleteModule(mod.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                    title="Delete Module"
                  >
                    <Trash2 size={14} />
                  </button>

                  <button
                    onClick={() => handleToggleModule(mod.id)}
                    className={`cursor-pointer p-1 rounded-xl transition-all ${
                      mod.enabled ? 'text-orange-400' : 'text-slate-600'
                    }`}
                  >
                    {mod.enabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 2. TAB: RULES ================= */}
      {activeTab === 'rules' && (
        <div className="glass-card rounded-3xl p-8 space-y-6 animate-fadeIn">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="text-orange-400" size={22} />
                Automated Church Operations Rules
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Configure automated triggers and background workflows</p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
              {rulesList.filter(r => r.isActive).length} Active Rules
            </span>
          </div>

          <div className="space-y-3">
            {rulesList.map((rule) => (
              <div
                key={rule.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  rule.isActive ? 'bg-slate-900/80 border-white/10' : 'bg-slate-900/40 border-white/5 opacity-60'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`w-2 h-2 rounded-full ${rule.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                    <h4 className="text-xs font-bold text-white">{rule.ruleName}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-semibold text-slate-300 uppercase">
                      {rule.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <span className="text-amber-400 font-mono bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                      When: {rule.triggerEvent}
                    </span>
                    <ArrowRight size={12} className="text-slate-500" />
                    <span className="text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                      Then: {rule.actionTriggered}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleToggleRule(rule.id)}
                    className={`cursor-pointer p-1 rounded-xl transition-all ${
                      rule.isActive ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  >
                    {rule.isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>

                  <button
                    onClick={() => handleOpenRuleModal(rule)}
                    className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                  >
                    <Edit2 size={13} />
                  </button>

                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module Add/Edit Modal */}
      {isModuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="text-orange-400" size={18} />
                {editingModuleId ? 'Edit Module Details' : 'Create New System Module'}
              </h3>
              <button onClick={() => setIsModuleModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Module Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vehicle Fleet / Counseling..."
                  value={moduleForm.name}
                  onChange={(e) => setModuleForm({ ...moduleForm, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Operations, Logistics..."
                  value={moduleForm.category}
                  onChange={(e) => setModuleForm({ ...moduleForm, category: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Description</label>
                <textarea
                  rows={2}
                  placeholder="Purpose of this module..."
                  value={moduleForm.desc}
                  onChange={(e) => setModuleForm({ ...moduleForm, desc: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModuleModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  {editingModuleId ? 'Update Module' : 'Save Module'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rule Add/Edit Modal */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="text-orange-400" size={18} />
                {editingRuleId ? 'Edit Automation Rule' : 'Create Automation Rule'}
              </h3>
              <button onClick={() => setIsRuleModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveRule} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Rule Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3-Sunday Absentee Visit Rule"
                  value={ruleForm.ruleName}
                  onChange={(e) => setRuleForm({ ...ruleForm, ruleName: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Trigger Condition (When) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Member missing in Sunday QR attendance 3 times..."
                  value={ruleForm.triggerEvent}
                  onChange={(e) => setRuleForm({ ...ruleForm, triggerEvent: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Automated Action (Then) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Assign Pastoral Visit Task to Area Leader..."
                  value={ruleForm.actionTriggered}
                  onChange={(e) => setRuleForm({ ...ruleForm, actionTriggered: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Category</label>
                <select
                  value={ruleForm.category}
                  onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="Pastoral Care">Pastoral Care</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Finance">Finance</option>
                  <option value="General Automation">General Automation</option>
                </select>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsRuleModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  {editingRuleId ? 'Update Rule' : 'Save Rule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { 
  Sliders, DollarSign, MessageSquare, ShieldCheck, 
  Lock, Save, Clock, Users, Plus, Trash2, Edit2, X, Check,
  ToggleLeft, ToggleRight, Sparkles, CheckCircle2
} from 'lucide-react';

export default function PreferencesTab({ onTriggerSuccess }) {
  // 1. Core Preference Settings
  const [prefConfig, setPrefConfig] = useState(() => {
    const saved = localStorage.getItem('app_preferences_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      financialYearCycle: 'April 1 - March 31 (Indian Standard)',
      autoResetReceiptSequenceAnnually: true,
      allowBackdatedFinancialEntries: false,
      enableTitheReminderSms: true,
      titheReminderDayOfMonth: '1st of every month',
      wishesBroadcastTime: '07:00',
      enableDndQuietHours: true,
      dndStartTime: '21:30',
      dndEndTime: '06:30',
      defaultCommunicationChannel: 'WhatsApp First (SMS Fallback)',
      maskMemberPhoneNumbers: true,
      requireOtpForExcelExport: true,
      requireAdminApprovalForProfileEdits: true,
      allowBelieversToAddFamilyMembers: true
    };
  });

  // 2. Custom Dynamic Preferences & Policies (Add / Edit / Delete)
  const [customPolicies, setCustomPolicies] = useState(() => {
    const saved = localStorage.getItem('app_custom_policies');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 1,
        title: 'Sunday Tithe Collection Vault Deposit SLA',
        category: 'Finance & Accounts',
        description: 'Physical cash offerings must be counted by two designated trustees and locked into bank vault within 2 hours of service conclusion.',
        isActive: true
      },
      {
        id: 2,
        title: 'Pastoral Counseling Confidentiality Protocol',
        category: 'Ministry & Pastoral',
        description: 'Counseling logs marked confidential must never be exported in global reports or viewed by non-ordained staff.',
        isActive: true
      },
      {
        id: 3,
        title: 'Guest Preacher Honorarium Approval',
        category: 'Honorarium & Finance',
        description: 'All guest speaker travel claims and honorarium vouchers require Senior Pastor digital sign-off.',
        isActive: true
      }
    ];
  });

  // Modal State for Custom Policies
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [editingPolicyId, setEditingPolicyId] = useState(null);
  const [policyForm, setPolicyForm] = useState({
    title: '',
    category: 'General Administration',
    description: ''
  });

  // Master Save Handler
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_preferences_config', JSON.stringify(prefConfig));
    localStorage.setItem('app_custom_policies', JSON.stringify(customPolicies));
    onTriggerSuccess('Global Preferences and Custom Policy Rules saved successfully!');
  };

  // Add / Edit Custom Policy Modal Handlers
  const handleOpenPolicyModal = (policy = null) => {
    if (policy) {
      setEditingPolicyId(policy.id);
      setPolicyForm({
        title: policy.title,
        category: policy.category,
        description: policy.description
      });
    } else {
      setEditingPolicyId(null);
      setPolicyForm({
        title: '',
        category: 'General Administration',
        description: ''
      });
    }
    setIsPolicyModalOpen(true);
  };

  const handleSavePolicy = (e) => {
    e.preventDefault();
    if (!policyForm.title.trim()) return;

    if (editingPolicyId) {
      const updated = customPolicies.map(p => p.id === editingPolicyId ? { ...p, ...policyForm } : p);
      setCustomPolicies(updated);
      localStorage.setItem('app_custom_policies', JSON.stringify(updated));
      onTriggerSuccess('Custom policy rule updated successfully!');
    } else {
      const newPolicy = {
        id: Date.now(),
        ...policyForm,
        isActive: true
      };
      const updated = [...customPolicies, newPolicy];
      setCustomPolicies(updated);
      localStorage.setItem('app_custom_policies', JSON.stringify(updated));
      onTriggerSuccess('New custom policy rule added to preferences!');
    }
    setIsPolicyModalOpen(false);
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm("Are you sure you want to delete this custom policy rule?")) {
      const updated = customPolicies.filter(p => p.id !== id);
      setCustomPolicies(updated);
      localStorage.setItem('app_custom_policies', JSON.stringify(updated));
      onTriggerSuccess('Custom policy rule removed.');
    }
  };

  const handleTogglePolicy = (id) => {
    const updated = customPolicies.map(p => {
      if (p.id === id) {
        const next = !p.isActive;
        onTriggerSuccess(`Policy rule is now ${next ? 'Active' : 'Inactive'}`);
        return { ...p, isActive: next };
      }
      return p;
    });
    setCustomPolicies(updated);
    localStorage.setItem('app_custom_policies', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">

        {/* Master Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sliders className="text-orange-400" size={22} />
                Church Operational Preferences & System Rules
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage financial cycles, communication schedules, privacy safeguards, and dynamic custom policies
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
            >
              <Save size={15} />
              <span>Save Preferences</span>
            </button>
          </div>

          {/* 1. Financial & Giving Preferences */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <DollarSign size={15} />
              <span>1. Financial & Fiscal Accounting Rules</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Financial Year Accounting Cycle *</label>
                <select
                  value={prefConfig.financialYearCycle}
                  onChange={(e) => setPrefConfig({ ...prefConfig, financialYearCycle: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="April 1 - March 31 (Indian Standard)">April 1 – March 31 (Standard Indian Fiscal)</option>
                  <option value="January 1 - December 31">January 1 – December 31 (Calendar Year)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Tithe & Offering Reminder Schedule</label>
                <select
                  value={prefConfig.titheReminderDayOfMonth}
                  onChange={(e) => setPrefConfig({ ...prefConfig, titheReminderDayOfMonth: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="1st of every month">1st of Every Month (Morning 8:00 AM)</option>
                  <option value="5th of every month">5th of Every Month</option>
                  <option value="Every 1st Sunday">Every 1st Sunday of Month</option>
                  <option value="Disabled">Disable Automated Tithe Reminders</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefConfig.autoResetReceiptSequenceAnnually}
                  onChange={(e) => setPrefConfig({ ...prefConfig, autoResetReceiptSequenceAnnually: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <span>Automatically reset 80G tax receipt serial numbers at the start of new financial year (e.g. REC/2026-27/0001)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefConfig.allowBackdatedFinancialEntries}
                  onChange={(e) => setPrefConfig({ ...prefConfig, allowBackdatedFinancialEntries: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <span>Allow Finance Admin to record backdated tithe vouchers (Older than 30 days)</span>
              </label>
            </div>
          </div>

          {/* 2. Communication & Delivery Rules */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare size={15} />
              <span>2. Communication, Broadcast & Greeting Timings</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Birthday / Anniversary Wishes Time</label>
                <input
                  type="time"
                  value={prefConfig.wishesBroadcastTime}
                  onChange={(e) => setPrefConfig({ ...prefConfig, wishesBroadcastTime: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Default Broadcast Route</label>
                <select
                  value={prefConfig.defaultCommunicationChannel}
                  onChange={(e) => setPrefConfig({ ...prefConfig, defaultCommunicationChannel: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="WhatsApp First (SMS Fallback)">WhatsApp First (SMS Fallback)</option>
                  <option value="SMS Text Messages Only">SMS Text Messages Only</option>
                  <option value="Mobile App Push Notification Only">Mobile App Push Notification Only</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">DND Night Quiet Hours Start</label>
                <input
                  type="time"
                  value={prefConfig.dndStartTime}
                  onChange={(e) => setPrefConfig({ ...prefConfig, dndStartTime: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={prefConfig.enableDndQuietHours}
                onChange={(e) => setPrefConfig({ ...prefConfig, enableDndQuietHours: e.target.checked })}
                className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
              />
              <span>Enforce Night DND Policy (Blocks automated non-emergency church circulars between 09:30 PM and 06:30 AM)</span>
            </label>
          </div>

          {/* 3. Data Privacy & Export Safeguards */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={15} />
              <span>3. Data Privacy, Masking & Export Safeguards</span>
            </h4>

            <div className="space-y-3">
              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={prefConfig.maskMemberPhoneNumbers}
                  onChange={(e) => setPrefConfig({ ...prefConfig, maskMemberPhoneNumbers: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Mask Member Contact Numbers for Ministry Staff & Volunteers</span>
                  <span className="text-[11px] text-slate-400">Masks phone numbers (e.g. +91 98765 *****) on regular staff screens to maintain privacy</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={prefConfig.requireOtpForExcelExport}
                  onChange={(e) => setPrefConfig({ ...prefConfig, requireOtpForExcelExport: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Require Super Admin / Senior Pastor OTP Approval for Full Excel Directory Export</span>
                  <span className="text-[11px] text-slate-400">Prevents unauthorized database downloads of church records</span>
                </div>
              </label>
            </div>
          </div>

          {/* 4. Believer App Self-Service Controls */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Users size={15} />
              <span>4. Believer Mobile App Self-Service Rules</span>
            </h4>

            <div className="space-y-3">
              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={prefConfig.requireAdminApprovalForProfileEdits}
                  onChange={(e) => setPrefConfig({ ...prefConfig, requireAdminApprovalForProfileEdits: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Require Admin Verification for Believer Profile / Address Changes</span>
                  <span className="text-[11px] text-slate-400">When members update their address or phone in Mobile App, it enters an approval queue</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={prefConfig.allowBelieversToAddFamilyMembers}
                  onChange={(e) => setPrefConfig({ ...prefConfig, allowBelieversToAddFamilyMembers: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Allow Household Heads to Register New Children / Family Members from App</span>
                  <span className="text-[11px] text-slate-400">Enables parents to add newborn children or family dependents directly</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* 5. DYNAMIC CUSTOM POLICIES & OPERATIONAL RULES (ADD / EDIT / DELETE) */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="text-orange-400" size={20} />
                Custom Church Policy Directives & Rules
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Add bespoke operational protocols, ministerial guidelines, and custom compliance rules
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenPolicyModal()}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
            >
              <Plus size={14} />
              <span>+ Add Custom Rule</span>
            </button>
          </div>

          <div className="space-y-3">
            {customPolicies.map((policy) => (
              <div
                key={policy.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  policy.isActive ? 'bg-slate-900/80 border-white/10' : 'bg-slate-900/40 border-white/5 opacity-60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`w-2 h-2 rounded-full ${policy.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                    <h4 className="text-xs font-bold text-white">{policy.title}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-semibold text-slate-300 uppercase">
                      {policy.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{policy.description}</p>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTogglePolicy(policy.id)}
                    className={`cursor-pointer p-1 rounded-xl transition-all ${
                      policy.isActive ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                    title={policy.isActive ? 'Policy is Active' : 'Policy is Disabled'}
                  >
                    {policy.isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenPolicyModal(policy)}
                    className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                    title="Edit Rule"
                  >
                    <Edit2 size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeletePolicy(policy.id)}
                    className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                    title="Delete Rule"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save & Apply All Settings</span>
            </button>
          </div>
        </div>

      </form>

      {/* Add / Edit Policy Modal */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="text-orange-400" size={18} />
                {editingPolicyId ? 'Edit Custom Policy Directive' : 'Create Custom Policy Directive'}
              </h3>
              <button onClick={() => setIsPolicyModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePolicy} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Policy Title / Rule Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunday Vault Deposit Protocol"
                  value={policyForm.title}
                  onChange={(e) => setPolicyForm({ ...policyForm, title: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Category Classification</label>
                <select
                  value={policyForm.category}
                  onChange={(e) => setPolicyForm({ ...policyForm, category: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="Finance & Accounts">Finance & Accounts</option>
                  <option value="Ministry & Pastoral">Ministry & Pastoral Care</option>
                  <option value="Honorarium & Hospitality">Honorarium & Hospitality</option>
                  <option value="Security & Confidentiality">Security & Confidentiality</option>
                  <option value="General Administration">General Administration</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Directive Description / Guideline *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain the required compliance standard or workflow action..."
                  value={policyForm.description}
                  onChange={(e) => setPolicyForm({ ...policyForm, description: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsPolicyModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  {editingPolicyId ? 'Update Policy' : 'Add Policy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
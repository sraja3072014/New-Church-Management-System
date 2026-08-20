import React, { useState } from 'react';
import { 
  ClipboardList, UserCheck, Zap, ShieldCheck, 
  Save, Plus, Trash2, Edit2, X, Check, ToggleLeft, ToggleRight,
  MessageCircle, Smartphone, Clock, ArrowRight, Sparkles
} from 'lucide-react';

export default function ServiceRequestsTab({ onTriggerSuccess }) {
  // 1. Pastoral & Staff Instant Dispatch Rules (Add / Edit / Delete)
  const [dispatchRules, setDispatchRules] = useState(() => {
    try {
      const saved = localStorage.getItem('app_service_dispatch_rules');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 1,
        serviceType: 'Child Dedication / Infant Blessing',
        assignedTo: 'Senior Pastor / Associate Pastor',
        targetSla: '48 Hours',
        instantAlertChannel: 'WhatsApp + Mobile App Push',
        autoApproval: false,
        isActive: true
      },
      {
        id: 2,
        serviceType: 'House Dedication / Family Prayer Visit',
        assignedTo: 'Area Cell Leader & Area Pastor',
        targetSla: '24 Hours',
        instantAlertChannel: 'WhatsApp Direct Alert',
        autoApproval: true,
        isActive: true
      },
      {
        id: 3,
        serviceType: 'Hospital & Urgent Sick Visitation',
        assignedTo: 'Hospital Ministry Care Team',
        targetSla: 'Immediate (2 Hours)',
        instantAlertChannel: 'Emergency SMS & WhatsApp Push',
        autoApproval: true,
        isActive: true
      },
      {
        id: 4,
        serviceType: 'Holy Matrimony / Wedding Booking',
        assignedTo: 'Pastoral Council & Secretariat',
        targetSla: '7 Days',
        instantAlertChannel: 'Email + WhatsApp Notification',
        autoApproval: false,
        isActive: true
      }
    ];
  });

  // 2. Global Assignment & Dispatch Toggles
  const [globalDispatchConfig, setGlobalDispatchConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('app_service_global_dispatch');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      autoAssignByAreaZone: true,
      sendInstantPastorWhatsAppAlert: true,
      sendBelieverConfirmationSms: true,
      requireMandatoryPhoneOnSubmission: true
    };
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({
    serviceType: '',
    assignedTo: 'Area Cell Leader & Area Pastor',
    targetSla: '24 Hours',
    instantAlertChannel: 'WhatsApp Direct Alert',
    autoApproval: false
  });

  // Open Modal
  const handleOpenModal = (rule = null) => {
    if (rule) {
      setEditingId(rule.id);
      setFormState({ ...rule });
    } else {
      setEditingId(null);
      setFormState({
        serviceType: '',
        assignedTo: 'Area Cell Leader & Area Pastor',
        targetSla: '24 Hours',
        instantAlertChannel: 'WhatsApp Direct Alert',
        autoApproval: false
      });
    }
    setIsModalOpen(true);
  };

  // Save Rule
  const handleSaveRule = (e) => {
    e.preventDefault();
    if (!formState.serviceType.trim()) return;

    if (editingId) {
      const updated = dispatchRules.map(r => r.id === editingId ? { ...r, ...formState } : r);
      setDispatchRules(updated);
      localStorage.setItem('app_service_dispatch_rules', JSON.stringify(updated));
      onTriggerSuccess?.('Dispatch rule updated successfully!');
    } else {
      const newRule = {
        id: Date.now(),
        ...formState,
        isActive: true
      };
      const updated = [...dispatchRules, newRule];
      setDispatchRules(updated);
      localStorage.setItem('app_service_dispatch_rules', JSON.stringify(updated));
      onTriggerSuccess?.('New Service Dispatch rule activated!');
    }
    setIsModalOpen(false);
  };

  // Delete Rule
  const handleDelete = (id) => {
    if (window.confirm("Delete this service dispatch rule?")) {
      const updated = dispatchRules.filter(r => r.id !== id);
      setDispatchRules(updated);
      localStorage.setItem('app_service_dispatch_rules', JSON.stringify(updated));
      onTriggerSuccess?.('Dispatch rule removed.');
    }
  };

  // Toggle Rule
  const handleToggle = (id) => {
    const updated = dispatchRules.map(r => {
      if (r.id === id) {
        const next = !r.isActive;
        onTriggerSuccess?.(`Rule is now ${next ? 'Active' : 'Disabled'}`);
        return { ...r, isActive: next };
      }
      return r;
    });
    setDispatchRules(updated);
    localStorage.setItem('app_service_dispatch_rules', JSON.stringify(updated));
  };

  // Master Save
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_service_dispatch_rules', JSON.stringify(dispatchRules));
    localStorage.setItem('app_service_global_dispatch', JSON.stringify(globalDispatchConfig));
    onTriggerSuccess?.('Service Request Dispatch & Pastoral Assignment rules saved!');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">

        {/* Master Header Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ClipboardList className="text-orange-400" size={24} />
                Service Requests • Automated Assignment & Instant Dispatch Rules
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically route prayer requests, dedications, and visitation calls directly to pastors and staff
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
            >
              <Save size={15} />
              <span>Save Dispatch Rules</span>
            </button>
          </div>

          {/* 1. Global Assignment Directives */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={14} />
              <span>1. Global Dispatch & Notification Policies</span>
            </h4>

            <div className="space-y-3">
              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={globalDispatchConfig.autoAssignByAreaZone}
                  onChange={(e) => setGlobalDispatchConfig({ ...globalDispatchConfig, autoAssignByAreaZone: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Auto-Assign Request by Believer Residential Zone</span>
                  <span className="text-[11px] text-slate-400">Routes prayer requests and house blessings to the local area cell leader automatically</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={globalDispatchConfig.sendInstantPastorWhatsAppAlert}
                  onChange={(e) => setGlobalDispatchConfig({ ...globalDispatchConfig, sendInstantPastorWhatsAppAlert: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Send Instant WhatsApp Push Notification to Assigned Pastor</span>
                  <span className="text-[11px] text-slate-400">Alerts the pastor on WhatsApp immediately when a believer submits a new service request</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3.5 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={globalDispatchConfig.sendBelieverConfirmationSms}
                  onChange={(e) => setGlobalDispatchConfig({ ...globalDispatchConfig, sendBelieverConfirmationSms: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Send Believer Acknowledgment & Status Updates via WhatsApp / SMS</span>
                  <span className="text-[11px] text-slate-400">Sends confirmation tracking ID to the believer upon scheduling or pastoral approval</span>
                </div>
              </label>
            </div>
          </div>

          {/* 2. Automated Dispatch Rules Matrix */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <UserCheck size={14} />
                  <span>2. Pastoral Assignment Matrix & Target SLA</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Define role assignment and SLA response time per request category</p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>+ Add Dispatch Rule</span>
              </button>
            </div>

            <div className="space-y-3">
              {dispatchRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    rule.isActive ? 'bg-slate-900/80 border-white/10' : 'bg-slate-900/40 border-white/5 opacity-60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`w-2 h-2 rounded-full ${rule.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                      <h5 className="text-xs font-bold text-white">{rule.serviceType}</h5>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
                      <span className="text-slate-300 font-medium">Assigned: <strong className="text-white">{rule.assignedTo}</strong></span>
                      <span>•</span>
                      <span className="text-orange-400 font-mono">SLA: {rule.targetSla}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono">{rule.instantAlertChannel}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggle(rule.id)}
                      className={`cursor-pointer p-1 rounded-xl transition-all ${
                        rule.isActive ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    >
                      {rule.isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenModal(rule)}
                      className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                      title="Edit Rule"
                    >
                      <Edit2 size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(rule.id)}
                      className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                      title="Delete Rule"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Save */}
          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save & Apply Dispatch Rules</span>
            </button>
          </div>

        </div>

      </form>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="text-orange-400" size={18} />
                {editingId ? 'Edit Assignment Rule' : 'Create Assignment & Dispatch Rule'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveRule} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Service Request Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Water Baptism Readiness Interview"
                  value={formState.serviceType}
                  onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Assigned Staff / Pastor *</label>
                  <select
                    value={formState.assignedTo}
                    onChange={(e) => setFormState({ ...formState, assignedTo: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Senior / Associate Pastor">Senior / Associate Pastor</option>
                    <option value="Area Cell Leader & Area Pastor">Area Cell Leader & Area Pastor</option>
                    <option value="Hospital Ministry Care Team">Hospital Ministry Care Team</option>
                    <option value="Pastoral Council & Secretariat">Pastoral Council & Secretariat</option>
                    <option value="Youth Pastor">Youth Pastor</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Response SLA</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 24 Hours / 3 Days"
                    value={formState.targetSla}
                    onChange={(e) => setFormState({ ...formState, targetSla: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Instant Dispatch Alert Method</label>
                <select
                  value={formState.instantAlertChannel}
                  onChange={(e) => setFormState({ ...formState, instantAlertChannel: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="WhatsApp Direct Alert">WhatsApp Direct Alert</option>
                  <option value="WhatsApp + Mobile App Push">WhatsApp + Mobile App Push</option>
                  <option value="Emergency SMS & WhatsApp Push">Emergency SMS & WhatsApp Push</option>
                  <option value="Email + WhatsApp Notification">Email + WhatsApp Notification</option>
                </select>
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
                  {editingId ? 'Update Rule' : 'Activate Rule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
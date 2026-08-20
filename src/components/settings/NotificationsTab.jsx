import React, { useState } from 'react';
import { 
  Bell, Smartphone, MessageSquare, Mail, MessageCircle, 
  Save, Plus, Trash2, Edit2, X, Check, ToggleLeft, ToggleRight,
  ShieldCheck, Sparkles, Clock, Send, CheckCircle2
} from 'lucide-react';

export default function NotificationsTab({ onTriggerSuccess }) {
  // 1. Master Notification Channels State
  const [channels, setChannels] = useState(() => {
    try {
      const saved = localStorage.getItem('app_notif_channels');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      whatsappEnabled: true,
      appPushEnabled: true,
      smsEnabled: true,
      emailEnabled: false
    };
  });

  // 2. Automated Event Trigger Rules (Editable, Toggleable & Deletable)
  const [triggerRules, setTriggerRules] = useState(() => {
    try {
      const saved = localStorage.getItem('app_notif_rules');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 1,
        eventName: 'Sunday Worship Service Reminder',
        timing: 'Saturday 06:00 PM & Sunday 06:00 AM',
        channels: ['App Push', 'WhatsApp'],
        category: 'Services',
        isActive: true,
        templatePreview: 'Praise the Lord! Join us for Sunday Worship tomorrow at 06:30 AM / 09:00 AM at Cathedral Sanctuary.'
      },
      {
        id: 2,
        eventName: 'Birthday & Anniversary Morning Blessing',
        timing: 'Daily at 07:00 AM IST',
        channels: ['WhatsApp', 'SMS'],
        category: 'Greetings',
        isActive: true,
        templatePreview: 'Happy Blessed Birthday! "The Lord bless you and keep you" - Numbers 6:24. Pastoral Council Prays for you.'
      },
      {
        id: 3,
        eventName: 'Instant Tithe / Donation 80G Tax Receipt',
        timing: 'Immediate on Successful Verification',
        channels: ['WhatsApp', 'App Push', 'Email'],
        category: 'Finance',
        isActive: true,
        templatePreview: 'Dear Brother/Sister, thank you for your faithful offering of ₹{amount}. Download your 80G receipt here: {link}'
      },
      {
        id: 4,
        eventName: '3-Sundays Absentee Pastoral Care Alert',
        timing: 'Sunday 02:00 PM (After Services)',
        channels: ['App Push (Pastoral Team)'],
        category: 'Pastoral Care',
        isActive: true,
        templatePreview: 'Care Alert: Bro. {name} has missed 3 consecutive Sunday services. A pastoral home visit is recommended.'
      }
    ];
  });

  // 3. Global Notification Config (Quiet Hours, DND)
  const [globalNotifConfig, setGlobalNotifConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('app_notif_global_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      enableDndQuietHours: true,
      dndStartTime: '21:30',
      dndEndTime: '06:30',
      allowEmergencyOverride: true,
      soundVibrationDefault: true
    };
  });

  // Modal State for Rule Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [ruleForm, setRuleForm] = useState({
    eventName: '',
    timing: 'Daily at 07:00 AM',
    category: 'Services',
    channels: ['WhatsApp', 'App Push'],
    templatePreview: ''
  });

  // Channel Toggle
  const handleToggleChannel = (key) => {
    const updated = { ...channels, [key]: !channels[key] };
    setChannels(updated);
    localStorage.setItem('app_notif_channels', JSON.stringify(updated));
    onTriggerSuccess?.(`Channel setting updated.`);
  };

  // Rule Toggle
  const handleToggleRule = (id) => {
    const updated = triggerRules.map(r => {
      if (r.id === id) {
        const next = !r.isActive;
        onTriggerSuccess?.(`Trigger "${r.eventName}" is now ${next ? 'Active' : 'Paused'}`);
        return { ...r, isActive: next };
      }
      return r;
    });
    setTriggerRules(updated);
    localStorage.setItem('app_notif_rules', JSON.stringify(updated));
  };

  // Open Modal
  const handleOpenModal = (rule = null) => {
    if (rule) {
      setEditingId(rule.id);
      setRuleForm({
        eventName: rule.eventName,
        timing: rule.timing,
        category: rule.category,
        channels: rule.channels || ['WhatsApp'],
        templatePreview: rule.templatePreview || ''
      });
    } else {
      setEditingId(null);
      setRuleForm({
        eventName: '',
        timing: 'Daily at 07:00 AM',
        category: 'Services',
        channels: ['WhatsApp', 'App Push'],
        templatePreview: ''
      });
    }
    setIsModalOpen(true);
  };

  // Save Rule
  const handleSaveRule = (e) => {
    e.preventDefault();
    if (!ruleForm.eventName.trim()) return;

    if (editingId) {
      const updated = triggerRules.map(r => r.id === editingId ? { ...r, ...ruleForm } : r);
      setTriggerRules(updated);
      localStorage.setItem('app_notif_rules', JSON.stringify(updated));
      onTriggerSuccess?.('Notification trigger updated successfully!');
    } else {
      const newR = {
        id: Date.now(),
        ...ruleForm,
        isActive: true
      };
      const updated = [...triggerRules, newR];
      setTriggerRules(updated);
      localStorage.setItem('app_notif_rules', JSON.stringify(updated));
      onTriggerSuccess?.('New Notification trigger created!');
    }
    setIsModalOpen(false);
  };

  // Delete Rule
  const handleDeleteRule = (id) => {
    if (window.confirm("Remove this automated notification trigger?")) {
      const updated = triggerRules.filter(r => r.id !== id);
      setTriggerRules(updated);
      localStorage.setItem('app_notif_rules', JSON.stringify(updated));
      onTriggerSuccess?.('Notification trigger removed.');
    }
  };

  // Master Save
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_notif_channels', JSON.stringify(channels));
    localStorage.setItem('app_notif_rules', JSON.stringify(triggerRules));
    localStorage.setItem('app_notif_global_config', JSON.stringify(globalNotifConfig));
    onTriggerSuccess?.('All Notification Channels, Quiet Hours & Automated Triggers saved!');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">

        {/* Master Header Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Bell className="text-orange-400" size={22} />
                Church Automated Notification & Broadcast Hub
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure WhatsApp broadcasts, Mobile App push alerts, automated tithe receipts, and night DND rules
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
            >
              <Save size={15} />
              <span>Save Notifications Setup</span>
            </button>
          </div>

          {/* 1. Master Delivery Channels Switchboard */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Send size={14} />
              <span>1. Delivery Gateway Channels Switchboard</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* WhatsApp */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">WhatsApp Direct</h5>
                    <p className="text-[10px] text-slate-400">High Open Rate</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleChannel('whatsappEnabled')}
                  className={`cursor-pointer p-1 rounded-xl transition-all ${
                    channels.whatsappEnabled ? 'text-emerald-400' : 'text-slate-600'
                  }`}
                >
                  {channels.whatsappEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>

              {/* Mobile App Push */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Mobile App Push</h5>
                    <p className="text-[10px] text-slate-400">Instant Alert</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleChannel('appPushEnabled')}
                  className={`cursor-pointer p-1 rounded-xl transition-all ${
                    channels.appPushEnabled ? 'text-orange-400' : 'text-slate-600'
                  }`}
                >
                  {channels.appPushEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>

              {/* SMS Text */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">SMS Gateway</h5>
                    <p className="text-[10px] text-slate-400">Fallback Text</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleChannel('smsEnabled')}
                  className={`cursor-pointer p-1 rounded-xl transition-all ${
                    channels.smsEnabled ? 'text-sky-400' : 'text-slate-600'
                  }`}
                >
                  {channels.smsEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Email Digest</h5>
                    <p className="text-[10px] text-slate-400">Financial Reports</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleChannel('emailEnabled')}
                  className={`cursor-pointer p-1 rounded-xl transition-all ${
                    channels.emailEnabled ? 'text-purple-400' : 'text-slate-600'
                  }`}
                >
                  {channels.emailEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* 2. Automated Event Notification Rules Table */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={14} />
                  <span>2. Automated Event Triggers & Broadcast Schedules</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Define automated reminders for Sunday services, birthdays, and tithe receipts</p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>+ Create Notification Trigger</span>
              </button>
            </div>

            <div className="space-y-3">
              {triggerRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    rule.isActive ? 'bg-slate-900/80 border-white/10' : 'bg-slate-900/40 border-white/5 opacity-60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`w-2 h-2 rounded-full ${rule.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                      <h5 className="text-xs font-bold text-white">{rule.eventName}</h5>
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-semibold text-slate-300 uppercase">
                        {rule.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap font-mono">
                      <span className="text-orange-400 flex items-center gap-1">
                        <Clock size={11} /> {rule.timing}
                      </span>
                      <span>•</span>
                      <span className="text-slate-300">Channels: {rule.channels?.join(', ')}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2 rounded-xl border border-white/5">
                      "{rule.templatePreview}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleRule(rule.id)}
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
                      onClick={() => handleDeleteRule(rule.id)}
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

          {/* 3. DND Quiet Hours & Night Policy */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Clock size={14} />
              <span>3. DND Quiet Hours & Delivery Constraints</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Night DND Start Time (Quiet Hours)</label>
                <input
                  type="time"
                  value={globalNotifConfig.dndStartTime}
                  onChange={(e) => setGlobalNotifConfig({ ...globalNotifConfig, dndStartTime: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Morning Resume Time</label>
                <input
                  type="time"
                  value={globalNotifConfig.dndEndTime}
                  onChange={(e) => setGlobalNotifConfig({ ...globalNotifConfig, dndEndTime: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={globalNotifConfig.allowEmergencyOverride}
                onChange={(e) => setGlobalNotifConfig({ ...globalNotifConfig, allowEmergencyOverride: e.target.checked })}
                className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
              />
              <span>Allow Emergency Pastoral Prayer Broadcasts to bypass DND Quiet Hours</span>
            </label>
          </div>

          {/* Footer Save */}
          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save & Apply Notifications</span>
            </button>
          </div>

        </div>

      </form>

      {/* Add / Edit Notification Trigger Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bell className="text-orange-400" size={18} />
                {editingId ? 'Edit Notification Trigger' : 'Create Automated Notification Trigger'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveRule} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Notification Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fasting Prayer Weekly Reminder"
                  value={ruleForm.eventName}
                  onChange={(e) => setRuleForm({ ...ruleForm, eventName: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Category</label>
                  <select
                    value={ruleForm.category}
                    onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Services">Worship Services</option>
                    <option value="Greetings">Greetings & Wishes</option>
                    <option value="Finance">Finance & Receipts</option>
                    <option value="Pastoral Care">Pastoral Care & Visits</option>
                    <option value="General">General Circular</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Schedule Timing *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Friday 05:00 PM"
                    value={ruleForm.timing}
                    onChange={(e) => setRuleForm({ ...ruleForm, timing: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Message Body / Template Preview *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter message text with placeholders like {name}, {amount}..."
                  value={ruleForm.templatePreview}
                  onChange={(e) => setRuleForm({ ...ruleForm, templatePreview: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none resize-none"
                />
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
                  {editingId ? 'Update Trigger' : 'Save Trigger'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
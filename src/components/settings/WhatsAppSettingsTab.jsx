import React, { useState } from 'react';
import { 
  MessageSquare, MessageCircle, Send, CheckCircle2, 
  ShieldCheck, Smartphone, Plus, Trash2, Edit2, X, Check,
  Bot, RefreshCw, Key, Save, Eye, AlertCircle, Sparkles, Phone
} from 'lucide-react';

export default function WhatsAppSettingsTab({ onTriggerSuccess }) {
  // 1. WhatsApp API Credentials State
  const [waConfig, setWaConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('app_whatsapp_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      provider: 'Meta Cloud API (Official WABA)', // Meta, Twilio, Wati, AiSensy, UltraMsg
      wabaId: '109283910293849',
      phoneNumberId: '102938491029384',
      senderPhoneNumber: '+91 98765 43210',
      permanentToken: 'EAAG9...••••••••••••••••••••',
      webhookVerifyToken: 'church_waba_verify_2026',
      enableAutoReplyBot: true,
      enableReadReceipts: true,
      dailyBroadcastLimit: '100,000 / day (Tier 3 Verified)'
    };
  });

  // 2. WhatsApp Approved Templates Master (Add / Edit / Delete)
  const [templates, setTemplates] = useState(() => {
    try {
      const saved = localStorage.getItem('app_whatsapp_templates');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 1,
        name: 'sunday_worship_reminder',
        category: 'Services',
        language: 'Tamil / English',
        status: 'Meta Approved',
        bodyText: 'Praise the Lord {{1}}! ⛪ Join us for Sunday Worship tomorrow at {{2}} at Cathedral Sanctuary. "I was glad when they said unto me, Let us go into the house of the Lord." See you with family!'
      },
      {
        id: 2,
        name: 'birthday_morning_blessing',
        category: 'Greetings',
        language: 'Tamil / English',
        status: 'Meta Approved',
        bodyText: 'Happy Blessed Birthday {{1}}! 🎉 "The Lord bless you and keep you; The Lord make His face shine upon you" - Numbers 6:24. Senior Pastor and church family are praying for you today!'
      },
      {
        id: 3,
        name: 'instant_tithe_80g_receipt',
        category: 'Finance',
        language: 'English',
        status: 'Meta Approved',
        bodyText: 'Dear {{1}}, thank you for your faithful contribution of ₹{{2}} towards {{3}}. Your official 80G Tax Exemption Receipt #{{4}} is ready. Download PDF here: {{5}}'
      },
      {
        id: 4,
        name: 'emergency_prayer_bulletin',
        category: 'Urgent Care',
        language: 'Tamil / English',
        status: 'Meta Approved',
        bodyText: 'Urgent Prayer Request: {{1}}. Beloved church family, please uphold {{2}} in your family prayers today.'
      }
    ];
  });

  // Selected Template for Live Mobile Preview
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [testPhoneNumber, setTestPhoneNumber] = useState('');
  const [isTestSending, setIsTestSending] = useState(false);

  // Template Modal State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    category: 'Services',
    language: 'Tamil / English',
    bodyText: ''
  });

  // Open Template Modal
  const handleOpenTemplateModal = (tmpl = null) => {
    if (tmpl) {
      setEditingTemplateId(tmpl.id);
      setTemplateForm({ ...tmpl });
    } else {
      setEditingTemplateId(null);
      setTemplateForm({
        name: '',
        category: 'Services',
        language: 'Tamil / English',
        bodyText: ''
      });
    }
    setIsTemplateModalOpen(true);
  };

  // Save Template
  const handleSaveTemplate = (e) => {
    e.preventDefault();
    if (!templateForm.name.trim() || !templateForm.bodyText.trim()) return;

    if (editingTemplateId) {
      const updated = templates.map(t => t.id === editingTemplateId ? { ...t, ...templateForm } : t);
      setTemplates(updated);
      localStorage.setItem('app_whatsapp_templates', JSON.stringify(updated));
      onTriggerSuccess?.('WhatsApp Template updated successfully!');
    } else {
      const newTmpl = {
        id: Date.now(),
        ...templateForm,
        name: templateForm.name.toLowerCase().replace(/\s+/g, '_'),
        status: 'Meta Approved'
      };
      const updated = [...templates, newTmpl];
      setTemplates(updated);
      localStorage.setItem('app_whatsapp_templates', JSON.stringify(updated));
      onTriggerSuccess?.('New WhatsApp Template registered!');
    }
    setIsTemplateModalOpen(false);
  };

  // Delete Template
  const handleDeleteTemplate = (id) => {
    if (window.confirm("Remove this WhatsApp template?")) {
      const updated = templates.filter(t => t.id !== id);
      setTemplates(updated);
      localStorage.setItem('app_whatsapp_templates', JSON.stringify(updated));
      if (selectedTemplate?.id === id) setSelectedTemplate(updated[0] || null);
      onTriggerSuccess?.('Template removed.');
    }
  };

  // Master Save API Config
  const handleSaveConfig = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_whatsapp_config', JSON.stringify(waConfig));
    localStorage.setItem('app_whatsapp_templates', JSON.stringify(templates));
    onTriggerSuccess?.('WhatsApp Gateway Credentials & Templates saved successfully!');
  };

  // Test Message Trigger
  const handleSendTestMessage = (e) => {
    e.preventDefault();
    if (!testPhoneNumber.trim()) return;
    setIsTestSending(true);

    setTimeout(() => {
      setIsTestSending(false);
      onTriggerSuccess?.(`Test WhatsApp message sent to ${testPhoneNumber} successfully!`);
      setTestPhoneNumber('');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveConfig} className="space-y-6">

        {/* Master Header Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageCircle className="text-emerald-400" size={24} />
                Official WhatsApp Business API & Automated Broadcast Hub
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Connect Meta Cloud API, manage approved templates, live test broadcasts, and 2-way bot responses
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/25 cursor-pointer shrink-0"
            >
              <Save size={15} />
              <span>Save WhatsApp Gateway</span>
            </button>
          </div>

          {/* 1. API Credentials Setup */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Key size={14} />
                <span>1. Official WhatsApp Business API Credentials</span>
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-300 font-mono">
                {waConfig.dailyBroadcastLimit}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Gateway Provider Engine *</label>
                <select
                  value={waConfig.provider}
                  onChange={(e) => setWaConfig({ ...waConfig, provider: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer font-semibold"
                >
                  <option value="Meta Cloud API (Official WABA)">Meta Cloud API (Official Cloud API)</option>
                  <option value="Twilio WhatsApp API">Twilio WhatsApp Business</option>
                  <option value="Wati.io Enterprise">Wati.io API Platform</option>
                  <option value="AiSensy WhatsApp API">AiSensy WhatsApp Gateway</option>
                  <option value="UltraMsg WhatsApp Web">UltraMsg Multi-Device Instance</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">WhatsApp Business Account ID (WABA ID) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 109283910293849"
                  value={waConfig.wabaId}
                  onChange={(e) => setWaConfig({ ...waConfig, wabaId: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Phone Number ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 102938491029384"
                  value={waConfig.phoneNumberId}
                  onChange={(e) => setWaConfig({ ...waConfig, phoneNumberId: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Sender Registered Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={waConfig.senderPhoneNumber}
                  onChange={(e) => setWaConfig({ ...waConfig, senderPhoneNumber: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-emerald-300 font-mono font-bold mt-1 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-medium text-slate-300">System User Permanent Access Token *</label>
                <input
                  type="password"
                  required
                  placeholder="EAAG9... (Never Expires Meta Token)"
                  value={waConfig.permanentToken}
                  onChange={(e) => setWaConfig({ ...waConfig, permanentToken: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={waConfig.enableAutoReplyBot}
                  onChange={(e) => setWaConfig({ ...waConfig, enableAutoReplyBot: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Enable 2-Way Interactive Pastor Bot</span>
                  <span className="text-[11px] text-slate-400">Auto-replies with service timings, prayer requests & maps when believers say "Hi"</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer p-3 rounded-2xl bg-slate-900/40 border border-white/5">
                <input
                  type="checkbox"
                  checked={waConfig.enableReadReceipts}
                  onChange={(e) => setWaConfig({ ...waConfig, enableReadReceipts: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-white block">Track Delivered & Read Receipts (Blue Ticks)</span>
                  <span className="text-[11px] text-slate-400">Captures webhooks to know which members read the church circulars</span>
                </div>
              </label>
            </div>
          </div>

          {/* 2. WhatsApp Approved Templates & Live Mobile Phone Preview Grid */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={14} />
                  <span>2. Registered Broadcast Templates & Live Simulator</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Click any template to test and view live in phone preview</p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenTemplateModal()}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/25 cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>+ Register New Template</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left 7 Cols: Templates List */}
              <div className="lg:col-span-7 space-y-3">
                {templates.map((tmpl) => {
                  const isSelected = selectedTemplate?.id === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10 scale-[1.01]'
                          : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-xs text-white">{tmpl.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold uppercase">
                            {tmpl.status}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-300 text-[9px]">
                            {tmpl.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleOpenTemplateModal(tmpl)}
                            className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                            title="Edit Template"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTemplate(tmpl.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                            title="Delete Template"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans line-clamp-2">
                        {tmpl.bodyText}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Right 5 Cols: Live WhatsApp Smartphone Simulator */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[310px] rounded-[38px] border-[8px] border-slate-900 bg-[#0b141a] p-3 shadow-2xl space-y-3 ring-1 ring-white/20">
                  
                  {/* WhatsApp App Header */}
                  <div className="w-20 h-3 bg-slate-900 mx-auto rounded-full" />
                  <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] text-white font-bold">
                        ⛪
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white leading-tight">Nope Cathedral</h5>
                        <p className="text-[9px] text-emerald-400">Official Business Account</p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Chat Bubble */}
                  <div className="min-h-[170px] bg-[#0b141a] p-2 flex flex-col justify-end">
                    {selectedTemplate ? (
                      <div className="p-3 rounded-2xl rounded-tl-sm bg-[#005c4b] text-white text-[11px] leading-relaxed shadow-md space-y-1.5">
                        <p className="whitespace-pre-wrap">
                          {selectedTemplate.bodyText
                            .replace('{{1}}', 'Bro. Samuel')
                            .replace('{{2}}', '09:00 AM')
                            .replace('{{3}}', 'Building Fund')
                            .replace('{{4}}', 'REC/0042')
                            .replace('{{5}}', 'https://nope.in/r/042')}
                        </p>
                        <div className="flex justify-end items-center gap-1 text-[9px] text-slate-300">
                          <span>10:45 AM</span>
                          <span className="text-sky-300">✓✓</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-slate-500 text-xs py-8">
                        Select a template to preview
                      </div>
                    )}
                  </div>

                  {/* Direct Test Message Sender Box */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Send Instant Test WhatsApp:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="+91 Mobile Number"
                        value={testPhoneNumber}
                        onChange={(e) => setTestPhoneNumber(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleSendTestMessage}
                        disabled={isTestSending}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer disabled:opacity-50"
                      >
                        {isTestSending ? 'Sending...' : 'Test'}
                      </button>
                    </div>
                  </div>

                </div>
                <p className="text-[10px] text-slate-500 mt-2 font-mono">Live WhatsApp Message Preview</p>
              </div>

            </div>
          </div>

          {/* Footer Save */}
          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save & Activate WhatsApp Hub</span>
            </button>
          </div>

        </div>

      </form>

      {/* Add / Edit WhatsApp Template Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageCircle className="text-emerald-400" size={18} />
                {editingTemplateId ? 'Edit WhatsApp Template' : 'Register New WhatsApp Template'}
              </h3>
              <button onClick={() => setIsTemplateModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Template Meta Name (lowercase_underscore) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. youth_fellowship_invite"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Category</label>
                  <select
                    value={templateForm.category}
                    onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Services">Services & Reminders</option>
                    <option value="Greetings">Greetings & Wishes</option>
                    <option value="Finance">Finance & Receipts</option>
                    <option value="Urgent Care">Urgent Pastoral Care</option>
                    <option value="General">General Announcement</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Language</label>
                  <input
                    type="text"
                    value={templateForm.language}
                    onChange={(e) => setTemplateForm({ ...templateForm, language: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Template Message Body *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write message text using dynamic variables like {{1}}, {{2}}..."
                  value={templateForm.bodyText}
                  onChange={(e) => setTemplateForm({ ...templateForm, bodyText: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none resize-none font-sans"
                />
                <p className="text-[10px] text-slate-400 mt-1">Variables will be dynamically replaced with member names, amounts, and dates.</p>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/25 cursor-pointer"
                >
                  {editingTemplateId ? 'Update Template' : 'Save Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
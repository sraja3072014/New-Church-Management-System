import React, { useState } from 'react';
import { 
  UserPlus, Check, X, Save, Plus, Edit2, Trash2, Sliders, ShieldCheck 
} from 'lucide-react';

export default function MemberRegistrationTab({ onTriggerSuccess }) {
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
      requireBaptismDate: false,
      requireFamilyHeadAssignment: true
    };
  });

  const [customFields, setCustomFields] = useState(() => {
    const saved = localStorage.getItem('app_registration_custom_fields');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, label: 'Blood Group', type: 'Dropdown', required: false, options: 'A+, B+, O+, AB+, A-, B-, O-, AB-' },
      { id: 2, label: 'Spiritual Gifts / Ministry Interest', type: 'Text', required: false, options: '' },
      { id: 3, label: 'Emergency Contact Person', type: 'Text', required: true, options: '' }
    ];
  });

  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [fieldForm, setFieldForm] = useState({ label: '', type: 'Text', required: false, options: '' });

  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_member_registration_config', JSON.stringify(formConfig));
    localStorage.setItem('app_registration_custom_fields', JSON.stringify(customFields));
    onTriggerSuccess?.('Member Registration Rules & Custom Fields saved successfully!');
  };

  const handleAddField = (e) => {
    e.preventDefault();
    if (!fieldForm.label.trim()) return;

    const newField = { id: Date.now(), ...fieldForm };
    const updated = [...customFields, newField];
    setCustomFields(updated);
    localStorage.setItem('app_registration_custom_fields', JSON.stringify(updated));
    setFieldForm({ label: '', type: 'Text', required: false, options: '' });
    setIsFieldModalOpen(false);
    onTriggerSuccess?.('Custom registration field added!');
  };

  const handleDeleteField = (id) => {
    if (window.confirm("Remove this field from the registration form?")) {
      const updated = customFields.filter(f => f.id !== id);
      setCustomFields(updated);
      localStorage.setItem('app_registration_custom_fields', JSON.stringify(updated));
      onTriggerSuccess?.('Field removed.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">
        <div className="glass-card rounded-3xl p-8 space-y-6">
          
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <UserPlus className="text-orange-400" size={22} />
                Member Registration Setup & Custom Fields
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize required intake questions, ID generation rules, and digital form settings
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
            >
              <Save size={15} />
              <span>Save Registration Setup</span>
            </button>
          </div>

          {/* Core Validation Toggles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              1. Registration Workflow & Automation
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white block">Auto-Generate Believer Member ID</span>
                  <span className="text-[11px] text-slate-400">Assigns unique church ID code automatically</span>
                </div>
                <input
                  type="checkbox"
                  checked={formConfig.autoGenerateMemberId}
                  onChange={(e) => setFormConfig({ ...formConfig, autoGenerateMemberId: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
              </label>

              <label className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white block">Require Family Head Linkage</span>
                  <span className="text-[11px] text-slate-400">Must link to an existing or new household</span>
                </div>
                <input
                  type="checkbox"
                  checked={formConfig.requireFamilyHeadAssignment}
                  onChange={(e) => setFormConfig({ ...formConfig, requireFamilyHeadAssignment: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
              </label>

              <label className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white block">Allow Online Self-Registration</span>
                  <span className="text-[11px] text-slate-400">Enables public web registration link for newcomers</span>
                </div>
                <input
                  type="checkbox"
                  checked={formConfig.allowOnlineSelfRegistration}
                  onChange={(e) => setFormConfig({ ...formConfig, allowOnlineSelfRegistration: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
              </label>

              <label className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-white block">Notify Pastor on New Registration</span>
                  <span className="text-[11px] text-slate-400">Sends instant SMS/WhatsApp alert to area pastor</span>
                </div>
                <input
                  type="checkbox"
                  checked={formConfig.notifyPastorOnNewRegistration}
                  onChange={(e) => setFormConfig({ ...formConfig, notifyPastorOnNewRegistration: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Custom Fields Section */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                2. Custom Form Questions & Additional Fields
              </h4>

              <button
                type="button"
                onClick={() => setIsFieldModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
              >
                <Plus size={13} />
                <span>+ Add Field</span>
              </button>
            </div>

            <div className="space-y-2">
              {customFields.map((field) => (
                <div key={field.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{field.label}</h5>
                    <p className="text-[10px] text-slate-400">Type: {field.type} • {field.required ? 'Mandatory' : 'Optional'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteField(field.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Save */}
          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save Changes</span>
            </button>
          </div>

        </div>
      </form>

      {/* Add Field Modal */}
      {isFieldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Add Custom Registration Field</h3>
              <button onClick={() => setIsFieldModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddField} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium">Field Question / Label *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Previous Church Affiliation"
                  value={fieldForm.label}
                  onChange={(e) => setFieldForm({ ...fieldForm, label: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Input Format Type</label>
                <select
                  value={fieldForm.type}
                  onChange={(e) => setFieldForm({ ...fieldForm, type: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="Text">Short Text Box</option>
                  <option value="Dropdown">Dropdown Selection</option>
                  <option value="Date">Date Picker</option>
                  <option value="Checkbox">Yes/No Checkbox</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={fieldForm.required}
                  onChange={(e) => setFieldForm({ ...fieldForm, required: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <span>Make this question mandatory</span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFieldModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Add Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { 
  ShieldAlert, CheckSquare, Plus, Trash2, Edit2, X, Check, 
  Save, AlertTriangle, Users, Lock, Clock, EyeOff, 
  CheckCircle2, ArrowRight, FileText, UserCheck, Sparkles
} from 'lucide-react';

export default function HarassmentAbuseTasksTab({ onTriggerSuccess }) {
  const [policyConfig, setPolicyConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('app_harassment_policy_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      enableAnonymousReporting: true,
      autoCreateInvestigationTask: true,
      iccPresidingOfficer: 'Rev. Senior Lady Pastor',
      legalAdvisorEmail: 'legal-counsel@cathedraltrust.org',
      mandatorySlaHours: '24',
      strictDataEncryption: true,
      notifySeniorPastorInstantly: true
    };
  });

  const [tasksList, setTasksList] = useState(() => {
    try {
      const saved = localStorage.getItem('app_harassment_tasks_list');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 1,
        title: 'Immediate Confidential Inquiry & Statement Recording',
        category: 'POSH / Harassment Inquiry',
        assignedTo: 'Internal Complaints Committee (ICC Panel)',
        priority: 'High Priority',
        dueWithin: '24 Hours',
        status: 'Active',
        description: 'Convene closed-door inquiry with complainant, ensuring complete identity protection and audio-free recording.'
      },
      {
        id: 2,
        title: 'Child Safety & POCSO Safeguarding Verification',
        category: 'Child Safety & POCSO',
        assignedTo: 'Sunday School Superintendent & Legal Officer',
        priority: 'Critical / Urgent',
        dueWithin: '12 Hours',
        status: 'Active',
        description: 'Mandatory verification protocol for child ministry volunteers and immediate protective separation during active review.'
      },
      {
        id: 3,
        title: 'Pastoral Counseling & Emotional Trauma Support',
        category: 'Victim Care & Support',
        assignedTo: 'Certified Pastoral Counseling Team',
        priority: 'Medium Priority',
        dueWithin: '48 Hours',
        status: 'Active',
        description: 'Provide confidential spiritual, psychological, and medical relief support to the affected family.'
      },
      {
        id: 4,
        title: 'Final Disciplinary & Legal Compliance Report Filing',
        category: 'Legal & Board Governance',
        assignedTo: 'Senior Pastor & Managing Trustees',
        priority: 'High Priority',
        dueWithin: '7 Days',
        status: 'Active',
        description: 'Submit formal fact-finding report and disciplinary verdict to the Church Board of Trustees.'
      }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    category: 'POSH / Harassment Inquiry',
    assignedTo: 'Internal Complaints Committee (ICC Panel)',
    priority: 'High Priority',
    dueWithin: '24 Hours',
    description: ''
  });

  const handleOpenModal = (task = null) => {
    if (task) {
      setEditingId(task.id);
      setTaskForm({ ...task });
    } else {
      setEditingId(null);
      setTaskForm({
        title: '',
        category: 'POSH / Harassment Inquiry',
        assignedTo: 'Internal Complaints Committee (ICC Panel)',
        priority: 'High Priority',
        dueWithin: '24 Hours',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    let updated;
    if (editingId) {
      updated = tasksList.map(t => t.id === editingId ? { ...t, ...taskForm } : t);
      onTriggerSuccess?.('Incident response task updated successfully!');
    } else {
      const newTask = {
        id: Date.now(),
        ...taskForm,
        status: 'Active'
      };
      updated = [...tasksList, newTask];
      onTriggerSuccess?.('New Safeguarding & Inquiry Task protocol created!');
    }

    setTasksList(updated);
    localStorage.setItem('app_harassment_tasks_list', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Remove this safeguarding task protocol?")) {
      const updated = tasksList.filter(t => t.id !== id);
      setTasksList(updated);
      localStorage.setItem('app_harassment_tasks_list', JSON.stringify(updated));
      onTriggerSuccess?.('Task protocol removed.');
    }
  };

  const handleToggleTask = (id) => {
    const updated = tasksList.map(t => {
      if (t.id === id) {
        const next = t.status === 'Active' ? 'Disabled' : 'Active';
        onTriggerSuccess?.(`Task status: ${next}`);
        return { ...t, status: next };
      }
      return t;
    });
    setTasksList(updated);
    localStorage.setItem('app_harassment_tasks_list', JSON.stringify(updated));
  };

  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_harassment_policy_config', JSON.stringify(policyConfig));
    localStorage.setItem('app_harassment_tasks_list', JSON.stringify(tasksList));
    onTriggerSuccess?.('Anti-Harassment Policies & Investigation Task protocols saved!');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">
        <div className="glass-card rounded-3xl p-8 space-y-6">
          
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="text-rose-400" size={24} />
                Harassment & Abuse Safeguarding • Incident Task Protocol
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage POSH compliance, child abuse protection (POCSO), confidential complaints, and automated task workflows
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
            >
              <Save size={15} />
              <span>Save Policy & Tasks</span>
            </button>
          </div>

          {/* Policy Config */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <Lock size={14} />
              <span>1. Confidential Governance & Safeguarding Panel (ICC)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">ICC Presiding Officer / Leader *</label>
                <input
                  type="text"
                  required
                  value={policyConfig.iccPresidingOfficer}
                  onChange={(e) => setPolicyConfig({ ...policyConfig, iccPresidingOfficer: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Legal Counsel / Designated Email</label>
                <input
                  type="email"
                  value={policyConfig.legalAdvisorEmail}
                  onChange={(e) => setPolicyConfig({ ...policyConfig, legalAdvisorEmail: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Mandatory Initial Response SLA</label>
                <select
                  value={policyConfig.mandatorySlaHours}
                  onChange={(e) => setPolicyConfig({ ...policyConfig, mandatorySlaHours: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="12">Within 12 Hours (Emergency POCSO)</option>
                  <option value="24">Within 24 Hours (Standard POSH)</option>
                  <option value="48">Within 48 Hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Incident Tasks */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare size={14} />
                  <span>2. Automated Safeguarding & Inquiry Task Workflows</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Tasks dispatched to pastoral council and legal team during an incident</p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>+ Create Task Workflow</span>
              </button>
            </div>

            <div className="space-y-3">
              {tasksList.map((task) => (
                <div
                  key={task.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    task.status === 'Active'
                      ? 'bg-slate-900/80 border-white/10 hover:border-rose-500/30 shadow-lg shadow-black/20'
                      : 'bg-slate-900/40 border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`w-2 h-2 rounded-full ${task.status === 'Active' ? 'bg-rose-400 animate-pulse' : 'bg-slate-600'}`} />
                        <h5 className="text-xs font-bold text-white">{task.title}</h5>
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-[9px] font-bold text-rose-300 uppercase">
                          {task.priority}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-300 text-[9px]">
                          {task.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{task.description}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(task)}
                        className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                        title="Edit Task"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <UserCheck size={14} className="text-rose-400" />
                      <span className="text-slate-400">Assigned To: <strong className="text-white">{task.assignedTo}</strong></span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-orange-400 font-mono flex items-center gap-1">
                        <Clock size={12} /> Target SLA: {task.dueWithin}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleTask(task.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                          task.status === 'Active'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500 border border-white/5'
                        }`}
                      >
                        {task.status === 'Active' ? '● Active Workflow' : '○ Paused'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save Safeguarding & Task Rules</span>
            </button>
          </div>

        </div>
      </form>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckSquare className="text-rose-400" size={18} />
                {editingId ? 'Edit Incident Task Protocol' : 'Create Safeguarding Task Protocol'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Task Action Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mandatory Preliminary Statement Recording"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Category</label>
                  <select
                    value={taskForm.category}
                    onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="POSH / Harassment Inquiry">POSH / Harassment Inquiry</option>
                    <option value="Child Safety & POCSO">Child Safety & POCSO</option>
                    <option value="Victim Care & Support">Victim Care & Support</option>
                    <option value="Legal & Board Governance">Legal & Board Governance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Priority Level</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Critical / Urgent">Critical / Urgent</option>
                    <option value="High Priority">High Priority</option>
                    <option value="Medium Priority">Medium Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Task Action Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Specify confidential inquiry procedures, statement guidelines..."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
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
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  {editingId ? 'Update Task' : 'Save Task Protocol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
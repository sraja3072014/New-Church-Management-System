import React, { useState } from 'react';
import { 
  Shield, Check, X, Save, RefreshCw, KeyRound
} from 'lucide-react';

export default function AccessControlTab({ onTriggerSuccess }) {
  const roles = [
    { id: 'super_admin', label: 'Super Admin / Senior Pastor', badge: 'Full Control' },
    { id: 'branch_pastor', label: 'Branch Pastor', badge: 'Campus Admin' },
    { id: 'accountant', label: 'Finance Lead / Accountant', badge: 'Accounts Only' },
    { id: 'media_leader', label: 'Media & Tech Lead', badge: 'Media Only' },
    { id: 'ministry_staff', label: 'Ministry Staff / Coordinator', badge: 'Standard Staff' }
  ];

  const [selectedRole, setSelectedRole] = useState('branch_pastor');

  const defaultMatrix = {
    super_admin: {
      viewMembers: true, addMembers: true, editMembers: true, deleteMembers: true, exportMemberData: true,
      viewFinances: true, collectTithes: true, issueReceipts: true, viewFinancialReports: true,
      viewConfidentialNotes: true, assignPastoralVisits: true, managePrayerRequests: true,
      sendSmsWhatsapp: true, broadcastPushNotifs: true,
      manageAttendance: true, configureChurchSettings: true, manageBranches: true
    },
    branch_pastor: {
      viewMembers: true, addMembers: true, editMembers: true, deleteMembers: false, exportMemberData: true,
      viewFinances: true, collectTithes: true, issueReceipts: true, viewFinancialReports: false,
      viewConfidentialNotes: true, assignPastoralVisits: true, managePrayerRequests: true,
      sendSmsWhatsapp: true, broadcastPushNotifs: true,
      manageAttendance: true, configureChurchSettings: false, manageBranches: false
    },
    accountant: {
      viewMembers: true, addMembers: false, editMembers: false, deleteMembers: false, exportMemberData: false,
      viewFinances: true, collectTithes: true, issueReceipts: true, viewFinancialReports: true,
      viewConfidentialNotes: false, assignPastoralVisits: false, managePrayerRequests: false,
      sendSmsWhatsapp: false, broadcastPushNotifs: false,
      manageAttendance: false, configureChurchSettings: false, manageBranches: false
    },
    media_leader: {
      viewMembers: true, addMembers: false, editMembers: false, deleteMembers: false, exportMemberData: false,
      viewFinances: false, collectTithes: false, issueReceipts: false, viewFinancialReports: false,
      viewConfidentialNotes: false, assignPastoralVisits: false, managePrayerRequests: false,
      sendSmsWhatsapp: true, broadcastPushNotifs: true,
      manageAttendance: true, configureChurchSettings: false, manageBranches: false
    },
    ministry_staff: {
      viewMembers: true, addMembers: true, editMembers: false, deleteMembers: false, exportMemberData: false,
      viewFinances: false, collectTithes: false, issueReceipts: false, viewFinancialReports: false,
      viewConfidentialNotes: false, assignPastoralVisits: false, managePrayerRequests: true,
      sendSmsWhatsapp: false, broadcastPushNotifs: false,
      manageAttendance: true, configureChurchSettings: false, manageBranches: false
    }
  };

  const [permissionsMatrix, setPermissionsMatrix] = useState(() => {
    const saved = localStorage.getItem('app_rbac_permissions_matrix');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return defaultMatrix;
  });

  const permissionSections = [
    {
      title: '1. Member Directory & Family Records',
      permissions: [
        { key: 'viewMembers', label: 'View Member Profiles & Directory', desc: 'Can browse full believer list and family trees' },
        { key: 'addMembers', label: 'Register New Believers / Families', desc: 'Can submit registration forms' },
        { key: 'editMembers', label: 'Edit Member Records & Information', desc: 'Can change phone numbers, addresses, and status' },
        { key: 'deleteMembers', label: 'Delete / Archive Member Profiles', desc: 'Can remove believer records from the system' },
        { key: 'exportMemberData', label: 'Export Data (Excel & PDF)', desc: 'Can download church member contact sheets' }
      ]
    },
    {
      title: '2. Accounts, Tithes & Digital Receipts',
      permissions: [
        { key: 'viewFinances', label: 'View Giving & Tithe Ledgers', desc: 'Can view tithes, pledges, and offering transactions' },
        { key: 'collectTithes', label: 'Entry & Collect Giving Offline/Online', desc: 'Can log Sunday collections and pledges' },
        { key: 'issueReceipts', label: 'Generate & Issue Official Tax Receipts', desc: 'Can print and send 80G digital bills' },
        { key: 'viewFinancialReports', label: 'Access Audit & Financial Statement Reports', desc: 'Can generate annual income/expense summaries' }
      ]
    },
    {
      title: '3. Pastoral Care & Confidential Ministry Notes',
      permissions: [
        { key: 'viewConfidentialNotes', label: 'View Pastoral Confidential Care Records', desc: 'Access highly sensitive counseling and visit logs' },
        { key: 'assignPastoralVisits', label: 'Assign Pastors for Home Visits & Hospital Care', desc: 'Can create and allocate visitation tasks' },
        { key: 'managePrayerRequests', label: 'Receive & Manage Believer Prayer Requests', desc: 'Can view prayer requests submitted via Member App' }
      ]
    },
    {
      title: '4. WhatsApp, SMS & Live Circulars',
      permissions: [
        { key: 'sendSmsWhatsapp', label: 'Send Automated SMS & WhatsApp Broadcasts', desc: 'Can send event circulars and emergency alerts' },
        { key: 'broadcastPushNotifs', label: 'Send Mobile App Push Notifications', desc: 'Can broadcast app popups to all congregation members' }
      ]
    },
    {
      title: '5. Administration, QR Attendance & Setup',
      permissions: [
        { key: 'manageAttendance', label: 'Sunday QR Attendance Scanner & Absent Logs', desc: 'Can operate service check-in scanners' },
        { key: 'configureChurchSettings', label: 'Modify Main Church & System Configurations', desc: 'Can edit logos, payment keys, and branding' },
        { key: 'manageBranches', label: 'Multi-Campus Branch Provisioning', desc: 'Can add, edit, or remove satellite churches' }
      ]
    }
  ];

  const handleTogglePermission = (permKey) => {
    if (selectedRole === 'super_admin') {
      alert('Super Administrator permissions are locked and cannot be modified.');
      return;
    }

    const updated = {
      ...permissionsMatrix,
      [selectedRole]: {
        ...permissionsMatrix[selectedRole],
        [permKey]: !permissionsMatrix[selectedRole][permKey]
      }
    };
    setPermissionsMatrix(updated);
    localStorage.setItem('app_rbac_permissions_matrix', JSON.stringify(updated));
  };

  const handleSavePermissions = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_rbac_permissions_matrix', JSON.stringify(permissionsMatrix));
    onTriggerSuccess?.(`Access Control Rules for ${roles.find(r => r.id === selectedRole)?.label} saved!`);
  };

  const handleResetToDefault = () => {
    if (window.confirm("Reset permissions for this role to system defaults?")) {
      const updated = {
        ...permissionsMatrix,
        [selectedRole]: { ...defaultMatrix[selectedRole] }
      };
      setPermissionsMatrix(updated);
      localStorage.setItem('app_rbac_permissions_matrix', JSON.stringify(updated));
      onTriggerSuccess?.('Permissions reset to system defaults.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-8 space-y-6">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="text-orange-400" size={22} />
              Role-Based Access Control (RBAC) Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure granular security permissions for each portal administrator and ministry staff role
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleSavePermissions}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
            >
              <Save size={14} />
              <span>Save Permissions</span>
            </button>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Select Role to Configure Permissions:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {roles.map((r) => {
              const isSelected = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500/20 to-rose-500/20 border-orange-500/50 shadow-lg scale-[1.02]'
                      : 'bg-slate-900/60 border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-orange-400 animate-pulse' : 'bg-slate-600'}`} />
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {r.badge}
                    </span>
                  </div>
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {r.label}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Status Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <KeyRound size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                Editing Permissions for: <span className="text-orange-400">{roles.find(r => r.id === selectedRole)?.label}</span>
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {selectedRole === 'super_admin' 
                  ? 'Super Admins possess permanent unrestricted master access across all system modules.' 
                  : 'Toggle checkboxes below to instantly grant or revoke access privileges.'}
              </p>
            </div>
          </div>

          <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
            selectedRole === 'super_admin' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {selectedRole === 'super_admin' ? 'Locked (Master)' : 'Customizable'}
          </span>
        </div>

        {/* Permission Check Matrix Modules */}
        <div className="space-y-6 pt-2">
          {permissionSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider border-b border-white/5 pb-2">
                {section.title}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.permissions.map((perm) => {
                  const isGranted = permissionsMatrix[selectedRole]?.[perm.key] || false;
                  return (
                    <div
                      key={perm.key}
                      onClick={() => handleTogglePermission(perm.key)}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                        isGranted
                          ? 'bg-slate-900/80 border-emerald-500/30 hover:border-emerald-500/50'
                          : 'bg-slate-900/40 border-white/5 hover:border-white/10 opacity-70'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-white">{perm.label}</h5>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{perm.desc}</p>
                      </div>

                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                        isGranted ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-800 border border-white/10 text-slate-500'
                      }`}>
                        {isGranted ? <Check size={14} /> : <X size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Save */}
        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleSavePermissions}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
          >
            <Save size={15} />
            <span>Save Role Permissions</span>
          </button>
        </div>
      </div>
    </div>
  );
}
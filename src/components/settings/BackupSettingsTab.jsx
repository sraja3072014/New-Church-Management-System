import React, { useState } from 'react';
import { 
  Database, Cloud, Download, Upload, Clock, 
  Save, ShieldCheck, HardDrive, RefreshCw, Trash2, 
  Edit2, X, Plus, FolderGit2, History, AlertTriangle, CheckCircle2
} from 'lucide-react';

export default function BackupSettingsTab({ onTriggerSuccess }) {
  // 1. Auto Backup Schedule State
  const [scheduleConfig, setScheduleConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('app_backup_schedule');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      autoBackupEnabled: true,
      frequency: 'Daily at 02:00 AM IST',
      retentionDays: '30 Days',
      notifyAdminOnFailure: true,
      encryptBackupFiles: true
    };
  });

  // 2. Cloud Storage Providers List (+ Add / Edit / Delete)
  const [cloudProviders, setCloudProviders] = useState(() => {
    try {
      const saved = localStorage.getItem('app_cloud_providers');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'gdrive_vault',
        name: 'Google Drive Enterprise Vault',
        providerType: 'Google Drive',
        targetFolderOrBucket: '1A2b3C4d5E6f_ChurchVault2026',
        clientEmail: 'church-backup-bot@gserviceaccount.com',
        isPrimary: true
      },
      {
        id: 'aws_s3',
        name: 'Amazon Web Services S3 Bucket',
        providerType: 'AWS S3',
        targetFolderOrBucket: 'nope-cathedral-database-backups',
        clientEmail: 'ap-south-1',
        isPrimary: false
      },
      {
        id: 'local_nas',
        name: 'On-Premise Local Server Directory',
        providerType: 'Local Server Path',
        targetFolderOrBucket: 'D:\\ChurchData\\Backups\\SQL_Snapshots\\',
        clientEmail: 'Internal Server',
        isPrimary: false
      }
    ];
  });

  // 3. Backup Log History
  const [backupLogs, setBackupLogs] = useState([
    { id: 'dump_1042', fileName: 'Church_DB_Snapshot_2026_08_15.sql.gz', size: '42.8 MB', date: '15/08/2026 02:00 AM', status: 'Success', vault: 'Google Drive' },
    { id: 'dump_1041', fileName: 'Church_DB_Snapshot_2026_08_14.sql.gz', size: '42.1 MB', date: '14/08/2026 02:00 AM', status: 'Success', vault: 'Google Drive' },
    { id: 'dump_1040', fileName: 'Church_DB_Snapshot_2026_08_13.sql.gz', size: '41.5 MB', date: '13/08/2026 02:00 AM', status: 'Success', vault: 'AWS S3' }
  ]);

  // Modal State for Cloud Provider
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [cloudForm, setCloudForm] = useState({
    name: '',
    providerType: 'Google Drive',
    targetFolderOrBucket: '',
    clientEmail: '',
    apiKeyOrSecret: ''
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setCloudForm({ ...item, apiKeyOrSecret: '••••••••••••••••' });
    } else {
      setEditingId(null);
      setCloudForm({
        name: '',
        providerType: 'Google Drive',
        targetFolderOrBucket: '',
        clientEmail: '',
        apiKeyOrSecret: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveCloudProvider = (e) => {
    e.preventDefault();
    if (!cloudForm.name.trim() || !cloudForm.targetFolderOrBucket.trim()) return;

    if (editingId) {
      const updated = cloudProviders.map(c => c.id === editingId ? { ...c, ...cloudForm } : c);
      setCloudProviders(updated);
      localStorage.setItem('app_cloud_providers', JSON.stringify(updated));
      onTriggerSuccess?.('Cloud storage provider updated successfully!');
    } else {
      const newProvider = {
        id: `cloud_${Date.now()}`,
        ...cloudForm,
        isPrimary: cloudProviders.length === 0
      };
      const updated = [...cloudProviders, newProvider];
      setCloudProviders(updated);
      localStorage.setItem('app_cloud_providers', JSON.stringify(updated));
      onTriggerSuccess?.('New Cloud Storage provider connected!');
    }
    setIsModalOpen(false);
  };

  const handleDeleteCloudProvider = (id) => {
    if (window.confirm("Remove this cloud storage provider?")) {
      const updated = cloudProviders.filter(c => c.id !== id);
      setCloudProviders(updated);
      localStorage.setItem('app_cloud_providers', JSON.stringify(updated));
      onTriggerSuccess?.('Storage provider removed.');
    }
  };

  const handleSetPrimaryStorage = (id) => {
    const updated = cloudProviders.map(c => ({
      ...c,
      isPrimary: c.id === id
    }));
    setCloudProviders(updated);
    localStorage.setItem('app_cloud_providers', JSON.stringify(updated));
    onTriggerSuccess?.('Primary backup storage destination updated!');
  };

  const handleTriggerManualBackup = () => {
    onTriggerSuccess?.('Generating encrypted SQL snapshot... Snapshot download started!');
    const newLog = {
      id: `dump_${Date.now().toString().slice(-4)}`,
      fileName: `Church_DB_Snapshot_${new Date().toISOString().slice(0, 10).replace(/-/g, '_')}.sql.gz`,
      size: '43.2 MB',
      date: new Date().toLocaleString('en-GB'),
      status: 'Success',
      vault: cloudProviders.find(c => c.isPrimary)?.name || 'Manual Local'
    };
    setBackupLogs([newLog, ...backupLogs]);
  };

  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_backup_schedule', JSON.stringify(scheduleConfig));
    localStorage.setItem('app_cloud_providers', JSON.stringify(cloudProviders));
    onTriggerSuccess?.('Database Backup schedule & Cloud Vault settings saved!');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">

        {/* Master Header Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="text-orange-400" size={24} />
                Database Backup & Disaster Recovery Center
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Automated cloud backups, Google Drive/AWS S3 connections, instant snapshots, and restore logs
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTriggerManualBackup}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 rounded-xl text-xs font-semibold cursor-pointer shrink-0"
              >
                <Download size={14} />
                <span>Instant Snapshot</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
              >
                <Save size={15} />
                <span>Save Backup Setup</span>
              </button>
            </div>
          </div>

          {/* 1. Auto Backup Scheduler Controls */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Clock size={15} />
              <span>1. Automated Backup Scheduler & Retention Policy</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Auto Backup Frequency *</label>
                <select
                  value={scheduleConfig.frequency}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, frequency: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer font-semibold"
                >
                  <option value="Daily at 02:00 AM IST">Daily at 02:00 AM IST (Recommended)</option>
                  <option value="Every 12 Hours">Every 12 Hours</option>
                  <option value="Weekly on Sunday Midnight">Weekly on Sunday Midnight</option>
                  <option value="Disabled">Disable Automated Backups</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Old Snapshot Retention Period</label>
                <select
                  value={scheduleConfig.retentionDays}
                  onChange={(e) => setScheduleConfig({ ...scheduleConfig, retentionDays: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  <option value="30 Days">Auto-Purge Backups Older Than 30 Days</option>
                  <option value="90 Days">Retain Up To 90 Days</option>
                  <option value="Forever (Keep All)">Forever (Keep All Historical Dumps)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scheduleConfig.encryptBackupFiles}
                    onChange={(e) => setScheduleConfig({ ...scheduleConfig, encryptBackupFiles: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
                  <span>AES-256 Bit Encryption for Database Dumps</span>
                </label>
              </div>
            </div>
          </div>

          {/* 2. Cloud Storage Vaults (+ Add / Edit / Delete) */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <Cloud size={15} />
                  <span>2. Cloud Backup Vault Destinations (Google Drive, AWS S3, Local)</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Manage connected cloud storage services for automated remote backups</p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>+ Connect Cloud Storage</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cloudProviders.map((cp) => (
                <div
                  key={cp.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    cp.isPrimary
                      ? 'bg-slate-900/90 border-orange-500/40 shadow-lg shadow-orange-500/5'
                      : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h5 className="text-xs font-bold text-white">{cp.name}</h5>
                        {cp.isPrimary && (
                          <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[9px] font-bold uppercase">
                            Primary Vault
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{cp.providerType}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(cp)}
                        className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                        title="Edit Provider"
                      >
                        <Edit2 size={13} />
                      </button>
                      {!cp.isPrimary && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCloudProvider(cp.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                          title="Delete Provider"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Folder / Bucket:</span>
                      <span className="text-white truncate max-w-[140px]">{cp.targetFolderOrBucket}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Service Account:</span>
                      <span className="text-slate-300 truncate max-w-[140px]">{cp.clientEmail || 'Configured'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {!cp.isPrimary ? (
                      <button
                        type="button"
                        onClick={() => handleSetPrimaryStorage(cp.id)}
                        className="text-orange-400 hover:text-orange-300 text-[11px] font-semibold cursor-pointer"
                      >
                        ★ Set as Primary Vault
                      </button>
                    ) : (
                      <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                        ● Active Destination
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Backup History Logs */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <History size={15} />
              <span>3. Backup Snapshots History & Download Logs</span>
            </h4>

            <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                    <th className="p-3.5">Snapshot File Name</th>
                    <th className="p-3.5">Size</th>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Target Vault</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200 font-mono">
                  {backupLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white text-xs font-sans">{log.fileName}</td>
                      <td className="p-3.5 text-slate-300">{log.size}</td>
                      <td className="p-3.5 text-slate-400 text-[11px]">{log.date}</td>
                      <td className="p-3.5 text-orange-300 text-[11px] font-sans">{log.vault}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {log.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-sans">
                        <button
                          type="button"
                          onClick={() => onTriggerSuccess?.(`Downloading ${log.fileName}...`)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 rounded-xl text-[11px] font-bold cursor-pointer"
                        >
                          Download SQL
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Save */}
          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save & Apply Backup Settings</span>
            </button>
          </div>

        </div>

      </form>

      {/* Add / Edit Cloud Provider Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cloud className="text-orange-400" size={18} />
                {editingId ? 'Edit Cloud Storage Provider' : 'Connect Cloud Storage Provider'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCloudProvider} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Storage Connection Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google Drive Main Vault / AWS Production"
                  value={cloudForm.name}
                  onChange={(e) => setCloudForm({ ...cloudForm, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Cloud Provider Platform *</label>
                  <select
                    value={cloudForm.providerType}
                    onChange={(e) => setCloudForm({ ...cloudForm, providerType: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Google Drive">Google Drive Enterprise</option>
                    <option value="AWS S3">Amazon Web Services (AWS S3)</option>
                    <option value="Firebase Storage">Firebase Cloud Storage</option>
                    <option value="Cloudflare R2">Cloudflare R2 Object Storage</option>
                    <option value="Local Server Path">On-Premise Local Server Directory</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Target Folder ID / Bucket / Directory Path *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1A2b3C... or bucket-name or D:\Backups\"
                    value={cloudForm.targetFolderOrBucket}
                    onChange={(e) => setCloudForm({ ...cloudForm, targetFolderOrBucket: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Service Account Email / Access Key</label>
                  <input
                    type="text"
                    placeholder="bot@project.iam.gserviceaccount.com or AKIA..."
                    value={cloudForm.clientEmail}
                    onChange={(e) => setCloudForm({ ...cloudForm, clientEmail: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">API Secret Key / Private Key JSON</label>
                  <input
                    type="password"
                    placeholder="Enter Secret Key or JSON string"
                    value={cloudForm.apiKeyOrSecret}
                    onChange={(e) => setCloudForm({ ...cloudForm, apiKeyOrSecret: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>
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
                  {editingId ? 'Update Provider' : 'Save Cloud Provider'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
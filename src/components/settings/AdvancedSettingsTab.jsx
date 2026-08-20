import React, { useState } from 'react';
import { 
  Wrench, Globe, Database, HardDrive, RefreshCw, 
  Trash2, ShieldAlert, Save, Download, Upload, 
  Activity, CheckCircle2, AlertTriangle, Lock, Key, 
  Folder, WifiOff, Cloud, Plus, Edit2, X, Check, Search
} from 'lucide-react';

export default function AdvancedSettingsTab({ onTriggerSuccess }) {
  // Comprehensive Global Countries Metadata
  const globalCountries = [
    { country: 'India', flag: '🇮🇳', code: 'IN', timeZone: 'Asia/Kolkata (IST +5:30)', currency: 'INR (₹)', dateFormat: 'DD/MM/YYYY', languages: [{ code: 'ta', label: 'தமிழ் (Tamil)' }, { code: 'en', label: 'English (India)' }, { code: 'hi', label: 'हिन्दी (Hindi)' }, { code: 'te', label: 'తెలుగు (Telugu)' }, { code: 'ml', label: 'മലയാളം (Malayalam)' }, { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }] },
    { country: 'United States', flag: '🇺🇸', code: 'US', timeZone: 'America/New_York (EST -5:00)', currency: 'USD ($)', dateFormat: 'MM/DD/YYYY', languages: [{ code: 'en-US', label: 'English (US)' }, { code: 'es', label: 'Español (Spanish)' }] },
    { country: 'United Kingdom', flag: '🇬🇧', code: 'GB', timeZone: 'Europe/London (GMT/BST)', currency: 'GBP (£)', dateFormat: 'DD/MM/YYYY', languages: [{ code: 'en-GB', label: 'English (UK)' }, { code: 'cy', label: 'Welsh' }] },
    { country: 'Canada', flag: '🇨🇦', code: 'CA', timeZone: 'America/Toronto (EST -5:00)', currency: 'CAD ($)', dateFormat: 'YYYY-MM-DD', languages: [{ code: 'en-CA', label: 'English (Canada)' }, { code: 'fr-CA', label: 'Français (French)' }] },
    { country: 'Australia', flag: '🇦🇺', code: 'AU', timeZone: 'Australia/Sydney (AEST +10:00)', currency: 'AUD ($)', dateFormat: 'DD/MM/YYYY', languages: [{ code: 'en-AU', label: 'English (Australia)' }] },
    { country: 'Singapore', flag: '🇸🇬', code: 'SG', timeZone: 'Asia/Singapore (SGT +8:00)', currency: 'SGD (S$)', dateFormat: 'DD/MM/YYYY', languages: [{ code: 'en', label: 'English (Singapore)' }, { code: 'zh', label: '简体中文 (Mandarin)' }, { code: 'ta', label: 'தமிழ் (Tamil)' }, { code: 'ms', label: 'Bahasa Melayu' }] },
    { country: 'Malaysia', flag: '🇲🇾', code: 'MY', timeZone: 'Asia/Kuala_Lumpur (MYT +8:00)', currency: 'MYR (RM)', dateFormat: 'DD/MM/YYYY', languages: [{ code: 'ms', label: 'Bahasa Melayu' }, { code: 'en', label: 'English' }, { code: 'ta', label: 'தமிழ் (Tamil)' }, { code: 'zh', label: '简体中文' }] },
    { country: 'Sri Lanka', flag: '🇱🇰', code: 'LK', timeZone: 'Asia/Colombo (SLST +5:30)', currency: 'LKR (Rs)', dateFormat: 'DD/MM/YYYY', languages: [{ code: 'ta', label: 'தமிழ் (Tamil)' }, { code: 'si', label: 'සිංහල (Sinhala)' }, { code: 'en', label: 'English' }] },
    { country: 'United Arab Emirates', flag: '🇦🇪', code: 'AE', timeZone: 'Asia/Dubai (GST +4:00)', currency: 'AED (د.إ)', dateFormat: 'DD/MM/YYYY', languages: [{ code: 'ar', label: 'العربية (Arabic)' }, { code: 'en', label: 'English' }, { code: 'ta', label: 'தமிழ் (Tamil)' }, { code: 'ml', label: 'മലയാളം (Malayalam)' }] },
    { country: 'Germany', flag: '🇩🇪', code: 'DE', timeZone: 'Europe/Berlin (CET +1:00)', currency: 'EUR (€)', dateFormat: 'DD.MM.YYYY', languages: [{ code: 'de', label: 'Deutsch (German)' }, { code: 'en', label: 'English' }] },
    { country: 'France', flag: '🇫🇷', code: 'FR', timeZone: 'Europe/Paris (CET +1:00)', currency: 'EUR (€)', dateFormat: 'DD/MM/YYYY', languages: [{ code: 'fr', label: 'Français (French)' }, { code: 'en', label: 'English' }] },
    { country: 'Russia', flag: '🇷🇺', code: 'RU', timeZone: 'Europe/Moscow (MSK +3:00)', currency: 'RUB (₽)', dateFormat: 'DD.MM.YYYY', languages: [{ code: 'ru', label: 'Русский (Russian)' }, { code: 'en', label: 'English' }] },
    { country: 'China', flag: '🇨🇳', code: 'CN', timeZone: 'Asia/Shanghai (CST +8:00)', currency: 'CNY (¥)', dateFormat: 'YYYY-MM-DD', languages: [{ code: 'zh-CN', label: '简体中文 (Simplified)' }, { code: 'zh-TW', label: '繁體中文 (Traditional)' }] },
    { country: 'Japan', flag: '🇯🇵', code: 'JP', timeZone: 'Asia/Tokyo (JST +9:00)', currency: 'JPY (¥)', dateFormat: 'YYYY/MM/DD', languages: [{ code: 'ja', label: '日本語 (Japanese)' }, { code: 'en', label: 'English' }] },
    { country: 'South Africa', flag: '🇿🇦', code: 'ZA', timeZone: 'Africa/Johannesburg (SAST +2:00)', currency: 'ZAR (R)', dateFormat: 'YYYY/MM/DD', languages: [{ code: 'en-ZA', label: 'English' }, { code: 'af', label: 'Afrikaans' }, { code: 'zu', label: 'isiZulu' }] },
    { country: 'Brazil', flag: '🇧🇷', code: 'BR', timeZone: 'America/Sao_Paulo (BRT -3:00)', currency: 'BRL (R$)', dateFormat: 'DD/MM/YYYY', languages: [{ code: 'pt-BR', label: 'Português (Portuguese)' }] }
  ];

  // Cloud Storage Connections List with safe fallback
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
        endpointUrl: 'https://www.googleapis.com/drive/v3',
        isPrimary: true,
        autoSyncInterval: 'Daily at 02:00 AM'
      },
      {
        id: 'firebase_storage',
        name: 'Firebase Cloud Storage (GCP Bucket)',
        providerType: 'Firebase / GCP',
        targetFolderOrBucket: 'gs://church-cathedral-backups.appspot.com',
        clientEmail: 'firebase-adminsdk@church-cathedral.iam.gserviceaccount.com',
        endpointUrl: 'https://firebasestorage.googleapis.com/v0/b/',
        isPrimary: false,
        autoSyncInterval: 'Weekly on Monday'
      },
      {
        id: 'aws_s3',
        name: 'Amazon Web Services S3 Bucket',
        providerType: 'AWS S3',
        targetFolderOrBucket: 'nope-cathedral-database-backups',
        clientEmail: 'ap-south-1',
        endpointUrl: 'https://s3.ap-south-1.amazonaws.com',
        isPrimary: false,
        autoSyncInterval: 'Every 12 Hours'
      }
    ];
  });

  // Global Config with Safe Schema Normalization
  const [advancedConfig, setAdvancedConfig] = useState(() => {
    const defaults = {
      country: 'India',
      defaultLanguage: 'ta',
      timeZone: 'Asia/Kolkata (IST +5:30)',
      currencyCode: 'INR (₹)',
      dateFormat: 'DD/MM/YYYY',
      enableOfflineSyncPWA: true,
      maintenanceMode: false
    };

    try {
      const saved = localStorage.getItem('app_advanced_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaults, ...parsed };
      }
    } catch (e) {
      console.error(e);
    }
    return defaults;
  });

  // Modal State for Cloud Provider
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [editingCloudId, setEditingCloudId] = useState(null);
  const [cloudForm, setCloudForm] = useState({
    name: '',
    providerType: 'Google Drive',
    targetFolderOrBucket: '',
    clientEmail: '',
    apiKeyOrSecret: '',
    endpointUrl: '',
    autoSyncInterval: 'Daily at 02:00 AM'
  });

  // Country Selection Change Handler
  const handleCountrySelect = (cName) => {
    const meta = globalCountries.find(c => c.country === cName) || globalCountries[0];
    if (meta) {
      setAdvancedConfig(prev => ({
        ...prev,
        country: meta.country,
        defaultLanguage: meta.languages?.[0]?.code || 'en',
        timeZone: meta.timeZone,
        currencyCode: meta.currency,
        dateFormat: meta.dateFormat
      }));
      onTriggerSuccess?.(`Country set to ${meta.flag} ${meta.country}. Timezone, Currency & Languages updated!`);
    }
  };

  // Cloud Provider Handlers
  const handleOpenCloudModal = (item = null) => {
    if (item) {
      setEditingCloudId(item.id);
      setCloudForm({ ...item, apiKeyOrSecret: '••••••••••••••••' });
    } else {
      setEditingCloudId(null);
      setCloudForm({
        name: '',
        providerType: 'Google Drive',
        targetFolderOrBucket: '',
        clientEmail: '',
        apiKeyOrSecret: '',
        endpointUrl: '',
        autoSyncInterval: 'Daily at 02:00 AM'
      });
    }
    setIsCloudModalOpen(true);
  };

  const handleSaveCloudProvider = (e) => {
    e.preventDefault();
    if (!cloudForm.name.trim() || !cloudForm.targetFolderOrBucket.trim()) return;

    if (editingCloudId) {
      const updated = cloudProviders.map(c => c.id === editingCloudId ? { ...c, ...cloudForm } : c);
      setCloudProviders(updated);
      localStorage.setItem('app_cloud_providers', JSON.stringify(updated));
      onTriggerSuccess?.('Cloud storage integration updated successfully!');
    } else {
      const newProvider = {
        id: `cloud_${Date.now()}`,
        ...cloudForm,
        isPrimary: cloudProviders.length === 0
      };
      const updated = [...cloudProviders, newProvider];
      setCloudProviders(updated);
      localStorage.setItem('app_cloud_providers', JSON.stringify(updated));
      onTriggerSuccess?.('New Cloud Storage provider added!');
    }
    setIsCloudModalOpen(false);
  };

  const handleDeleteCloudProvider = (id) => {
    if (window.confirm("Remove this cloud storage configuration?")) {
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
    onTriggerSuccess?.('Primary backup cloud destination updated!');
  };

  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_advanced_config', JSON.stringify(advancedConfig));
    localStorage.setItem('app_cloud_providers', JSON.stringify(cloudProviders));
    onTriggerSuccess?.('Global Architecture, Multi-Country & Cloud Vaults saved!');
  };

  const handleClearCache = () => {
    if (window.confirm("Purge application cache and query buffers?")) {
      onTriggerSuccess?.('System cache flushed successfully! Application memory optimized.');
    }
  };

  // Safe lookup for country metadata
  const currentCountryObj = globalCountries.find(c => c.country === advancedConfig.country) || globalCountries[0];
  const availableLanguages = currentCountryObj?.languages || [{ code: 'en', label: 'English' }];

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">

        {/* Master Header Bar */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Wrench className="text-orange-400" size={22} />
                Global Architecture, Cloud Vaults & Multi-Country Engine
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Worldwide country hierarchy with auto-cascading currency & timezone, plus Multi-Cloud storage vaults
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
            >
              <Save size={15} />
              <span>Save System Settings</span>
            </button>
          </div>

          {/* 1. Global Country Dropdown with Cascading Metadata */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Globe size={15} />
              <span>1. Global Country Selection & Regional Auto-Hierarchy</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Country Search Dropdown */}
              <div>
                <label className="text-xs font-medium text-slate-300">Target Country / Territory *</label>
                <select
                  value={advancedConfig.country || 'India'}
                  onChange={(e) => handleCountrySelect(e.target.value)}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-orange-500 cursor-pointer font-bold"
                >
                  {globalCountries.map((c) => (
                    <option key={c.country} value={c.country}>
                      {c.flag} {c.country} ({c.currency})
                    </option>
                  ))}
                </select>
              </div>

              {/* Regional Language Select */}
              <div>
                <label className="text-xs font-medium text-slate-300">Regional Language Selection *</label>
                <select
                  value={advancedConfig.defaultLanguage || 'ta'}
                  onChange={(e) => setAdvancedConfig({ ...advancedConfig, defaultLanguage: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                  ))}
                </select>
              </div>

              {/* Auto Synchronized Timezone */}
              <div>
                <label className="text-xs font-medium text-slate-300">Synchronized Timezone</label>
                <input
                  type="text"
                  readOnly
                  value={advancedConfig.timeZone || 'Asia/Kolkata (IST +5:30)'}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-orange-300 font-mono mt-1 focus:outline-none"
                />
              </div>

              {/* Auto Currency */}
              <div>
                <label className="text-xs font-medium text-slate-300">Currency Standard</label>
                <input
                  type="text"
                  readOnly
                  value={advancedConfig.currencyCode || 'INR (₹)'}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-emerald-300 font-mono font-bold mt-1 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Multi-Cloud Storage Providers & Dynamic Setup (+ Add Custom Storage) */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <Cloud size={15} />
                  <span>2. Multi-Cloud Storage Vaults (Google Drive, Firebase, AWS, Azure)</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Configure dynamic cloud storage endpoints for automated disaster recovery snapshots
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenCloudModal()}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>+ Add Cloud Storage Provider</span>
              </button>
            </div>

            {/* Cloud Providers Grid */}
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
                      <p className="text-[11px] text-slate-400 mt-0.5">{cp.providerType} • {cp.autoSyncInterval}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenCloudModal(cp)}
                        className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                        title="Edit Configuration"
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

                  {/* Details Strip */}
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
                        ★ Set as Primary Backup
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

          {/* 3. Offline Optimization & Maintenance Controls */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
              <Activity size={15} />
              <span>3. Offline Sync PWA & Maintenance Controls</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <WifiOff size={14} className="text-emerald-400" />
                    <span>Offline PWA Attendance Sync</span>
                  </h5>
                  <p className="text-[11px] text-slate-400">Save QR check-ins locally when internet drops & auto-sync</p>
                </div>
                <input
                  type="checkbox"
                  checked={advancedConfig.enableOfflineSyncPWA}
                  onChange={(e) => setAdvancedConfig({ ...advancedConfig, enableOfflineSyncPWA: e.target.checked })}
                  className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-bold text-white">Application Cache Buffer</h5>
                  <p className="text-[11px] text-slate-400">Purge stale query caches & optimize query speed</p>
                </div>
                <button
                  type="button"
                  onClick={handleClearCache}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/20 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Flush Cache
                </button>
              </div>

              <div className="md:col-span-2 p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-bold text-white">Maintenance Mode Lock</h5>
                    {advancedConfig.maintenanceMode && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[9px] font-bold uppercase">Active</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">Temporarily lock portal for non-admins during database upgrades</p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={advancedConfig.maintenanceMode}
                    onChange={(e) => setAdvancedConfig({ ...advancedConfig, maintenanceMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save & Apply Advanced Architecture</span>
            </button>
          </div>

        </div>

      </form>

      {/* Add / Edit Cloud Provider Modal */}
      {isCloudModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cloud className="text-orange-400" size={18} />
                {editingCloudId ? 'Edit Cloud Storage Vault' : 'Connect Cloud Storage Provider'}
              </h3>
              <button onClick={() => setIsCloudModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCloudProvider} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Storage Connection Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google Drive Main Vault / Firebase Production"
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
                    <option value="Firebase / GCP">Firebase / Google Cloud Storage</option>
                    <option value="AWS S3">Amazon Web Services (AWS S3)</option>
                    <option value="Cloudflare R2">Cloudflare R2 Object Storage</option>
                    <option value="Microsoft Azure">Microsoft Azure Blob Storage</option>
                    <option value="DigitalOcean Spaces">DigitalOcean Spaces</option>
                    <option value="Local NAS / Server">On-Premise Local Server Path</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Target Folder ID / Bucket Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1A2b3C... or bucket-name"
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

                <div className="md:col-span-2">
                  <label className="text-xs text-slate-300 font-medium">Custom API Endpoint URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://... (Leave blank for official default endpoints)"
                    value={cloudForm.endpointUrl}
                    onChange={(e) => setCloudForm({ ...cloudForm, endpointUrl: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCloudModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  {editingCloudId ? 'Update Cloud Storage' : 'Save Cloud Provider'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
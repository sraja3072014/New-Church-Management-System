import React, { useState } from 'react';
import { 
  ShieldCheck, KeyRound, Lock, Clock, AlertTriangle, 
  Smartphone, Save, CheckCircle2, History, RefreshCw
} from 'lucide-react';

export default function UserSettingsConfigTab({ onTriggerSuccess }) {
  // Global Security & Password Policy State
  const [securityConfig, setSecurityConfig] = useState({
    minPasswordLength: 8,
    requireSpecialChar: true,
    requireNumbers: true,
    passwordExpiryDays: '90',
    enforce2FAForAdmins: true,
    twoFactorMethod: 'WhatsApp & SMS OTP',
    sessionTimeoutMins: '30',
    maxFailedAttempts: '5',
    lockoutDurationMins: '15',
    enableAuditLog: true
  });

  // Recent Admin Login Audit Logs
  const [auditLogs] = useState([
    { id: 1, user: 'Rev. Senior Pastor', action: 'Logged in successfully', ip: '192.168.1.10', time: '10 mins ago', status: 'Success' },
    { id: 2, user: 'Pastor Assistant A', action: 'Modified Member Profile #MEM-003', ip: '192.168.1.14', time: '1 hour ago', status: 'Success' },
    { id: 3, user: 'Bro. David (Finance)', action: 'Issued Tithe Receipt #REC-892', ip: '192.168.1.22', time: '3 hours ago', status: 'Success' },
    { id: 4, user: 'Unknown IP', action: 'Failed login attempt (Wrong password)', ip: '49.37.152.88', time: 'Yesterday', status: 'Blocked' }
  ]);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    onTriggerSuccess('Global User Security & Authentication policies saved!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Security Policies Form */}
      <form onSubmit={handleSaveConfig} className="glass-card rounded-3xl p-8 space-y-6">
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="text-orange-400" size={22} />
              User Authentication & Security Policies
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Set global login security rules, password strengths, and timeout policies for all portal administrators
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
          >
            <Save size={15} />
            <span>Save Security Rules</span>
          </button>
        </div>

        {/* 1. Password Strength Rules */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
            <KeyRound size={15} />
            <span>1. Password Strength & Expiration Rules</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Minimum Password Length</label>
              <input
                type="number"
                min="6"
                max="20"
                value={securityConfig.minPasswordLength}
                onChange={(e) => setSecurityConfig({ ...securityConfig, minPasswordLength: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Password Expiry Cycle (Days)</label>
              <select
                value={securityConfig.passwordExpiryDays}
                onChange={(e) => setSecurityConfig({ ...securityConfig, passwordExpiryDays: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none cursor-pointer"
              >
                <option value="30">Every 30 Days</option>
                <option value="60">Every 60 Days</option>
                <option value="90">Every 90 Days (Recommended)</option>
                <option value="never">Never Expire</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Max Failed Attempts Before Lock</label>
              <input
                type="number"
                min="3"
                max="10"
                value={securityConfig.maxFailedAttempts}
                onChange={(e) => setSecurityConfig({ ...securityConfig, maxFailedAttempts: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={securityConfig.requireSpecialChar}
                onChange={(e) => setSecurityConfig({ ...securityConfig, requireSpecialChar: e.target.checked })}
                className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
              />
              <span>Require Special Characters (@, #, $, %)</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={securityConfig.requireNumbers}
                onChange={(e) => setSecurityConfig({ ...securityConfig, requireNumbers: e.target.checked })}
                className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
              />
              <span>Require Numeric Digits (0-9)</span>
            </label>
          </div>
        </div>

        {/* 2. Two-Factor Authentication (2FA) */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
            <Smartphone size={15} />
            <span>2. Two-Factor Authentication (2FA) for Admins</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Enforce 2FA for Super Admins & Pastors</p>
                <p className="text-[11px] text-slate-400">Requires secondary verification code at login</p>
              </div>
              <input
                type="checkbox"
                checked={securityConfig.enforce2FAForAdmins}
                onChange={(e) => setSecurityConfig({ ...securityConfig, enforce2FAForAdmins: e.target.checked })}
                className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">2FA Delivery Channel</label>
              <select
                value={securityConfig.twoFactorMethod}
                onChange={(e) => setSecurityConfig({ ...securityConfig, twoFactorMethod: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none cursor-pointer"
              >
                <option value="WhatsApp & SMS OTP">WhatsApp & SMS OTP (Default)</option>
                <option value="Email OTP">Email Verification Code</option>
                <option value="Authenticator App">Google Authenticator / TOTP</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Session Timeout & Inactivity */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
            <Clock size={15} />
            <span>3. Session & Inactivity Controls</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Auto-Logout on Inactivity</label>
              <select
                value={securityConfig.sessionTimeoutMins}
                onChange={(e) => setSecurityConfig({ ...securityConfig, sessionTimeoutMins: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none cursor-pointer"
              >
                <option value="15">15 Minutes of Inactivity</option>
                <option value="30">30 Minutes (Recommended)</option>
                <option value="60">1 Hour</option>
                <option value="never">Never (Stay Logged In)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Account Lockout Duration (Mins)</label>
              <input
                type="number"
                value={securityConfig.lockoutDurationMins}
                onChange={(e) => setSecurityConfig({ ...securityConfig, lockoutDurationMins: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>

      {/* Admin Activity Audit Trail Card */}
      <div className="glass-card rounded-3xl p-8 space-y-6">
        <div className="border-b border-white/10 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <History className="text-orange-400" size={22} />
              Recent Admin Activity & Security Log
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time audit record of portal logins and administrative actions</p>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            ● Live Logging Active
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Action Performed</th>
                <th className="p-3.5">IP Address</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 font-bold text-white text-xs">{log.user}</td>
                  <td className="p-3.5 text-slate-300">{log.action}</td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-400">{log.ip}</td>
                  <td className="p-3.5 text-slate-400">{log.time}</td>
                  <td className="p-3.5 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      log.status === 'Success' 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
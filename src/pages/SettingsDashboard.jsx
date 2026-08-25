import React, { useState } from 'react';
import { 
  Building2, GitBranch, LayoutGrid, Palette, Smartphone,
  Users, UserPlus, Shield, ShieldAlert,
  CreditCard, Wallet, HeartHandshake, Receipt, BarChart3,
  Sliders, Calendar, Bell, MessageSquare, ClipboardList,
  Database, Wrench, CheckCircle2
} from 'lucide-react';

// Modular Component Imports
import MainChurchTab from '../components/settings/MainChurchTab';
import BranchesTab from '../components/settings/BranchesTab';
import ModulesRulesTab from '../components/settings/ModulesRulesTab';
import UsersSettingsTab from '../components/settings/UsersSettingsTab';
import MemberRegistrationTab from '../components/settings/MemberRegistrationTab';
import AccessControlTab from '../components/settings/AccessControlTab';
import HarassmentAbuseTasksTab from '../components/settings/HarassmentAbuseTasksTab';
import BankAccountsTab from '../components/settings/BankAccountsTab';
import PaymentGatewaysTab from '../components/settings/PaymentGatewaysTab';
import GivingCategoriesTab from '../components/settings/GivingCategoriesTab';
import TaxReceiptsTab from '../components/settings/TaxReceiptsTab';
import ReportsConfigTab from '../components/settings/ReportsConfigTab';
import BrandingThemeTab from '../components/settings/BrandingThemeTab';
import MemberAppConfigTab from '../components/settings/MemberAppConfigTab';
import PreferencesTab from '../components/settings/PreferencesTab';
import AttendanceSettingsTab from '../components/settings/AttendanceSettingsTab';
import NotificationsTab from '../components/settings/NotificationsTab';
import WhatsAppSettingsTab from '../components/settings/WhatsAppSettingsTab';
import ServiceRequestsTab from '../components/settings/ServiceRequestsTab';
import BackupSettingsTab from '../components/settings/BackupSettingsTab';
import AdvancedSettingsTab from '../components/settings/AdvancedSettingsTab';

<<<<<<< HEAD
// 1. Props-ல் churchProfile மற்றும் onSaveProfile சேர்க்கப்பட்டுள்ளது
export default function SettingsDashboard({ churchProfile, onSaveProfile }) {
  const [activeSubMenu, setActiveSubMenu] = useState('branding');
=======
export default function SettingsDashboard() {
  const [activeSubMenu, setActiveSubMenu] = useState('main_church');
>>>>>>> 51282b6 (Initial commit)
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const triggerSuccess = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const menuGroups = [
    {
      title: 'CHURCH SETUP',
      icon: Building2,
      items: [
        { id: 'main_church', label: 'Main Church', icon: Building2 },
        { id: 'branches', label: 'Branches', icon: GitBranch }
      ]
    },
    {
      title: 'PEOPLE & ACCESS',
      icon: Users,
      items: [
        { id: 'users', label: 'Users & Staff', icon: Users },
        { id: 'registration', label: 'Registration', icon: UserPlus },
        { id: 'attendance', label: 'Attendance Sessions', icon: Calendar },
        { id: 'access_control', label: 'Access Control', icon: Shield },
        { id: 'harassment_tasks', label: 'Harassment & Abuse', icon: ShieldAlert }
      ]
    },
    {
      title: 'FINANCE',
      icon: CreditCard,
      items: [
        { id: 'bank_accounts', label: 'Bank Accounts', icon: CreditCard },
        { id: 'payments', label: 'Payments', icon: Wallet },
        { id: 'giving', label: 'Giving Categories', icon: HeartHandshake },
        { id: 'tax', label: 'Tax & 80G Receipts', icon: Receipt },
        { id: 'reports_config', label: 'Reports Layouts', icon: BarChart3 }
      ]
    },
    {
      title: 'SYSTEM SETTINGS',
      icon: Wrench,
      items: [
        { id: 'modules', label: 'Modules', icon: LayoutGrid },
        { id: 'branding', label: 'Branding & Themes', icon: Palette },
        { id: 'member_app', label: 'Mobile App', icon: Smartphone },
        { id: 'preferences', label: 'Preferences', icon: Sliders },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'whatsapp', label: 'WhatsApp Hub', icon: MessageSquare },
        { id: 'service_requests', label: 'Service Requests', icon: ClipboardList },
        { id: 'backup', label: 'Database & Backups', icon: Database },
        { id: 'advanced', label: 'Advanced Architecture', icon: Wrench }
      ]
    }
  ];

  return (
<<<<<<< HEAD
    <div className="flex flex-1 w-full h-full min-h-screen bg-transparent text-slate-200 overflow-hidden">
=======
    <div className="flex flex-1 w-full h-full min-h-screen bg-[#0e1322] text-slate-200 overflow-hidden">
>>>>>>> 51282b6 (Initial commit)
      
      {/* Settings Sub-Sidebar with Grouped Card Boxes */}
      <div className="w-60 bg-[#0e1322]/85 backdrop-blur-xl border-r border-white/10 p-3 space-y-3.5 overflow-y-auto max-h-screen shrink-0 shadow-[inset_0_0_25px_rgba(255,107,0,0.05),0_0_30px_rgba(255,107,0,0.08)]">
        {menuGroups.map((group, gIdx) => {
          const GroupIcon = group.icon;
          return (
            <div 
              key={gIdx} 
              className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5 shadow-[0_0_15px_rgba(255,107,0,0.04)] space-y-2 hover:border-orange-500/20 transition-all"
            >
              {/* Card Group Header */}
              <div className="flex items-center gap-2 px-1 text-[10px] font-bold text-orange-400/90 tracking-wider uppercase">
                <GroupIcon size={12} className="text-orange-400" />
                <span>{group.title}</span>
              </div>

              {/* Sub-Items Container inside the Box */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSubMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSubMenu(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-200 text-left cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] text-white font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)] border border-white/20 scale-[1.02]'
                          : 'text-slate-300 bg-white/[0.02] border border-white/5 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/15 hover:to-rose-500/10 hover:border-orange-500/30'
                      }`}
                    >
                      <Icon size={13} className={isActive ? 'text-white' : 'text-orange-400/70'} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto max-h-screen">
        {saveSuccessMsg && (
          <div className="mb-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 size={16} />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        <div className="w-full">
<<<<<<< HEAD
          {activeSubMenu === 'main_church' && <MainChurchTab onTriggerSuccess={triggerSuccess} churchProfile={churchProfile} onSaveProfile={onSaveProfile} />}
=======
          {activeSubMenu === 'main_church' && <MainChurchTab onTriggerSuccess={triggerSuccess} />}
>>>>>>> 51282b6 (Initial commit)
          {activeSubMenu === 'branches' && <BranchesTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'users' && <UsersSettingsTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'registration' && <MemberRegistrationTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'attendance' && <AttendanceSettingsTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'access_control' && <AccessControlTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'harassment_tasks' && <HarassmentAbuseTasksTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'bank_accounts' && <BankAccountsTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'payments' && <PaymentGatewaysTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'giving' && <GivingCategoriesTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'tax' && <TaxReceiptsTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'reports_config' && <ReportsConfigTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'modules' && <ModulesRulesTab onTriggerSuccess={triggerSuccess} />}
<<<<<<< HEAD
          
          {/* Safe Branding Theme Tab Injection */}
          {activeSubMenu === 'branding' && (
            <BrandingThemeTab 
              onTriggerSuccess={triggerSuccess} 
              churchProfile={churchProfile} 
              onSaveProfile={onSaveProfile} 
            />
          )}

=======
          {activeSubMenu === 'branding' && <BrandingThemeTab onTriggerSuccess={triggerSuccess} />}
>>>>>>> 51282b6 (Initial commit)
          {activeSubMenu === 'member_app' && <MemberAppConfigTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'preferences' && <PreferencesTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'notifications' && <NotificationsTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'whatsapp' && <WhatsAppSettingsTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'service_requests' && <ServiceRequestsTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'backup' && <BackupSettingsTab onTriggerSuccess={triggerSuccess} />}
          {activeSubMenu === 'advanced' && <AdvancedSettingsTab onTriggerSuccess={triggerSuccess} />}
        </div>
      </div>

    </div>
  );
}
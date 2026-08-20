import React, { useState, useRef } from 'react';
import { 
  Smartphone, LayoutGrid, Image as ImageIcon, Upload, 
  Save, ShieldCheck, HeartHandshake, Tv, BookOpen, 
  Calendar, MessageSquare, Plus, Trash2, Edit2, X, Check,
  MessageCircle, Radio, Music, Users, Sparkles, ExternalLink
} from 'lucide-react';

export default function MemberAppConfigTab({ onTriggerSuccess }) {
  const bannerInputRef = useRef(null);
  const [appBannerUrl, setAppBannerUrl] = useState(null);

  // App Master Identity
  const [appConfig, setAppConfig] = useState({
    appName: 'Nope Cathedral App',
    welcomeTagline: 'Grace, Truth & Fellowship',
    dailyVerseText: 'The Lord is my shepherd; I shall not want. - Psalm 23:1',
    pastorWhatsappNumber: '+919876543210',
    youtubeLiveChannelUrl: 'https://youtube.com/@nopesearchchurch/live'
  });

  // Dynamic Switchboard Modules List (System + Custom Modules)
  const [modulesList, setModulesList] = useState([
    { id: 'giving', label: 'Online Tithe & Giving Portal', desc: 'Accept tithes and pledges via UPI/Cards inside app', iconType: 'HeartHandshake', enabled: true, isCustom: false },
    { id: 'livestream', label: 'Sunday Live Streaming & Sermons', desc: 'Watch Sunday service live directly in mobile app', iconType: 'Tv', enabled: true, isCustom: false },
    { id: 'whatsapp_chat', label: '1-Click WhatsApp Pastor Desk', desc: 'Direct WhatsApp chat with Pastoral Helpline', iconType: 'MessageCircle', enabled: true, isCustom: false },
    { id: 'live_chat', label: 'Live Service Intercession Chat', desc: 'Real-time live fellowship chat during worship stream', iconType: 'Radio', enabled: true, isCustom: false },
    { id: 'prayer', label: 'Prayer Request Wall & Care', desc: 'Confidential prayer submissions to pastoral council', iconType: 'MessageSquare', enabled: true, isCustom: false },
    { id: 'daily_verse', label: 'Daily Manna & Scripture Devotional', desc: 'Show daily verse banner on mobile home screen', iconType: 'BookOpen', enabled: true, isCustom: false },
    { id: 'events', label: 'Church Events & Camp Registrations', desc: 'Conferences, youth retreats, and baptism RSVP calendar', iconType: 'Calendar', enabled: true, isCustom: false },
    { id: 'digital_id', label: 'Digital Believer ID Card & QR Code', desc: 'Virtual QR membership card for attendance scan', iconType: 'ShieldCheck', enabled: true, isCustom: false }
  ]);

  // Modal State for Adding Custom Modules
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customModuleForm, setCustomModuleForm] = useState({
    label: '',
    desc: '',
    iconType: 'Sparkles',
    targetUrl: ''
  });

  // Helper Icon Renderer
  const renderIcon = (type, size = 16) => {
    switch (type) {
      case 'HeartHandshake': return <HeartHandshake size={size} />;
      case 'Tv': return <Tv size={size} />;
      case 'MessageCircle': return <MessageCircle size={size} />;
      case 'Radio': return <Radio size={size} />;
      case 'MessageSquare': return <MessageSquare size={size} />;
      case 'BookOpen': return <BookOpen size={size} />;
      case 'Calendar': return <Calendar size={size} />;
      case 'ShieldCheck': return <ShieldCheck size={size} />;
      case 'Music': return <Music size={size} />;
      case 'Users': return <Users size={size} />;
      default: return <Sparkles size={size} />;
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAppBannerUrl(URL.createObjectURL(file));
      onTriggerSuccess('Mobile App Hero Banner updated successfully!');
    }
  };

  const handleToggleModule = (id) => {
    setModulesList(modulesList.map(m => {
      if (m.id === id) {
        const nextState = !m.enabled;
        onTriggerSuccess(`${m.label} module is now ${nextState ? 'Active' : 'Disabled'}`);
        return { ...m, enabled: nextState };
      }
      return m;
    }));
  };

  const handleAddCustomModule = (e) => {
    e.preventDefault();
    if (!customModuleForm.label.trim()) return;

    const newMod = {
      id: `custom_${Date.now()}`,
      label: customModuleForm.label,
      desc: customModuleForm.desc || 'Custom church feature module',
      iconType: customModuleForm.iconType,
      enabled: true,
      isCustom: true,
      targetUrl: customModuleForm.targetUrl
    };

    setModulesList([...modulesList, newMod]);
    setIsCustomModalOpen(false);
    setCustomModuleForm({ label: '', desc: '', iconType: 'Sparkles', targetUrl: '' });
    onTriggerSuccess('New custom module added to Mobile App switchboard!');
  };

  const handleDeleteModule = (id) => {
    if (window.confirm("Remove this custom module from mobile app?")) {
      setModulesList(modulesList.filter(m => m.id !== id));
      onTriggerSuccess('Custom module removed.');
    }
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    onTriggerSuccess('Member Mobile App configuration saved successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT 7 COLS: SETTINGS & CONTROLS */}
        <form onSubmit={handleSaveConfig} className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Branding & Identity */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Smartphone className="text-orange-400" size={22} />
                Member Mobile App Configuration
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Customize features, live stream links, WhatsApp pastor desk, and custom modules</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300">Mobile App Header Title *</label>
                  <input
                    type="text"
                    required
                    value={appConfig.appName}
                    onChange={(e) => setAppConfig({ ...appConfig, appName: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300">Welcome Sub-Tagline</label>
                  <input
                    type="text"
                    value={appConfig.welcomeTagline}
                    onChange={(e) => setAppConfig({ ...appConfig, welcomeTagline: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300">Pastor Helpline WhatsApp Number</label>
                  <input
                    type="text"
                    placeholder="+919876543210"
                    value={appConfig.pastorWhatsappNumber}
                    onChange={(e) => setAppConfig({ ...appConfig, pastorWhatsappNumber: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300">YouTube Live Stream Channel URL</label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/@church/live"
                    value={appConfig.youtubeLiveChannelUrl}
                    onChange={(e) => setAppConfig({ ...appConfig, youtubeLiveChannelUrl: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              {/* Hero Banner Upload */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Home Screen Hero Carousel Banner</label>
                <div className="flex items-center gap-4">
                  <div className="w-40 h-20 rounded-2xl border-2 border-dashed border-white/20 bg-slate-900/60 flex items-center justify-center overflow-hidden relative">
                    {appBannerUrl ? (
                      <img src={appBannerUrl} alt="App Banner" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={28} className="text-slate-500" />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <input type="file" ref={bannerInputRef} onChange={handleBannerUpload} accept="image/*" className="hidden" />
                    <button
                      type="button"
                      onClick={() => bannerInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
                    >
                      <Upload size={13} />
                      <span>{appBannerUrl ? 'Change Banner' : 'Upload Banner'}</span>
                    </button>
                    <p className="text-[10px] text-slate-400">Recommended size: 1200 x 600 px (Max 3MB)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Featured Daily Verse</label>
                <textarea
                  rows={2}
                  value={appConfig.dailyVerseText}
                  onChange={(e) => setAppConfig({ ...appConfig, dailyVerseText: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2 text-xs text-white mt-1 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Modular Feature Toggles + Add Custom Module Button */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <LayoutGrid size={16} />
                  <span>App Feature Modules Switchboard</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Enable or disable modules, or create custom modules for your congregation</p>
              </div>

              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>+ Add Custom Module</span>
              </button>
            </div>

            <div className="space-y-3">
              {modulesList.map((mod) => (
                <div key={mod.id} className="p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
                      {renderIcon(mod.iconType, 16)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-white">{mod.label}</h5>
                        {mod.isCustom && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[9px] font-bold text-purple-300 uppercase">
                            Custom
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">{mod.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {mod.isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeleteModule(mod.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Delete Module"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mod.enabled}
                        onChange={() => handleToggleModule(mod.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-rose-500"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                <Save size={15} />
                <span>Save App Configuration</span>
              </button>
            </div>
          </div>

        </form>

        {/* RIGHT 5 COLS: INTERACTIVE LIVE MOBILE PHONE SIMULATOR */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[330px] rounded-[42px] border-[10px] border-slate-900 bg-slate-950 p-4 shadow-2xl space-y-4 ring-1 ring-white/20">
            
            {/* Phone Notch & Header */}
            <div className="w-28 h-4 bg-slate-900 mx-auto rounded-full mb-1" />
            <div className="flex items-center justify-between px-1">
              <div>
                <h4 className="text-xs font-black text-white">{appConfig.appName}</h4>
                <p className="text-[9px] text-orange-400 font-medium">{appConfig.welcomeTagline}</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px] text-orange-400 font-bold">
                JD
              </div>
            </div>

            {/* Simulated Hero Banner */}
            <div className="w-full h-28 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 overflow-hidden relative shadow-lg flex items-center justify-center p-3 text-white">
              {appBannerUrl ? (
                <img src={appBannerUrl} alt="Banner" className="w-full h-full object-cover absolute inset-0" />
              ) : (
                <div className="text-center z-10 space-y-1">
                  <span className="text-[9px] uppercase tracking-wider font-bold bg-black/30 px-2 py-0.5 rounded-full">Sunday Worship</span>
                  <h5 className="text-xs font-bold">Live Streaming Ready</h5>
                </div>
              )}
            </div>

            {/* Daily Verse Box */}
            {modulesList.find(m => m.id === 'daily_verse')?.enabled && (
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-[10px] text-slate-300 italic leading-relaxed">
                "{appConfig.dailyVerseText}"
              </div>
            )}

            {/* App Grid Buttons Simulator (Only Shows Enabled Modules) */}
            <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-bold max-h-[220px] overflow-y-auto pr-1">
              {modulesList.filter(m => m.enabled && m.id !== 'daily_verse').map((mod) => (
                <div key={mod.id} className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-orange-400 flex flex-col items-center gap-1 hover:border-orange-500/30 transition-all">
                  {renderIcon(mod.iconType, 16)}
                  <span className="text-slate-200 truncate w-full">{mod.label.split('&')[0]}</span>
                </div>
              ))}
            </div>

            {/* Bottom Home Indicator */}
            <div className="w-20 h-1 bg-slate-700 mx-auto rounded-full pt-1" />
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-mono">Live Mobile Preview Simulator</p>
        </div>

      </div>

      {/* Add Custom Module Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="text-orange-400" size={18} />
                Add New Custom Mobile App Module
              </h3>
              <button onClick={() => setIsCustomModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCustomModule} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Module Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audio Bible, Choir Lyrics, Sunday School..."
                  value={customModuleForm.label}
                  onChange={(e) => setCustomModuleForm({ ...customModuleForm, label: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Short Description</label>
                <input
                  type="text"
                  placeholder="Brief summary of this feature..."
                  value={customModuleForm.desc}
                  onChange={(e) => setCustomModuleForm({ ...customModuleForm, desc: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Module Icon</label>
                  <select
                    value={customModuleForm.iconType}
                    onChange={(e) => setCustomModuleForm({ ...customModuleForm, iconType: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Sparkles">Sparkles / Special</option>
                    <option value="Music">Music / Audio</option>
                    <option value="Tv">Video / Media</option>
                    <option value="Radio">Live Broadcast</option>
                    <option value="MessageCircle">WhatsApp / Chat</option>
                    <option value="BookOpen">Bible / Reading</option>
                    <option value="Users">Fellowship / Groups</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Target URL / Screen Link</label>
                  <input
                    type="text"
                    placeholder="https://... or /screen-route"
                    value={customModuleForm.targetUrl}
                    onChange={(e) => setCustomModuleForm({ ...customModuleForm, targetUrl: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  + Add to Mobile App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
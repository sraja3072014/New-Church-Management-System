import React, { useState, useRef } from 'react';
import { 
  Building2, Target, Globe, Save, Upload, ImageIcon, 
  UserCheck, IdCard, ChevronDown, Phone, Mail, Share2, 
  Camera, Send, AtSign, MapPin 
} from 'lucide-react';

export default function MainChurchTab({ onTriggerSuccess }) {
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);

  const [churchLogo, setChurchLogo] = useState(() => {
    return localStorage.getItem('app_main_church_logo') || null;
  });

  const [churchInfo, setChurchInfo] = useState(() => {
    const defaultInfo = {
      name: 'Nope Search Main Cathedral',
      seniorPastor: 'Rev. Senior Pastor',
      pastorId: 'PSTR-HQ-001',
      address: '123 Main Street',
      country: 'India',
      city: 'Koduvai, Tirupur',
      postCode: '638660',
      timezone: 'Asia/Kolkata (IST)',
      currency: '₹ - Indian Rupee (INR)',
      denomination: 'Non-denominational',
      foundingYear: '2010'
    };
    try {
      const saved = localStorage.getItem('app_main_church_info');
      if (saved) return { ...defaultInfo, ...JSON.parse(saved) };
    } catch (e) {}
    return defaultInfo;
  });

  const [visionInfo, setVisionInfo] = useState(() => {
    const defaultVision = {
      tagline: 'Transforming lives, Building community, Impacting nations.',
      detailedVision: 'To reach unreached souls with the unconditional love of Jesus Christ and nurture believers into committed disciples.',
      themeScripture: 'Habakkuk 2:2',
      missionStatement: 'Equipping believers through passionate worship, deep discipleship, prayer, and outreach.'
    };
    try {
      const saved = localStorage.getItem('app_main_church_vision');
      if (saved) return { ...defaultVision, ...JSON.parse(saved) };
    } catch (e) {}
    return defaultVision;
  });

  const [contactSocial, setContactSocial] = useState(() => {
    const defaultContact = {
      primaryPhone: '+91 98765 43210',
      secondaryPhone: '+91 98765 43211',
      emergencyPhone: '+91 98765 43212',
      officialEmail: 'contact@nopesearchchurch.org',
      supportEmail: 'care@nopesearchchurch.org',
      websiteUrl: 'https://www.nopesearchchurch.org',
      facebookUrl: 'https://facebook.com/nopesearchchurch',
      instagramHandle: '@nopesearch_church',
      telegramGroup: 'https://t.me/nopesearchchurch',
      twitterHandle: '@nopesearchchurch',
      googleMapsEmbed: 'https://maps.google.com/?q=Koduvai'
    };
    try {
      const saved = localStorage.getItem('app_main_church_contact');
      if (saved) return { ...defaultContact, ...JSON.parse(saved) };
    } catch (e) {}
    return defaultContact;
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChurchLogo(reader.result);
        localStorage.setItem('app_main_church_logo', reader.result);
        window.dispatchEvent(new Event('churchDataUpdated'));
        if (onTriggerSuccess) onTriggerSuccess('Church logo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_main_church_info', JSON.stringify(churchInfo));
    localStorage.setItem('app_main_church_vision', JSON.stringify(visionInfo));
    localStorage.setItem('app_main_church_contact', JSON.stringify(contactSocial));
    localStorage.setItem('app_active_church_title', churchInfo.name);
    
    // Dispatch event to update sidebar top-left name instantly
    window.dispatchEvent(new Event('churchDataUpdated'));

    if (onTriggerSuccess) onTriggerSuccess('Main Church Settings saved successfully!');
  };

  return (
    <div className="space-y-4">
      {/* Top Capsule Navigation */}
      <div className="glass-panel p-1.5 rounded-2xl flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'profile', label: 'Church Profile', icon: Building2 },
            { id: 'vision', label: 'Vision & Mission', icon: Target },
            { id: 'contact', label: 'Contact & Social', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isTabActive
                    ? 'bg-white text-slate-900 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} className={isTabActive ? 'text-orange-600' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
        >
          <Save size={14} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="glass-card rounded-3xl p-8 space-y-6 animate-fadeIn">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Building2 className="text-orange-400" size={22} />
              Main Church Profile
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Basic identity, Senior pastor in-charge, and HQ location</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Church Official Logo</label>
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-white/20 bg-slate-900/60 flex items-center justify-center overflow-hidden relative shadow-inner">
                {churchLogo ? (
                  <img src={churchLogo} alt="Church Logo" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={32} className="text-slate-500" />
                )}
              </div>
              <div className="space-y-2">
                <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
                  >
                    <Upload size={14} />
                    <span>{churchLogo ? 'Change Logo' : 'Upload Logo'}</span>
                  </button>
                  {churchLogo && (
                    <button
                      type="button"
                      onClick={() => { setChurchLogo(null); localStorage.removeItem('app_main_church_logo'); window.dispatchEvent(new Event('churchDataUpdated')); }}
                      className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-medium border border-rose-500/20 cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">Square PNG, JPG or WebP (Max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-300">Church Name *</label>
              <input
                type="text"
                value={churchInfo.name}
                onChange={(e) => setChurchInfo({ ...churchInfo, name: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none focus:border-orange-500 font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Senior Pastor Name *</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <UserCheck size={15} className="text-orange-400 shrink-0" />
                <input
                  type="text"
                  value={churchInfo.seniorPastor}
                  onChange={(e) => setChurchInfo({ ...churchInfo, seniorPastor: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Senior Pastor ID</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <IdCard size={15} className="text-purple-400 shrink-0" />
                <input
                  type="text"
                  value={churchInfo.pastorId}
                  onChange={(e) => setChurchInfo({ ...churchInfo, pastorId: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300">Main Headquarters Address</label>
            <input
              type="text"
              value={churchInfo.address}
              onChange={(e) => setChurchInfo({ ...churchInfo, address: e.target.value })}
              className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Country</label>
              <input
                type="text"
                value={churchInfo.country}
                onChange={(e) => setChurchInfo({ ...churchInfo, country: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300">City / District</label>
              <input
                type="text"
                value={churchInfo.city}
                onChange={(e) => setChurchInfo({ ...churchInfo, city: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300">Post Code</label>
              <input
                type="text"
                value={churchInfo.postCode}
                onChange={(e) => setChurchInfo({ ...churchInfo, postCode: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Timezone</label>
              <div className="relative mt-1.5">
                <select
                  value={churchInfo.timezone}
                  onChange={(e) => setChurchInfo({ ...churchInfo, timezone: e.target.value })}
                  className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York (EST)">America/New_York (EST)</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Currency</label>
              <div className="relative mt-1.5">
                <select
                  value={churchInfo.currency}
                  onChange={(e) => setChurchInfo({ ...churchInfo, currency: e.target.value })}
                  className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="₹ - Indian Rupee (INR)">₹ - Indian Rupee (INR)</option>
                  <option value="$ - US Dollar (USD)">$ - US Dollar (USD)</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Denomination / Affiliation</label>
              <input
                type="text"
                value={churchInfo.denomination}
                onChange={(e) => setChurchInfo({ ...churchInfo, denomination: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300">Founding Year</label>
              <input
                type="text"
                value={churchInfo.foundingYear}
                onChange={(e) => setChurchInfo({ ...churchInfo, foundingYear: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vision & Mission */}
      {activeTab === 'vision' && (
        <div className="glass-card rounded-3xl p-8 space-y-6 animate-fadeIn">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="text-orange-400" size={22} />
              Vision & Mission Statements
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Spiritual direction, theme verse, and mission strategy</p>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300">Vision Tagline</label>
            <input
              type="text"
              value={visionInfo.tagline}
              onChange={(e) => setVisionInfo({ ...visionInfo, tagline: e.target.value })}
              className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-300">Detailed Vision</label>
              <textarea
                rows={3}
                value={visionInfo.detailedVision}
                onChange={(e) => setVisionInfo({ ...visionInfo, detailedVision: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300">Theme Scripture Reference</label>
              <input
                type="text"
                value={visionInfo.themeScripture}
                onChange={(e) => setVisionInfo({ ...visionInfo, themeScripture: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300">Mission Statement</label>
            <textarea
              rows={3}
              value={visionInfo.missionStatement}
              onChange={(e) => setVisionInfo({ ...visionInfo, missionStatement: e.target.value })}
              className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-3 text-xs text-slate-200 mt-1.5 focus:outline-none resize-none"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Contact & Social */}
      {activeTab === 'contact' && (
        <div className="glass-card rounded-3xl p-8 space-y-6 animate-fadeIn">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="text-orange-400" size={22} />
              Contact Channels & Social Media
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Phone lines, official emails, social links, and Google map embed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Primary Phone</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={contactSocial.primaryPhone}
                  onChange={(e) => setContactSocial({ ...contactSocial, primaryPhone: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Secondary / Help Desk</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={contactSocial.secondaryPhone}
                  onChange={(e) => setContactSocial({ ...contactSocial, secondaryPhone: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">24/7 Prayer Helpline</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-rose-500/30 rounded-2xl px-3 py-2.5 mt-1.5">
                <Phone size={14} className="text-rose-400 shrink-0" />
                <input
                  type="text"
                  value={contactSocial.emergencyPhone}
                  onChange={(e) => setContactSocial({ ...contactSocial, emergencyPhone: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono font-bold text-rose-300"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Official Church Email</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <Mail size={14} className="text-sky-400 shrink-0" />
                <input
                  type="email"
                  value={contactSocial.officialEmail}
                  onChange={(e) => setContactSocial({ ...contactSocial, officialEmail: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Support / Care Email</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <Mail size={14} className="text-purple-400 shrink-0" />
                <input
                  type="email"
                  value={contactSocial.supportEmail}
                  onChange={(e) => setContactSocial({ ...contactSocial, supportEmail: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Official Website URL</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <Globe size={14} className="text-blue-400 shrink-0" />
                <input
                  type="text"
                  value={contactSocial.websiteUrl}
                  onChange={(e) => setContactSocial({ ...contactSocial, websiteUrl: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Facebook Page URL</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <Share2 size={14} className="text-blue-500 shrink-0" />
                <input
                  type="text"
                  value={contactSocial.facebookUrl}
                  onChange={(e) => setContactSocial({ ...contactSocial, facebookUrl: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Instagram Handle</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <Camera size={14} className="text-pink-500 shrink-0" />
                <input
                  type="text"
                  value={contactSocial.instagramHandle}
                  onChange={(e) => setContactSocial({ ...contactSocial, instagramHandle: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Telegram Channel</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <Send size={14} className="text-sky-400 shrink-0" />
                <input
                  type="text"
                  placeholder="https://t.me/..."
                  value={contactSocial.telegramGroup}
                  onChange={(e) => setContactSocial({ ...contactSocial, telegramGroup: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Twitter / X Profile</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <AtSign size={14} className="text-slate-300 shrink-0" />
                <input
                  type="text"
                  placeholder="@church_handle"
                  value={contactSocial.twitterHandle}
                  onChange={(e) => setContactSocial({ ...contactSocial, twitterHandle: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <label className="text-xs font-medium text-slate-300">Google Maps Location Link</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2.5 mt-1.5">
                <MapPin size={14} className="text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={contactSocial.googleMapsEmbed}
                  onChange={(e) => setContactSocial({ ...contactSocial, googleMapsEmbed: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
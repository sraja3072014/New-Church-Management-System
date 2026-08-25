import React, { useState, useEffect, useRef } from 'react';
import { 
  Palette, Image as ImageIcon, Upload, Save, Check, 
  Sparkles, Sun, Moon, Layout, Sliders, CheckCircle2,
  RefreshCw, Layers, ShieldCheck
} from 'lucide-react';

<<<<<<< HEAD
export default function BrandingThemeTab({ onTriggerSuccess, churchProfile, onSaveProfile }) {
=======
export default function BrandingThemeTab({ onTriggerSuccess }) {
>>>>>>> 51282b6 (Initial commit)
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);
  const watermarkInputRef = useRef(null);

  // 1. Theme Mode State (Dark / Light)
  const [themeMode, setThemeMode] = useState(() => {
<<<<<<< HEAD
    return churchProfile?.themeMode || localStorage.getItem('app_theme_mode') || 'dark';
=======
    return localStorage.getItem('app_theme_mode') || 'dark';
>>>>>>> 51282b6 (Initial commit)
  });

  // 2. Signature Color Presets for Dark & Light
  const darkThemePresets = [
    { id: 'sunset_orange', name: 'Sunset Orange & Rose', gradient: 'from-orange-500 to-rose-500', hex: '#f97316', glow: 'rgba(249, 115, 22, 0.2)' },
    { id: 'emerald_cyan', name: 'Emerald Green & Cyan', gradient: 'from-emerald-500 to-teal-500', hex: '#10b981', glow: 'rgba(16, 185, 129, 0.2)' },
    { id: 'royal_purple', name: 'Royal Purple & Indigo', gradient: 'from-purple-600 to-indigo-500', hex: '#9333ea', glow: 'rgba(147, 51, 234, 0.2)' },
    { id: 'ocean_blue', name: 'Ocean Sky & Blue', gradient: 'from-sky-500 to-blue-600', hex: '#0284c7', glow: 'rgba(2, 132, 199, 0.2)' },
    { id: 'golden_amber', name: 'Golden Amber & Gold', gradient: 'from-amber-400 to-orange-600', hex: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)' }
  ];

  const lightThemePresets = [
    { id: 'pure_slate_orange', name: 'Pure Slate & Orange Accent', gradient: 'from-orange-600 to-amber-600', hex: '#ea580c', glow: 'rgba(234, 88, 12, 0.15)' },
    { id: 'clean_teal', name: 'Clean Mint & Teal Glass', gradient: 'from-teal-600 to-emerald-600', hex: '#0d9488', glow: 'rgba(13, 148, 136, 0.15)' },
    { id: 'modern_indigo', name: 'Modern Indigo & Violet', gradient: 'from-indigo-600 to-purple-600', hex: '#4f46e5', glow: 'rgba(79, 70, 229, 0.15)' },
    { id: 'classic_cobalt', name: 'Classic Cobalt & Sky', gradient: 'from-blue-600 to-cyan-600', hex: '#2563eb', glow: 'rgba(37, 99, 235, 0.15)' }
  ];

  const [selectedAccent, setSelectedAccent] = useState(() => {
<<<<<<< HEAD
    return churchProfile?.accentColorId || localStorage.getItem('app_accent_color') || 'sunset_orange';
=======
    return localStorage.getItem('app_accent_color') || 'sunset_orange';
>>>>>>> 51282b6 (Initial commit)
  });

  // 3. Branding Titles & Global Labels State
  const [brandConfig, setBrandConfig] = useState(() => {
    const saved = localStorage.getItem('app_brand_config');
    if (saved) {
      try {
        return JSON.parse(saved);
<<<<<<< HEAD
      } catch (e) {}
    }
    return {
      portalTitle: churchProfile?.systemBrand || 'Nope Search Cathedral Management System',
=======
      } catch (e) {
        // fallback
      }
    }
    return {
      portalTitle: 'Nope Search Cathedral Management System',
>>>>>>> 51282b6 (Initial commit)
      shortTagline: 'Equipping Saints, Impacting Nations',
      footerCopyright: '© 2026 Nope Search Cathedral Trust. All Rights Reserved.',
      glassmorphismBlur: 'Heavy Blur (Glass)',
      cardBorderGlow: true,
      fontFamily: 'Inter / Outfit (Modern Clean)'
    };
  });

  // 4. Media Uploads State
  const [churchLogo, setChurchLogo] = useState(() => localStorage.getItem('app_logo') || null);
  const [churchFavicon, setChurchFavicon] = useState(() => localStorage.getItem('app_favicon') || null);
  const [churchWatermark, setChurchWatermark] = useState(() => localStorage.getItem('app_watermark') || null);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChurchLogo(reader.result);
        localStorage.setItem('app_logo', reader.result);
<<<<<<< HEAD
        if (onTriggerSuccess) onTriggerSuccess('Church Official Logo updated and saved!');
=======
        onTriggerSuccess('Church Official Logo updated and saved!');
>>>>>>> 51282b6 (Initial commit)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChurchFavicon(reader.result);
        localStorage.setItem('app_favicon', reader.result);
<<<<<<< HEAD
        if (onTriggerSuccess) onTriggerSuccess('Browser Favicon updated and saved!');
=======
        onTriggerSuccess('Browser Favicon updated and saved!');
>>>>>>> 51282b6 (Initial commit)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWatermarkUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChurchWatermark(reader.result);
        localStorage.setItem('app_watermark', reader.result);
<<<<<<< HEAD
        if (onTriggerSuccess) onTriggerSuccess('Official Letterhead Watermark updated!');
=======
        onTriggerSuccess('Official Letterhead Watermark updated!');
>>>>>>> 51282b6 (Initial commit)
      };
      reader.readAsDataURL(file);
    }
  };

<<<<<<< HEAD
  // ✅ 100% WORKING MASTER SAVE HANDLER
  const handleSaveAll = (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const activePresets = themeMode === 'dark' ? darkThemePresets : lightThemePresets;
  const currentAccentObj = activePresets.find(p => p.id === selectedAccent) || activePresets[0];

  // 1. Save directly to LocalStorage
  localStorage.setItem('app_theme_mode', themeMode);
  localStorage.setItem('app_accent_color', selectedAccent);
  localStorage.setItem('app_brand_config', JSON.stringify(brandConfig));

  // 2. Prepare Profile Object
  const updatedProfile = {
    ...(churchProfile || {}),
    themeMode: themeMode,
    accentColorId: selectedAccent,
    accentColor: currentAccentObj?.hex || '#f97316',
    systemBrand: brandConfig.portalTitle || churchProfile?.systemBrand
  };

  localStorage.setItem('app_church_profile_config', JSON.stringify(updatedProfile));

  // 3. Trigger Parent State
  if (typeof onSaveProfile === 'function') {
    onSaveProfile(updatedProfile);
  }

  if (typeof onTriggerSuccess === 'function') {
    onTriggerSuccess('Theme and background changes were successfully saved.! ✓');
  }
};

=======
  // Master Save Handler
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_theme_mode', themeMode);
    localStorage.setItem('app_accent_color', selectedAccent);
    localStorage.setItem('app_brand_config', JSON.stringify(brandConfig));

    onTriggerSuccess('All Branding, Themes & Global Header settings saved to database!');
  };

>>>>>>> 51282b6 (Initial commit)
  const activePresets = themeMode === 'dark' ? darkThemePresets : lightThemePresets;
  const currentAccentObj = activePresets.find(p => p.id === selectedAccent) || activePresets[0];

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">

        {/* 1. THEME MODE & COLOR PALETTES */}
<<<<<<< HEAD
        <div className="glass-card rounded-3xl p-8 space-y-6 bg-slate-900/60 border border-white/10">
=======
        <div className="glass-card rounded-3xl p-8 space-y-6">
>>>>>>> 51282b6 (Initial commit)
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Palette className="text-orange-400" size={22} />
                Portal Visual Theme & Glow Engine
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Switch between Ultra-Dark Glassmorphism and Pure Light Mode with custom signature accents
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Dark / Light Toggle Switcher */}
<<<<<<< HEAD
              <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-white/10">
=======
              <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-white/10">
>>>>>>> 51282b6 (Initial commit)
                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('dark');
                    setSelectedAccent('sunset_orange');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    themeMode === 'dark'
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Moon size={14} />
                  <span>Dark Mode</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('light');
                    setSelectedAccent('pure_slate_orange');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    themeMode === 'light'
                      ? 'bg-white text-slate-900 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun size={14} className={themeMode === 'light' ? 'text-amber-500' : ''} />
                  <span>Light Mode</span>
                </button>
              </div>

<<<<<<< HEAD
              {/* Working Save Button */}
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95 transition-all shrink-0"
=======
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
>>>>>>> 51282b6 (Initial commit)
              >
                <Save size={15} />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>

          {/* Accent Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                {themeMode === 'dark' ? 'Dark Signature Neon Accents:' : 'Light High-Contrast Accents:'}
              </label>
              <span className="text-[11px] text-orange-400 font-mono font-semibold">
                Active: {currentAccentObj?.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {activePresets.map((theme) => {
                const isSelected = selectedAccent === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => {
                      setSelectedAccent(theme.id);
<<<<<<< HEAD
                      if (onTriggerSuccess) onTriggerSuccess(`Color preset selected: ${theme.name}`);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-slate-900/90 border-orange-500 shadow-xl scale-[1.02] ring-2 ring-orange-500/30'
=======
                      onTriggerSuccess(`Color preset selected: ${theme.name}`);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-slate-900/90 border-white/40 shadow-xl scale-[1.02] ring-2 ring-white/20'
>>>>>>> 51282b6 (Initial commit)
                        : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${theme.gradient} shadow-md flex items-center justify-center text-white`}>
                        {isSelected && <Check size={16} />}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{theme.hex}</span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white">{theme.name}</h4>
                      <p className="text-[10px] text-slate-400">{themeMode === 'dark' ? 'Glowing Glass Dark' : 'Bright Modern UI'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Theme Preview Box */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/10 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Real-time Interface Preview</span>
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
              themeMode === 'dark' 
                ? 'bg-slate-900/90 border-white/10 text-white' 
                : 'bg-slate-100 border-slate-300 text-slate-900'
            }`} style={{ boxShadow: `0 0 20px ${currentAccentObj?.glow || 'rgba(249, 115, 22, 0.15)'}` }}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${currentAccentObj?.gradient} flex items-center justify-center text-white font-bold shadow-md`}>
                  NC
                </div>
                <div>
                  <h4 className="text-sm font-bold">{brandConfig.portalTitle}</h4>
                  <p className="text-xs text-slate-400">{brandConfig.shortTagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${currentAccentObj?.gradient} text-white shadow-md`}>
                  Active Button
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-white/10">
            <div>
              <label className="text-xs font-medium text-slate-300">Glass Transparency Blur</label>
              <select
                value={brandConfig.glassmorphismBlur}
                onChange={(e) => setBrandConfig({ ...brandConfig, glassmorphismBlur: e.target.value })}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
              >
                <option value="Heavy Blur (Glass)">Heavy Blur (Glassmorphism Default)</option>
                <option value="Medium Blur">Medium Blur (Translucent)</option>
                <option value="Solid Dark">Solid Background (High Contrast)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Dashboard Font Family</label>
              <select
                value={brandConfig.fontFamily}
                onChange={(e) => setBrandConfig({ ...brandConfig, fontFamily: e.target.value })}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
              >
                <option value="Inter / Outfit (Modern Clean)">Inter / Outfit (Modern Clean)</option>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                <option value="Poppins (Geometric)">Poppins (Geometric)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brandConfig.cardBorderGlow}
                  onChange={(e) => setBrandConfig({ ...brandConfig, cardBorderGlow: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <span>Enable Ambient Card Neon Glow Borders</span>
              </label>
            </div>
          </div>
        </div>

        {/* 2. OFFICIAL LOGOS & ASSETS */}
<<<<<<< HEAD
        <div className="glass-card rounded-3xl p-8 space-y-6 bg-slate-900/60 border border-white/10">
=======
        <div className="glass-card rounded-3xl p-8 space-y-6">
>>>>>>> 51282b6 (Initial commit)
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ImageIcon className="text-orange-400" size={20} />
              Church Brand Assets & Media Uploads
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">High-resolution logos used for web portal, reports, and member certificates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Logo */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 text-center space-y-3">
              <span className="text-xs font-bold text-white block">Main Portal Logo</span>
              <div className="w-24 h-24 mx-auto rounded-2xl border-2 border-dashed border-white/20 bg-slate-950 flex items-center justify-center overflow-hidden">
                {churchLogo ? (
                  <img src={churchLogo} alt="Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  <ImageIcon size={30} className="text-slate-600" />
                )}
              </div>
              <input type="file" ref={logoInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
              >
                {churchLogo ? 'Change Logo' : 'Upload PNG'}
              </button>
              <p className="text-[10px] text-slate-500">Transparent PNG / SVG</p>
            </div>

            {/* Browser Favicon */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 text-center space-y-3">
              <span className="text-xs font-bold text-white block">Browser Tab Favicon</span>
              <div className="w-24 h-24 mx-auto rounded-2xl border-2 border-dashed border-white/20 bg-slate-950 flex items-center justify-center overflow-hidden">
                {churchFavicon ? (
                  <img src={churchFavicon} alt="Favicon" className="w-12 h-12 object-contain" />
                ) : (
                  <Sparkles size={26} className="text-slate-600" />
                )}
              </div>
              <input type="file" ref={faviconInputRef} onChange={handleFaviconUpload} accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={() => faviconInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
              >
                {churchFavicon ? 'Change Favicon' : 'Upload Icon'}
              </button>
              <p className="text-[10px] text-slate-500">32x32 / 64x64 Square Icon</p>
            </div>

            {/* Letterhead Watermark */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 text-center space-y-3">
              <span className="text-xs font-bold text-white block">Report Watermark / Seal</span>
              <div className="w-24 h-24 mx-auto rounded-2xl border-2 border-dashed border-white/20 bg-slate-950 flex items-center justify-center overflow-hidden opacity-60">
                {churchWatermark ? (
                  <img src={churchWatermark} alt="Watermark" className="w-full h-full object-contain p-2" />
                ) : (
                  <Layout size={26} className="text-slate-600" />
                )}
              </div>
              <input type="file" ref={watermarkInputRef} onChange={handleWatermarkUpload} accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={() => watermarkInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-white/10 cursor-pointer"
              >
                {churchWatermark ? 'Change Watermark' : 'Upload Mark'}
              </button>
              <p className="text-[10px] text-slate-500">Faint Transparent Monogram</p>
            </div>
          </div>
        </div>

        {/* 3. GLOBAL TITLES & FOOTER COPYRIGHT */}
<<<<<<< HEAD
        <div className="glass-card rounded-3xl p-8 space-y-6 bg-slate-900/60 border border-white/10">
=======
        <div className="glass-card rounded-3xl p-8 space-y-6">
>>>>>>> 51282b6 (Initial commit)
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="text-orange-400" size={20} />
              Portal Titles & Global Footer Labels
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Customize global names displayed on browser headers, mobile screens, and receipts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Software Top Header Title *</label>
              <input
                type="text"
                required
                value={brandConfig.portalTitle}
                onChange={(e) => setBrandConfig({ ...brandConfig, portalTitle: e.target.value })}
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Church Vision Sub-Tagline</label>
              <input
                type="text"
                value={brandConfig.shortTagline}
                onChange={(e) => setBrandConfig({ ...brandConfig, shortTagline: e.target.value })}
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-300">Official Footer Copyright Notice</label>
              <input
                type="text"
                value={brandConfig.footerCopyright}
                onChange={(e) => setBrandConfig({ ...brandConfig, footerCopyright: e.target.value })}
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
<<<<<<< HEAD
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95 transition-all"
=======
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
>>>>>>> 51282b6 (Initial commit)
            >
              <Save size={15} />
              <span>Save & Apply Changes</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
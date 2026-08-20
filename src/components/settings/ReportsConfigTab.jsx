import React, { useState, useRef } from 'react';
import { 
  FileText, BarChart3, Download, Printer, Save, 
  Image as ImageIcon, Sparkles, ShieldCheck, Eye, 
  Check, X, FileSpreadsheet, QrCode, AlignLeft, AlignCenter, 
  Building2, GitBranch, Phone, MapPin, CheckCircle2, Layers
} from 'lucide-react';

export default function ReportsConfigTab({ onTriggerSuccess }) {
  const signatureInputRef = useRef(null);
  const sealInputRef = useRef(null);

  // 1. Church Branches Master Database
  const churchBranchesList = [
    {
      id: 'main_church',
      label: 'Main Church HQ • Nope Search Cathedral (Chennai)',
      name: 'Nope Search Cathedral Trust & Ministries (HQ)',
      tagline: 'Equipping Saints, Impacting Nations • Central Diocesan HQ',
      trustReg: 'TN-CH/80G/2026/009412',
      address: '124, Cathedral Boulevard, Anna Nagar, Chennai - 600040',
      phone: '+91 44 2618 9000',
      email: 'secretariat@cathedraltrust.org',
      signatory: 'Rev. Senior Pastor & Managing Trustee'
    },
    {
      id: 'branch_coimbatore',
      label: 'Branch 01 • Coimbatore City Campus',
      name: 'Nope Cathedral • Coimbatore City Branch',
      tagline: 'Branch Ministry Fellowship • Diocesan Zone 2',
      trustReg: 'TN-CH/80G/2026/009412/CBE',
      address: '45, Avinashi Road, Peelamedu, Coimbatore - 641004',
      phone: '+91 422 256 7890',
      email: 'coimbatore@cathedraltrust.org',
      signatory: 'Rev. Resident Branch Pastor'
    },
    {
      id: 'branch_madurai',
      label: 'Branch 02 • Madurai South Center',
      name: 'Nope Cathedral • Madurai South Branch',
      tagline: 'Branch Ministry Fellowship • Diocesan Zone 3',
      trustReg: 'TN-CH/80G/2026/009412/MDU',
      address: '12, Bypass Road, Ponmeni, Madurai - 625016',
      phone: '+91 452 245 6789',
      email: 'madurai@cathedraltrust.org',
      signatory: 'Rev. Associate Branch Minister'
    },
    {
      id: 'branch_tiruppur',
      label: 'Branch 03 • Tiruppur Central Fellowship',
      name: 'Nope Cathedral • Tiruppur Branch',
      tagline: 'Branch Ministry Fellowship • Diocesan Zone 4',
      trustReg: 'TN-CH/80G/2026/009412/TPR',
      address: '88, Kangeyam Road, Tiruppur - 641604',
      phone: '+91 421 223 4567',
      email: 'tiruppur@cathedraltrust.org',
      signatory: 'Rev. Area Pastor'
    },
    {
      id: 'branch_salem',
      label: 'Branch 04 • Salem City Sanctuary',
      name: 'Nope Cathedral • Salem City Branch',
      tagline: 'Branch Ministry Fellowship • Diocesan Zone 5',
      trustReg: 'TN-CH/80G/2026/009412/SLM',
      address: '19, Omalur Main Road, Salem - 636009',
      phone: '+91 427 234 5678',
      email: 'salem@cathedraltrust.org',
      signatory: 'Rev. Branch Pastor'
    }
  ];

  const [selectedChurchId, setSelectedChurchId] = useState('main_church');

  // 2. Live Layout & Styling State
  const [layoutConfig, setLayoutConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('app_report_builder_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    const defaultChurch = churchBranchesList[0];
    return {
      institutionTitle: defaultChurch.name,
      subTagline: defaultChurch.tagline,
      trustRegNumber: defaultChurch.trustReg,
      churchPhone: defaultChurch.phone,
      churchAddress: defaultChurch.address,
      headerAlignment: 'center', // 'left' | 'center'
      tableHeaderColor: '#ea580c', // Orange, Emerald, Slate, Blue
      paperSize: 'A4 Portrait',
      defaultExportFormat: 'Official PDF Document',
      showOfficialSeal: true,
      showPastorSignature: true,
      signatoryDesignation: defaultChurch.signatory,
      enableSecurityWatermark: true,
      watermarkText: 'NOPE CATHEDRAL • AUDITED',
      includeDynamicQrVerification: true
    };
  });

  // 3. Export Column Mapping Matrix (PDF vs Excel Separated)
  const [columnMatrix, setColumnMatrix] = useState(() => {
    try {
      const saved = localStorage.getItem('app_report_column_matrix');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      // PDF Optimized Columns (Clean & Compact)
      pdf: {
        memberId: true,
        fullName: true,
        category: true,
        titheAmount: true,
        paymentMode: true,
        signatureSignoff: true
      },
      // Excel Optimized Columns (Detailed Ledger)
      excel: {
        memberId: true,
        fullName: true,
        familyHeadName: true,
        contactPhone: true,
        zoneArea: true,
        category: true,
        titheAmount: true,
        paymentMode: true,
        transactionRefNo: true,
        auditTimestamp: true
      }
    };
  });

  // Active matrix tab view
  const [activeMatrixTab, setActiveMatrixTab] = useState('pdf');

  // Media States
  const [pastorSignature, setPastorSignature] = useState(() => localStorage.getItem('app_pastor_signature') || null);
  const [churchSeal, setChurchSeal] = useState(() => localStorage.getItem('app_church_seal') || null);

  // Dropdown Change Handler: Auto fills all data automatically
  const handleChurchDropdownChange = (churchId) => {
    setSelectedChurchId(churchId);
    const matched = churchBranchesList.find(c => c.id === churchId) || churchBranchesList[0];
    if (matched) {
      setLayoutConfig(prev => ({
        ...prev,
        institutionTitle: matched.name,
        subTagline: matched.tagline,
        trustRegNumber: matched.trustReg,
        churchAddress: matched.address,
        churchPhone: matched.phone,
        signatoryDesignation: matched.signatory
      }));
      onTriggerSuccess?.(`Report details updated for: ${matched.name}`);
    }
  };

  // Upload Handlers
  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPastorSignature(reader.result);
        localStorage.setItem('app_pastor_signature', reader.result);
        onTriggerSuccess?.('Pastor digital signature uploaded & saved!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSealUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChurchSeal(reader.result);
        localStorage.setItem('app_church_seal', reader.result);
        onTriggerSuccess?.('Official church seal updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle Matrix Column
  const handleToggleColumn = (type, colKey) => {
    const updated = {
      ...columnMatrix,
      [type]: {
        ...columnMatrix[type],
        [colKey]: !columnMatrix[type][colKey]
      }
    };
    setColumnMatrix(updated);
    localStorage.setItem('app_report_column_matrix', JSON.stringify(updated));
  };

  // Master Save Handler
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('app_report_builder_config', JSON.stringify(layoutConfig));
    localStorage.setItem('app_report_column_matrix', JSON.stringify(columnMatrix));
    onTriggerSuccess?.('Report Designer & Branch Export settings saved successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <form onSubmit={handleSaveAll} className="space-y-6">

        {/* Master Header Card */}
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="text-orange-400" size={24} />
                Report Designer & Export Layout Studio
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Customize report letterhead headers, PDF/Excel columns, and print styles for Main Church HQ and all Branches
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
            >
              <Save size={15} />
              <span>Save Report Layout</span>
            </button>
          </div>

          {/* 1. Target Church Dropdown Selector */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Building2 size={15} className="text-orange-400" />
              <span>Select Target Church Unit for Report Letterhead:</span>
            </label>
            
            <div className="relative">
              <select
                value={selectedChurchId}
                onChange={(e) => handleChurchDropdownChange(e.target.value)}
                className="w-full bg-slate-950 border border-orange-500/30 rounded-2xl px-4 py-3 text-xs text-white font-bold focus:outline-none focus:border-orange-500 cursor-pointer shadow-inner"
              >
                {churchBranchesList.map((branch) => (
                  <option key={branch.id} value={branch.id} className="bg-slate-900 text-white py-1">
                    {branch.label}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-400">
              Choosing a church auto-fills its registration, phone, address, and signatory details below.
            </p>
          </div>

          {/* Grid: Left Controls (7 cols) + Right Live A4 Preview (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 2. Official Header Information Form */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText size={15} />
                  <span>2. Official Letterhead & Trust Registration Details</span>
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300">Header Organization Name *</label>
                    <input
                      type="text"
                      required
                      value={layoutConfig.institutionTitle}
                      onChange={(e) => setLayoutConfig({ ...layoutConfig, institutionTitle: e.target.value })}
                      className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-300">Official Contact Phone</label>
                      <input
                        type="text"
                        value={layoutConfig.churchPhone}
                        onChange={(e) => setLayoutConfig({ ...layoutConfig, churchPhone: e.target.value })}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300">80G / Trust Reg. Number</label>
                      <input
                        type="text"
                        value={layoutConfig.trustRegNumber}
                        onChange={(e) => setLayoutConfig({ ...layoutConfig, trustRegNumber: e.target.value })}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300">Sanctuary Address Line</label>
                    <input
                      type="text"
                      value={layoutConfig.churchAddress}
                      onChange={(e) => setLayoutConfig({ ...layoutConfig, churchAddress: e.target.value })}
                      className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-300">Header Alignment</label>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setLayoutConfig({ ...layoutConfig, headerAlignment: 'left' })}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                            layoutConfig.headerAlignment === 'left'
                              ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                              : 'bg-slate-900 border-white/10 text-slate-400'
                          }`}
                        >
                          <AlignLeft size={14} /> Left
                        </button>
                        <button
                          type="button"
                          onClick={() => setLayoutConfig({ ...layoutConfig, headerAlignment: 'center' })}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                            layoutConfig.headerAlignment === 'center'
                              ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                              : 'bg-slate-900 border-white/10 text-slate-400'
                          }`}
                        >
                          <AlignCenter size={14} /> Center
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300">Default Download Format</label>
                      <select
                        value={layoutConfig.defaultExportFormat}
                        onChange={(e) => setLayoutConfig({ ...layoutConfig, defaultExportFormat: e.target.value })}
                        className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer font-semibold"
                      >
                        <option value="Official PDF Document">Official PDF Document</option>
                        <option value="Raw Excel / CSV Spreadsheet">Raw Excel / CSV Spreadsheet</option>
                        <option value="80mm Thermal Receipt Slip">80mm Thermal Receipt Slip</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Paper Size, Signatures & Table Accents */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                  <Printer size={15} />
                  <span>3. Table Theme Colors, Paper & Digital Signatures</span>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300">Target Paper Size</label>
                    <select
                      value={layoutConfig.paperSize}
                      onChange={(e) => setLayoutConfig({ ...layoutConfig, paperSize: e.target.value })}
                      className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                    >
                      <option value="A4 Portrait">A4 Portrait (Standard Official PDF)</option>
                      <option value="A4 Landscape">A4 Landscape (Multi-Column Ledgers)</option>
                      <option value="80mm Thermal Slip">80mm POS Thermal Slip</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300">Table Header Color Accent</label>
                    <select
                      value={layoutConfig.tableHeaderColor}
                      onChange={(e) => setLayoutConfig({ ...layoutConfig, tableHeaderColor: e.target.value })}
                      className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                    >
                      <option value="#ea580c">Sunset Orange (Default)</option>
                      <option value="#0f172a">Deep Slate Dark</option>
                      <option value="#059669">Emerald Green</option>
                      <option value="#4f46e5">Royal Indigo</option>
                    </select>
                  </div>
                </div>

                {/* Signatory Uploads */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <input type="file" ref={signatureInputRef} onChange={handleSignatureUpload} accept="image/*" className="hidden" />
                  <button
                    type="button"
                    onClick={() => signatureInputRef.current?.click()}
                    className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-orange-500/40 text-left space-y-1 cursor-pointer transition-all"
                  >
                    <span className="text-xs font-bold text-white block">Pastor Digital Signature</span>
                    <span className="text-[10px] text-orange-400">{pastorSignature ? '✓ Loaded' : '+ Upload Signature PNG'}</span>
                  </button>

                  <input type="file" ref={sealInputRef} onChange={handleSealUpload} accept="image/*" className="hidden" />
                  <button
                    type="button"
                    onClick={() => sealInputRef.current?.click()}
                    className="p-3 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-orange-500/40 text-left space-y-1 cursor-pointer transition-all"
                  >
                    <span className="text-xs font-bold text-white block">Church Official Seal Stamp</span>
                    <span className="text-[10px] text-orange-400">{churchSeal ? '✓ Loaded' : '+ Upload Official Emblem'}</span>
                  </button>
                </div>
              </div>

              {/* 4. PDF vs Excel Column Mapping Matrix */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                    <Layers size={15} />
                    <span>4. Category & Column Inclusion Matrix</span>
                  </h4>

                  {/* PDF vs Excel Tab Switcher */}
                  <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveMatrixTab('pdf')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeMatrixTab === 'pdf' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      PDF Columns
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMatrixTab('excel')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeMatrixTab === 'excel' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Excel / CSV Columns
                    </button>
                  </div>
                </div>

                {/* Dynamic Columns Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {Object.keys(columnMatrix[activeMatrixTab]).map((colKey) => {
                    const isEnabled = columnMatrix[activeMatrixTab][colKey];
                    return (
                      <button
                        key={colKey}
                        type="button"
                        onClick={() => handleToggleColumn(activeMatrixTab, colKey)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isEnabled
                            ? activeMatrixTab === 'pdf'
                              ? 'bg-orange-500/10 border-orange-500/30 text-white font-medium'
                              : 'bg-emerald-500/10 border-emerald-500/30 text-white font-medium'
                            : 'bg-slate-900/40 border-white/5 text-slate-500 line-through'
                        }`}
                      >
                        <span className="capitalize">{colKey.replace(/([A-Z])/g, ' $1')}</span>
                        {isEnabled ? <Check size={12} className={activeMatrixTab === 'pdf' ? 'text-orange-400' : 'text-emerald-400'} /> : <X size={12} />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Live A4 PDF Preview Studio */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Live Generated PDF Download Preview
              </span>

              <div className="w-full max-w-[340px] rounded-2xl bg-white text-slate-900 p-5 shadow-2xl space-y-4 border border-slate-300 font-sans text-xs relative overflow-hidden">
                
                {/* Background Watermark */}
                {layoutConfig.enableSecurityWatermark && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-[-30deg] text-3xl font-black uppercase text-slate-900">
                    {layoutConfig.watermarkText}
                  </div>
                )}

                {/* PDF Header */}
                <div className={`space-y-1 pb-3 border-b-2 border-slate-800 ${layoutConfig.headerAlignment === 'center' ? 'text-center' : 'text-left'}`}>
                  <h4 className="text-sm font-black tracking-tight text-slate-900 uppercase">
                    {layoutConfig.institutionTitle}
                  </h4>
                  <p className="text-[9px] text-slate-600 leading-tight">
                    {layoutConfig.churchAddress}
                  </p>
                  <div className="flex items-center justify-center gap-3 text-[8px] font-mono text-slate-500 pt-0.5">
                    <span>Ph: {layoutConfig.churchPhone}</span>
                    <span>•</span>
                    <span className="text-orange-600 font-bold">URN: {layoutConfig.trustRegNumber}</span>
                  </div>
                </div>

                {/* Sample Report Title */}
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold uppercase text-slate-800">Ministry Tithe & Audit Summary</span>
                  <span className="text-slate-500 font-mono">Date: 16/08/2026</span>
                </div>

                {/* Mini Sample Data Table */}
                <div className="rounded-lg overflow-hidden border border-slate-200 text-[10px]">
                  <div 
                    className="p-1.5 font-bold text-white flex justify-between"
                    style={{ backgroundColor: layoutConfig.tableHeaderColor }}
                  >
                    <span>Member Description</span>
                    <span>Tithe Amount</span>
                  </div>
                  <div className="p-1.5 border-b border-slate-100 flex justify-between bg-slate-50">
                    <span>Bro. Samuel & Family (Zone A)</span>
                    <span className="font-mono font-bold">₹10,000.00</span>
                  </div>
                  <div className="p-1.5 flex justify-between">
                    <span>Sis. Grace (Building Fund)</span>
                    <span className="font-mono font-bold">₹5,000.00</span>
                  </div>
                </div>

                {/* Bottom Signatures & Seal */}
                <div className="pt-4 flex items-end justify-between text-[9px] border-t border-slate-200">
                  <div className="space-y-1 text-center">
                    {churchSeal ? (
                      <img src={churchSeal} alt="Seal" className="w-10 h-10 object-contain mx-auto" />
                    ) : (
                      <div className="w-9 h-9 rounded-full border border-dashed border-slate-400 mx-auto flex items-center justify-center text-[7px] text-slate-400">
                        SEAL
                      </div>
                    )}
                    <span className="block text-[8px] text-slate-500">Official Stamp</span>
                  </div>

                  {layoutConfig.includeDynamicQrVerification && (
                    <div className="text-center">
                      <QrCode size={28} className="mx-auto text-slate-800" />
                      <span className="text-[7px] text-slate-500 block">Verify Audit</span>
                    </div>
                  )}

                  <div className="space-y-1 text-center">
                    {pastorSignature ? (
                      <img src={pastorSignature} alt="Sign" className="w-12 h-6 object-contain mx-auto" />
                    ) : (
                      <div className="w-12 h-6 border-b border-slate-400 mx-auto" />
                    )}
                    <span className="block font-bold text-[8px] text-slate-800">{layoutConfig.signatoryDesignation}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Footer Save */}
          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <Save size={15} />
              <span>Save & Apply Export Templates</span>
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}
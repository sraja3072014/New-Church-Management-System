import React, { useState, useRef } from 'react';
import { 
  Receipt, ShieldCheck, FileText, CheckCircle2, Upload, 
  Save, Eye, Download, AlertTriangle, Building, Hash, Lock, Check
} from 'lucide-react';

export default function TaxReceiptsTab({ onTriggerSuccess }) {
  const [activeTab, setActiveTab] = useState('config'); // 'config' or 'preview'
  const sealInputRef = useRef(null);
  const signInputRef = useRef(null);

  const [churchSeal, setChurchSeal] = useState(null);
  const [authorizedSign, setAuthorizedSign] = useState(null);

  // 80G and Tax Configuration State
  const [taxConfig, setTaxConfig] = useState({
    trustRegName: 'Nope Search Educational & Charitable Trust',
    trustPan: 'AAATN1234F',
    section80GRegNo: 'CIT(E)/80G/2026-27/AABTN9876E',
    section12AUrn: 'AABTN9876EE20214',
    approvalDate: '2021-04-01',
    validityType: 'Perpetual / 5 Years (Renewed)',
    panMandatoryThreshold: '2000',
    receiptPrefix: 'REC/2026-27/',
    startingReceiptNo: '1001',
    authorizedSignatoryName: 'Rev. Senior Pastor',
    signatoryDesignation: 'Managing Trustee / Senior Pastor',
    enableAutoEmailReceipt: true,
    enableAutoWhatsappReceipt: true,
    includeForm10BDDisclaimer: true
  });

  const handleSealUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setChurchSeal(URL.createObjectURL(file));
      onTriggerSuccess('Church Official Seal uploaded successfully!');
    }
  };

  const handleSignUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAuthorizedSign(URL.createObjectURL(file));
      onTriggerSuccess('Authorized Signatory Signature uploaded successfully!');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onTriggerSuccess('Tax & 80G Statutory Receipt settings saved!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub Header & Tabs */}
      <div className="glass-panel p-1.5 rounded-2xl flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'config'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck size={14} className={activeTab === 'config' ? 'text-orange-600' : 'text-slate-400'} />
            <span>1. 80G & Statutory Tax Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white text-slate-900 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Eye size={14} className={activeTab === 'preview' ? 'text-orange-600' : 'text-slate-400'} />
            <span>2. Live 80G Tax Receipt Preview</span>
          </button>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
        >
          <Save size={14} />
          <span>Save Tax Rules</span>
        </button>
      </div>

      {/* ================= 1. TAB: CONFIGURATION ================= */}
      {activeTab === 'config' && (
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Legal Trust Details */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Receipt className="text-orange-400" size={22} />
                Statutory 80G & 12A Registration Master
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official registration credentials required for IT Department Form 10BD and tax-exempt donor receipts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-slate-300">Registered Trust / Society Legal Name *</label>
                <input
                  type="text"
                  required
                  value={taxConfig.trustRegName}
                  onChange={(e) => setTaxConfig({ ...taxConfig, trustRegName: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Trust Permanent Account Number (PAN) *</label>
                <input
                  type="text"
                  required
                  value={taxConfig.trustPan}
                  onChange={(e) => setTaxConfig({ ...taxConfig, trustPan: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Section 80G Approval Number / URN *</label>
                <input
                  type="text"
                  required
                  value={taxConfig.section80GRegNo}
                  onChange={(e) => setTaxConfig({ ...taxConfig, section80GRegNo: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Section 12A Registration URN</label>
                <input
                  type="text"
                  value={taxConfig.section12AUrn}
                  onChange={(e) => setTaxConfig({ ...taxConfig, section12AUrn: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Order / Validity Period</label>
                <input
                  type="text"
                  value={taxConfig.validityType}
                  onChange={(e) => setTaxConfig({ ...taxConfig, validityType: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Receipt Numbering & Thresholds */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Hash className="text-orange-400" size={20} />
                Receipt Numbering & Donor Compliance Rules
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Receipt Prefix Pattern</label>
                <input
                  type="text"
                  value={taxConfig.receiptPrefix}
                  onChange={(e) => setTaxConfig({ ...taxConfig, receiptPrefix: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Starting Serial Number</label>
                <input
                  type="text"
                  value={taxConfig.startingReceiptNo}
                  onChange={(e) => setTaxConfig({ ...taxConfig, startingReceiptNo: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">Mandatory Donor PAN Threshold (₹)</label>
                <input
                  type="number"
                  value={taxConfig.panMandatoryThreshold}
                  onChange={(e) => setTaxConfig({ ...taxConfig, panMandatoryThreshold: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={taxConfig.enableAutoEmailReceipt}
                  onChange={(e) => setTaxConfig({ ...taxConfig, enableAutoEmailReceipt: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <span>Automatically email signed 80G PDF receipt on successful donation</span>
              </label>

              <label className="flex items-center gap-3 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={taxConfig.enableAutoWhatsappReceipt}
                  onChange={(e) => setTaxConfig({ ...taxConfig, enableAutoWhatsappReceipt: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                />
                <span>Send WhatsApp notification with receipt PDF download link</span>
              </label>
            </div>
          </div>

          {/* Official Signatory & Seal Upload */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building className="text-orange-400" size={20} />
                Authorized Signatory & Official Stamp
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium text-slate-300">Authorized Signatory Name</label>
                <input
                  type="text"
                  value={taxConfig.authorizedSignatoryName}
                  onChange={(e) => setTaxConfig({ ...taxConfig, authorizedSignatoryName: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
                
                <label className="text-xs font-medium text-slate-300 block mt-3">Signatory Role / Designation</label>
                <input
                  type="text"
                  value={taxConfig.signatoryDesignation}
                  onChange={(e) => setTaxConfig({ ...taxConfig, signatoryDesignation: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              {/* Uploads */}
              <div className="grid grid-cols-2 gap-4">
                {/* Stamp */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-300">Church Official Seal</p>
                  <div className="w-20 h-20 mx-auto rounded-xl border border-dashed border-white/20 bg-slate-950 flex items-center justify-center overflow-hidden">
                    {churchSeal ? <img src={churchSeal} alt="Seal" className="w-full h-full object-contain" /> : <Building size={24} className="text-slate-600" />}
                  </div>
                  <input type="file" ref={sealInputRef} onChange={handleSealUpload} accept="image/*" className="hidden" />
                  <button
                    type="button"
                    onClick={() => sealInputRef.current?.click()}
                    className="text-[11px] text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
                  >
                    {churchSeal ? 'Change Stamp' : 'Upload Stamp'}
                  </button>
                </div>

                {/* Signature */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-300">Digital Signature</p>
                  <div className="w-20 h-20 mx-auto rounded-xl border border-dashed border-white/20 bg-slate-950 flex items-center justify-center overflow-hidden">
                    {authorizedSign ? <img src={authorizedSign} alt="Sign" className="w-full h-full object-contain" /> : <FileText size={24} className="text-slate-600" />}
                  </div>
                  <input type="file" ref={signInputRef} onChange={handleSignUpload} accept="image/*" className="hidden" />
                  <button
                    type="button"
                    onClick={() => signInputRef.current?.click()}
                    className="text-[11px] text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
                  >
                    {authorizedSign ? 'Change Sign' : 'Upload Sign'}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </form>
      )}

      {/* ================= 2. TAB: LIVE 80G RECEIPT PREVIEW ================= */}
      {activeTab === 'preview' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto bg-white text-slate-900 shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">{taxConfig.trustRegName}</h2>
              <p className="text-xs text-slate-600">123 Cathedral Road, Koduvai, Tirupur, Tamil Nadu - 638660</p>
              <div className="flex items-center justify-center gap-4 text-[11px] font-bold text-slate-700 pt-1 font-mono">
                <span>PAN: {taxConfig.trustPan}</span>
                <span>•</span>
                <span>80G URN: {taxConfig.section80GRegNo}</span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center py-3 border-b border-slate-200">
              <span className="px-3 py-1 bg-slate-100 border border-slate-300 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800">
                Official 80G Tax-Deductible Donation Receipt
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 py-4 text-xs">
              <div>
                <p className="text-slate-500">Receipt No:</p>
                <p className="font-bold font-mono text-slate-900">{taxConfig.receiptPrefix}0042</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500">Date of Receipt:</p>
                <p className="font-bold text-slate-900">{new Date().toLocaleDateString('en-GB')}</p>
              </div>

              <div>
                <p className="text-slate-500">Received With Thanks From:</p>
                <p className="font-bold text-sm text-slate-900">Bro. Samuel & Family</p>
                <p className="text-[11px] text-slate-600">Donor PAN: ABCDE1234F</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500">Purpose / Fund Head:</p>
                <p className="font-bold text-slate-900">Church Building & Expansion Fund</p>
                <p className="text-[11px] text-slate-600">Mode: UPI / Online Transfer</p>
              </div>
            </div>

            {/* Amount Box */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between my-2">
              <span className="text-xs font-bold text-slate-700">Amount Received (in figures):</span>
              <span className="text-base font-black font-mono text-slate-900">₹ 25,000.00</span>
            </div>
            <p className="text-[11px] text-slate-600 italic">Rupees Twenty-Five Thousand Only</p>

            {/* Statutory Note */}
            <div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-600 border border-slate-200 my-4 leading-relaxed">
              <strong>Statutory Declaration:</strong> Donations are exempt under Section 80G of the Income Tax Act, 1961. This contribution will be reported to the IT Department in Annual Form 10BD for donor tax credit.
            </div>

            {/* Sign & Seal */}
            <div className="flex items-end justify-between pt-6 border-t border-slate-200">
              <div className="text-center">
                <div className="w-16 h-16 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-[10px] text-slate-400">
                  {churchSeal ? <img src={churchSeal} alt="Seal" className="w-full h-full object-contain" /> : 'Official Seal'}
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="h-10 flex items-center justify-end">
                  {authorizedSign ? <img src={authorizedSign} alt="Sign" className="h-full object-contain" /> : <span className="text-xs text-slate-400">Digital Signature</span>}
                </div>
                <p className="font-bold text-xs text-slate-900">{taxConfig.authorizedSignatoryName}</p>
                <p className="text-[10px] text-slate-500">{taxConfig.signatoryDesignation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
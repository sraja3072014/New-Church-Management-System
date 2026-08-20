import React, { useState } from 'react';
import { 
  Building, Plus, Search, Edit2, Trash2, X, Check,
  QrCode, CreditCard, ShieldCheck, Star, Globe, Landmark, GitBranch
} from 'lucide-react';

export default function BankAccountsTab({ onTriggerSuccess }) {
  const [activeCategoryTab, setActiveCategoryTab] = useState('all'); // all, main_hq, branches, fcra_trust

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      accountName: 'Nope Search Main Cathedral Trust A/C',
      accountCategory: 'main_hq',
      bankName: 'State Bank of India (SBI)',
      accountNumber: '38492019283',
      ifscCode: 'SBIN0001234',
      branchName: 'Koduvai Branch',
      accountType: 'Current Account',
      upiId: 'nopechurch@sbi',
      isPrimary: true,
      campus: 'Nope Search Main Cathedral (HQ)',
      purposeTag: 'Main Operating Fund'
    },
    {
      id: 2,
      accountName: 'Nope Cathedral FCRA Designated Account',
      accountCategory: 'fcra_trust',
      bankName: 'State Bank of India (SBI NDMB)',
      accountNumber: '40192839102',
      ifscCode: 'SBIN0000691',
      branchName: 'New Delhi Main Branch (NDMB, Parliament St)',
      accountType: 'FCRA Designated Foreign Account',
      upiId: '',
      isPrimary: false,
      campus: 'National / International (MHA Approved)',
      purposeTag: 'FCRA Foreign Contributions'
    },
    {
      id: 3,
      accountName: 'Koduvai Town Branch Local Ministry A/C',
      accountCategory: 'branches',
      bankName: 'HDFC Bank',
      accountNumber: '50100293849102',
      ifscCode: 'HDFC0004321',
      branchName: 'Tirupur South',
      accountType: 'Savings Account',
      upiId: 'koduvai.church@hdfcbank',
      isPrimary: false,
      campus: 'Koduvai Town Branch',
      purposeTag: 'Branch Local Expenses'
    },
    {
      id: 4,
      accountName: 'Church Educational & Charity Trust A/C',
      accountCategory: 'fcra_trust',
      bankName: 'Canara Bank',
      accountNumber: '120938491023',
      ifscCode: 'CNRB0002819',
      branchName: 'Kangeyam',
      accountType: 'Trust Society Account',
      upiId: 'nopecharity@cnrb',
      isPrimary: false,
      campus: 'All Campuses (Charity Wing)',
      purposeTag: 'Social Welfare & Education'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    accountName: '',
    accountCategory: 'main_hq',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
    accountType: 'Current Account',
    upiId: '',
    isPrimary: false,
    campus: 'Nope Search Main Cathedral (HQ)',
    purposeTag: ''
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ ...item });
    } else {
      setEditingId(null);
      setFormData({
        accountName: '',
        accountCategory: activeCategoryTab === 'all' ? 'main_hq' : activeCategoryTab,
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
        accountType: 'Current Account',
        upiId: '',
        isPrimary: false,
        campus: 'Nope Search Main Cathedral (HQ)',
        purposeTag: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.accountName || !formData.accountNumber || !formData.ifscCode) return;

    if (editingId) {
      setBankAccounts(bankAccounts.map(b => b.id === editingId ? { ...formData, id: b.id } : b));
      onTriggerSuccess('Bank Account details updated successfully!');
    } else {
      const newAcc = { ...formData, id: Date.now() };
      setBankAccounts([...bankAccounts, newAcc]);
      onTriggerSuccess('New Church Bank / Trust Account registered!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bank record?")) {
      setBankAccounts(bankAccounts.filter(b => b.id !== id));
      onTriggerSuccess('Bank account removed.');
    }
  };

  const handleSetPrimary = (id) => {
    setBankAccounts(bankAccounts.map(b => ({
      ...b,
      isPrimary: b.id === id
    })));
    onTriggerSuccess('Primary operating bank account updated!');
  };

  const filteredAccounts = bankAccounts
    .filter(b => activeCategoryTab === 'all' || b.accountCategory === activeCategoryTab)
    .filter(b => b.accountName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 b.bankName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 b.campus.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-8 space-y-6">
        
        {/* Top Header */}
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Landmark className="text-orange-400" size={22} />
              Church Multi-Campus & Trust Banking Hub
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage Headquarters operational accounts, Satellite Branch bank ledgers, and Delhi FCRA foreign accounts
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
          >
            <Plus size={15} />
            <span>+ Add Bank / FCRA Account</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Accounts', count: bankAccounts.length },
              { id: 'main_hq', label: 'Main Cathedral HQ', count: bankAccounts.filter(b => b.accountCategory === 'main_hq').length },
              { id: 'branches', label: 'Branch Campuses', count: bankAccounts.filter(b => b.accountCategory === 'branches').length },
              { id: 'fcra_trust', label: 'FCRA & Trust Funds', count: bankAccounts.filter(b => b.accountCategory === 'fcra_trust').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeCategoryTab === tab.id
                    ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeCategoryTab === tab.id ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-300'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search bank name, campus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/70 border border-white/10 rounded-2xl pl-9 pr-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Bank Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAccounts.map((acc) => (
            <div
              key={acc.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 ${
                acc.accountCategory === 'fcra_trust'
                  ? 'bg-slate-900/90 border-purple-500/30 shadow-lg shadow-purple-500/5'
                  : acc.isPrimary
                  ? 'bg-slate-900/90 border-orange-500/40 shadow-lg shadow-orange-500/5'
                  : 'bg-slate-900/40 border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white">{acc.accountName}</h4>
                    {acc.isPrimary && (
                      <span className="px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-[9px] font-bold text-orange-300 uppercase">
                        Primary HQ
                      </span>
                    )}
                    {acc.accountCategory === 'fcra_trust' && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[9px] font-bold text-purple-300 uppercase flex items-center gap-1">
                        <Globe size={10} /> FCRA / Trust
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{acc.bankName} • {acc.branchName}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleOpenModal(acc)}
                    className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                    title="Edit Details"
                  >
                    <Edit2 size={13} />
                  </button>
                  {!acc.isPrimary && (
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                      title="Delete Account"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Bank Details Table Strip */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>A/C Number:</span>
                  <span className="text-white font-bold tracking-wider">{acc.accountNumber}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>IFSC Code:</span>
                  <span className="text-slate-200">{acc.ifscCode}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>UPI ID:</span>
                  <span className="text-emerald-400 font-sans">{acc.upiId || 'Not Configured (Wire Transfer Only)'}</span>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-slate-400 flex items-center gap-1">
                  <GitBranch size={12} className="text-orange-400" />
                  <span>{acc.campus}</span>
                </span>

                {!acc.isPrimary && acc.accountCategory === 'main_hq' && (
                  <button
                    onClick={() => handleSetPrimary(acc.id)}
                    className="text-orange-400 hover:text-orange-300 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Star size={12} /> Set as Primary
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Bank Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Landmark className="text-orange-400" size={18} />
                {editingId ? 'Edit Bank Account' : 'Register Church Bank / FCRA Account'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Account Title / Trust Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nope Search Cathedral FCRA Account"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Banking Category *</label>
                  <select
                    value={formData.accountCategory}
                    onChange={(e) => setFormData({ ...formData, accountCategory: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="main_hq">Main Cathedral HQ Operational</option>
                    <option value="branches">Branch Campus Local A/C</option>
                    <option value="fcra_trust">FCRA Foreign Contribution / Trust</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Bank Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. State Bank of India (NDMB)"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Branch Location</label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi Main Branch (NDMB)"
                    value={formData.branchName}
                    onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Account Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">IFSC Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SBIN0000691"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">UPI ID / VPA (Optional)</label>
                  <input
                    type="text"
                    placeholder="church@upi"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Campus / Trust Linkage</label>
                  <select
                    value={formData.campus}
                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Nope Search Main Cathedral (HQ)">Nope Search Main Cathedral (HQ)</option>
                    <option value="Koduvai Town Branch">Koduvai Town Branch</option>
                    <option value="Kangeyam City Branch">Kangeyam City Branch</option>
                    <option value="National / International (MHA Approved)">National / International (MHA Approved)</option>
                    <option value="All Campuses (Charity Wing)">All Campuses (Charity Wing)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Fund Purpose Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. FCRA Foreign, Building Fund..."
                    value={formData.purposeTag}
                    onChange={(e) => setFormData({ ...formData, purposeTag: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
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
                  {editingId ? 'Update Bank Account' : 'Save Bank Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
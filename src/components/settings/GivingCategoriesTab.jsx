import React, { useState } from 'react';
import { 
  HeartHandshake, Plus, Search, Edit2, Trash2, X, Check,
  Building, Target, ShieldCheck, Tag, Eye, EyeOff, CheckCircle2,
  TrendingUp, Sparkles, Receipt
} from 'lucide-react';

export default function GivingCategoriesTab({ onTriggerSuccess }) {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Tithe (தசமபாகம் / பத்திலொரு பாகம்)',
      code: 'GIV-TITHE',
      fundType: 'General Fund',
      linkedBank: 'Nope Cathedral Main Operational A/C',
      isTaxExempt: true,
      hasTargetGoal: false,
      targetAmount: 0,
      collectedAmount: 1850000,
      showOnApp: true,
      status: 'Active',
      description: 'Regular monthly tithes and biblical tenth contributions for general church operations'
    },
    {
      id: 2,
      name: 'Sunday General Offering (ஆராதனை ஸ்தோத்திரக் காணிக்கை)',
      code: 'GIV-SUNDAY',
      fundType: 'General Fund',
      linkedBank: 'Nope Cathedral Main Operational A/C',
      isTaxExempt: true,
      hasTargetGoal: false,
      targetAmount: 0,
      collectedAmount: 640000,
      showOnApp: true,
      status: 'Active',
      description: 'Weekly Sunday worship service basket collections and thanksgiving offerings'
    },
    {
      id: 3,
      name: 'Church Building & Land Project (கட்டட / நில நிதி)',
      code: 'GIV-BUILDING',
      fundType: 'Capital Fund',
      linkedBank: 'Church Building & Expansion Fund',
      isTaxExempt: true,
      hasTargetGoal: true,
      targetAmount: 5000000,
      collectedAmount: 3250000,
      showOnApp: true,
      status: 'Active',
      description: 'Dedicated capital fund for new sanctuary construction, land purchase, and acoustic works'
    },
    {
      id: 4,
      name: 'Missions & Native Evangelism (சுவிசேஷ ஊழியக் காணிக்கை)',
      code: 'GIV-MISSION',
      fundType: 'Mission Fund',
      linkedBank: 'Nope Cathedral Main Operational A/C',
      isTaxExempt: true,
      hasTargetGoal: true,
      targetAmount: 1000000,
      collectedAmount: 780000,
      showOnApp: true,
      status: 'Active',
      description: 'Support for rural village missionaries, church planting, and tribal outreaches'
    },
    {
      id: 5,
      name: 'Poor Benevolence & Medical Relief (ஏழைகள் உதவி நிதி)',
      code: 'GIV-BENEVOLENCE',
      fundType: 'Charity Fund',
      linkedBank: 'Church Educational & Charity Trust A/C',
      isTaxExempt: true,
      hasTargetGoal: false,
      targetAmount: 0,
      collectedAmount: 210000,
      showOnApp: true,
      status: 'Active',
      description: 'Emergency medical aid, widow support, and child education scholarships'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterFundType, setFilterFundType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    fundType: 'General Fund',
    linkedBank: 'Nope Cathedral Main Operational A/C',
    isTaxExempt: true,
    hasTargetGoal: false,
    targetAmount: '',
    showOnApp: true,
    description: ''
  });

  const handleOpenModal = (cat = null) => {
    if (cat) {
      setEditingId(cat.id);
      setFormData({
        name: cat.name,
        code: cat.code,
        fundType: cat.fundType,
        linkedBank: cat.linkedBank,
        isTaxExempt: cat.isTaxExempt,
        hasTargetGoal: cat.hasTargetGoal,
        targetAmount: cat.targetAmount || '',
        showOnApp: cat.showOnApp,
        description: cat.description || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        code: `GIV-${Date.now().toString().slice(-4)}`,
        fundType: 'General Fund',
        linkedBank: 'Nope Cathedral Main Operational A/C',
        isTaxExempt: true,
        hasTargetGoal: false,
        targetAmount: '',
        showOnApp: true,
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      setCategories(categories.map(c => c.id === editingId ? {
        ...c,
        ...formData,
        targetAmount: formData.hasTargetGoal ? Number(formData.targetAmount) : 0
      } : c));
      onTriggerSuccess('Giving category updated successfully!');
    } else {
      const newCategory = {
        ...formData,
        id: Date.now(),
        code: formData.code || `GIV-${Date.now().toString().slice(-4)}`,
        targetAmount: formData.hasTargetGoal ? Number(formData.targetAmount) : 0,
        collectedAmount: 0,
        status: 'Active'
      };
      setCategories([...categories, newCategory]);
      onTriggerSuccess('New Giving category created successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this giving category? Historical tithe ledgers will remain safe.")) {
      setCategories(categories.filter(c => c.id !== id));
      onTriggerSuccess('Giving category removed.');
    }
  };

  const handleToggleAppVisibility = (id) => {
    setCategories(categories.map(c => {
      if (c.id === id) {
        const updated = !c.showOnApp;
        onTriggerSuccess(`Category visibility on Member App: ${updated ? 'Enabled' : 'Hidden'}`);
        return { ...c, showOnApp: updated };
      }
      return c;
    }));
  };

  const filteredCategories = categories
    .filter(c => filterFundType === 'all' || c.fundType === filterFundType)
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="glass-card rounded-3xl p-8 space-y-6">
        
        {/* Header Section */}
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HeartHandshake className="text-orange-400" size={22} />
              Giving & Tithe Categories Master
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure funds for Tithes, Building Expansion, Missions, and 80G tax-exempt benevolence offerings
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/25 cursor-pointer shrink-0"
          >
            <Plus size={15} />
            <span>+ Add Giving Category</span>
          </button>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 overflow-x-auto w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Funds' },
              { id: 'General Fund', label: 'General & Tithes' },
              { id: 'Capital Fund', label: 'Building & Land' },
              { id: 'Mission Fund', label: 'Missions & Outreach' },
              { id: 'Charity Fund', label: 'Benevolence & Charity' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterFundType(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  filterFundType === tab.id
                    ? 'bg-white text-slate-900 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search category name, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/70 border border-white/10 rounded-2xl pl-9 pr-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Categories Directory Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                <th className="p-3.5">Category Details</th>
                <th className="p-3.5">Fund Type</th>
                <th className="p-3.5">Linked Bank Account</th>
                <th className="p-3.5">Goal / Collection</th>
                <th className="p-3.5">80G Status</th>
                <th className="p-3.5">App View</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredCategories.map((cat) => {
                const percentReached = cat.hasTargetGoal && cat.targetAmount > 0 
                  ? Math.min(Math.round((cat.collectedAmount / cat.targetAmount) * 100), 100) 
                  : 0;

                return (
                  <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-xs">{cat.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{cat.code}</div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300">
                        {cat.fundType}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-300 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Building size={12} className="text-orange-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{cat.linkedBank}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      {cat.hasTargetGoal ? (
                        <div className="space-y-1 w-32">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-400">Goal: ₹{(cat.targetAmount / 100000).toFixed(1)}L</span>
                            <span className="text-orange-400 font-bold">{percentReached}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full" 
                              style={{ width: `${percentReached}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono">
                          ₹{cat.collectedAmount.toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        cat.isTaxExempt 
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-slate-800 text-slate-500 border border-white/5'
                      }`}>
                        <ShieldCheck size={10} />
                        {cat.isTaxExempt ? '80G Eligible' : 'Standard'}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <button
                        onClick={() => handleToggleAppVisibility(cat.id)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          cat.showOnApp
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-slate-800 text-slate-500 border-white/5 hover:text-white'
                        }`}
                        title={cat.showOnApp ? 'Visible on Member Mobile App' : 'Hidden from App'}
                      >
                        {cat.showOnApp ? <Eye size={13} /> : <EyeOff size={13} />}
                      </button>
                    </td>

                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenModal(cat)}
                          className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 cursor-pointer"
                          title="Edit Category"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Giving Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl border border-white/25 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HeartHandshake className="text-orange-400" size={18} />
                {editingId ? 'Edit Giving Category' : 'Create New Giving Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Category Name / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Building Expansion Fund, Harvest Offering..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Fund Classification</label>
                  <select
                    value={formData.fundType}
                    onChange={(e) => setFormData({ ...formData, fundType: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="General Fund">General Fund (Tithes & General)</option>
                    <option value="Capital Fund">Capital Fund (Building & Land)</option>
                    <option value="Mission Fund">Mission Fund (Evangelism & Outreach)</option>
                    <option value="Charity Fund">Charity Fund (Poor & Relief)</option>
                    <option value="Special Fund">Special Project Fund</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Linked Church Bank Account *</label>
                  <select
                    value={formData.linkedBank}
                    onChange={(e) => setFormData({ ...formData, linkedBank: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Nope Cathedral Main Operational A/C">Nope Cathedral Main Operational A/C</option>
                    <option value="Church Building & Expansion Fund">Church Building & Expansion Fund</option>
                    <option value="Church Educational & Charity Trust A/C">Church Educational & Charity Trust A/C</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-slate-300 font-medium">Category Description / Purpose</label>
                  <input
                    type="text"
                    placeholder="Short description displayed on receipt and donor app..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              {/* Target Goal Toggle */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">Enable Target Fundraising Goal</h5>
                    <p className="text-[10px] text-slate-400">Track visual progress bar for building/mission projects</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.hasTargetGoal}
                    onChange={(e) => setFormData({ ...formData, hasTargetGoal: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
                </div>

                {formData.hasTargetGoal && (
                  <div>
                    <label className="text-xs text-slate-300 font-medium">Target Amount Goal (₹) *</label>
                    <input
                      type="number"
                      required={formData.hasTargetGoal}
                      placeholder="e.g. 5000000"
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                      className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTaxExempt}
                    onChange={(e) => setFormData({ ...formData, isTaxExempt: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
                  <span>Eligible for 80G Tax Exemption Receipt</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showOnApp}
                    onChange={(e) => setFormData({ ...formData, showOnApp: e.target.checked })}
                    className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                  />
                  <span>Show in Member Mobile App</span>
                </label>
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
                  {editingId ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
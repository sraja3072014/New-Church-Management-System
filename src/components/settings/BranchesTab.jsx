import React, { useState } from 'react';
import { 
  GitBranch, Search, Plus, Edit2, Trash2, X, Check,
  Phone, Mail, MapPin, Share2, Camera, Send, AtSign, UserCheck
} from 'lucide-react';

export default function BranchesTab({ onTriggerSuccess }) {
  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Koduvai Town Branch',
      pastorName: 'Pastor Assistant A',
      phone: '+91 98765 00001',
      email: 'koduvai@nopesearchchurch.org',
      address: 'Koduvai Town Center, Tirupur District - 638660',
      facebookUrl: 'https://facebook.com/koduvai_church',
      instagramHandle: '@koduvai_church',
      telegramGroup: 'https://t.me/koduvai_church',
      twitterHandle: '@koduvai_church',
      googleMapsEmbed: 'https://maps.google.com/?q=Koduvai'
    },
    {
      id: 2,
      name: 'Kangeyam City Branch',
      pastorName: 'Pastor Assistant B',
      phone: '+91 98765 00002',
      email: 'kangeyam@nopesearchchurch.org',
      address: 'Near Bus Stand, Kangeyam - 638701',
      facebookUrl: '',
      instagramHandle: '@kangeyam_church',
      telegramGroup: '',
      twitterHandle: '',
      googleMapsEmbed: ''
    }
  ]);

  const [branchSearch, setBranchSearch] = useState('');
  const [editingBranchId, setEditingBranchId] = useState(null);
  
  const [branchForm, setBranchForm] = useState({
    name: '',
    pastorName: '',
    phone: '',
    email: '',
    address: '',
    facebookUrl: '',
    instagramHandle: '',
    telegramGroup: '',
    twitterHandle: '',
    googleMapsEmbed: ''
  });

  const handleSaveBranchForm = (e) => {
    e.preventDefault();
    if (!branchForm.name.trim() || !branchForm.pastorName.trim()) {
      alert('Please enter Branch Church Name and Pastor Name');
      return;
    }

    if (editingBranchId) {
      setBranches(branches.map(b => b.id === editingBranchId ? { ...branchForm, id: b.id } : b));
      setEditingBranchId(null);
      onTriggerSuccess('Branch Church details updated successfully!');
    } else {
      const newBranchItem = { ...branchForm, id: Date.now() };
      setBranches([...branches, newBranchItem]);
      onTriggerSuccess('New Branch Church created successfully!');
    }

    setBranchForm({
      name: '', pastorName: '', phone: '', email: '', address: '',
      facebookUrl: '', instagramHandle: '', telegramGroup: '', twitterHandle: '', googleMapsEmbed: ''
    });
  };

  const handleStartEditBranch = (branch) => {
    setEditingBranchId(branch.id);
    setBranchForm({ ...branch });
    const formElement = document.getElementById('branch-form-section');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingBranchId(null);
    setBranchForm({
      name: '', pastorName: '', phone: '', email: '', address: '',
      facebookUrl: '', instagramHandle: '', telegramGroup: '', twitterHandle: '', googleMapsEmbed: ''
    });
  };

  const handleDeleteBranch = (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setBranches(branches.filter(b => b.id !== id));
      if (editingBranchId === id) handleCancelEdit();
      onTriggerSuccess('Branch removed successfully.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. Branch Directory Table Card */}
      <div className="glass-card rounded-3xl p-8 space-y-6">
        <div className="border-b border-white/10 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <GitBranch className="text-orange-400" size={22} />
              Branch Churches Directory
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">List of active satellite churches, assigned pastors, and social links</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-xs font-bold text-orange-400">
            {branches.length} Branches Total
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search branch name or pastor..."
            value={branchSearch}
            onChange={(e) => setBranchSearch(e.target.value)}
            className="w-full bg-slate-900/70 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Branch Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/40">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[11px] bg-slate-900/80">
                <th className="p-3.5">Branch Church</th>
                <th className="p-3.5">Assigned Pastor</th>
                <th className="p-3.5">Contact Line</th>
                <th className="p-3.5">Socials & Map</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {branches
                .filter(b => b.name.toLowerCase().includes(branchSearch.toLowerCase()) || b.pastorName.toLowerCase().includes(branchSearch.toLowerCase()))
                .map((branch) => (
                  <tr key={branch.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-xs">{branch.name}</div>
                      <span className="text-[10px] text-slate-400 truncate max-w-[180px] block">{branch.address}</span>
                    </td>
                    <td className="p-3.5 space-y-0.5">
                      <div className="flex items-center gap-1.5 font-medium text-slate-200">
                        <UserCheck size={13} className="text-purple-400" />
                        <span>{branch.pastorName}</span>
                      </div>
                    </td>
                    <td className="p-3.5 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Phone size={12} />
                        <span>{branch.phone || 'No Phone'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{branch.email}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2 text-slate-300">
                        {branch.facebookUrl && <Share2 size={13} className="text-blue-400" title="Facebook" />}
                        {branch.instagramHandle && <Camera size={13} className="text-pink-400" title="Instagram" />}
                        {branch.telegramGroup && <Send size={13} className="text-sky-400" title="Telegram" />}
                        {branch.twitterHandle && <AtSign size={13} className="text-slate-300" title="Twitter / X" />}
                        {branch.googleMapsEmbed && <MapPin size={13} className="text-emerald-400" title="Location Map" />}
                        {!branch.facebookUrl && !branch.instagramHandle && !branch.telegramGroup && !branch.twitterHandle && !branch.googleMapsEmbed && (
                          <span className="text-[10px] text-slate-500">None</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleStartEditBranch(branch)}
                          className="p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 cursor-pointer transition-all"
                          title="Edit Branch"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteBranch(branch.id)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer transition-all"
                          title="Delete Branch"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Add / Edit Branch Form Card */}
      <form 
        id="branch-form-section" 
        onSubmit={handleSaveBranchForm} 
        className="glass-card rounded-3xl p-8 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
            {editingBranchId ? <Edit2 size={16} /> : <Plus size={16} />}
            <span>{editingBranchId ? 'Edit Branch Church Details' : 'Add New Branch Church'}</span>
          </h4>
          {editingBranchId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <X size={14} /> Cancel Edit
            </button>
          )}
        </div>

        {/* Section 1: General & Pastoral Info */}
        <div className="space-y-3">
          <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            1. General & Pastoral Details
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-300">Branch Church Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Coimbatore South Branch"
                value={branchForm.name}
                onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Assigned Branch Pastor *</label>
              <input
                type="text"
                required
                placeholder="e.g. Pastor Paulraj"
                value={branchForm.pastorName}
                onChange={(e) => setBranchForm({ ...branchForm, pastorName: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Branch Phone Number</label>
              <input
                type="text"
                placeholder="+91 98765 00000"
                value={branchForm.phone}
                onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-300">Branch Official Email</label>
              <input
                type="email"
                placeholder="branch@church.org"
                value={branchForm.email}
                onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-300">Branch Full Location Address</label>
              <textarea
                rows={2}
                placeholder="Street address, Landmark, City, Pin Code"
                value={branchForm.address}
                onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                className="w-full bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-slate-200 mt-1 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Social Media & Map */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            2. Branch Social Media & Google Maps Location
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Facebook Page URL</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2 mt-1">
                <Share2 size={14} className="text-blue-500 shrink-0" />
                <input
                  type="text"
                  placeholder="https://facebook.com/branch..."
                  value={branchForm.facebookUrl}
                  onChange={(e) => setBranchForm({ ...branchForm, facebookUrl: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Instagram Handle</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2 mt-1">
                <Camera size={14} className="text-pink-500 shrink-0" />
                <input
                  type="text"
                  placeholder="@branch_church"
                  value={branchForm.instagramHandle}
                  onChange={(e) => setBranchForm({ ...branchForm, instagramHandle: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Telegram Link</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2 mt-1">
                <Send size={14} className="text-sky-400 shrink-0" />
                <input
                  type="text"
                  placeholder="https://t.me/..."
                  value={branchForm.telegramGroup}
                  onChange={(e) => setBranchForm({ ...branchForm, telegramGroup: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Twitter / X Handle</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2 mt-1">
                <AtSign size={14} className="text-slate-300 shrink-0" />
                <input
                  type="text"
                  placeholder="@branch_handle"
                  value={branchForm.twitterHandle}
                  onChange={(e) => setBranchForm({ ...branchForm, twitterHandle: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <label className="text-xs font-medium text-slate-300">Google Maps Location URL</label>
              <div className="flex items-center gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-3 py-2 mt-1">
                <MapPin size={14} className="text-emerald-400 shrink-0" />
                <input
                  type="text"
                  placeholder="https://maps.google.com/?q=..."
                  value={branchForm.googleMapsEmbed}
                  onChange={(e) => setBranchForm({ ...branchForm, googleMapsEmbed: e.target.value })}
                  className="bg-transparent w-full text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
          {editingBranchId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-2xl transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer transition-all"
          >
            {editingBranchId ? <Check size={15} /> : <Plus size={15} />}
            <span>{editingBranchId ? 'Update Branch Church' : 'Create Branch Church'}</span>
          </button>
        </div>
      </form>

    </div>
  );
}
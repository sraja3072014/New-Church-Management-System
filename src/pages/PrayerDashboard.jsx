import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, Plus, Phone, CheckCircle2, 
  Clock, AlertCircle, Sparkles, Filter, Search, 
  UserCheck, ShieldAlert, Check, X, Flame, MessageSquare
} from 'lucide-react';

export default function PrayerDashboard() {
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'EMERGENCY' | 'PENDING' | 'ANSWERED'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Default Prayer Database State
  const defaultPrayers = [
    {
      id: 'PR-101',
      seekerName: 'Bro. David Miller',
      phone: '+91 98765 11002',
      category: 'Healing / Hospital Emergency',
      urgency: 'Critical',
      requestText: 'Admitted in ICU for severe viral infection. Please pray for miraculous recovery.',
      assignedPastor: 'Pastor John & Intercession Team A',
      status: 'Praying Now',
      date: '2026-08-20',
      updates: 'Spoke over phone. Fervent prayer offered.'
    },
    {
      id: 'PR-102',
      seekerName: 'Sister Sarah Jenkins',
      phone: '+91 98765 11001',
      category: 'Family & Deliverance',
      urgency: 'Normal',
      requestText: 'Prayer for child’s higher education admission and family peace.',
      assignedPastor: 'Elder Stephen',
      status: 'Pending',
      date: '2026-08-19',
      updates: 'Queued for Wednesday fasting prayer.'
    },
    {
      id: 'PR-103',
      seekerName: 'Bro. Joshua Raj',
      phone: '+91 98765 44321',
      category: 'Job & Business Breakthrough',
      urgency: 'Normal',
      requestText: 'Prayed for job interview in an MNC company.',
      assignedPastor: 'Intercession Team B',
      status: 'Answered',
      date: '2026-08-15',
      updates: 'Got appointment letter! Praise God for the breakthrough.'
    }
  ];

  const [prayers, setPrayers] = useState(() => {
    try {
      const saved = localStorage.getItem('app_prayer_requests_db');
      return saved ? JSON.parse(saved) : defaultPrayers;
    } catch {
      return defaultPrayers;
    }
  });

  const [prayerForm, setPrayerForm] = useState({
    seekerName: '',
    phone: '',
    category: 'Healing / Health',
    urgency: 'Normal',
    requestText: '',
    assignedPastor: 'General Intercession Team'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSavePrayer = (e) => {
    e.preventDefault();
    if (!prayerForm.seekerName.trim() || !prayerForm.requestText.trim()) return;

    const newEntry = {
      id: `PR-${Date.now().toString().slice(-4)}`,
      ...prayerForm,
      status: prayerForm.urgency === 'Critical' ? 'Praying Now' : 'Pending',
      date: new Date().toISOString().split('T')[0],
      updates: 'Newly added to altar.'
    };

    const updated = [newEntry, ...prayers];
    setPrayers(updated);
    localStorage.setItem('app_prayer_requests_db', JSON.stringify(updated));
    setIsModalOpen(false);
    setPrayerForm({ seekerName: '', phone: '', category: 'Healing / Health', urgency: 'Normal', requestText: '', assignedPastor: 'General Intercession Team' });
    showToast('ஜெபக்குறிப்பு பீடத்தில் வெற்றிகரமாகச் சேர்க்கப்பட்டது!');
  };

  const handleUpdateStatus = (id, nextStatus) => {
    const updated = prayers.map(p => {
      if (p.id === id) {
        return { ...p, status: nextStatus };
      }
      return p;
    });
    setPrayers(updated);
    localStorage.setItem('app_prayer_requests_db', JSON.stringify(updated));
    showToast(`ஜெபக்குறிப்பு நிலை "${nextStatus}" என மாற்றப்பட்டது!`);
  };

  const filteredPrayers = prayers.filter(p => {
    const matchesFilter = 
      activeFilter === 'ALL' ? true :
      activeFilter === 'EMERGENCY' ? p.urgency === 'Critical' :
      activeFilter === 'PENDING' ? p.status === 'Pending' :
      activeFilter === 'PRAYING' ? p.status === 'Praying Now' :
      p.status === 'Answered';

    const q = searchQuery.toLowerCase();
    const matchesSearch = p.seekerName.toLowerCase().includes(q) || 
                          p.requestText.toLowerCase().includes(q) ||
                          p.category.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const emergencyCount = prayers.filter(p => p.urgency === 'Critical' && p.status !== 'Answered').length;
  const pendingCount = prayers.filter(p => p.status === 'Pending').length;
  const answeredCount = prayers.filter(p => p.status === 'Answered').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full select-none text-slate-200">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP HEADER & METRIC TILES */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                <Flame size={12} className="text-rose-500 animate-pulse" />
                Intercession & Altar Power
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              <HeartHandshake className="text-rose-400" size={26} />
              <span>Church Prayer Altar & Intercession Hub</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              விசுவாசிகளின் ஜெப விண்ணப்பங்கள், அவசர ஜெபக் குறிப்புகள் மற்றும் தேவனுடைய அற்புத சாட்சிகள்.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-2xl text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <Plus size={16} />
            <span>Submit Prayer Request</span>
          </button>
        </div>

        {/* 4 Status Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div 
            onClick={() => setActiveFilter('ALL')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeFilter === 'ALL' ? 'bg-slate-800 border-orange-500' : 'bg-slate-900/60 border-white/10 hover:border-white/20'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 uppercase">Total Requests</span>
            <div className="text-2xl font-black text-white font-mono mt-1">{prayers.length}</div>
          </div>

          <div 
            onClick={() => setActiveFilter('EMERGENCY')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeFilter === 'EMERGENCY' ? 'bg-rose-950/40 border-rose-500' : 'bg-slate-900/60 border-rose-500/20 hover:border-rose-500/40'
            }`}
          >
            <span className="text-[11px] font-bold text-rose-400 uppercase flex items-center gap-1">
              <ShieldAlert size={13} /> Emergency Altar
            </span>
            <div className="text-2xl font-black text-rose-400 font-mono mt-1">{emergencyCount}</div>
          </div>

          <div 
            onClick={() => setActiveFilter('PRAYING')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeFilter === 'PRAYING' ? 'bg-sky-950/40 border-sky-500' : 'bg-slate-900/60 border-sky-500/20 hover:border-sky-500/40'
            }`}
          >
            <span className="text-[11px] font-bold text-sky-400 uppercase">Under Intercession</span>
            <div className="text-2xl font-black text-sky-400 font-mono mt-1">{prayers.filter(p => p.status === 'Praying Now').length}</div>
          </div>

          <div 
            onClick={() => setActiveFilter('ANSWERED')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeFilter === 'ANSWERED' ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-900/60 border-emerald-500/20 hover:border-emerald-500/40'
            }`}
          >
            <span className="text-[11px] font-bold text-emerald-400 uppercase">Answered Prayers</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{answeredCount}</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by name, prayer text, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['ALL', 'EMERGENCY', 'PENDING', 'PRAYING', 'ANSWERED'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === f ? 'bg-rose-500 text-white' : 'bg-slate-900 text-slate-400 border border-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 2. PRAYER LIST CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {filteredPrayers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500 text-xs italic">
              இந்த பிரிவில் ஜெபக்குறிப்புகள் இல்லை.
            </div>
          ) : (
            filteredPrayers.map((item) => {
              const isUrgent = item.urgency === 'Critical';
              const isAnswered = item.status === 'Answered';

              return (
                <div 
                  key={item.id} 
                  className={`p-5 rounded-3xl bg-slate-900/90 border transition-all flex flex-col justify-between space-y-4 shadow-xl ${
                    isUrgent ? 'border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'border-white/10 hover:border-orange-500/40'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold ${
                        isUrgent ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse' : 'bg-slate-800 text-slate-400 border-white/10'
                      }`}>
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isAnswered ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        item.status === 'Praying Now' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>{item.seekerName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.phone}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2 italic bg-black/30 p-3 rounded-2xl border border-white/5">
                        "{item.requestText}"
                      </p>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-400 pt-2 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <span>Assigned Intercessor:</span>
                        <strong className="text-orange-400 font-semibold">{item.assignedPastor}</strong>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>Logged Date: {item.date}</span>
                        <span>{item.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Intercession Action Controls */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    {item.status !== 'Praying Now' && item.status !== 'Answered' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'Praying Now')}
                        className="flex-1 py-1.5 bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                      >
                        Praying Now
                      </button>
                    )}

                    {item.status !== 'Answered' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'Answered')}
                        className="flex-1 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                      >
                        Mark Answered ✓
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. SUBMIT PRAYER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#0e1322] border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="text-rose-400" size={18} />
                <span>Submit Prayer Request to Altar</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePrayer} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Seeker / Believer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sister Mercy"
                  value={prayerForm.seekerName}
                  onChange={(e) => setPrayerForm({ ...prayerForm, seekerName: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-rose-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Contact Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98765..."
                    value={prayerForm.phone}
                    onChange={(e) => setPrayerForm({ ...prayerForm, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Urgency Level</label>
                  <select
                    value={prayerForm.urgency}
                    onChange={(e) => setPrayerForm({ ...prayerForm, urgency: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer font-bold"
                  >
                    <option value="Normal">Normal Request</option>
                    <option value="Critical">Critical Hospital / ICU Emergency</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Category</label>
                  <select
                    value={prayerForm.category}
                    onChange={(e) => setPrayerForm({ ...prayerForm, category: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer font-bold"
                  >
                    <option value="Healing / Hospital Emergency">Healing & Medical Care</option>
                    <option value="Family & Deliverance">Family Peace & Deliverance</option>
                    <option value="Job & Business Breakthrough">Job & Business Growth</option>
                    <option value="Salvation of Loved Ones">Salvation & Spiritual Life</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium">Assigned Intercessors</label>
                  <input
                    type="text"
                    placeholder="e.g. Pastor John / Prayer Team A"
                    value={prayerForm.assignedPastor}
                    onChange={(e) => setPrayerForm({ ...prayerForm, assignedPastor: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Prayer Request Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain the prayer need in detail..."
                  value={prayerForm.requestText}
                  onChange={(e) => setPrayerForm({ ...prayerForm, requestText: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none resize-none"
                />
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
                  className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Place on Prayer Altar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
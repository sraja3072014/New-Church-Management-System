import React, { useState } from 'react';
import { 
  Calendar, Plus, Clock, MapPin, 
  Sparkles, CheckCircle2, Mic, X, Search
} from 'lucide-react';

export default function EventsDashboard({ onNavigateTab }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const defaultEvents = [
    {
      id: 'EVT-201',
      title: 'Annual Youth Revival Camp 2026',
      category: 'Youth',
      date: '2026-09-15',
      time: '09:00 AM - 05:00 PM',
      venue: 'Main Cathedral Auditorium',
      speaker: 'Rev. David Paul (Guest Speaker)',
      expectedAttendance: 250,
      registeredCount: 184,
      status: 'Upcoming',
      description: 'A special full-day spiritual revival and career guidance summit for young adults.'
    },
    {
      id: 'EVT-202',
      title: 'Water Baptism & Dedication Service',
      category: 'Baptism',
      date: '2026-08-30',
      time: '06:00 AM - 08:30 AM',
      venue: 'Bethesda Prayer Pool Campus',
      speaker: 'Senior Pastor',
      expectedAttendance: 120,
      registeredCount: 95,
      status: 'Upcoming',
      description: 'Baptism service followed by holy communion and breakfast fellowship.'
    }
  ];

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('app_events_database');
      return saved ? JSON.parse(saved) : defaultEvents;
    } catch {
      return defaultEvents;
    }
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Special Service',
    date: '',
    time: '',
    venue: '',
    speaker: '',
    expectedAttendance: '',
    description: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title.trim() || !eventForm.date) return;

    const newEvent = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      ...eventForm,
      expectedAttendance: Number(eventForm.expectedAttendance) || 50,
      registeredCount: 0,
      status: 'Upcoming'
    };

    const updated = [newEvent, ...events];
    setEvents(updated);
    localStorage.setItem('app_events_database', JSON.stringify(updated));
    setIsCreateModalOpen(false);
    setEventForm({ title: '', category: 'Special Service', date: '', time: '', venue: '', speaker: '', expectedAttendance: '', description: '' });
    showToast('புதிய ஈவென்ட் வெற்றிகரமாக உருவாக்கப்பட்டது!');
  };

  const categories = ['ALL', 'Special Service', 'Youth', 'Kids', 'Baptism', 'Prayer'];

  const filteredEvents = (events || []).filter(evt => {
    const matchesCategory = selectedCategory === 'ALL' || evt.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = (evt.title || '').toLowerCase().includes(q) || 
                          (evt.venue || '').toLowerCase().includes(q) ||
                          (evt.speaker || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full select-none text-slate-200">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={12} className="text-orange-400" />
                Church Ministry Calendar
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              <Calendar className="text-orange-400" size={26} />
              <span>Events & Special Gatherings Management</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              விசேஷ ஆராதனைகள், வாலிபர் முகாம்கள், ஞானஸ்நானம் மற்றும் சிறப்பு நிகழ்வுகளின் திட்டமிடல்.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] hover:from-[#ff7b1a] hover:to-[#f54f6e] text-white rounded-2xl text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <Plus size={16} />
            <span>Schedule New Event</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search event by name, speaker, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-400 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500 text-xs italic">
              நிகழ்வுகள் எதுவும் பதிவு செய்யப்படவில்லை.
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const isCompleted = evt.status === 'Completed';
              const progressPercent = evt.expectedAttendance > 0 
                ? Math.min(100, Math.round((evt.registeredCount / evt.expectedAttendance) * 100)) 
                : 0;

              return (
                <div 
                  key={evt.id} 
                  className="p-5 rounded-3xl bg-slate-900/90 border border-white/10 hover:border-orange-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase">
                        {evt.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {evt.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-sm">{evt.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{evt.description}</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/5 font-medium">
                      <div className="flex items-center gap-2">
                        <Clock size={13} className="text-orange-400" />
                        <span>{evt.date} • {evt.time || 'All Day'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-rose-400" />
                        <span className="truncate">{evt.venue || 'Main Campus'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mic size={13} className="text-sky-400" />
                        <span className="truncate">{evt.speaker || 'Pastoral Team'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Registrations / RSVPs</span>
                      <span className="text-white font-mono font-bold">{evt.registeredCount} / {evt.expectedAttendance}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-rose-500 h-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#0e1322] border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="text-orange-400" size={18} />
                <span>Schedule New Church Event</span>
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-300 font-medium">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Miracle Revival Convention"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none focus:border-orange-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none cursor-pointer font-bold"
                  >
                    <option value="Special Service">Special Service</option>
                    <option value="Youth">Youth Ministry</option>
                    <option value="Kids">Kids / VBS</option>
                    <option value="Baptism">Water Baptism</option>
                    <option value="Prayer">Fasting & Night Vigil</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-medium">Timing (e.g. 06:00 PM)</label>
                  <input
                    type="text"
                    placeholder="06:00 PM - 09:00 PM"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium">Expected Headcount</label>
                  <input
                    type="number"
                    placeholder="250"
                    value={eventForm.expectedAttendance}
                    onChange={(e) => setEventForm({ ...eventForm, expectedAttendance: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Venue / Campus Location</label>
                <input
                  type="text"
                  placeholder="e.g. Main Cathedral Sanctuary"
                  value={eventForm.venue}
                  onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium">Main Minister / Guest Speaker</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Pastor & Pastoral Team"
                  value={eventForm.speaker}
                  onChange={(e) => setEventForm({ ...eventForm, speaker: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white mt-1 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#ff6b00] to-[#f43f5e] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save & Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
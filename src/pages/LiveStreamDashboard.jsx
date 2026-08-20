import React, { useState } from 'react';
import { 
  Tv, Video, Play, Radio, Users, 
  ExternalLink, Copy, Check, Sparkles, Send, 
  Clock, ShieldAlert, Heart, RefreshCw, MessageSquare
} from 'lucide-react';

export default function LiveStreamDashboard() {
  const [activeStreamType, setActiveStreamType] = useState('youtube'); // 'youtube' | 'zoom' | 'gmeet'
  const [copied, setCopied] = useState('');
  
  // YouTube Stream Config
  const [youtubeVideoId, setYoutubeVideoId] = useState('jfKfPfyJRdk'); // Sample Live ID
  const [streamTitle, setStreamTitle] = useState('Sunday Live Worship & Miracle Service');

  // Zoom & GMeet Details
  const [meetingDetails, setMeetingDetails] = useState({
    zoomMeetingId: '849 2039 1102',
    zoomPasscode: 'PRAY2026',
    zoomLink: 'https://zoom.us/j/84920391102',
    gmeetLink: 'https://meet.google.com/abc-defg-hij',
    topic: '24/7 Chain Prayer & Intercession Room'
  });

  // Live Chat & Prayer Requests State
  const [chatMessages, setChatMessages] = useState([
    { id: 1, name: 'Bro. David Kumar', text: 'Praise the Lord! Watching from Coimbatore.', time: '09:05 AM' },
    { id: 2, name: 'Sister Sarah', text: 'Please pray for my mother’s speedy recovery.', time: '09:12 AM' }
  ]);
  const [newChatText, setNewChatText] = useState('');
  const [senderName, setSenderName] = useState('');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2500);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const newMsg = {
      id: Date.now(),
      name: senderName.trim() || 'Anonymous Believer',
      text: newChatText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMsg]);
    setNewChatText('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full select-none text-slate-200">
      
      {/* 1. TOP HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                Virtual Sanctuary & Broadcast
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1.5 flex items-center gap-2">
              <Tv className="text-rose-400" size={26} />
              <span>Church Live Stream & Prayer Hub</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              YouTube ஆராதனை நேரலை, Zoom 24/7 ஜெபக் கூட்டங்கள் மற்றும் Google Meet உடனடி இணைப்பு.
            </p>
          </div>

          {/* STREAM TYPE TABS */}
          <div className="flex items-center gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/10 shrink-0">
            <button
            onClick={() => setActiveStreamType('youtube')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeStreamType === 'youtube' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
            >
            <Play size={15} />
            <span>YouTube Live</span>
            </button>
            <button
              onClick={() => setActiveStreamType('zoom')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStreamType === 'zoom' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video size={15} />
              <span>Zoom Prayer</span>
            </button>
            <button
              onClick={() => setActiveStreamType('gmeet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStreamType === 'gmeet' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users size={15} />
              <span>Google Meet</span>
            </button>
          </div>
        </div>

        {/* 2. MAIN MEDIA SECTION (PLAYER & INTERACTIVE PANELS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          
          {/* LEFT 2 COLUMNS: VIDEO PLAYER / MEETING CARD */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* TAB 1: YOUTUBE EMBEDDED PLAYER */}
            {activeStreamType === 'youtube' && (
              <div className="space-y-4">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                    title="Live Stream"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Broadcast Info & Quick Video ID Config */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h3 className="font-bold text-white text-sm">{streamTitle}</h3>
                    <p className="text-[11px] text-slate-400">Live Sunday Morning Broadcast • Main Cathedral Sanctuary</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="YouTube Video ID (e.g. jfKfPfyJRdk)"
                      value={youtubeVideoId}
                      onChange={(e) => setYoutubeVideoId(e.target.value)}
                      className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ZOOM 24/7 PRAYER HUB */}
            {activeStreamType === 'zoom' && (
              <div className="p-8 rounded-3xl bg-slate-900/90 border border-sky-500/30 shadow-2xl space-y-6 flex flex-col justify-between min-h-[380px]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      <Video size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">{meetingDetails.topic}</h3>
                      <p className="text-xs text-slate-400">தொடர் சங்கிலி ஜெபம் மற்றும் சிறப்புப் பரிந்துரைத்தல் அரங்கம்</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Meeting ID:</span>
                      <div className="text-lg font-black text-white font-mono flex items-center justify-between">
                        <span>{meetingDetails.zoomMeetingId}</span>
                        <button 
                          onClick={() => copyToClipboard(meetingDetails.zoomMeetingId, 'zoomId')}
                          className="text-slate-400 hover:text-sky-400 cursor-pointer"
                        >
                          {copied === 'zoomId' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Passcode:</span>
                      <div className="text-lg font-black text-sky-400 font-mono flex items-center justify-between">
                        <span>{meetingDetails.zoomPasscode}</span>
                        <button 
                          onClick={() => copyToClipboard(meetingDetails.zoomPasscode, 'zoomPass')}
                          className="text-slate-400 hover:text-sky-400 cursor-pointer"
                        >
                          {copied === 'zoomPass' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <a
                    href={meetingDetails.zoomLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                  >
                    <span>Launch Zoom Meeting App</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: GOOGLE MEET ROOM */}
            {activeStreamType === 'gmeet' && (
              <div className="p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl space-y-6 flex flex-col justify-between min-h-[380px]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Users size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">Google Meet Fellowship</h3>
                      <p className="text-xs text-slate-400">விரைவு வேதாகமப் படிப்பு மற்றும் சிறிய குழு ஐக்கியம்</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Meet Link:</span>
                    <div className="text-sm font-bold text-emerald-400 font-mono flex items-center justify-between">
                      <span className="truncate">{meetingDetails.gmeetLink}</span>
                      <button 
                        onClick={() => copyToClipboard(meetingDetails.gmeetLink, 'gmeet')}
                        className="text-slate-400 hover:text-emerald-400 cursor-pointer"
                      >
                        {copied === 'gmeet' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <a
                    href={meetingDetails.gmeetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                  >
                    <span>Join Google Meet Instantly</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT 1 COLUMN: LIVE PRAYER FEED & CHAT */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl flex flex-col justify-between space-y-4 min-h-[460px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <MessageSquare size={15} className="text-orange-400" />
                  <span>Live Prayer Requests & Feed</span>
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold">
                  {chatMessages.length} Messages
                </span>
              </div>

              {/* Chat Feed List */}
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-400">{msg.name}</span>
                      <span className="text-[9px] text-slate-500 font-mono">{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Send Prayer Request Input */}
            <form onSubmit={handleSendChat} className="space-y-2 pt-2 border-t border-white/10">
              <input
                type="text"
                placeholder="Your Name (e.g. Sister Monisha)"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  placeholder="Type prayer note or greeting..."
                  value={newChatText}
                  onChange={(e) => setNewChatText(e.target.value)}
                  className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl cursor-pointer active:scale-95"
                >
                  <Send size={15} />
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
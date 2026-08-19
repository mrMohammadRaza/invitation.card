import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Send, Sparkles, User, Clock, Database, CheckCircle2 } from 'lucide-react';

const defaultSeedComments = [
  {
    _id: "1",
    name: "Tariq Sheikh & Family",
    text: "May Allah SWT bless this union with eternal love, harmony, and happiness. BarakAllah Lakuma!",
    date: "Aug 19, 2026"
  },
  {
    _id: "2",
    name: "Zaid Khan",
    text: "Heartiest congratulations to Asif brother and Alisha sister! Looking forward to attending the Nikah.",
    date: "Aug 18, 2026"
  }
];

export default function Guestbook({ data }) {
  // Load initial comments from localStorage cache for instant display on refresh
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('nikah_guest_comments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return defaultSeedComments;
  });

  const [newName, setNewName] = useState('');
  const [newDua, setNewDua] = useState('');
  const [postedToast, setPostedToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbStatus, setDbStatus] = useState('Syncing with MongoDB...');

  // Always sync messages to localStorage on state change
  useEffect(() => {
    localStorage.setItem('nikah_guest_comments', JSON.stringify(messages));
  }, [messages]);

  // Fetch comments live from MongoDB Atlas API
  const fetchCommentsFromDb = async () => {
    try {
      const res = await fetch('/api/comments');
      if (res.ok) {
        const dbComments = await res.json();
        if (Array.isArray(dbComments)) {
          if (dbComments.length > 0) {
            setMessages(dbComments);
            setDbStatus('Connected to MongoDB Atlas');
          } else {
            setDbStatus('MongoDB Atlas connected (0 records)');
          }
        }
      } else {
        setDbStatus('Saved locally in browser');
      }
    } catch (err) {
      setDbStatus('Saved locally in browser');
    }
  };

  useEffect(() => {
    fetchCommentsFromDb();
  }, []);

  const handlePostDua = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDua.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newCommentObj = {
      _id: Date.now().toString(),
      name: newName.trim(),
      text: newDua.trim(),
      date: formattedDate
    };

    // 1. Instant local state & localStorage update (guarantees persistence even if offline)
    const updatedList = [newCommentObj, ...messages];
    setMessages(updatedList);
    localStorage.setItem('nikah_guest_comments', JSON.stringify(updatedList));

    setNewName('');
    setNewDua('');
    setPostedToast(true);
    setTimeout(() => setPostedToast(false), 4000);

    // 2. Transmit to MongoDB Atlas Database
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCommentObj.name,
          text: newCommentObj.text
        })
      });

      if (res.ok) {
        setDbStatus('Connected to MongoDB Atlas');
        // Fetch authoritative list from DB
        fetchCommentsFromDb();
      }
    } catch (err) {
      console.log('Saved to local storage fallback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="comments" className="py-20 px-4 sm:px-6 lg:px-8 bg-islamic-pattern relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
              Live Guestbook & Comments
            </span>
          </div>
          <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] mb-2">
            Guest Comments & Wishes
          </h2>
          <p className="text-xs text-[#e2d8c3]/70 font-sans-ui max-w-md mx-auto">
            Read comments left by guests and share your warm blessings for Alisha & Asif
          </p>
        </div>

        {/* Post Comment Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-gold rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 mb-12 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4 border-b border-[#d4af37]/20 pb-3">
            <span className="text-xs uppercase tracking-wider font-bold text-[#d4af37] font-sans-ui flex items-center gap-2">
              <User className="w-4 h-4" />
              Post Your Comment & Dua
            </span>
            <span className="text-xs text-[#d4af37] font-arabic dir-rtl">
              بَارَكَ اللَّهُ لَكُما وَبَارَكَ عَلَيْكُمَا
            </span>
          </div>

          <form onSubmit={handlePostDua} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#e2d8c3]/80 font-sans-ui mb-1">
                Your Name / Family Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Salim Sheikh & Family"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#060b19]/80 border border-[#d4af37]/30 text-[#fbf8f3] placeholder-[#e2d8c3]/40 focus:outline-none focus:border-[#d4af37] font-sans-ui text-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#e2d8c3]/80 font-sans-ui mb-1">
                Your Comment / Blessing *
              </label>
              <textarea
                rows="3"
                required
                placeholder="Write your congratulations and warm wishes here..."
                value={newDua}
                onChange={(e) => setNewDua(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#060b19]/80 border border-[#d4af37]/30 text-[#fbf8f3] placeholder-[#e2d8c3]/40 focus:outline-none focus:border-[#d4af37] font-sans-ui text-sm resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              {postedToast ? (
                <span className="text-xs font-semibold text-green-400 font-sans-ui flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Your comment is saved continuously and visible on refresh!
                </span>
              ) : (
                <span className="text-[11px] text-[#e2d8c3]/70 font-sans-ui flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#d4af37]" />
                  {dbStatus}
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59b27] text-[#060b19] font-sans-ui text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Saving...' : 'Submit Comment'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Header Bar for Live Comments */}
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="font-title text-xl text-[#fbf8f3] font-bold flex items-center gap-2">
            <span>Posted Comments</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] font-sans-ui font-semibold">
              {messages.length}
            </span>
          </h3>
          <span className="text-xs text-[#e2d8c3]/70 font-sans-ui flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-[#d4af37]" />
            Saved Continuously
          </span>
        </div>

        {/* Display Comments Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {messages.map((item) => (
              <motion.div
                key={item._id || item.id || item.createdAt}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-3 relative group hover:border-[#d4af37] transition-all shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-title font-bold text-xs">
                      {item.name ? item.name.charAt(0) : 'U'}
                    </div>
                    <h4 className="font-title text-sm text-[#fbf8f3] font-semibold">
                      {item.name}
                    </h4>
                  </div>
                  <span className="text-[10px] text-[#e2d8c3]/50 font-sans-ui flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#d4af37]/60" />
                    {item.date || 'Recent'}
                  </span>
                </div>

                <p className="text-xs text-[#e2d8c3] font-serif-body italic leading-relaxed pt-1">
                  "{item.text}"
                </p>

                <div className="flex items-center justify-end pt-2 text-[#d4af37]/50 text-xs">
                  <Heart className="w-3.5 h-3.5 fill-[#d4af37]/20 text-[#d4af37]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

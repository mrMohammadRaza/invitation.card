import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Send, Sparkles } from 'lucide-react';

export default function Guestbook({ data }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Tariq Sheikh & Family",
      text: "May Allah SWT bless this union with eternal love, harmony, and happiness. BarakAllah Lakuma!",
      date: "Aug 19, 2026"
    },
    {
      id: 2,
      name: "Zaid Khan",
      text: "Heartiest congratulations to Asif brother and Alisha sister! Looking forward to the Nikah.",
      date: "Aug 18, 2026"
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newDua, setNewDua] = useState('');

  const handlePostDua = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDua.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newName.trim(),
      text: newDua.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setMessages([newEntry, ...messages]);
    setNewName('');
    setNewDua('');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-islamic-pattern relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
              Dua & Blessings Wall
            </span>
          </div>
          <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] mb-2">
            Leave Your Blessings
          </h2>
          <p className="text-xs text-[#e2d8c3]/70 font-sans-ui max-w-md mx-auto">
            Share your prayers and heartfelt duas for Alisha & Asif
          </p>
        </div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-gold rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 mb-12 shadow-xl"
        >
          <form onSubmit={handlePostDua} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name / Family Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#060b19]/80 border border-[#d4af37]/30 text-[#fbf8f3] placeholder-[#e2d8c3]/40 focus:outline-none focus:border-[#d4af37] font-sans-ui text-sm"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-[#d4af37] font-arabic">
                <span>بَارَكَ اللَّهُ لَكُما وَبَارَكَ عَلَيْكُمَا</span>
              </div>
            </div>

            <div>
              <textarea
                rows="3"
                required
                placeholder="Write your dua or warm message..."
                value={newDua}
                onChange={(e) => setNewDua(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#060b19]/80 border border-[#d4af37]/30 text-[#fbf8f3] placeholder-[#e2d8c3]/40 focus:outline-none focus:border-[#d4af37] font-sans-ui text-sm resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#d4af37] text-[#060b19] font-sans-ui text-xs font-bold uppercase tracking-wider hover:bg-[#f3e5ab] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                Post Dua to Wall
              </button>
            </div>
          </form>
        </motion.div>

        {/* Display Wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {messages.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-title text-base text-[#fbf8f3] font-semibold">
                  {item.name}
                </h4>
                <span className="text-[10px] text-[#e2d8c3]/50 font-sans-ui">
                  {item.date}
                </span>
              </div>
              <p className="text-xs text-[#e2d8c3] font-serif-body italic leading-relaxed">
                "{item.text}"
              </p>
              <div className="flex items-center justify-end text-[#d4af37]/40 text-xs">
                <Heart className="w-3.5 h-3.5 fill-[#d4af37]/20 text-[#d4af37]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

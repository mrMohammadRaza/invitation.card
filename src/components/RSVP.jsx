import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, UserCheck, Users, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RSVP({ data }) {
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attendance: 'attending', // 'attending' or 'declined'
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (formData.attendance === 'attending') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F3E5AB', '#FFF']
        });
      } catch (err) {
        // Fallback
      }
    }

    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#060b19] relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
            <UserCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
              Confirm Attendance
            </span>
          </div>
          <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] mb-2">
            Will You Join Us?
          </h2>
          <p className="text-sm text-[#e2d8c3]/80 font-serif-body italic max-w-md mx-auto">
            Your presence and prayers will make this occasion even more special.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-gold rounded-3xl p-8 sm:p-12 border-2 border-[#d4af37]/40 relative shadow-2xl"
        >
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#d4af37] mx-auto animate-bounce" />
              <h3 className="font-title text-3xl text-[#fbf8f3]">
                JazakAllah Khair, {formData.name}!
              </h3>
              <p className="text-sm text-[#e2d8c3] font-sans-ui max-w-md mx-auto">
                {formData.attendance === 'attending'
                  ? `We are delighted that you will join us for the Nikah on Thursday, 12 November 2026.`
                  : `Thank you for letting us know. Your prayers and warm wishes mean a lot to the family.`}
              </p>
              <div className="p-4 rounded-xl bg-[#060b19]/80 border border-[#d4af37]/20 text-xs text-[#e2d8c3]/70 font-sans-ui max-w-md mx-auto">
                <strong>Status Note:</strong> Submission received locally. (Architecture ready for Firebase/Supabase backend connection).
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full bg-[#0a1128] border border-[#d4af37]/40 text-[#d4af37] text-xs font-sans-ui hover:bg-[#d4af37]/20 transition-all cursor-pointer"
              >
                Submit Another Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Attendance Selection Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                  className={`py-3.5 px-4 rounded-2xl border font-sans-ui text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    formData.attendance === 'attending'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#c59b27] text-[#060b19] border-[#d4af37] shadow-lg'
                      : 'bg-[#0a1128]/70 text-[#e2d8c3] border-[#d4af37]/30 hover:border-[#d4af37]'
                  }`}
                >
                  I'll Be There
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'declined' })}
                  className={`py-3.5 px-4 rounded-2xl border font-sans-ui text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    formData.attendance === 'declined'
                      ? 'bg-[#d4af37]/20 text-[#f3e5ab] border-[#d4af37]'
                      : 'bg-[#0a1128]/70 text-[#e2d8c3] border-[#d4af37]/30 hover:border-[#d4af37]'
                  }`}
                >
                  Unable to Attend
                </button>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-sans-ui uppercase tracking-widest text-[#d4af37] mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farhan & Family"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#060b19]/80 border border-[#d4af37]/30 text-[#fbf8f3] placeholder-[#e2d8c3]/40 focus:outline-none focus:border-[#d4af37] font-sans-ui text-sm transition-all"
                />
              </div>

              {/* Number of Guests */}
              {formData.attendance === 'attending' && (
                <div>
                  <label className="block text-xs font-sans-ui uppercase tracking-widest text-[#d4af37] mb-2 font-medium">
                    Number of Guests Attending
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#060b19]/80 border border-[#d4af37]/30 text-[#fbf8f3] focus:outline-none focus:border-[#d4af37] font-sans-ui text-sm transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, '7+'].map((num) => (
                      <option key={num} value={num} className="bg-[#060b19] text-[#fbf8f3]">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Optional Message / Dua */}
              <div>
                <label className="block text-xs font-sans-ui uppercase tracking-widest text-[#d4af37] mb-2 font-medium">
                  Personal Message / Dua for Couple (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Share your prayers and heartiest wishes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#060b19]/80 border border-[#d4af37]/30 text-[#fbf8f3] placeholder-[#e2d8c3]/40 focus:outline-none focus:border-[#d4af37] font-sans-ui text-sm transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#c59b27] text-[#060b19] font-sans-ui text-xs font-bold uppercase tracking-widest shadow-xl hover:scale-101 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit RSVP Confirmation
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

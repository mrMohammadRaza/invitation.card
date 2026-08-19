import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function InvitationMessage({ data }) {
  return (
    <section id="invitation" className="py-20 px-4 sm:px-6 lg:px-8 bg-islamic-pattern relative">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-gold rounded-3xl p-8 sm:p-14 border-2 border-[#d4af37]/40 relative shadow-2xl overflow-hidden"
        >
          {/* Top Corner Ornaments */}
          <div className="absolute top-4 left-4 text-[#d4af37]/40 text-2xl font-serif-body">❖</div>
          <div className="absolute top-4 right-4 text-[#d4af37]/40 text-2xl font-serif-body">❖</div>
          <div className="absolute bottom-4 left-4 text-[#d4af37]/40 text-2xl font-serif-body">❖</div>
          <div className="absolute bottom-4 right-4 text-[#d4af37]/40 text-2xl font-serif-body">❖</div>

          {/* Invitation No */}
          <div className="inline-block px-4 py-1 rounded-full bg-[#060b19] border border-[#d4af37]/30 text-[#d4af37] text-xs font-title tracking-widest mb-6">
            IN THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL
          </div>

          <p className="font-arabic text-xl sm:text-2xl text-[#d4af37] mb-6 dir-rtl">
            {data.bismillahArabic}
          </p>

          {/* Message Text */}
          <p className="font-serif-body text-lg sm:text-2xl text-[#e2d8c3] leading-relaxed max-w-2xl mx-auto italic mb-8">
            "{data.invitationMessage}"
          </p>

          {/* Couple Highlighting Container */}
          <div className="py-8 my-6 border-y border-[#d4af37]/30 bg-[#060b19]/60 rounded-2xl p-6 relative">
            <div className="space-y-2">
              <h3 className="font-title text-3xl sm:text-5xl text-gold-shimmer font-bold">
                {data.bride.name}
              </h3>
              <p className="font-sans-ui text-xs sm:text-sm text-[#e2d8c3]/80 uppercase tracking-widest">
                {data.bride.relation}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/50 flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]/30" />
              </div>
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </div>

            <div className="space-y-2">
              <h3 className="font-title text-3xl sm:text-5xl text-gold-shimmer font-bold">
                {data.groom.name}
              </h3>
              <p className="font-sans-ui text-xs sm:text-sm text-[#e2d8c3]/80 uppercase tracking-widest">
                {data.groom.relation}
              </p>
            </div>
          </div>

          <p className="font-sans-ui text-xs text-[#d4af37] tracking-widest uppercase mt-6">
            Nikah Ceremony & Dawat • Thursday, 12 November 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}

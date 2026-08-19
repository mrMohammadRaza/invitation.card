import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer({ data }) {
  return (
    <footer className="bg-[#040711] border-t border-[#d4af37]/30 py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Calligraphic Seal */}
        <div className="w-14 h-14 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-arabic text-xl mx-auto shadow-md">
          786
        </div>

        <h3 className="font-arabic text-4xl text-gold-shimmer drop-shadow">
          {data.arabicHeading}
        </h3>

        <div className="space-y-1">
          <h2 className="font-title text-2xl sm:text-4xl text-[#fbf8f3] font-bold tracking-wide">
            {data.bride.name} <span className="text-[#d4af37] font-serif-body italic">&</span> {data.groom.name}
          </h2>
          <p className="text-xs text-[#d4af37] font-sans-ui uppercase tracking-widest pt-1">
            Thursday, 12 November 2026 • Ambedkar Bhawan, Martaroli Gondia
          </p>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto py-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]/30" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Closing Message */}
        <p className="font-serif-body italic text-lg sm:text-xl text-[#e2d8c3] max-w-lg mx-auto">
          "{data.closingMessage}"
        </p>

        {/* Family Signature */}
        <div className="pt-4 border-t border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e2d8c3]/60 font-sans-ui max-w-2xl mx-auto">
          <span>Invitation Ref: {data.headerNumber}</span>
          <span className="font-title text-sm font-semibold text-[#f3e5ab]">
            {data.family.name}
          </span>
          <span>© 2026 Premium Nikah Experience</span>
        </div>
      </div>
    </footer>
  );
}

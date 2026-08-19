import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, Sparkles, ChevronDown, Download } from 'lucide-react';

export default function Hero({ data, t }) {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-islamic-pattern overflow-hidden">
      {/* Background Soft Gold Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128]/90 border border-[#d4af37]/40 mb-6"
        >
          <span className="text-[#d4af37] font-arabic text-sm">{data.headerNumber}</span>
          <span className="h-3 w-[1px] bg-[#d4af37]/40" />
          <span className="text-[#f3e5ab] text-xs font-sans-ui tracking-wider uppercase">
            {t.officialNikah}
          </span>
        </motion.div>

        {/* Bismillah Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-arabic text-2xl sm:text-3xl text-[#d4af37] mb-4 dir-rtl leading-relaxed drop-shadow"
        >
          {data.bismillahArabic}
        </motion.p>

        {/* Main Arabic Calligraphy Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-arabic text-5xl sm:text-7xl lg:text-8xl text-gold-shimmer mb-6 tracking-wide drop-shadow-lg py-2"
        >
          {data.arabicHeading}
        </motion.h1>

        {/* Grand Islamic Arch Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-2xl mx-auto glass-card-gold rounded-[2.5rem] p-8 sm:p-12 border-2 border-[#d4af37]/40 my-6 shadow-2xl"
        >
          {/* Top Arch Crown */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#060b19] border border-[#d4af37]/50 rounded-full flex items-center gap-2 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs font-title tracking-widest text-[#f3e5ab] uppercase">
              {t.nikahCeremony}
            </span>
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
          </div>

          {/* Bride & Groom Names */}
          <div className="space-y-4 pt-4 pb-2">
            <h2 className="font-title text-3xl sm:text-5xl lg:text-6xl text-[#fbf8f3] font-bold tracking-tight">
              {data.bride.name}
            </h2>
            <div className="flex items-center justify-center gap-4 my-3">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              <span className="font-serif-body italic text-2xl text-[#d4af37]">&</span>
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </div>
            <h2 className="font-title text-3xl sm:text-5xl lg:text-6xl text-[#fbf8f3] font-bold tracking-tight">
              {data.groom.name}
            </h2>
          </div>

          {/* Parents Subtitle */}
          <div className="mt-6 pt-4 border-t border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-[#e2d8c3]/90 font-serif-body">
            <span>{t.daughterOf} {data.bride.father}</span>
            <span className="hidden sm:inline text-[#d4af37]">•</span>
            <span>{t.sonOf} {data.groom.father}</span>
          </div>

          {/* Quick Date, Venue, Time Info Pill */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-3 rounded-xl bg-[#0a1128]/70 border border-[#d4af37]/20 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div>
                <p className="text-[10px] text-[#e2d8c3]/60 font-sans-ui uppercase">{t.dateLabel}</p>
                <p className="text-xs font-semibold text-[#fbf8f3] font-sans-ui">{t.dateValue}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0a1128]/70 border border-[#d4af37]/20 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div>
                <p className="text-[10px] text-[#e2d8c3]/60 font-sans-ui uppercase">{t.nikahCeremony}</p>
                <p className="text-xs font-semibold text-[#d4af37] font-sans-ui">{t.nikahTimeValue}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0a1128]/70 border border-[#d4af37]/20 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#d4af37] shrink-0" />
              <div>
                <p className="text-[10px] text-[#e2d8c3]/60 font-sans-ui uppercase">{t.venueLabel}</p>
                <p className="text-xs font-semibold text-[#fbf8f3] font-sans-ui truncate">{t.venueValue}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <a
            href="/card.jpg"
            download="Nikah_Invitation_Card_Alisha_Asif.jpg"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59b27] text-[#060b19] font-sans-ui text-xs uppercase tracking-widest font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {t.downloadCard}
          </a>
          
          <button
            onClick={() => scrollToSection('#venue')}
            className="px-8 py-3.5 rounded-full bg-[#0a1128]/90 border border-[#d4af37]/50 text-[#f3e5ab] font-sans-ui text-xs uppercase tracking-widest font-semibold hover:bg-[#d4af37]/20 transition-all cursor-pointer"
          >
            {t.getDirections}
          </button>
        </motion.div>

        {/* Scroll Down Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-[#e2d8c3]/50 font-sans-ui">
            Scroll to View Details
          </span>
          <ChevronDown className="w-4 h-4 text-[#d4af37] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

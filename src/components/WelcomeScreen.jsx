import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function WelcomeScreen({ data, lang, setLang, t, onEnter }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'ur', label: 'اردو' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-[#060b19] bg-islamic-pattern overflow-hidden"
        >
          {/* Ambient Glowing Particles Overlay */}
          <div className="absolute inset-0 bg-radial from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />

          {/* Top Invitation Header Tag & Language Switcher */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="pt-4 text-center z-10 space-y-3 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128]/80 border border-[#d4af37]/40 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span className="text-[#f3e5ab] text-xs tracking-widest font-title">
                {t.invitationNo} {data.headerNumber}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            </div>

            {/* Language Switcher Bar */}
            <div className="flex items-center bg-[#0a1128]/90 border border-[#d4af37]/40 rounded-full p-1 text-xs font-sans-ui shadow-md">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    lang === item.code
                      ? 'bg-[#d4af37] text-[#060b19] font-bold shadow-md'
                      : 'text-[#e2d8c3]/80 hover:text-[#d4af37]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Center Card Presentation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
            className="w-full max-w-sm glass-card-gold rounded-3xl p-8 text-center relative border border-[#d4af37]/50 shadow-2xl z-10"
          >
            {/* Islamic Arch Decoration */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center">
              <span className="font-arabic text-2xl text-[#f3e5ab]">ﷺ</span>
            </div>

            {/* Bismillah */}
            <p className="font-arabic text-[#d4af37] text-lg sm:text-xl mb-4 leading-relaxed dir-rtl">
              {data.bismillahArabic}
            </p>

            {/* Arabic Main Calligraphy */}
            <h1 className="font-arabic text-4xl sm:text-5xl text-gold-shimmer mb-6 drop-shadow-md">
              {data.arabicHeading}
            </h1>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]/30" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>

            {/* Couple Names */}
            <div className="space-y-2 py-2">
              <h2 className="font-title text-2xl sm:text-3xl text-[#fbf8f3] tracking-wide">
                {data.bride.name}
              </h2>
              <p className="font-title text-sm text-[#d4af37] italic font-light">&</p>
              <h2 className="font-title text-2xl sm:text-3xl text-[#fbf8f3] tracking-wide">
                {data.groom.name}
              </h2>
            </div>

            <p className="text-xs text-[#e2d8c3]/80 mt-4 uppercase tracking-widest font-sans-ui">
              {t.dateValue}
            </p>
          </motion.div>

          {/* Bottom Enter Invitation Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="pb-6 z-10 text-center"
          >
            <button
              onClick={handleEnter}
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium font-sans-ui text-[#060b19] bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#c59b27] rounded-full shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span className="font-bold tracking-wider uppercase text-xs">Enter Invitation</span>
              <Sparkles className="w-4 h-4 ml-2 text-[#060b19] group-hover:rotate-12 transition-transform" />
            </button>
            <p className="text-[11px] text-[#e2d8c3]/60 mt-3 font-sans-ui">
              Click to open the interactive Nikah experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

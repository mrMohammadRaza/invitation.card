import React from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, User, Heart } from 'lucide-react';

export default function CoupleSection({ data, t }) {
  return (
    <section id="couple" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#060b19] relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
            <User className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
              {t.nav.couple}
            </span>
          </div>
          <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3]">
            {t.brideTitle} & {t.groomTitle}
          </h2>
          <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mt-2">
            Details as recorded on the official Nikah invitation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Central Decorative Heart Icon (Desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#060b19] border-2 border-[#d4af37] items-center justify-center text-[#d4af37] z-20 shadow-xl">
            <Heart className="w-6 h-6 fill-[#d4af37]/20 animate-pulse" />
          </div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-gold rounded-3xl p-8 border border-[#d4af37]/40 relative overflow-hidden group hover:border-[#d4af37] transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-arabic text-2xl mb-6">
              عروس
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold">
                {t.brideTitle}
              </span>
              <h3 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] font-bold">
                {data.bride.name}
              </h3>
              <p className="text-sm text-[#e2d8c3] font-serif-body italic">
                {t.daughterOf} {data.bride.father}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#d4af37]/20 space-y-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] mt-1 shrink-0" />
                <div>
                  <p className="text-[10px] text-[#e2d8c3]/60 uppercase tracking-widest font-sans-ui">
                    {t.brideTitle} Residence / Address
                  </p>
                  <p className="text-sm font-medium text-[#fbf8f3] font-sans-ui mt-0.5 leading-relaxed">
                    {data.bride.address.full}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-gold rounded-3xl p-8 border border-[#d4af37]/40 relative overflow-hidden group hover:border-[#d4af37] transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-arabic text-2xl mb-6">
              عريس
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold">
                {t.groomTitle}
              </span>
              <h3 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] font-bold">
                {data.groom.name}
              </h3>
              <p className="text-sm text-[#e2d8c3] font-serif-body italic">
                {t.sonOf} {t.late} {data.groom.father.replace('Late ', '')}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#d4af37]/20 space-y-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] mt-1 shrink-0" />
                <div>
                  <p className="text-[10px] text-[#e2d8c3]/60 uppercase tracking-widest font-sans-ui">
                    {t.groomTitle} Residence / Address
                  </p>
                  <p className="text-sm font-medium text-[#fbf8f3] font-sans-ui mt-0.5 leading-relaxed">
                    {data.groom.address.full}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

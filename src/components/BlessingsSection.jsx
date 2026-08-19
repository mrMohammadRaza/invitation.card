import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles } from 'lucide-react';

export default function BlessingsSection({ data, t }) {
  return (
    <section id="blessings" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a1128]/70 border-y border-[#d4af37]/20 relative">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-8 sm:p-10 border border-[#d4af37]/40 shadow-xl relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto mb-4">
            <Sparkles className="w-5 h-5" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold mb-2">
            {t.nav.blessings}
          </p>

          <h3 className="font-serif-body italic text-xl sm:text-2xl text-[#e2d8c3] mb-3">
            {t.blessingsTitle}
          </h3>

          <h2 className="font-title text-3xl sm:text-4xl text-gold-shimmer font-bold tracking-wide">
            {t.late} {data.blessings.name.replace('Late ', '')}
          </h2>

          <p className="text-xs text-[#e2d8c3]/60 font-sans-ui mt-4 max-w-lg mx-auto">
            {t.blessingsDesc}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

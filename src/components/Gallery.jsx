import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Gallery({ data }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#060b19] relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
          <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
            Memory Wall
          </span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] mb-2">
          Wedding Memories
        </h2>
        <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mb-10">
          Capture and cherish the moments of Alisha & Asif's Nikah
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card-gold rounded-3xl p-12 sm:p-16 border-2 border-[#d4af37]/30 max-w-2xl mx-auto shadow-2xl relative overflow-hidden text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto mb-6">
            <ImageIcon className="w-10 h-10 animate-pulse" />
          </div>

          <h3 className="font-title text-2xl sm:text-3xl text-[#fbf8f3] font-bold mb-3">
            Photos Will Be Added Soon
          </h3>

          <p className="text-sm text-[#e2d8c3] font-serif-body italic max-w-md mx-auto leading-relaxed">
            Beautiful wedding photographs and celebratory highlights of the Nikah ceremony will be uploaded here after Thursday, 12 November 2026.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#060b19]/80 border border-[#d4af37]/30 text-xs text-[#d4af37] font-sans-ui">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Future-Ready Gallery System Prepared</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

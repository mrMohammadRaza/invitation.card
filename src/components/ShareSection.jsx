import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, MessageCircle, Download } from 'lucide-react';

export default function ShareSection({ data, onShare }) {
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : data.websiteUrl;

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getWhatsAppShareUrl = () => {
    const text = `دعوت نکاح\n\nYou are cordially invited to the Nikah Ceremony of Alisha Sheikh & Asif Khan on Thursday, 12 November 2026 at Ambedkar Bhawan, Martaroli Gondia.\n\nView digital invitation:\n${currentUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#060b19] border-t border-[#d4af37]/20 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
          <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
            Share & Download
          </span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] mb-2">
          Share Digital Invitation
        </h2>
        <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mb-10 max-w-md mx-auto">
          Pass along the Nikah invitation card & website link to friends and relatives
        </p>

        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-gold rounded-3xl p-8 sm:p-12 border border-[#d4af37]/40 max-w-xl mx-auto text-center space-y-6 shadow-2xl"
        >
          <div className="w-14 h-14 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto">
            <Share2 className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h3 className="font-title text-2xl text-[#fbf8f3] font-bold">
              Send to Family & Friends
            </h3>
            <p className="text-xs text-[#e2d8c3]/80 font-sans-ui leading-relaxed max-w-md mx-auto">
              Download the official invitation card or share the interactive website link directly via WhatsApp and mobile apps.
            </p>
          </div>

          <div className="pt-2 space-y-3 max-w-md mx-auto">
            <a
              href="/card.jpg"
              download="Nikah_Invitation_Card_Alisha_Asif.jpg"
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59b27] text-[#060b19] font-sans-ui text-xs font-bold uppercase tracking-wider hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Download className="w-4 h-4" />
              Download Official Invitation Card
            </a>

            <button
              onClick={onShare}
              className="w-full py-3.5 px-6 rounded-full bg-[#0a1128] border border-[#d4af37]/50 text-[#f3e5ab] font-sans-ui text-xs font-bold uppercase tracking-wider hover:bg-[#d4af37]/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Share2 className="w-4 h-4 text-[#d4af37]" />
              Share Website Link
            </button>

            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-[#25D366] text-white font-sans-ui text-xs font-bold uppercase tracking-wider hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Share on WhatsApp
            </a>

            <button
              onClick={copyUrl}
              className="w-full py-3 px-6 rounded-full bg-[#0a1128] border border-[#d4af37]/40 text-[#e2d8c3] font-sans-ui text-xs font-semibold uppercase tracking-wider hover:text-[#d4af37] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[#d4af37]" />}
              {copied ? "Link Copied to Clipboard!" : "Copy Website Link Text"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

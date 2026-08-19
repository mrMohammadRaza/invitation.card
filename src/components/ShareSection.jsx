import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, QrCode, Copy, Check, MessageCircle, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

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
            Digital Sharing & QR Code
          </span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] mb-2">
          Share Invitation
        </h2>
        <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mb-12 max-w-md mx-auto">
          Pass along the Nikah invitation to friends and relatives
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-center">
          {/* Action Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-gold rounded-3xl p-8 border border-[#d4af37]/40 text-left space-y-4 shadow-xl"
          >
            <h3 className="font-title text-2xl text-[#fbf8f3] font-bold">
              Send to Family & Friends
            </h3>
            <p className="text-xs text-[#e2d8c3]/80 font-sans-ui leading-relaxed">
              Share the interactive Nikah card link directly via WhatsApp or standard mobile share menu.
            </p>

            <div className="pt-2 space-y-3">
              <button
                onClick={onShare}
                className="w-full py-3.5 px-6 rounded-full bg-[#d4af37] text-[#060b19] font-sans-ui text-xs font-bold uppercase tracking-wider hover:bg-[#f3e5ab] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Share2 className="w-4 h-4" />
                Share Invitation Link
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
                className="w-full py-3 px-6 rounded-full bg-[#0a1128] border border-[#d4af37]/40 text-[#f3e5ab] font-sans-ui text-xs font-semibold uppercase tracking-wider hover:bg-[#d4af37]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[#d4af37]" />}
                {copied ? "Link Copied!" : "Copy Website Link"}
              </button>
            </div>
          </motion.div>

          {/* QR Code Presentation Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-gold rounded-3xl p-8 border border-[#d4af37]/40 text-center space-y-4 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto">
              <QrCode className="w-5 h-5" />
            </div>

            <h3 className="font-title text-xl text-[#fbf8f3] font-bold">
              Scan QR Code
            </h3>

            {/* QR Code Container */}
            <div className="p-4 rounded-2xl bg-white max-w-[200px] mx-auto border-2 border-[#d4af37] shadow-inner">
              <QRCodeSVG
                value={currentUrl}
                size={160}
                fgColor="#060b19"
                bgColor="#FFFFFF"
                level="H"
                className="mx-auto"
              />
            </div>

            <p className="text-[11px] text-[#e2d8c3]/70 font-sans-ui">
              Point mobile camera at QR code to instantly open website
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

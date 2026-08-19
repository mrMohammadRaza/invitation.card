import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';

export default function VenueSection({ data }) {
  const [copied, setCopied] = useState(false);

  const getMapSearchUrl = () => {
    const query = encodeURIComponent(data.event.mapQuery);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(data.event.venue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="venue" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#060b19] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
              Location & Map
            </span>
          </div>
          <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3]">
            Nikah Venue
          </h2>
          <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mt-2">
            Ambedkar Bhawan, Martaroli Gondia
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card-gold rounded-3xl p-8 sm:p-12 border-2 border-[#d4af37]/40 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto mb-6">
            <Navigation className="w-8 h-8 animate-pulse" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold">
            Official Venue Address
          </span>

          <h3 className="font-title text-3xl sm:text-5xl text-[#fbf8f3] font-bold mt-2 mb-3">
            Ambedkar Bhawan
          </h3>

          <p className="text-xl sm:text-2xl text-gold-gradient font-sans-ui font-semibold">
            Martaroli Gondia.
          </p>

          <p className="text-xs text-[#e2d8c3]/80 font-sans-ui mt-3 max-w-md mx-auto">
            Gondia District, Maharashtra, Pin Code: 441601
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={getMapSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59b27] text-[#060b19] font-sans-ui text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              Get Directions on Map
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={copyAddress}
              className="px-6 py-3.5 rounded-full bg-[#0a1128] border border-[#d4af37]/50 text-[#f3e5ab] font-sans-ui text-xs font-semibold uppercase tracking-wider hover:bg-[#d4af37]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[#d4af37]" />}
              {copied ? "Address Copied!" : "Copy Full Venue Text"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

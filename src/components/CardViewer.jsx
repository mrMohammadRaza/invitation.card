import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Maximize2, Download, X, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

export default function CardViewer({ data, t }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.3, 1));

  return (
    <section id="card-viewer" className="py-20 px-4 sm:px-6 lg:px-8 bg-islamic-pattern relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
          <Image className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
            {t.nav.card}
          </span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] mb-2">
          {t.viewCard}
        </h2>
        <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mb-10 max-w-lg mx-auto">
          {t.viewCardDesc}
        </p>

        {/* Card Frame Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative inline-block max-w-md mx-auto rounded-3xl p-3 bg-gradient-to-b from-[#d4af37] via-[#997312] to-[#d4af37] shadow-2xl group"
        >
          <div className="relative rounded-2xl overflow-hidden bg-[#060b19]">
            <img
              src={data.cardImagePath}
              alt="Nikah Invitation Card - Alisha Sheikh & Asif Khan"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-102"
              loading="lazy"
            />

            {/* Hover Overlay Action */}
            <div className="absolute inset-0 bg-[#060b19]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
              <button
                onClick={() => setIsFullscreen(true)}
                className="px-5 py-2.5 rounded-full bg-[#d4af37] text-[#060b19] font-sans-ui text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer hover:bg-[#f3e5ab] transition-all"
              >
                <Maximize2 className="w-4 h-4" />
                {t.fullscreenCard}
              </button>

              <a
                href={data.cardImagePath}
                download="Alisha_Asif_Nikah_Invitation_Card.jpg"
                className="p-2.5 rounded-full bg-[#0a1128] text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37]/20 transition-all"
                title="Download Card"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => setIsFullscreen(true)}
            className="px-6 py-2.5 rounded-full bg-[#0a1128] border border-[#d4af37]/40 text-[#f3e5ab] text-xs font-sans-ui font-semibold uppercase tracking-wider hover:bg-[#d4af37]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Maximize2 className="w-4 h-4 text-[#d4af37]" />
            {t.fullscreenCard}
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#060b19]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-4xl flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-sans-ui text-[#f3e5ab]">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Card Reader Viewer</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-full bg-[#0a1128] border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/20 transition-all cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>

                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-full bg-[#0a1128] border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/20 transition-all cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>

                <a
                  href={data.cardImagePath}
                  download="Alisha_Asif_Nikah_Invitation_Card.jpg"
                  className="p-2 rounded-full bg-[#0a1128] border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/20 transition-all cursor-pointer"
                  title="Download Image"
                >
                  <Download className="w-5 h-5" />
                </a>

                <button
                  onClick={() => {
                    setIsFullscreen(false);
                    setZoomLevel(1);
                  }}
                  className="p-2 rounded-full bg-[#d4af37] text-[#060b19] hover:bg-[#f3e5ab] transition-all cursor-pointer"
                  title="Close Viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Image Canvas */}
            <div className="flex-1 w-full max-w-2xl flex items-center justify-center p-4 overflow-auto">
              <motion.img
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                src={data.cardImagePath}
                alt="Nikah Invitation Card Fullscreen"
                className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl border border-[#d4af37]/50"
              />
            </div>

            <p className="text-xs text-[#e2d8c3]/60 font-sans-ui z-10">
              Pinch or use zoom controls to inspect invitation typography in detail
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

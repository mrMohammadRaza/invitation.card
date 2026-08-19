import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RefreshCw, Settings, Download, Upload, Check } from 'lucide-react';

export default function AdminDrawer({ isOpen, onClose, data, onUpdateData, onResetData }) {
  if (!isOpen) return null;

  const handleChange = (path, value) => {
    const newData = JSON.parse(JSON.stringify(data));
    const parts = path.split('.');
    let curr = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      curr = curr[parts[i]];
    }
    curr[parts[parts.length - 1]] = value;
    onUpdateData(newData);
  };

  const exportConfig = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weddingData_config.json';
    a.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#060b19]/80 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-[#060b19] border-l border-[#d4af37]/40 h-full overflow-y-auto p-6 text-[#fbf8f3] font-sans-ui shadow-2xl flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-title text-xl font-bold text-[#fbf8f3]">
                  Wedding Configuration
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-[#0a1128] text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37]/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#e2d8c3]/70 mb-6 leading-relaxed">
              Edit all factual parameters live. Changes update instantly across all sections of the site.
            </p>

            {/* Form Fields */}
            <div className="space-y-4 text-xs">
              {/* Bride Section */}
              <div className="p-4 rounded-xl bg-[#0a1128]/80 border border-[#d4af37]/20 space-y-3">
                <span className="font-bold text-[#d4af37] uppercase tracking-wider block">Bride Details</span>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Bride Name</label>
                  <input
                    type="text"
                    value={data.bride.name}
                    onChange={(e) => handleChange('bride.name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Bride Relation / Father</label>
                  <input
                    type="text"
                    value={data.bride.relation}
                    onChange={(e) => handleChange('bride.relation', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Bride Address</label>
                  <input
                    type="text"
                    value={data.bride.address.full}
                    onChange={(e) => handleChange('bride.address.full', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
              </div>

              {/* Groom Section */}
              <div className="p-4 rounded-xl bg-[#0a1128]/80 border border-[#d4af37]/20 space-y-3">
                <span className="font-bold text-[#d4af37] uppercase tracking-wider block">Groom Details</span>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Groom Name</label>
                  <input
                    type="text"
                    value={data.groom.name}
                    onChange={(e) => handleChange('groom.name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Groom Relation / Father</label>
                  <input
                    type="text"
                    value={data.groom.relation}
                    onChange={(e) => handleChange('groom.relation', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Groom Address</label>
                  <input
                    type="text"
                    value={data.groom.address.full}
                    onChange={(e) => handleChange('groom.address.full', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
              </div>

              {/* Event Timing & Venue */}
              <div className="p-4 rounded-xl bg-[#0a1128]/80 border border-[#d4af37]/20 space-y-3">
                <span className="font-bold text-[#d4af37] uppercase tracking-wider block">Event & Venue</span>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Date Text</label>
                  <input
                    type="text"
                    value={data.event.dateFormatted}
                    onChange={(e) => handleChange('event.dateFormatted', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Nikah Timing Text</label>
                  <input
                    type="text"
                    value={data.event.nikahTime}
                    onChange={(e) => handleChange('event.nikahTime', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Countdown Magrib Time (HH:MM)</label>
                  <input
                    type="time"
                    value={data.event.magribTimeConfig}
                    onChange={(e) => handleChange('event.magribTimeConfig', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Venue Full Name</label>
                  <input
                    type="text"
                    value={data.event.venue}
                    onChange={(e) => handleChange('event.venue', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
              </div>

              {/* Contacts */}
              <div className="p-4 rounded-xl bg-[#0a1128]/80 border border-[#d4af37]/20 space-y-3">
                <span className="font-bold text-[#d4af37] uppercase tracking-wider block">Contact Numbers</span>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Contact 1</label>
                  <input
                    type="text"
                    value={data.contacts[0].formatted}
                    onChange={(e) => {
                      handleChange('contacts.0.phone', e.target.value);
                      handleChange('contacts.0.formatted', e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#e2d8c3]/80 mb-1">Contact 2</label>
                  <input
                    type="text"
                    value={data.contacts[1].formatted}
                    onChange={(e) => {
                      handleChange('contacts.1.phone', e.target.value);
                      handleChange('contacts.1.formatted', e.target.value);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#060b19] border border-[#d4af37]/30 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-6 border-t border-[#d4af37]/30 flex flex-col gap-2">
            <a
              href="/card.jpg"
              download="Nikah_Invitation_Card_Alisha_Asif.jpg"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59b27] text-[#060b19] font-bold text-xs uppercase tracking-wider hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Official Invitation Card
            </a>
            <button
              onClick={onResetData}
              className="w-full py-2.5 rounded-xl bg-[#0a1128] border border-[#d4af37]/30 text-[#e2d8c3] text-xs uppercase tracking-wider hover:text-[#d4af37] flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reset to Original Invitation Card Values
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

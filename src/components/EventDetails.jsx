import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Download, Check, Sparkles, Utensils } from 'lucide-react';

export default function EventDetails({ data }) {
  const [copied, setCopied] = useState(false);

  // Generate Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Nikah Ceremony — Alisha Sheikh & Asif Khan`);
    const details = encodeURIComponent(`You are cordially invited to the Nikah Ceremony & Dawat of Alisha Sheikh (D/o Jamil Sheikh) & Asif Khan (S/o Late Nasir Khan).\nTiming: After Magrib.\nVenue: ${data.event.venue}`);
    const location = encodeURIComponent(data.event.venue);
    // Nov 12, 2026 18:30 to 22:30 IST
    const dates = "20261112T130000Z/20261112T170000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Generate and download .ics iCal file
  const downloadIcsFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Alisha & Asif Nikah Invitation//EN
BEGIN:VEVENT
SUMMARY:Nikah Ceremony — Alisha Sheikh & Asif Khan
DESCRIPTION:Nikah Ceremony & Dawat of Alisha Sheikh (D/o Jamil Sheikh) & Asif Khan (S/o Late Nasir Khan).\\nTiming: After Magrib
LOCATION:${data.event.venue}
DTSTART:20261112T130000Z
DTEND:20261112T170000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Nikah_Alisha_Asif_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyEventInfo = () => {
    const text = `Nikah Ceremony & Dawat — Alisha Sheikh & Asif Khan\nDate: Thursday, 12 November 2026 (12/11/26)\nNikah: After Magrib\nDawat: After Magrib\nVenue: Ambedkar Bhawan, Martaroli Gondia.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-islamic-pattern relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
              Program & Schedule
            </span>
          </div>
          <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3]">
            Nikah & Dawat Details
          </h2>
          <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mt-2">
            Exact event timings as printed on the official card
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Nikah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card-gold rounded-3xl p-6 border border-[#d4af37]/40 relative group hover:border-[#d4af37] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold">
              Primary Ceremony
            </span>
            <h3 className="font-title text-2xl text-[#fbf8f3] font-bold mt-1">
              Nikah
            </h3>
            <p className="text-lg font-semibold text-[#d4af37] font-sans-ui mt-3">
              {data.event.nikahTime}
            </p>
            <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mt-1">
              Following evening Magrib prayers
            </p>
          </motion.div>

          {/* Card 2: Dawat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass-card-gold rounded-3xl p-6 border border-[#d4af37]/40 relative group hover:border-[#d4af37] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-4">
              <Utensils className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold">
              Reception Feast
            </span>
            <h3 className="font-title text-2xl text-[#fbf8f3] font-bold mt-1">
              Dawat
            </h3>
            <p className="text-lg font-semibold text-[#d4af37] font-sans-ui mt-3">
              {data.event.dawatTime}
            </p>
            <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mt-1">
              Valima & dinner following Nikah
            </p>
          </motion.div>

          {/* Card 3: Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-card-gold rounded-3xl p-6 border border-[#d4af37]/40 relative group hover:border-[#d4af37] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold">
              Auspicious Date
            </span>
            <h3 className="font-title text-2xl text-[#fbf8f3] font-bold mt-1">
              Thursday
            </h3>
            <p className="text-lg font-semibold text-[#d4af37] font-sans-ui mt-3">
              12 Nov 2026
            </p>
            <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mt-1">
              Card Ref: {data.event.shortDate}
            </p>
          </motion.div>

          {/* Card 4: Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass-card-gold rounded-3xl p-6 border border-[#d4af37]/40 relative group hover:border-[#d4af37] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold">
              Venue Location
            </span>
            <h3 className="font-title text-xl text-[#fbf8f3] font-bold mt-1 leading-tight">
              Ambedkar Bhawan
            </h3>
            <p className="text-xs font-semibold text-[#d4af37] font-sans-ui mt-3">
              Martaroli Gondia
            </p>
            <p className="text-[11px] text-[#e2d8c3]/70 font-sans-ui mt-1">
              Maharashtra, India
            </p>
          </motion.div>
        </div>

        {/* Add to Calendar Action Panel */}
        <div className="mt-12 p-6 rounded-3xl glass-card border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="font-title text-lg text-[#fbf8f3] font-bold">
              Save the Auspicious Date
            </h4>
            <p className="text-xs text-[#e2d8c3]/80 font-sans-ui">
              Add the Nikah ceremony directly to your calendar application
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#d4af37] text-[#060b19] font-sans-ui text-xs font-bold uppercase tracking-wider hover:bg-[#f3e5ab] transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Google Calendar
            </a>

            <button
              onClick={downloadIcsFile}
              className="px-5 py-2.5 rounded-full bg-[#0a1128] border border-[#d4af37]/50 text-[#f3e5ab] font-sans-ui text-xs font-semibold uppercase tracking-wider hover:bg-[#d4af37]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              Download .ics (iCal)
            </button>

            <button
              onClick={copyEventInfo}
              className="px-4 py-2.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 text-[#e2d8c3] font-sans-ui text-xs font-medium hover:text-[#d4af37] transition-all flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Sparkles className="w-4 h-4 text-[#d4af37]" />}
              {copied ? "Copied!" : "Copy Event Info"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

export default function Countdown({ data }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isArrived: false
  });

  useEffect(() => {
    const calculateTime = () => {
      // Event Target: Nov 12, 2026 at Magrib time config (default 18:30 IST)
      const targetDateString = `${data.event.isoDate}T${data.event.magribTimeConfig}:00`;
      const targetTime = new Date(targetDateString).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isArrived: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds, isArrived: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [data.event.isoDate, data.event.magribTimeConfig]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0a1128]/50 border-y border-[#d4af37]/20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold">
            Auspicious Occasion Countdown
          </span>
        </div>

        <h3 className="font-title text-xl sm:text-2xl text-[#fbf8f3] mb-2">
          Counting Down to Thursday, 12 November 2026
        </h3>
        <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mb-8 max-w-md mx-auto">
          Timing: {data.event.nikahTime} (Event time configurable in settings)
        </p>

        {timeLeft.isArrived ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-3xl glass-card-gold max-w-xl mx-auto border-2 border-[#d4af37]"
          >
            <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto mb-3 animate-spin" />
            <h4 className="font-arabic text-3xl text-gold-shimmer mb-2">
              الحمد لله
            </h4>
            <p className="font-title text-2xl text-[#fbf8f3]">
              Alhamdulillah — The Nikah Day Has Arrived!
            </p>
            <p className="text-sm text-[#e2d8c3] mt-2">
              We request your prayers and presence for Alisha & Asif.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-4 sm:p-6 text-center border border-[#d4af37]/30 shadow-lg relative group hover:border-[#d4af37]"
              >
                <div className="font-title text-3xl sm:text-5xl font-bold text-gold-gradient drop-shadow mb-1">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-sans-ui uppercase tracking-widest text-[#e2d8c3]/80">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

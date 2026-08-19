import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Users, ExternalLink } from 'lucide-react';

export default function ContactSection({ data }) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-islamic-pattern relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128] border border-[#d4af37]/30 mb-3">
          <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-sans-ui">
            Contact & Queries
          </span>
        </div>
        <h2 className="font-title text-3xl sm:text-4xl text-[#fbf8f3] mb-2">
          Family Contacts
        </h2>
        <p className="text-xs text-[#e2d8c3]/70 font-sans-ui mb-12">
          For any inquiries, directions, or blessings — {data.family.name}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {data.contacts.map((contact, index) => (
            <motion.div
              key={contact.phone}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="glass-card-gold rounded-3xl p-8 border border-[#d4af37]/40 relative group hover:border-[#d4af37] transition-all shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto mb-4">
                <Users className="w-7 h-7" />
              </div>

              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-sans-ui font-semibold">
                {contact.label}
              </span>

              <h3 className="font-title text-2xl sm:text-3xl text-[#fbf8f3] font-bold mt-1 mb-6 tracking-wider">
                {contact.formatted}
              </h3>

              <div className="flex items-center justify-center gap-3">
                {/* Direct Call Button */}
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 py-3 px-4 rounded-full bg-[#d4af37] text-[#060b19] font-sans-ui text-xs font-bold uppercase tracking-wider hover:bg-[#f3e5ab] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>

                {/* WhatsApp Chat Button */}
                <a
                  href={`https://wa.me/91${contact.phone}?text=${encodeURIComponent(`Assalamu Alaikum, reaching out regarding the Nikah Ceremony of Alisha Sheikh & Asif Khan.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] font-sans-ui text-xs font-semibold uppercase tracking-wider hover:bg-[#25D366]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

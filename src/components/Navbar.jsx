import React, { useState, useEffect } from 'react';
import { Menu, X, Music, VolumeX, Share2, Settings, Calendar, Heart } from 'lucide-react';

export default function Navbar({ data, isMuted, onToggleAudio, onOpenAdmin, onShare }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Invitation', href: '#invitation' },
    { name: 'Couple', href: '#couple' },
    { name: 'Blessings', href: '#blessings' },
    { name: 'Events', href: '#events' },
    { name: 'Venue', href: '#venue' },
    { name: 'Card', href: '#card-viewer' },
    { name: 'RSVP', href: '#rsvp' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060b19]/90 backdrop-blur-md border-b border-[#d4af37]/30 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Names */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] font-arabic font-bold text-sm group-hover:scale-105 transition-transform">
            786
          </div>
          <div className="flex flex-col">
            <span className="font-title text-base sm:text-lg font-bold text-[#fbf8f3] tracking-wide">
              Alisha <span className="text-[#d4af37]">&</span> Asif
            </span>
            <span className="text-[10px] text-[#d4af37] tracking-widest uppercase font-sans-ui">
              Nikah 12.11.2026
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-medium font-sans-ui uppercase tracking-wider text-[#e2d8c3] hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Music Mute Toggle */}
          <button
            onClick={onToggleAudio}
            title={isMuted ? "Play background music" : "Mute background music"}
            className="p-2 rounded-full bg-[#0a1128]/80 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 transition-all cursor-pointer"
            aria-label="Toggle Music"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Music className="w-4 h-4 animate-bounce" />}
          </button>

          {/* Share Button */}
          <button
            onClick={onShare}
            title="Share Invitation"
            className="p-2 rounded-full bg-[#0a1128]/80 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 transition-all cursor-pointer"
            aria-label="Share Invitation"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Settings / Admin Edit Config Drawer */}
          <button
            onClick={onOpenAdmin}
            title="Configure Invitation Data"
            className="p-2 rounded-full bg-[#0a1128]/80 border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 transition-all cursor-pointer"
            aria-label="Admin Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#0a1128]/80 border border-[#d4af37]/30 text-[#d4af37] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#060b19]/98 border-b border-[#d4af37]/30 px-4 pt-4 pb-6 space-y-3 shadow-2xl backdrop-blur-xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium font-sans-ui text-[#e2d8c3] hover:text-[#060b19] hover:bg-[#d4af37] transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-[#d4af37]/20 flex items-center justify-between text-xs text-[#e2d8c3]/60 px-4 font-sans-ui">
            <span>786/92 Nikah Ceremony</span>
            <span>Sheikh Family</span>
          </div>
        </div>
      )}
    </header>
  );
}

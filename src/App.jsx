import React, { useState, useEffect } from 'react';
import { initialWeddingData } from './data/weddingData';
import { translations } from './data/translations';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import InvitationMessage from './components/InvitationMessage';
import CoupleSection from './components/CoupleSection';
import BlessingsSection from './components/BlessingsSection';
import EventDetails from './components/EventDetails';
import VenueSection from './components/VenueSection';
import CardViewer from './components/CardViewer';
import Guestbook from './components/Guestbook';
import Gallery from './components/Gallery';
import ContactSection from './components/ContactSection';
import ShareSection from './components/ShareSection';
import AdminDrawer from './components/AdminDrawer';
import Footer from './components/Footer';

export default function App() {
  const [weddingData, setWeddingData] = useState(() => {
    const saved = localStorage.getItem('nikah_wedding_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialWeddingData; }
    }
    return initialWeddingData;
  });

  const [lang, setLang] = useState(() => {
    return localStorage.getItem('nikah_lang') || 'en';
  });

  const [hasEntered, setHasEntered] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Active translation dictionary
  const t = translations[lang] || translations.en;

  useEffect(() => {
    localStorage.setItem('nikah_wedding_data', JSON.stringify(weddingData));
  }, [weddingData]);

  useEffect(() => {
    localStorage.setItem('nikah_lang', lang);
    // Apply RTL for Urdu language
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleUpdateData = (newData) => {
    setWeddingData(newData);
  };

  const handleResetData = () => {
    setWeddingData(initialWeddingData);
    localStorage.removeItem('nikah_wedding_data');
  };

  const handleShare = async () => {
    const shareData = {
      title: `Nikah Ceremony — ${weddingData.bride.name} & ${weddingData.groom.name}`,
      text: `You are cordially invited to the Nikah Ceremony of ${weddingData.bride.name} & ${weddingData.groom.name} on ${weddingData.event.dateFormatted}.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback or user canceled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  return (
    <div className={`min-h-screen bg-[#060b19] text-[#fbf8f3] relative font-sans-ui selection:bg-[#d4af37]/30 selection:text-[#f3e5ab] ${lang === 'ur' ? 'font-arabic' : ''}`}>
      {/* Cinematic Opening Splash Screen */}
      {!hasEntered && (
        <WelcomeScreen
          data={weddingData}
          lang={lang}
          setLang={setLang}
          t={t}
          onEnter={() => setHasEntered(true)}
        />
      )}

      {/* Main Website Structure */}
      {hasEntered && (
        <div className="animate-fadeIn">
          {/* Top Sticky Navigation */}
          <Navbar
            data={weddingData}
            lang={lang}
            setLang={setLang}
            t={t}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onShare={handleShare}
          />

          {/* Main Content Sections */}
          <main>
            <Hero data={weddingData} lang={lang} t={t} />
            <Countdown data={weddingData} lang={lang} t={t} />
            <InvitationMessage data={weddingData} lang={lang} t={t} />
            <CoupleSection data={weddingData} lang={lang} t={t} />
            <BlessingsSection data={weddingData} lang={lang} t={t} />
            <EventDetails data={weddingData} lang={lang} t={t} />
            <VenueSection data={weddingData} lang={lang} t={t} />
            <CardViewer data={weddingData} lang={lang} t={t} />
            <Guestbook data={weddingData} lang={lang} t={t} />
            <Gallery data={weddingData} lang={lang} t={t} />
            <ContactSection data={weddingData} lang={lang} t={t} />
            <ShareSection data={weddingData} lang={lang} t={t} onShare={handleShare} />
          </main>

          {/* Closing Footer */}
          <Footer data={weddingData} lang={lang} t={t} />

          {/* Configuration Admin Drawer Modal */}
          <AdminDrawer
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            data={weddingData}
            lang={lang}
            t={t}
            onUpdateData={handleUpdateData}
            onResetData={handleResetData}
          />
        </div>
      )}
    </div>
  );
}

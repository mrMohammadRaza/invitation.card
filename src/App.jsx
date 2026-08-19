import React, { useState, useEffect } from 'react';
import { initialWeddingData } from './data/weddingData';
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
import RSVP from './components/RSVP';
import Guestbook from './components/Guestbook';
import Gallery from './components/Gallery';
import ContactSection from './components/ContactSection';
import ShareSection from './components/ShareSection';
import AudioPlayer from './components/AudioPlayer';
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

  const [hasEntered, setHasEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nikah_wedding_data', JSON.stringify(weddingData));
  }, [weddingData]);

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
    <div className="min-h-screen bg-[#060b19] text-[#fbf8f3] relative font-sans-ui selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]">
      {/* Background Music Player */}
      <AudioPlayer isMuted={isMuted} />

      {/* Cinematic Opening Splash Screen */}
      {!hasEntered && (
        <WelcomeScreen
          data={weddingData}
          onEnter={() => setHasEntered(true)}
        />
      )}

      {/* Main Website Structure */}
      {hasEntered && (
        <div className="animate-fadeIn">
          {/* Top Sticky Navigation */}
          <Navbar
            data={weddingData}
            isMuted={isMuted}
            onToggleAudio={() => setIsMuted(!isMuted)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onShare={handleShare}
          />

          {/* Main Content Sections */}
          <main>
            <Hero data={weddingData} />
            <Countdown data={weddingData} />
            <InvitationMessage data={weddingData} />
            <CoupleSection data={weddingData} />
            <BlessingsSection data={weddingData} />
            <EventDetails data={weddingData} />
            <VenueSection data={weddingData} />
            <CardViewer data={weddingData} />
            <RSVP data={weddingData} />
            <Guestbook data={weddingData} />
            <Gallery data={weddingData} />
            <ContactSection data={weddingData} />
            <ShareSection data={weddingData} onShare={handleShare} />
          </main>

          {/* Closing Footer */}
          <Footer data={weddingData} />

          {/* Configuration Admin Drawer Modal */}
          <AdminDrawer
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            data={weddingData}
            onUpdateData={handleUpdateData}
            onResetData={handleResetData}
          />
        </div>
      )}
    </div>
  );
}

// Centralized Single Source of Truth Configuration for Nikah Wedding Data
export const initialWeddingData = {
  headerNumber: "786/92",
  arabicHeading: "دعوت نکاح",
  bismillahArabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  alhamdulillahArabic: "ٱلْحَمْدُ لِلَّٰهِ",
  
  bride: {
    name: "Alisha Sheikh",
    father: "Jamil Sheikh",
    relation: "Daughter of Jamil Sheikh",
    address: {
      line1: "Janta Colony Gondia",
      state: "Maharashtra 441601",
      full: "Janta Colony Gondia, Maharashtra 441601"
    }
  },
  
  groom: {
    name: "Asif Khan",
    father: "Late Nasir Khan",
    relation: "Son of Late Nasir Khan",
    address: {
      line1: "Bichhaliya Tehsil",
      district: "Mandla District",
      state: "Madhya Pradesh",
      full: "Bichhaliya Tehsil, Mandla District, Madhya Pradesh."
    }
  },
  
  blessings: {
    name: "Late Jammu Sheikh",
    title: "With the blessings of Late Jammu Sheikh"
  },
  
  event: {
    title: "Nikah Ceremony",
    dateFormatted: "Thursday, 12 November 2026",
    shortDate: "12/11/26",
    isoDate: "2026-11-12",
    // Configurable time for Magrib (defaulting to 18:30 IST for live countdown precision)
    nikahTime: "After Magrib",
    dawatTime: "After Magrib",
    magribTimeConfig: "18:30",
    venue: "Ambedkar Bhawan, Martaroli Gondia.",
    venueShort: "Ambedkar Bhawan, Martaroli, Gondia",
    mapQuery: "Ambedkar Bhawan Martaroli Gondia Maharashtra"
  },
  
  family: {
    name: "Sheikh Family"
  },
  
  invitationMessage: "With joyful hearts, we request the honor of your presence and blessing on the auspicious occasion of the Nikah Ceremony of",
  closingMessage: "We look forward to your presence and prayers.",
  
  contacts: [
    { label: "Sheikh Family Contact 1", phone: "9146448521", formatted: "9146448521" },
    { label: "Sheikh Family Contact 2", phone: "9174239074", formatted: "9174239074" }
  ],
  
  websiteUrl: typeof window !== 'undefined' ? window.location.origin : "https://alisha-asif-nikah.com",
  cardImagePath: "/card.jpg",
  
  rsvpBackendConnected: false // Clearly state demo mode unless backend provided
};

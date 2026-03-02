export interface ChapterPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  gradientFrom: string;
  gradientVia?: string;
  gradientTo: string;
}

export interface DressCode {
  title: string;
  description: string;
  dos: string[];
  donts: string[];
}

export interface WeddingEvent {
  slug: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  date: string;
  dateShort: string;
  day: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  longDescription: string;
  dressCode: DressCode;
  palette: ChapterPalette;
  heroImage: string;
  galleryImages: string[];
}

export interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attending: "yes" | "no" | "maybe";
  eventsAttending: string[];
  dietaryRestrictions: string;
  plusOne: boolean;
  plusOneName: string;
  notes: string;
}

export interface GuestInfo {
  name: string;
  room: string;
  pickupTime: string;
  pickupLocation: string;
  events: string[];
  notifications: { message: string; time: string; read: boolean }[];
}

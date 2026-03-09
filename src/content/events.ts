import { WeddingEvent } from "@/types";

export const COUPLE = {
  partner1: "Tarush",
  partner2: "Sanjana",
  hashtag: "#TarushAndSanjana",
  weddingDate: "2026-04-21",
  location: "Udaipur, Rajasthan",
  venue: "Fairmont Udaipur",
  tagline: "Mumbai, Pune, London — different cities, one love story.",
} as const;

export const EVENTS: WeddingEvent[] = [
  {
    slug: "pre-party",
    chapterNumber: 1,
    title: "The Pre-Party",
    subtitle: "Noor Mahal Soirée",
    tagline: "Where Pune meets palatial grandeur.",
    date: "5th April, 2026",
    dateShort: "Apr 5",
    day: "Sunday",
    time: "7:00 PM onwards",
    location: "Pune",
    venue: "TBD — Pune",
    description:
      "Before the main celebration in Udaipur, we invite you to Pune — where he grew up — for an evening of opulent revelry. Inspired by Indian palatial architecture, royal gardens, and heritage craftsmanship, the Noor Mahal Soirée sets the tone: cascading crimson florals, antique gold accents, projection mapping that transforms the space into a living work of art.",
    longDescription:
      "An opulent opening night in Pune — brocade, florals, and projection mapping in palatial style.",
    dressCode: {
      title: "Royal Evening",
      description: "Opulent and refined. Think rich fabrics, jewel tones, and heritage elegance.",
      dos: ["Formal Indian or Western evening wear", "Maroon, gold, emerald, blush", "Velvet, silk, brocade", "Statement jewellery"],
      donts: ["Casual / semi-casual", "Bright neons", "Denim or sneakers"],
    },
    palette: {
      primary: "#4a1a1a",
      secondary: "#c9a84c",
      accent: "#d4af37",
      background: "#1a0a0a",
      foreground: "#f5efe6",
      muted: "#3e2020",
      gradientFrom: "#2e1212",
      gradientVia: "#4a1a1a",
      gradientTo: "#1a0a0a",
    },
    heroImage: "https://images.unsplash.com/photo-1746549855902-0028190ed877?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80",
    ],
  },
  {
    slug: "courtyard-edit",
    chapterNumber: 2,
    title: "The Courtyard Edit",
    subtitle: "A Victorian Hi-Tea at a Royal Palace",
    tagline: "Rajasthan reimagined inside a refined, modern hangar.",
    date: "20th April, 2026",
    dateShort: "Apr 20",
    day: "Monday",
    time: "12:30 PM – 3:30 PM",
    location: "The Haveli Courtyard",
    venue: "Fairmont Udaipur",
    description:
      "Inspired by the fresco-lined havelis of Rajasthan, this lunch reimagines the traditional courtyard through a contemporary lens. Traditional motifs meet soft stripes and clean silhouettes, creating a space that feels regal yet fresh.",
    longDescription:
      "Rajasthan's royal hospitality in a pastel courtyard — frescoes, fine china, and afternoon tea.",
    dressCode: {
      title: "Pastel Organza Silhouettes",
      description: "Light, airy, and refined. Let the courtyard be your canvas.",
      dos: ["Pastels — blush, sage, lavender, ivory", "Organza, chiffon, linen", "Floral prints", "Light jewellery"],
      donts: ["Dark heavy fabrics", "Overly embellished", "All black"],
    },
    palette: {
      primary: "#e8b4b8",
      secondary: "#f5dde0",
      accent: "#c97b8b",
      background: "#fdf5f6",
      foreground: "#2c1018",
      muted: "#f0d8dc",
      gradientFrom: "#fdf5f6",
      gradientVia: "#f5dde0",
      gradientTo: "#f0d8dc",
    },
    heroImage: "https://images.unsplash.com/photo-1744698277059-e6fcda5c88ea?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1759387758817-1a1861261963?w=1920&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80",
    ],
  },
  {
    slug: "midnight-cathedral",
    chapterNumber: 3,
    title: "The Midnight Cathedral",
    subtitle: "Cathedral Gone Rogue",
    tagline: "The night the wild took over.",
    date: "20th April, 2026",
    dateShort: "Apr 20",
    day: "Monday",
    time: "8:00 PM onwards",
    location: "The Grand Ballroom",
    venue: "Fairmont Udaipur",
    description:
      "Inspired by the raw, wild energy of the venue, this Sangeet is what happens when a cathedral throws a party and no one stops it. Grand arches, dramatic height, clean symmetry — but inside that structure, the wild takes over.",
    longDescription:
      "A cathedral Sangeet where sacred geometry meets wild celebration and projection-mapped chaos.",
    dressCode: {
      title: "Gilded After Dark",
      description: "Shimmer. Depth. Drama. This night belongs to the bold.",
      dos: ["Gold, emerald, deep burgundy", "Shimmer and metallic accents", "Bold silhouettes", "Statement pieces"],
      donts: ["Understated / muted", "Casual fabrics", "White or ivory"],
    },
    palette: {
      primary: "#1a3a2a",
      secondary: "#c9a84c",
      accent: "#d4af37",
      background: "#0a1a12",
      foreground: "#f0ead6",
      muted: "#1e3d2b",
      gradientFrom: "#0a1a12",
      gradientVia: "#1a3a2a",
      gradientTo: "#0d2818",
    },
    heroImage: "https://images.unsplash.com/photo-1621313414874-ebdd09ebe4ce?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80",
    ],
  },
  {
    slug: "world-of-our-own",
    chapterNumber: 4,
    title: "A World of Our Own",
    subtitle: "A Sun-Drenched Courtyard Experience",
    tagline: "Where every city they've lived in meets in one afternoon.",
    date: "21st April, 2026",
    dateShort: "Apr 21",
    day: "Tuesday",
    time: "12:00 PM – 3:00 PM",
    location: "The Terrace Garden",
    venue: "Fairmont Udaipur",
    description:
      "Mumbai was the first meeting. Pune was where he grew up. London was where friendship became love. December 2023 was when the families came together. A minimalist setting with subtle details that reflect their journey — as they begin a new one together.",
    longDescription:
      "An intimate lunch mapping their journey — Mumbai, Pune, London — in sun-drenched simplicity.",
    dressCode: {
      title: "The Linen Collective",
      description: "Sun-kissed simplicity. Effortless, natural, warm.",
      dos: ["Linen, cotton, light knits", "Earth tones — sand, olive, terracotta", "Relaxed tailoring", "Minimal accessories"],
      donts: ["Heavy embroidery", "Dark formal wear", "Synthetic fabrics"],
    },
    palette: {
      primary: "#b8860b",
      secondary: "#e8c872",
      accent: "#d4a017",
      background: "#faf6ee",
      foreground: "#2c1e08",
      muted: "#f0e4c8",
      gradientFrom: "#faf6ee",
      gradientVia: "#f0e4c8",
      gradientTo: "#e8dab0",
    },
    heroImage: "https://images.unsplash.com/photo-1764397576344-d273f4835f83?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1744731057799-be86ef10be54?w=1920&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1920&q=80",
    ],
  },
  {
    slug: "royal-court",
    chapterNumber: 5,
    title: "The Royal Court",
    subtitle: "Architecture in Stone. Couture in Detail.",
    tagline: "Heritage interpreted through technology.",
    date: "21st April, 2026",
    dateShort: "Apr 21",
    day: "Tuesday",
    time: "6:00 PM onwards",
    location: "The Durbar Hall",
    venue: "Fairmont Udaipur",
    description:
      "Inspired by two things deeply rooted in Indian weddings: Mughal court architecture and couture craftsmanship. Instead of static décor, the architecture becomes a canvas — heritage interpreted through technology.",
    longDescription:
      "The ceremony as living court — Mughal archways reimagined in light, projection, and craft.",
    dressCode: {
      title: "Royal Couture",
      description: "This is the ceremony. Dress with intention. Honour the craft.",
      dos: ["Traditional Indian formalwear", "Rich maroons, golds, deep reds", "Heritage textiles — Banarasi, Kanjeevaram", "Heirloom jewellery"],
      donts: ["Western formal", "White or black", "Casual ethnic"],
    },
    palette: {
      primary: "#8b1a1a",
      secondary: "#d4af37",
      accent: "#c9956b",
      background: "#1a0a0a",
      foreground: "#f5efe6",
      muted: "#2e1212",
      gradientFrom: "#1a0a0a",
      gradientVia: "#2e1212",
      gradientTo: "#1a0808",
    },
    heroImage: "https://images.unsplash.com/photo-1587271636175-90d58cdad458?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&q=80",
    ],
  },
  {
    slug: "thrill-theory",
    chapterNumber: 6,
    title: "The Thrill Theory",
    subtitle: "Press Play on the Chaos",
    tagline: "Step inside. Get lost. Don't expect to come back the same.",
    date: "21st April, 2026",
    dateShort: "Apr 21",
    day: "Tuesday",
    time: "11:00 PM onwards",
    location: "The Underground",
    venue: "Fairmont Udaipur",
    description:
      "Everyone's heard stories of an abandoned amusement park — but this is not your regular one. Imagine a lost amusement park but with a dark, surreal, and psychedelic twist. There's no script here — only the thrill of rebellion, the echoes of childhood, and the madness of letting go.",
    longDescription:
      "A neon-drenched afterparty where the only rule is: there are no rules.",
    dressCode: {
      title: "Speed & Sparkle",
      description: "Go fast, go loud, go home glittering.",
      dos: ["Sequins, metallics, neon", "Party-ready — think festival meets fashion", "Platform shoes welcome", "Experimental / avant-garde"],
      donts: ["Traditional / formal", "Muted earth tones", "Anything 'safe'"],
    },
    palette: {
      primary: "#ff006e",
      secondary: "#8338ec",
      accent: "#00f5d4",
      background: "#0a0a0f",
      foreground: "#f0f0f5",
      muted: "#1a1a2e",
      gradientFrom: "#0a0a0f",
      gradientVia: "#1a0a2e",
      gradientTo: "#0f0a1a",
    },
    heroImage: "https://images.unsplash.com/photo-1763634708237-83b58f11b69e?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=80",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&q=80",
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80",
    ],
  },
];

export const FAQ_DATA = [
  {
    question: "What is the dress code?",
    answer: "Each event has a unique dress code reflecting its theme. Check the itinerary or individual chapter pages for specific guidance.",
  },
  {
    question: "Can I bring a plus one?",
    answer: "We'd love to host your plus one! Please indicate their name in the RSVP form so we can make arrangements.",
  },
  {
    question: "What about dietary restrictions?",
    answer: "Absolutely — please mention any dietary requirements in your RSVP. Our culinary team will ensure you're well taken care of.",
  },
  {
    question: "Is there parking available?",
    answer: "Valet parking is available at the venue. Complimentary shuttle service runs between the hotel and event locations.",
  },
  {
    question: "What time should I arrive?",
    answer: "We recommend arriving 15-20 minutes before each event start time. Check the itinerary for specific timings.",
  },
  {
    question: "Will there be transportation between events?",
    answer: "Yes, curated shuttle service and personal pickups will be arranged for all guests. Details will be shared closer to the date.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer: "We have a dedicated photography team capturing every moment. We kindly request an unplugged ceremony — please keep phones away during the wedding rituals. All other events are open for photos!",
  },
  {
    question: "What's the weather like in Udaipur in April?",
    answer: "Udaipur in April is warm (28-36°C / 82-97°F). The lakeside location offers a pleasant breeze. We recommend light, breathable fabrics. All events are either indoors or in climate-controlled outdoor settings.",
  },
];

export const TRAVEL_INFO = {
  airport: "Maharana Pratap Airport, Udaipur (UDR)",
  distance: "Approximately 24 km from the venue",
  pickupNote: "Airport pickups will be arranged for all guests. Please share your flight details via the guest portal.",
  contacts: [
    { name: "Event Coordination", phone: "+91 98XXX XXXXX", role: "Envelop Events" },
    { name: "Travel Desk", phone: "+91 98XXX XXXXX", role: "Guest Logistics" },
    { name: "Hotel Concierge", phone: "+91 98XXX XXXXX", role: "Fairmont Udaipur" },
  ],
};

export const STAY_INFO = {
  hotel: "Fairmont Udaipur",
  checkIn: "19th April, 2026 — 2:00 PM",
  checkOut: "22nd April, 2026 — 12:00 PM",
  amenities: [
    "Complimentary Wi-Fi",
    "Spa & wellness centre",
    "24-hour room service",
    "Swimming pool",
    "Fitness centre",
    "Concierge service",
  ],
  houseRules: [
    "Please carry a valid photo ID for check-in",
    "Rooms are pre-assigned — refer to your guest portal for details",
    "All meals during the wedding events are covered",
    "Mini-bar and laundry are on the guest's account",
  ],
};

export function getEventBySlug(slug: string): WeddingEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

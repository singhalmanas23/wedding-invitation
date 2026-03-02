import { WeddingEvent } from "@/types";

export const COUPLE = {
  partner1: "Tanvi",
  partner2: "Sahil",
  hashtag: "#TanviAndSahil",
  weddingDate: "2026-04-21",
  location: "Jaipur, Rajasthan",
  venue: "The Leela Palace, Jaipur",
  tagline: "Different cities, different journeys — one decision.",
} as const;

export const EVENTS: WeddingEvent[] = [
  {
    slug: "first-chapter",
    chapterNumber: 1,
    title: "The First Chapter",
    subtitle: "From Dusk Till Dawn",
    tagline: "The first page of many.",
    date: "19th April, 2026",
    dateShort: "Apr 19",
    day: "Sunday",
    time: "7:30 PM onwards",
    location: "The Grand Lawn",
    venue: "The Leela Palace, Jaipur",
    description:
      "They grew up in Bombay, studied and travelled across London. He proposed in Turkey. Different cities, different journeys. The First Chapter marks this decision — not as a grand declaration, but as a clear, confident start where two individual paths align into one.",
    longDescription:
      "From Dusk Till Dawn becomes the visual and emotional language of this beginning. As the sun sets over the Aravalli hills, the evening unfolds in warm ambers, deep wines, and candlelit golds. This is not just a welcome dinner — it is the opening scene, the first verse, the moment the story begins to be told aloud. Every detail, from the table settings to the twilight sky, speaks of transition — from separate lives to a shared narrative.",
    dressCode: {
      title: "Black Tie Chronicle",
      description: "Timeless evening elegance. Think rich fabrics, structured silhouettes, and depth.",
      dos: ["Black tie / formal evening wear", "Rich jewel tones", "Velvet, silk, satin", "Statement jewelry"],
      donts: ["Casual / semi-casual", "Bright neons", "Denim or sneakers"],
    },
    palette: {
      primary: "#1a0a2e",
      secondary: "#c9a84c",
      accent: "#e8c97a",
      background: "#0d0615",
      foreground: "#f5efe6",
      muted: "#2a1a3e",
      gradientFrom: "#1a0a2e",
      gradientVia: "#2d1b4e",
      gradientTo: "#0d0615",
    },
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      "https://images.unsplash.com/photo-1470290378698-263fa7ca60ab?w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
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
    venue: "The Leela Palace, Jaipur",
    description:
      "Inspired by the fresco-lined havelis of Rajasthan, this lunch reimagines the traditional courtyard through a contemporary lens. Traditional motifs meet soft stripes and clean silhouettes, creating a space that feels regal yet fresh.",
    longDescription:
      "Step through arched doorways into a courtyard dressed in pastels and heritage. Hand-painted frescoes frame every corner while fine bone china and silver service set the table. This is Rajasthan's royal hospitality reimagined — where meticulous Mughal craft meets modern editorial restraint. The afternoon unfolds slowly: courses of regional delicacies, the soft clink of tea cups, and conversations that drift through the jasmine-scented air.",
    dressCode: {
      title: "Pastel Organza Silhouettes",
      description: "Light, airy, and refined. Let the courtyard be your canvas.",
      dos: ["Pastels — blush, sage, lavender, ivory", "Organza, chiffon, linen", "Floral prints", "Light jewellery"],
      donts: ["Dark heavy fabrics", "Overly embellished", "All black"],
    },
    palette: {
      primary: "#d4a5a5",
      secondary: "#f5e6d3",
      accent: "#c9956b",
      background: "#faf7f2",
      foreground: "#2c1810",
      muted: "#e8ddd4",
      gradientFrom: "#faf7f2",
      gradientVia: "#f5e6d3",
      gradientTo: "#e8ddd4",
    },
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
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
    venue: "The Leela Palace, Jaipur",
    description:
      "Inspired by the raw, wild energy of the venue, this Sangeet is what happens when a cathedral throws a party and no one stops it. Grand arches, dramatic height, clean symmetry — but inside that structure, the wild takes over.",
    longDescription:
      "Architecturally, the space rises like a cathedral: grand arches, dramatic height, clean symmetry. But inside that structure, chaos reigns with intention. Projection-mapped stained glass fractures across the walls. The bass reverberates off stone columns. Dancers emerge from shadow. Welcome to Cathedral Gone Rogue — where sacred geometry meets unfiltered celebration, and every corner pulses with the energy of a night that refuses to end quietly.",
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
    heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
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
    venue: "The Leela Palace, Jaipur",
    description:
      "Bombay was the beginning. Pune was the spark. London was the build. Little Venice was the shift. Cappadocia was the decision. A minimalist setting with subtle details that reflect their journey — as they begin a new one together.",
    longDescription:
      "This is the most personal chapter — an intimate lunch that maps their journey through cities and seasons. Each table represents a city that shaped them: the warmth of Bombay, the charm of Pune, the grey elegance of London, the quiet of Little Venice, the vastness of Cappadocia. The setting is deceptively simple — clean linen, warm sunlight, olive branches, and handwritten notes — but every detail carries weight. This is not décor. This is autobiography.",
    dressCode: {
      title: "The Linen Collective",
      description: "Sun-kissed simplicity. Effortless, natural, warm.",
      dos: ["Linen, cotton, light knits", "Earth tones — sand, olive, terracotta", "Relaxed tailoring", "Minimal accessories"],
      donts: ["Heavy embroidery", "Dark formal wear", "Synthetic fabrics"],
    },
    palette: {
      primary: "#c4a882",
      secondary: "#e8dcc8",
      accent: "#8b7355",
      background: "#f7f3ed",
      foreground: "#2c2416",
      muted: "#e0d5c4",
      gradientFrom: "#f7f3ed",
      gradientVia: "#ede4d4",
      gradientTo: "#e0d5c4",
    },
    heroImage: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&q=80",
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
    venue: "The Leela Palace, Jaipur",
    description:
      "Inspired by two things deeply rooted in Indian weddings: Mughal court architecture and couture craftsmanship. Instead of static décor, the architecture becomes a canvas — heritage interpreted through technology.",
    longDescription:
      "This is the ceremony. The mandap rises like a Mughal archway — not replicated, but reinterpreted through light, projection, and material innovation. Every surface tells a story: hand-carved motifs merge with laser-cut geometries, traditional phool malas are reimagined in scale and structure. The ceremony unfolds inside this architectural installation — each phera echoed by a shift in light, each mantra accompanied by a visual transformation. This is not a wedding set. This is a living, breathing court.",
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
    heroImage: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800&q=80",
      "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=800&q=80",
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&q=80",
      "https://images.unsplash.com/photo-1609151376730-f246fea07beb?w=800&q=80",
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
    venue: "The Leela Palace, Jaipur",
    description:
      "Everyone's heard stories of an abandoned amusement park — but this is not your regular one. Imagine a lost amusement park but with a dark, surreal, and psychedelic twist. There's no script here — only the thrill of rebellion, the echoes of childhood, and the madness of letting go.",
    longDescription:
      "Step inside and forget everything you know about afterparties. The space has been transformed into a surreal, neon-drenched carnival of the mind — where Ferris wheels spin in projection, funhouse mirrors distort reality, and the bass drops somewhere between childhood nostalgia and pure chaos. This is not an event. This is an experience. A place where time loses meaning, where the dance floor is both sanctuary and storm, and where the only rule is: there are no rules. Welcome to The Thrill Theory.",
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
    heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
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
    question: "What's the weather like in Jaipur in April?",
    answer: "Jaipur in April is warm (30-38°C / 86-100°F). We recommend light, breathable fabrics. All events are either indoors or in climate-controlled outdoor settings.",
  },
];

export const TRAVEL_INFO = {
  airport: "Jaipur International Airport (JAI)",
  distance: "Approximately 25 km from the venue",
  pickupNote: "Airport pickups will be arranged for all guests. Please share your flight details via the guest portal.",
  contacts: [
    { name: "Event Coordination", phone: "+91 98XXX XXXXX", role: "Envelop Events" },
    { name: "Travel Desk", phone: "+91 98XXX XXXXX", role: "Guest Logistics" },
    { name: "Hotel Concierge", phone: "+91 98XXX XXXXX", role: "The Leela Palace" },
  ],
};

export const STAY_INFO = {
  hotel: "The Leela Palace, Jaipur",
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

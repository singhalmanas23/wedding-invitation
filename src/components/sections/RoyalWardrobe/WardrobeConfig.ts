import { EVENTS } from "@/content/events";

export const W = {
  // Generated Unique Looks
  pp_w_gown: "/images/wardrobe/pp_w_gown_1773084493489.png",
  pp_w_saree: "/images/wardrobe/pp_w_saree_1773084514664.png",
  pp_w_lehenga: "/images/wardrobe/pp_w_lehenga_1773084537263.png",
  pp_m_jacket: "/images/wardrobe/pp_m_jacket_1773084558959.png",
  pp_m_sherwani: "/images/wardrobe/pp_m_sherwani_1773084582230.png",

  menPastelBandi: "/images/wardrobe/men_pastel_floral_bandi_1772910138126.png",
  womenOrganzaSaree: "/images/wardrobe/women_floral_organza_saree_1772910158815.png",
  menAsymmetricAchkan: "/images/wardrobe/men_asymmetric_achkan_fusion_1772910174992.png",
  womenMetallicFusion: "/images/wardrobe/women_concept_saree_metallic_corset_fusion_1772910192380.png",
  menSherwani: "/images/wardrobe/men_royal_sherwani_maroon_gold_1772910208836.png",
  womenLehenga: "/images/wardrobe/women_heritage_red_lehanga_gold_1772910224600.png",
  // Single campaign image per chapter (no separate men/women)
  prePartyCampaign: "https://res.cloudinary.com/dctn3ike2/image/upload/v1773095170/Gemini_Generated_Image_fy20sxfy20sxfy20_gra8by.png",
  courtyardEditCampaign: "https://res.cloudinary.com/dctn3ike2/image/upload/v1773076606/Gemini_Generated_Image_k9el2ek9el2ek9el_lsblyv.png",
  midnightCathedralCampaign: "https://res.cloudinary.com/dctn3ike2/image/upload/v1773076578/Gemini_Generated_Image_hst5mphst5mphst5_qprb5w.png",
  worldOfOurOwnCampaign: "https://res.cloudinary.com/dctn3ike2/image/upload/v1773076589/Gemini_Generated_Image_wp4zihwp4zihwp4z_gn7oyt.png",
  royalCourtCampaign: "https://res.cloudinary.com/dctn3ike2/image/upload/v1773076592/Gemini_Generated_Image_n2zpfcn2zpfcn2zp_t4u7zb.png",
  thrillTheoryCampaign: "https://res.cloudinary.com/dctn3ike2/image/upload/v1773076588/Gemini_Generated_Image_a7enbca7enbca7en_lyjtou.png",
  coutureHim: "/images/wardrobe/couture_him.png",
  coutureHer: "/images/wardrobe/couture_her.png",
  // Illustrations (use same asset when we only have one image for the chapter)
  prePartyIllustration: "/images/wardrobe/illustrations/pre-party.png",
  courtyardIllustration: "/images/wardrobe/illustrations/courtyard-edit.png",
  midnightIllustration: "/images/wardrobe/illustrations/midnight-cathedral.png",
  worldIllustration: "/images/wardrobe/illustrations/world-of-our-own.png",
  royalIllustration: "/images/wardrobe/illustrations/royal-ceremony.png",
  thrillIllustration: "/images/wardrobe/illustrations/thrill-theory.png",
  haldiIllustration: "/images/wardrobe/illustrations/haldi.png",
} as const;

export const WARDROBE_CHAPTER_IDS = EVENTS.map((e) => e.slug);

/* ─── Interfaces ────────────────────────────────────────────────────── */

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface Look {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ChapterWardrobe {
  id: string;
  title: string;
  moodLine: string;
  dressCode: {
    title: string;
    description: string;
  };
  mood: string;
  men: Look[];
  women: Look[];
  campaignImage: string;
  illustrationImage: string;
  palette: {
    primary: string;
    accents: string[];
    recommended: ColorSwatch[];
    avoid: string[];
  };
  silhouettes: string[];
  fabrics: string[];
  accessories: { men: string[]; women: string[] };
  footwear: { men: string[]; women: string[] };
  etiquetteNote: string;
  animationPreset: "fade" | "slide" | "elegant";
}

/* ─── Chapter Data ──────────────────────────────────────────────────── */

export const wardrobeConfig: Record<string, ChapterWardrobe> = {

  "pre-party": {
    id: "pre-party",
    title: "The Pre-Party",
    moodLine: "An evening of palatial grandeur where opulence speaks in whispers.",
    dressCode: {
      title: "The Noor Mahal Chronicle",
      description: "Cinematic black-tie glamour against palatial architecture, cascading florals, and antique gold light. Dress to be remembered under chandeliers.",
    },
    mood: "Formal, cinematic evening",
    men: [
      { id: "pp-m-1", name: "Velvet Dinner Jacket", description: "Rich velvet in deep jewel tones with silk lapels and antique buttons.", image: W.pp_m_jacket, tags: ["Formal", "Evening"] },
      { id: "pp-m-2", name: "Embroidered Sherwani", description: "Antique gold zardosi threadwork on midnight fabric.", image: W.pp_m_sherwani, tags: ["Royal", "Heritage"] },
      { id: "pp-m-3", name: "Black-Tie Bandhgala", description: "Structured Indian elegance with satin lapels.", image: "https://images.unsplash.com/photo-1617130863154-8250122e8f5a?w=800&q=80", tags: ["Bandhgala", "Luxe"] },
    ],
    women: [
      { id: "pp-w-1", name: "Couture Evening Gown", description: "Satin column gown in maroon or antique gold with architectural draping.", image: W.pp_w_gown, tags: ["Evening", "Couture"] },
      { id: "pp-w-2", name: "Designer Silk Saree", description: "Silk saree with statement blouse and single piece of fine jewellery.", image: W.pp_w_saree, tags: ["Saree", "Formal"] },
      { id: "pp-w-3", name: "Embellished Lehanga", description: "Champagne and gold with restrained embroidery, no heavy dupatta.", image: W.pp_w_lehenga, tags: ["Lehanga", "Elegant"] },
    ],
    campaignImage: W.prePartyCampaign,
    illustrationImage: W.prePartyIllustration,
    palette: {
      primary: "#1a0a0a",
      accents: ["#c9a84c", "#d4af37"],
      recommended: [
        { name: "Onyx Black", hex: "#1c1c1c" },
        { name: "Antique Gold", hex: "#d4af37" },
        { name: "Deep Burgundy", hex: "#6b1a2a" },
        { name: "Champagne Ivory", hex: "#f5efe6" },
        { name: "Midnight Navy", hex: "#0c1445" },
      ],
      avoid: ["Neon", "Bright prints", "Pastels"],
    },
    silhouettes: ["Sherwani", "Lehenga", "Floor-Length Saree"],
    fabrics: ["Velvet", "Silk Taffeta", "Brocade", "Satin Crepe"],
    accessories: {
      men: ["Silk bow tie or cravat", "Heritage cufflinks", "Silk pocket square", "Lapel brooch"],
      women: ["Chandelier earrings", "Embellished minaudière", "Minimal choker or pendant", "Cocktail ring"],
    },
    footwear: {
      men: ["Patent leather Oxfords", "Polished velvet mojaris"],
      women: ["Metallic or embellished stilettos", "Satin heels with ankle strap"],
    },
    etiquetteNote: "This is the inaugural soirée. Arrive dressed as though the palace itself has expectations — first impressions at a Noor Mahal evening are meant to linger.",
    animationPreset: "elegant",
  },

  "courtyard-edit": {
    id: "courtyard-edit",
    title: "The Courtyard Edit",
    moodLine: "A sun-dappled afternoon steeped in haveli grace and garden refinement.",
    dressCode: {
      title: "Pastel Portico",
      description: "An afternoon of courtyard elegance inspired by Rajasthani frescoes, fine china, and afternoon tea beneath arched colonnades.",
    },
    mood: "Royal haveli high-tea",
    men: [],
    women: [],
    campaignImage: W.courtyardEditCampaign,
    illustrationImage: W.courtyardIllustration,
    palette: {
      primary: "#f5efe6",
      accents: ["#d4a060", "#b4d3b2"],
      recommended: [
        { name: "Blush Pink", hex: "#e8b4b8" },
        { name: "Sage Green", hex: "#a8c5a0" },
        { name: "Lavender", hex: "#c5b3d9" },
        { name: "Soft Peach", hex: "#f5c6a0" },
        { name: "Powder Blue", hex: "#b3d4e8" },
      ],
      avoid: ["Black", "Deep maroon", "Navy", "Heavy metallics"],
    },
    silhouettes: ["Bandhgala", "Organza Saree", "Pastel Lehanga", "Anarkali"],
    fabrics: ["Organza", "Chiffon", "Mulmul", "Light Linen"],
    accessories: {
      men: ["Printed pocket square", "Clean-frame sunglasses", "Light wristwatch"],
      women: ["Floral jewellery or polki set", "Pastel potli bag", "Delicate bangles or cuffs"],
    },
    footwear: {
      men: ["Tan leather loafers", "Kolhapuri chappals", "Suede mules"],
      women: ["Block heels in pastel tones", "Embroidered juttis", "Strappy flats"],
    },
    etiquetteNote: "This is a daytime garden affair beneath courtyard arches. Let your outfit breathe with the breeze — pastels and light fabrics honour the haveli setting.",
    animationPreset: "fade",
  },

  "midnight-cathedral": {
    id: "midnight-cathedral",
    title: "The Midnight Cathedral",
    moodLine: "Cathedral arches meet reckless glamour — dress for the night that never ends.",
    dressCode: {
      title: "Gilded After Dark",
      description: "The Sangeet demands drama. Cathedral-scale grandeur meets uninhibited celebration — shimmer, depth, and bold luxury under arched ceilings.",
    },
    mood: "Drama, shimmer, bold luxury",
    men: [
      { id: "mc-m-1", name: "Black Zardosi Sherwani", description: "Gold floral zardosi on midnight — high collar, commanding presence.", image: W.midnightCathedralCampaign, tags: ["Sherwani", "Embroidered"] },
      { id: "mc-m-2", name: "Velvet Metallic Achkan", description: "Dark velvet base with gold embroidery and structural shoulders.", image: W.midnightCathedralCampaign, tags: ["Velvet", "Bold"] },
      { id: "mc-m-3", name: "Gold Statement Jacket", description: "Metallic gold blazer with antique buttons — unapologetic glamour.", image: W.midnightCathedralCampaign, tags: ["Metallic", "Statement"] },
    ],
    women: [
      { id: "mc-w-1", name: "Sculpted Gold Gown", description: "Off-shoulder metallic gold with architectural draping and train.", image: W.midnightCathedralCampaign, tags: ["Metallic", "Glamour"] },
      { id: "mc-w-2", name: "Sequined Lehanga", description: "Full-volume sequined skirt with corset blouse in bronze.", image: W.midnightCathedralCampaign, tags: ["Sequin", "Bold"] },
      { id: "mc-w-3", name: "Emerald Shimmer Drape", description: "Deep emerald saree gown with crystal embellishment — opulent.", image: W.midnightCathedralCampaign, tags: ["Shimmer", "Evening"] },
    ],
    campaignImage: W.midnightCathedralCampaign,
    illustrationImage: W.midnightIllustration,
    palette: {
      primary: "#1a3a2a",
      accents: ["#c9a84c", "#d4af37"],
      recommended: [
        { name: "Burnished Gold", hex: "#c9a84c" },
        { name: "Deep Emerald", hex: "#1a5e3a" },
        { name: "Midnight Black", hex: "#0a0a0a" },
        { name: "Dark Burgundy", hex: "#5c0a1a" },
        { name: "Antique Bronze", hex: "#8b6914" },
      ],
      avoid: ["Pastels", "Cotton casuals", "White or ivory"],
    },
    silhouettes: ["Sculpted Sherwani", "Corset Lehanga", "Column Gown"],
    fabrics: ["Velvet", "Metallic Silk", "Brocade", "Sequin Tulle"],
    accessories: {
      men: ["Statement lapel brooch", "Safa or turban (optional)", "Metallic pocket square", "Cufflinks"],
      women: ["Kundan or diamond choker", "Statement cocktail rings", "Metallic box clutch", "Dramatic earrings"],
    },
    footwear: {
      men: ["Velvet mojaris with gold embroidery", "Patent leather boots"],
      women: ["Crystal-embellished stilettos", "Metallic strappy sandals"],
    },
    etiquetteNote: "This is the Sangeet — the night of music, dance, and unrestrained celebration. Embrace shimmer and drama without apology. Conservative restraint can rest tonight.",
    animationPreset: "elegant",
  },

  "world-of-our-own": {
    id: "world-of-our-own",
    title: "A World of Our Own",
    moodLine: "Sun-kissed ease where every city they've called home meets in one golden afternoon.",
    dressCode: {
      title: "The Linen Collective",
      description: "An intimate lakeside lunch mapping their journey — Mumbai, Pune, London — in natural fabrics, warm neutrals, and the art of effortless refinement.",
    },
    mood: "Relaxed luxury travel",
    men: [
      { id: "woo-m-1", name: "Linen Blazer", description: "Cream or sand double-breasted, open collar, lakeside-ready.", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80", tags: ["Linen", "Relaxed"] },
      { id: "woo-m-2", name: "Tailored Earth Tones", description: "Tan trousers with olive shirt — refined ease.", image: "https://images.unsplash.com/photo-1488161628813-244a2ceba24b?w=800&q=80", tags: ["Resort", "Minimal"] },
      { id: "woo-m-3", name: "Neutral Suit", description: "Soft structure in warm neutrals, sun-ready.", image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&q=80", tags: ["Neutral", "Smart Casual"] },
    ],
    women: [
      { id: "woo-w-1", name: "Embroidered Co-ords", description: "Sleeveless vest with wide-leg trousers in raw silk.", image: "https://images.unsplash.com/photo-1583391733956-6c70273b586e?w=800&q=80", tags: ["Linen", "Resort"] },
      { id: "woo-w-2", name: "Draped Kaftan", description: "Champagne or beige with elegant layering — effortless.", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", tags: ["Kaftan", "Light"] },
      { id: "woo-w-3", name: "Resort Midi Dress", description: "Terracotta linen with gold accessories — warm and easy.", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", tags: ["Resort", "Minimal"] },
    ],
    campaignImage: W.worldOfOurOwnCampaign,
    illustrationImage: W.worldIllustration,
    palette: {
      primary: "#faf6ee",
      accents: ["#d4a017", "#e8c872"],
      recommended: [
        { name: "Warm Sand", hex: "#d4b896" },
        { name: "Olive", hex: "#6b7a4f" },
        { name: "Terracotta", hex: "#c67a4f" },
        { name: "Warm Cream", hex: "#f5efe6" },
        { name: "Dusty Rose", hex: "#c9958a" },
      ],
      avoid: ["Heavy metallics", "Sequins", "Dark formalwear"],
    },
    silhouettes: ["Linen Suit", "Midi Dress", "Kaftan", "Co-ord Set"],
    fabrics: ["Linen", "Cotton Voile", "Light Knit", "Raw Silk"],
    accessories: {
      men: ["Leather-strap watch", "Aviator sunglasses", "Linen pocket square"],
      women: ["Layered gold chains", "Woven bracelet stack", "Straw or raffia clutch"],
    },
    footwear: {
      men: ["Tan leather loafers", "Espadrilles", "Clean leather sandals"],
      women: ["Block-heel sandals", "Woven flats", "Leather espadrilles"],
    },
    etiquetteNote: "An intimate lakeside afternoon — dress for sunlit ease. The setting is warm and open; let comfort guide your elegance. No one has ever been underdressed in linen by the water.",
    animationPreset: "fade",
  },

  "royal-court": {
    id: "royal-court",
    title: "The Royal Court",
    moodLine: "Where Mughal splendour meets living craft — dress as though the court awaits you.",
    dressCode: {
      title: "Heritage in Every Thread",
      description: "The wedding ceremony — the most sacred chapter. Mughal court architecture, couture craftsmanship, and heritage textiles converge beneath the Durbar Hall.",
    },
    mood: "Grand Indian heritage",
    men: [
      { id: "rc-m-1", name: "Ceremonial Sherwani", description: "Gold and cream mirror-work sherwani with churidar and mojaris.", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80", tags: ["Sherwani", "Traditional"] },
      { id: "rc-m-2", name: "Heritage Bandhgala", description: "Raw silk bandhgala with antique gold buttons — understated grandeur.", image: "https://images.unsplash.com/photo-1617130863154-8250122e8f5a?w=800&q=80", tags: ["Bandhgala", "Heritage"] },
      { id: "rc-m-3", name: "Embroidered Achkan", description: "Full traditional with safa — court-worthy elegance.", image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&q=80", tags: ["Achkan", "Mojaris"] },
    ],
    women: [
      { id: "rc-w-1", name: "Grand Lehanga", description: "Heavy mirror-work lehanga, choli, and mockup with kundan set.", image: "https://images.unsplash.com/photo-1583391733956-6c70273b586e?w=800&q=80", tags: ["Lehanga", "Bridal"] },
      { id: "rc-w-2", name: "Banarasi Saree", description: "Heritage Banarasi in gold or maroon with maang tikka.", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80", tags: ["Banarasi", "Heritage"] },
      { id: "rc-w-3", name: "Couture Anarkali", description: "Royal silhouette, full grandeur, ceremonial jewellery.", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80", tags: ["Anarkali", "Couture"] },
    ],
    campaignImage: W.royalCourtCampaign,
    illustrationImage: W.royalIllustration,
    palette: {
      primary: "#8b1a1a",
      accents: ["#d4af37", "#c9956b"],
      recommended: [
        { name: "Deep Maroon", hex: "#7a1a1a" },
        { name: "Royal Gold", hex: "#d4af37" },
        { name: "Ivory", hex: "#f5efe6" },
        { name: "Vermillion", hex: "#e23d28" },
        { name: "Wine", hex: "#5c1a2a" },
      ],
      avoid: ["Western cuts", "Casual tones", "Linen", "Black"],
    },
    silhouettes: ["Sherwani", "Grand Lehanga", "Anarkali", "Bandhgala"],
    fabrics: ["Banarasi Silk", "Velvet", "Kanjeevaram", "Raw Silk"],
    accessories: {
      men: ["Safa or turban with brooch", "Kundan buttons", "Heritage cufflinks", "Silk stole"],
      women: ["Kundan necklace set", "Maang tikka", "Statement bangles", "Embroidered dupatta"],
    },
    footwear: {
      men: ["Embroidered mojaris", "Gold-threaded juttis"],
      women: ["Embellished wedge heels", "Traditional juttis with mirror-work"],
    },
    etiquetteNote: "This is the wedding ceremony — the most sacred chapter. Modest, regal attire is essential. Please honour the rituals with covered shoulders, traditional grace, and an open heart.",
    animationPreset: "elegant",
  },

  "thrill-theory": {
    id: "thrill-theory",
    title: "The Thrill Theory",
    moodLine: "Press play on the chaos — rules dissolve under strobes and sequins.",
    dressCode: {
      title: "Neon Genesis",
      description: "A neon-drenched afterparty inside a surreal amusement park. The only dress code is daring. Sequins, metallic, experimental — wear what future-you would photograph.",
    },
    mood: "Experimental, nightclub energy",
    men: [
      { id: "tt-m-1", name: "Sequin Statement Jacket", description: "Two-tone silver-and-black sequin blazer with pearl chain.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", tags: ["Sequin", "Party"] },
      { id: "tt-m-2", name: "Metallic Street Luxe", description: "Chrome-finish shirt, layered chains, experimental edge.", image: "https://images.unsplash.com/photo-1523381235312-ca999d162310?w=800&q=80", tags: ["Metallic", "Bold"] },
      { id: "tt-m-3", name: "Avant-Garde Suit", description: "Unconventional texture, deconstructed fit — nightclub-ready.", image: "https://images.unsplash.com/photo-1539106602014-d69c4b2744e0?w=800&q=80", tags: ["Fashion", "Experimental"] },
    ],
    women: [
      { id: "tt-w-1", name: "Sequined Mini-Dress", description: "Oversized sequin shirt as mini-dress, metallic knee-highs.", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80", tags: ["Glitter", "Party"] },
      { id: "tt-w-2", name: "Metallic Co-ords", description: "Chrome or gold co-ord set with platform boots.", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", tags: ["Fringe", "Bold"] },
      { id: "tt-w-3", name: "Futuristic Sculptural", description: "Asymmetric cut, neon accent, experimental glamour.", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80", tags: ["Futuristic", "Avant-Garde"] },
    ],
    campaignImage: W.thrillTheoryCampaign,
    illustrationImage: W.thrillIllustration,
    palette: {
      primary: "#ff006e",
      accents: ["#8338ec", "#00f5d4"],
      recommended: [
        { name: "Electric Pink", hex: "#ff006e" },
        { name: "Ultraviolet", hex: "#8338ec" },
        { name: "Neon Mint", hex: "#00f5d4" },
        { name: "Chrome Silver", hex: "#c0c0c0" },
        { name: "Void Black", hex: "#0a0a0f" },
      ],
      avoid: ["Traditional ethnic", "Earth tones", "Conservative cuts"],
    },
    silhouettes: ["Sequin Blazer", "Mini-Dress", "Deconstructed Suit"],
    fabrics: ["Sequin", "Metallic Mesh", "Vinyl", "Neoprene"],
    accessories: {
      men: ["Layered chains", "Statement rings", "Metallic sunglasses", "Ear cuffs"],
      women: ["Dramatic drop earrings", "Metallic clutch", "Layered chains", "Body chain"],
    },
    footwear: {
      men: ["Black combat boots", "Platform sneakers", "High-top metallics"],
      women: ["Metallic knee-high boots", "Platform heels", "Chrome combat boots"],
    },
    etiquetteNote: "There is no dress code — only the dare to be unforgettable. This is the afterparty. Wear what future-you would photograph and past-you would never have attempted.",
    animationPreset: "slide",
  },
};

export const DEFAULT_CHAPTER = WARDROBE_CHAPTER_IDS[0] ?? "pre-party";

/* ─── Chapter Visual Themes ─────────────────────────────────────────── */

export interface ChapterTheme {
  accent: string;
  accentGlow: string;
  accentRgb: string;
  bgOverlay: string;
  moodLabel: string;
  ornamentOpacity: number;
  cardGlow: string;
  separatorColor: string;
}

export const CHAPTER_THEMES: Record<string, ChapterTheme> = {
  "pre-party": {
    accent: "#d4af37",
    accentGlow: "rgba(212,175,55,0.12)",
    accentRgb: "212,175,55",
    bgOverlay: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(139,26,26,0.10), transparent 60%)",
    moodLabel: "Black-Tie Soirée",
    ornamentOpacity: 0.08,
    cardGlow: "rgba(212,175,55,0.08)",
    separatorColor: "rgba(212,175,55,0.18)",
  },
  "courtyard-edit": {
    accent: "#d4a060",
    accentGlow: "rgba(212,160,96,0.10)",
    accentRgb: "212,160,96",
    bgOverlay: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(228,180,184,0.08), transparent 60%)",
    moodLabel: "Pastel Elegance",
    ornamentOpacity: 0.06,
    cardGlow: "rgba(212,160,96,0.06)",
    separatorColor: "rgba(212,160,96,0.15)",
  },
  "midnight-cathedral": {
    accent: "#c9a84c",
    accentGlow: "rgba(201,168,76,0.14)",
    accentRgb: "201,168,76",
    bgOverlay: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(26,58,42,0.12), transparent 60%)",
    moodLabel: "Gilded Drama",
    ornamentOpacity: 0.10,
    cardGlow: "rgba(201,168,76,0.10)",
    separatorColor: "rgba(201,168,76,0.20)",
  },
  "world-of-our-own": {
    accent: "#d4a017",
    accentGlow: "rgba(212,160,23,0.08)",
    accentRgb: "212,160,23",
    bgOverlay: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(184,134,11,0.06), transparent 60%)",
    moodLabel: "Sun-Drenched Ease",
    ornamentOpacity: 0.05,
    cardGlow: "rgba(212,160,23,0.06)",
    separatorColor: "rgba(212,160,23,0.12)",
  },
  "royal-court": {
    accent: "#d4af37",
    accentGlow: "rgba(212,175,55,0.16)",
    accentRgb: "212,175,55",
    bgOverlay: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(139,26,26,0.14), transparent 60%)",
    moodLabel: "Royal Heritage",
    ornamentOpacity: 0.12,
    cardGlow: "rgba(212,175,55,0.12)",
    separatorColor: "rgba(212,175,55,0.22)",
  },
  "thrill-theory": {
    accent: "#ff006e",
    accentGlow: "rgba(255,0,110,0.10)",
    accentRgb: "255,0,110",
    bgOverlay: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(131,56,236,0.10), transparent 60%)",
    moodLabel: "Neon Rebellion",
    ornamentOpacity: 0.07,
    cardGlow: "rgba(255,0,110,0.08)",
    separatorColor: "rgba(255,0,110,0.15)",
  },
};

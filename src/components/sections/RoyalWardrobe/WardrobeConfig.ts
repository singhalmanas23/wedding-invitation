import { EVENTS } from "@/content/events";

/** Local wardrobe images — Indian wedding attire that guests can wear for each chapter. */
const W = {
  menPastelBandi: "/images/wardrobe/men_pastel_floral_bandi_1772910138126.png",
  womenOrganzaSaree: "/images/wardrobe/women_floral_organza_saree_1772910158815.png",
  menAsymmetricAchkan: "/images/wardrobe/men_asymmetric_achkan_fusion_1772910174992.png",
  womenMetallicFusion: "/images/wardrobe/women_concept_saree_metallic_corset_fusion_1772910192380.png",
  menSherwani: "/images/wardrobe/men_royal_sherwani_maroon_gold_1772910208836.png",
  womenLehenga: "/images/wardrobe/women_heritage_red_lehanga_gold_1772910224600.png",
  /** The Pre-Party — man in blazer/suit (men), model in elegant saree (women). */
  prePartyMen: "https://images.unsplash.com/photo-1700940994953-45a022ccd8bf?w=800&q=80",
  prePartyWomen: "https://images.unsplash.com/photo-1756483510803-eb23dedd21ab?w=800&q=80",
  /** The Courtyard Edit — pastel floral suits (men), ornate lehengas in garden setting (women). */
  courtyardEditMen: "/images/wardrobe/courtyard_edit_men.png",
  courtyardEditWomen: "/images/wardrobe/courtyard_edit_women.png",
  /** The Midnight Cathedral — black embroidered sherwani (men), gold metallic gown (women). */
  midnightCathedralMen: "/images/wardrobe/midnight_cathedral_men.png",
  midnightCathedralWomen: "/images/wardrobe/midnight_cathedral_women.png",
  /** A World of Our Own — linen / relaxed (men: cream blazer; women: embellished vest & trousers). */
  worldOfOurOwnMen: "/images/wardrobe/world_of_our_own_men.png",
  worldOfOurOwnWomen: "/images/wardrobe/world_of_our_own_women.png",
  /** The Royal Court — royal culture (gold/cream mirror-work kurtas and lehengas, ceremonial). */
  royalCourtMen: "/images/wardrobe/royal_court_men.png",
  royalCourtWomen: "/images/wardrobe/royal_court_women.png",
  /** The Thrill Theory — sequin jacket (men), silver sequin dress & boots (women). */
  thrillTheoryMen: "/images/wardrobe/thrill_theory_men.png",
  thrillTheoryWomen: "/images/wardrobe/thrill_theory_women.png",
} as const;

/** All chapter slugs from events — wardrobe planner shows one section per chapter. */
export const WARDROBE_CHAPTER_IDS = EVENTS.map((e) => e.slug);

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
    dressCode: {
        title: string;
        description: string;
        dos: string[];
        donts: string[];
    };
    mood: string;
    men: Look[];
    women: Look[];
    realisticImages: {
        men: string;
        women: string;
    };
    palette: {
        primary: string;
        accents: string[];
        bestColors: string[];
        avoidColors: string[];
    };
    silhouettes: string[];
    fabrics: string[];
    accessories: string[];
    animationPreset: "fade" | "slide" | "elegant";
}

export const wardrobeConfig: Record<string, ChapterWardrobe> = {
    "pre-party": {
        id: "pre-party",
        title: "The Pre-Party",
        dressCode: {
            title: "Black Tie Chronicle",
            description: "Formal, cinematic evening style.",
            dos: [
                "Men: Black tuxedo, velvet dinner jacket, classic bow tie, white dress shirt, patent leather shoes",
                "Women: Black evening gowns, satin / silk dresses, off-shoulder or elegant column gowns, minimal luxury jewelry, metallic heels or stilettos",
            ],
            donts: [
                "Casual suits",
                "Printed shirts",
                "Sneakers",
                "Denim",
                "Bright neon colors",
                "Daytime fabrics (linen, cotton casual)",
            ],
        },
        mood: "Formal, cinematic evening",
        men: [
            { id: "pp-m-1", name: "Velvet Dinner Jacket / Bandhgala", description: "Rich velvet or brocade jacket for the soirée.", image: W.prePartyMen, tags: ["Formal", "Evening"] },
            { id: "pp-m-2", name: "Formal Sherwani", description: "Embellished sherwani or bandhgala, jewel tones.", image: W.prePartyMen, tags: ["Royal", "Evening"] },
            { id: "pp-m-3", name: "Statement Jacket", description: "Black tie or Indian formal with bow tie / pocket square.", image: W.prePartyMen, tags: ["Velvet", "Luxury"] },
        ],
        women: [
            { id: "pp-w-1", name: "Evening Lehanga / Gown", description: "Satin or silk, maroon, gold, emerald, or blush.", image: W.prePartyWomen, tags: ["Evening", "Elegant"] },
            { id: "pp-w-2", name: "Statement Saree or Gown", description: "Off-shoulder or column, minimal luxury jewelry.", image: W.prePartyWomen, tags: ["Satin", "Formal"] },
            { id: "pp-w-3", name: "Metallic Accents", description: "Metallic heels, statement jewellery.", image: W.prePartyWomen, tags: ["Luxury", "Formal"] },
        ],
        realisticImages: {
            men: W.prePartyMen,
            women: W.prePartyWomen,
        },
        palette: { primary: "#1a0a0a", accents: ["#c9a84c", "#d4af37"], bestColors: ["Black", "Ivory", "Gold"], avoidColors: ["Neon", "Denim", "Casual"] },
        silhouettes: ["Tuxedo", "Column Gown", "Floor-Length"],
        fabrics: ["Wool", "Velvet", "Satin", "Silk"],
        accessories: ["Bow Tie", "Patent Leather", "Minimal Jewelry", "Metallic Heels"],
        animationPreset: "elegant",
    },
    "courtyard-edit": {
        id: "courtyard-edit",
        title: "The Courtyard Edit",
        dressCode: {
            title: "Pastel Organza Silhouettes",
            description: "Royal haveli high-tea vibe.",
            dos: [
                "Men: Pastel bandhgalas, linen kurta sets, soft pastel sherwanis, tailored pastel suits",
                "Women: Organza sarees, pastel lehengas, floral gowns, light embroidery outfits",
            ],
            donts: [
                "Dark heavy colors (black, maroon, navy)",
                "Heavy bridal embroidery",
                "Leather outfits",
                "Sequined party gowns",
                "All-black outfits",
            ],
        },
        mood: "Royal haveli high-tea",
        men: [
            { id: "ce-m-1", name: "Pastel Floral Suit", description: "Mint, periwinkle or peach band-collar jacket with floral embroidery.", image: W.courtyardEditMen, tags: ["Pastel", "Royal"] },
            { id: "ce-m-2", name: "Linen Kurta Set", description: "Light pastel kurta with tailored trousers.", image: W.courtyardEditMen, tags: ["Linen", "Relaxed"] },
            { id: "ce-m-3", name: "Tailored Pastel Bandhgala", description: "Blush, sage, or powder blue with light embroidery.", image: W.courtyardEditMen, tags: ["Pastel", "Tailored"] },
        ],
        women: [
            { id: "ce-w-1", name: "Organza Saree / Lehanga", description: "Hand-painted floral organza, lavender or mint with light embroidery.", image: W.courtyardEditWomen, tags: ["Organza", "Pastel"] },
            { id: "ce-w-2", name: "Pastel Lehanga", description: "Strapless corset and flowing skirt in garden tones.", image: W.courtyardEditWomen, tags: ["Lehanga", "Floral"] },
            { id: "ce-w-3", name: "Floral Gown", description: "Ethereal floral lehengas and dupatta in courtyard style.", image: W.courtyardEditWomen, tags: ["Floral", "Ethereal"] },
        ],
        realisticImages: {
            men: W.courtyardEditMen,
            women: W.courtyardEditWomen,
        },
        palette: { primary: "#f5efe6", accents: ["#d4a060", "#b4d3b2"], bestColors: ["Blush", "Sage", "Lavender", "Peach"], avoidColors: ["Black", "Maroon", "Navy"] },
        silhouettes: ["Bandhgala", "Organza Saree", "Pastel Lehanga"],
        fabrics: ["Organza", "Chiffon", "Linen", "Mulmul"],
        accessories: ["Potli Bags", "Floral Jewelry", "Pocket Squares"],
        animationPreset: "fade",
    },
    "midnight-cathedral": {
        id: "midnight-cathedral",
        title: "The Midnight Cathedral",
        dressCode: {
            title: "Gilded After Dark",
            description: "Drama, shimmer, bold luxury.",
            dos: [
                "Men: Black embroidered sherwanis, velvet bandhgalas, gold or metallic jackets, statement brooches",
                "Women: Metallic gowns, sequined lehengas, dark emerald outfits, gold / bronze shimmer dresses",
            ],
            donts: [
                "Plain cotton outfits",
                "Casual kurta pajama",
                "Pastel outfits",
                "Daytime florals",
                "Flat sandals or slippers",
            ],
        },
        mood: "Drama, shimmer, bold luxury",
        men: [
            { id: "mc-m-1", name: "Black Embroidered Sherwani", description: "Black jacket with gold floral zardosi, high collar.", image: W.midnightCathedralMen, tags: ["Sherwani", "Embroidered"] },
            { id: "mc-m-2", name: "Velvet / Metallic Achkan", description: "Dark base with gold or metallic embroidery.", image: W.midnightCathedralMen, tags: ["Velvet", "Bold"] },
            { id: "mc-m-3", name: "Gold Metallic Jacket", description: "Statement brooches, shimmer, dramatic silhouette.", image: W.midnightCathedralMen, tags: ["Metallic", "Statement"] },
        ],
        women: [
            { id: "mc-w-1", name: "Gold Metallic Gown", description: "Off-shoulder metallic gold, sculptural draping.", image: W.midnightCathedralWomen, tags: ["Metallic", "Glamour"] },
            { id: "mc-w-2", name: "Sequined / Shimmer Dress", description: "Lustrous gold, full skirt, statement jewellery.", image: W.midnightCathedralWomen, tags: ["Sequin", "Bold"] },
            { id: "mc-w-3", name: "Gilded Evening Look", description: "Opulent metallic, red-carpet ready.", image: W.midnightCathedralWomen, tags: ["Shimmer", "Evening"] },
        ],
        realisticImages: {
            men: W.midnightCathedralMen,
            women: W.midnightCathedralWomen,
        },
        palette: { primary: "#1a3a2a", accents: ["#c9a84c", "#d4af37"], bestColors: ["Gold", "Emerald", "Burgundy", "Bronze"], avoidColors: ["Pastel", "Cotton", "Flat Sandals"] },
        silhouettes: ["Sherwani", "Velvet Bandhgala", "Sequined Lehanga"],
        fabrics: ["Velvet", "Metallic Silk", "Brocade", "Sequin"],
        accessories: ["Statement Brooches", "Chokers", "Heels"],
        animationPreset: "elegant",
    },
    "world-of-our-own": {
        id: "world-of-our-own",
        title: "A World of Our Own",
        dressCode: {
            title: "The Linen Collective",
            description: "Relaxed luxury travel vibe.",
            dos: [
                "Men: Linen suits, linen shirts with trousers, neutral tone jackets, loafers / espadrilles",
                "Women: Linen dresses, resort wear, light kaftans, minimal jewelry",
            ],
            donts: [
                "Heavy ethnic wear",
                "Sequined outfits",
                "Tuxedos",
                "Dark heavy fabrics",
                "Over-styled bridal looks",
            ],
        },
        mood: "Relaxed luxury travel",
        men: [
            { id: "woo-m-1", name: "Linen or Light Blazer", description: "Cream, pinstripe or neutral double-breasted, open collar.", image: W.worldOfOurOwnMen, tags: ["Linen", "Relaxed"] },
            { id: "woo-m-2", name: "Light Jacket & Trousers", description: "Tailored tan or beige, loafers or espadrilles.", image: W.worldOfOurOwnMen, tags: ["Resort", "Minimal"] },
            { id: "woo-m-3", name: "Neutral Suit", description: "Earth tones, relaxed tailoring, sun-ready.", image: W.worldOfOurOwnMen, tags: ["Neutral", "Smart Casual"] },
        ],
        women: [
            { id: "woo-w-1", name: "Embellished Vest & Trousers", description: "Sleeveless vest, wide-leg trousers, sheer panels.", image: W.worldOfOurOwnWomen, tags: ["Linen", "Resort"] },
            { id: "woo-w-2", name: "Light Kaftan or Layered Look", description: "Champagne or beige, minimal jewellery.", image: W.worldOfOurOwnWomen, tags: ["Kaftan", "Light"] },
            { id: "woo-w-3", name: "Resort Wear", description: "Sophisticated relaxed, raw silk or linen.", image: W.worldOfOurOwnWomen, tags: ["Resort", "Minimal"] },
        ],
        realisticImages: {
            men: W.worldOfOurOwnMen,
            women: W.worldOfOurOwnWomen,
        },
        palette: { primary: "#faf6ee", accents: ["#d4a017", "#e8c872"], bestColors: ["Sand", "Olive", "Terracotta", "Cream"], avoidColors: ["Heavy", "Sequins", "Tuxedo"] },
        silhouettes: ["Linen Suit", "Linen Dress", "Kaftan"],
        fabrics: ["Linen", "Cotton", "Light Knits"],
        accessories: ["Loafers", "Espadrilles", "Minimal Jewelry"],
        animationPreset: "fade",
    },
    "royal-court": {
        id: "royal-court",
        title: "The Royal Court",
        dressCode: {
            title: "Royal Couture",
            description: "Grand Indian heritage style.",
            dos: [
                "Men: Sherwani, bandhgala, silk kurta with jacket, mojaris",
                "Women: Bridal lehengas, Banarasi sarees, couture anarkalis, heavy jewelry",
            ],
            donts: [
                "Western suits",
                "Casual dresses",
                "Short outfits",
                "Linen outfits",
                "Minimal styling",
            ],
        },
        mood: "Grand Indian heritage",
        men: [
            { id: "rc-m-1", name: "Sherwani / Kurta", description: "Cream or gold kurta with mirror work, churidar, mojaris.", image: W.royalCourtMen, tags: ["Sherwani", "Traditional"] },
            { id: "rc-m-2", name: "Bandhgala", description: "Silk or raw silk bandhgala, ceremonial styling.", image: W.royalCourtMen, tags: ["Bandhgala", "Heritage"] },
            { id: "rc-m-3", name: "Silk Kurta & Jacket", description: "Full traditional, gold or cream embellishment.", image: W.royalCourtMen, tags: ["Kurta", "Mojaris"] },
        ],
        women: [
            { id: "rc-w-1", name: "Bridal Lehanga", description: "Heavy mirror-work lehenga, choli, dupatta, kundan.", image: W.royalCourtWomen, tags: ["Lehanga", "Bridal"] },
            { id: "rc-w-2", name: "Banarasi / Couture Lehanga", description: "Gold or cream embellished, maang tikka, heavy jewellery.", image: W.royalCourtWomen, tags: ["Banarasi", "Saree"] },
            { id: "rc-w-3", name: "Couture Anarkali", description: "Royal culture, full grandeur, ceremonial.", image: W.royalCourtWomen, tags: ["Anarkali", "Couture"] },
        ],
        realisticImages: {
            men: W.royalCourtMen,
            women: W.royalCourtWomen,
        },
        palette: { primary: "#8b1a1a", accents: ["#d4af37", "#c9956b"], bestColors: ["Deep Maroon", "Gold", "Ivory", "Vermillion"], avoidColors: ["Western", "Casual", "Linen"] },
        silhouettes: ["Sherwani", "Lehanga", "Anarkali", "Bandhgala"],
        fabrics: ["Banarasi Silk", "Velvet", "Kanjeevaram", "Raw Silk"],
        accessories: ["Kundan", "Safa", "Mojaris", "Heavy Jewelry"],
        animationPreset: "elegant",
    },
    "thrill-theory": {
        id: "thrill-theory",
        title: "The Thrill Theory",
        dressCode: {
            title: "Speed & Sparkle",
            description: "Experimental, nightclub energy.",
            dos: [
                "Men: Sequined jackets, metallic shirts, fashion suits, street-luxury outfits",
                "Women: Glitter dresses, fringe outfits, metallic boots, futuristic fashion",
            ],
            donts: [
                "Traditional Indian wear",
                "Heavy lehengas",
                "Conservative outfits",
            ],
        },
        mood: "Experimental, nightclub energy",
        men: [
            { id: "tt-m-1", name: "Sequined Jacket", description: "Two-tone silver and black sequin jacket, statement jewellery.", image: W.thrillTheoryMen, tags: ["Sequin", "Party"] },
            { id: "tt-m-2", name: "Metallic / Street-Luxury", description: "Bold sequins, pearls, chains, experimental styling.", image: W.thrillTheoryMen, tags: ["Metallic", "Bold"] },
            { id: "tt-m-3", name: "Fashion Statement", description: "Experimental texture, nightclub-ready.", image: W.thrillTheoryMen, tags: ["Fashion", "Experimental"] },
        ],
        women: [
            { id: "tt-w-1", name: "Silver Sequin Dress", description: "Oversized sequin shirt as mini-dress, metallic boots.", image: W.thrillTheoryWomen, tags: ["Glitter", "Party"] },
            { id: "tt-w-2", name: "Metallic Boots & Sparkle", description: "Knee-high silver boots, shimmer, nightlife.", image: W.thrillTheoryWomen, tags: ["Fringe", "Bold"] },
            { id: "tt-w-3", name: "Futuristic Sparkle", description: "Experimental, glamorous, afterparty.", image: W.thrillTheoryWomen, tags: ["Futuristic", "Sparkle"] },
        ],
        realisticImages: {
            men: W.thrillTheoryMen,
            women: W.thrillTheoryWomen,
        },
        palette: { primary: "#ff006e", accents: ["#8338ec", "#00f5d4"], bestColors: ["Neon", "Metallic", "Glitter", "Black"], avoidColors: ["Traditional", "Heavy", "Conservative"] },
        silhouettes: ["Sequined Jacket", "Glitter Dress", "Fringe"],
        fabrics: ["Sequin", "Metallic", "Vinyl"],
        accessories: ["Metallic Boots", "Statement Jewelry", "Platforms"],
        animationPreset: "slide",
    },
};

// Default chapter if none selected — first event
export const DEFAULT_CHAPTER = WARDROBE_CHAPTER_IDS[0] ?? "pre-party";

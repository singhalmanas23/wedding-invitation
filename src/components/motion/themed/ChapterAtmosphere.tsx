"use client";

import dynamic from "next/dynamic";

const DuskParticles = dynamic(() => import("./DuskParticles"), { ssr: false });
const FloralHenna = dynamic(() => import("./FloralHenna"), { ssr: false });
const CathedralRogue = dynamic(() => import("./CathedralRogue"), { ssr: false });
const SunlitJourney = dynamic(() => import("./SunlitJourney"), { ssr: false });
const SacredFire = dynamic(() => import("./SacredFire"), { ssr: false });
const NeonCarnival = dynamic(() => import("./NeonCarnival"), { ssr: false });

const ATMOSPHERE_MAP: Record<string, React.ComponentType> = {
  "pre-party": DuskParticles,
  "first-chapter": DuskParticles,
  "courtyard-edit": FloralHenna,
  "midnight-cathedral": CathedralRogue,
  "world-of-our-own": SunlitJourney,
  "royal-court": SacredFire,
  "thrill-theory": NeonCarnival,
};

interface ChapterAtmosphereProps {
  slug: string;
}

export default function ChapterAtmosphere({ slug }: ChapterAtmosphereProps) {
  const Component = ATMOSPHERE_MAP[slug];
  if (!Component) return null;
  return <Component />;
}

"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useWardrobePlanner, Audience } from "./useWardrobePlanner";
import { wardrobeConfig, DEFAULT_CHAPTER, WARDROBE_CHAPTER_IDS } from "./WardrobeConfig";
import { EVENTS, COUPLE } from "@/content/events";

type WardrobePlannerState = ReturnType<typeof useWardrobePlanner>;

const P = {
    gold: "#d4af37",
    bronze: "#c9956b",
    maroon: "#8b1a1a",
    bg: "#1a0a0a",
    bgDeep: "#150808",
    muted: "#2e1212",
    cream: "#f5efe6",
    plum: "#2e122b",
} as const;

function Flourish() {
    return (
        <div className="flex items-center justify-center gap-4 py-6" aria-hidden="true">
            <div className="h-px w-20" style={{ background: `linear-gradient(to right, transparent, ${P.gold}40)` }} />
            <div className="flex items-center gap-2">
                <div className="w-1 h-1 rotate-45" style={{ backgroundColor: `${P.gold}60` }} />
                <div className="w-2 h-2 rotate-45" style={{ border: `1px solid ${P.gold}80` }} />
                <div className="w-1 h-1 rotate-45" style={{ backgroundColor: `${P.gold}60` }} />
            </div>
            <div className="h-px w-20" style={{ background: `linear-gradient(to left, transparent, ${P.gold}40)` }} />
        </div>
    );
}

export function WardrobeHero() {
    const ref = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        const targets = ref.current?.querySelectorAll(".hero-el");
        if (!targets || targets.length === 0) return;

        gsap.fromTo(targets,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
        );
    }, { scope: ref });

    return (
        <div ref={ref} className="relative py-24 md:py-32 text-center overflow-hidden">
            <div className="absolute inset-0 z-0 bg-fixed" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1549416878-b9ca35c2d47a?w=1920&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
            <div className="relative z-10">
                <Flourish />
                <span className="hero-el block text-[10px] uppercase tracking-[0.6em] font-body mb-6" style={{ color: `${P.gold}80` }}>
                    Attire &amp; Adornment
                </span>
                <h1 className="hero-el font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-white leading-tight">
                    The Royal <br /> <span className="italic" style={{ color: P.gold }}>Wardrobe</span>
                </h1>
                <p className="hero-el font-body text-sm md:text-base max-w-lg mx-auto opacity-60 leading-relaxed" style={{ color: P.cream }}>
                    A curated sartorial guide for each chapter of our wedding.
                    Discover the colors, fabrics, and silhouettes that honor Udaipur's heritage.
                </p>
            </div>
        </div>
    );
}

export function ChapterSelector({ selectedChapter, onSelect }: { selectedChapter: string, onSelect: (id: string) => void }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [chaptersOpen, setChaptersOpen] = useState(false);

    useEffect(() => {
        const el = scrollRef.current?.querySelector(`[data-chapter-id="${selectedChapter}"]`);
        if (el) {
            (el as HTMLElement).scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
    }, [selectedChapter]);

    useEffect(() => {
        if (!chaptersOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setChaptersOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [chaptersOpen]);

    const selectedWardrobe = wardrobeConfig[selectedChapter];
    const coupleLabel = `${COUPLE.partner1} & ${COUPLE.partner2}`;

    return (
        <>
            {/* Mobile: trigger + chapters sheet */}
            <div className="md:hidden border-y border-white/5 py-4 px-4">
                <button
                    type="button"
                    onClick={() => setChaptersOpen(true)}
                    className="w-full flex items-center justify-between font-serif text-base text-white bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-left"
                    aria-expanded={chaptersOpen}
                    aria-haspopup="dialog"
                >
                    <span className="text-white/80">Chapters</span>
                    <span className="font-serif text-white truncate max-w-[60%]">{selectedWardrobe?.title ?? selectedChapter}</span>
                    <svg className="shrink-0 w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Mobile: chapters modal */}
            {chaptersOpen && (
                <div
                    className="fixed inset-0 z-50 md:hidden bg-[#150808] flex flex-col"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Select chapter"
                >
                    <header className="flex items-center justify-between shrink-0 px-4 py-4 border-b border-white/5">
                        <span className="font-serif text-sm uppercase tracking-widest text-[#d4af37]">{coupleLabel}</span>
                        <h2 className="absolute left-1/2 -translate-x-1/2 font-serif text-xl text-white flex items-center gap-1">
                            Chapters
                            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        </h2>
                        <button
                            type="button"
                            onClick={() => setChaptersOpen(false)}
                            className="p-2 -m-2 text-white/80 hover:text-white rounded-lg"
                            aria-label="Close chapters"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </header>
                    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
                        {WARDROBE_CHAPTER_IDS.map((id) => {
                            const chapter = wardrobeConfig[id];
                            const event = EVENTS.find((e) => e.slug === id);
                            if (!chapter) return null;
                            const dateLabel = event ? `${event.dateShort.toUpperCase()} · CH. ${event.chapterNumber}` : "";
                            const isSelected = selectedChapter === chapter.id;
                            return (
                                <button
                                    key={chapter.id}
                                    type="button"
                                    onClick={() => {
                                        onSelect(chapter.id);
                                        setChaptersOpen(false);
                                    }}
                                    className={`w-full text-left rounded-lg border py-4 px-4 transition-colors ${isSelected ? "border-[#d4af37]/60 bg-white/5" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`}
                                >
                                    {dateLabel && (
                                        <div className="text-[10px] uppercase tracking-widest font-body text-[#c9956b] mb-1">
                                            {dateLabel}
                                        </div>
                                    )}
                                    <div className="font-serif text-lg text-white">{chapter.title}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Desktop: horizontal tabs */}
            <div
                ref={scrollRef}
                className="hidden md:flex items-center justify-center gap-12 py-10 border-y border-white/5 px-6 overflow-x-auto overflow-y-hidden scrollbar-hide whitespace-nowrap"
            >
                {WARDROBE_CHAPTER_IDS.map((id) => {
                    const chapter = wardrobeConfig[id];
                    if (!chapter) return null;
                    const isSelected = selectedChapter === chapter.id;
                    return (
                        <button
                            key={chapter.id}
                            data-chapter-id={chapter.id}
                            onClick={() => onSelect(chapter.id)}
                            className={`group flex flex-col items-center gap-2 transition-all duration-300 shrink-0 py-2 px-2 ${isSelected ? "opacity-100 scale-110" : "opacity-50 hover:opacity-80"}`}
                        >
                            <span className="font-serif text-xl text-white text-center">{chapter.title}</span>
                            <div
                                className="h-0.5 rounded-full shrink-0 transition-all duration-300"
                                style={{
                                    backgroundColor: P.gold,
                                    width: isSelected ? "100%" : "0%",
                                    minWidth: isSelected ? "4rem" : 0,
                                }}
                            />
                        </button>
                    );
                })}
            </div>
        </>
    );
}

export function WardrobeShowcase({ selectors, actions }: { selectors: WardrobePlannerState["selectors"]; actions: WardrobePlannerState["actions"] }) {
    const { currentWardrobe, selectedAudience } = selectors;
    const { dressCode } = currentWardrobe;

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            {/* Audience: Men / Women / Both */}
            <div className="flex items-center justify-center gap-6 mb-12">
                {(["all", "men", "women"] as Audience[]).map((a) => (
                    <button
                        key={a}
                        onClick={() => actions.setSelectedAudience(a)}
                        className={`text-[11px] uppercase tracking-[0.25em] font-body py-2.5 px-5 rounded-full border transition-all duration-300 ${selectedAudience === a ? "text-white border-gold/60 bg-gold/10" : "text-white/50 border-white/10 hover:border-white/20 hover:text-white/70"}`}
                    >
                        {a === "all" ? "For everyone" : a === "men" ? "For him" : "For her"}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-14 lg:items-start">
                {/* Left: Real look — how people actually look */}
                <div className="xl:col-span-7 relative min-h-[60vh] bg-bgDeep rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-6 md:p-8 lg:sticky lg:top-28 shadow-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center gap-6 md:gap-8 min-h-[50vh]" key={`${currentWardrobe.id}-${selectedAudience}`}>
                        <div className="relative w-full h-full flex items-center justify-center gap-6 md:gap-8">
                                {(selectedAudience === "men" || selectedAudience === "all") && (
                                    <div className="relative flex-1 h-full min-h-[420px] max-h-[70vh] rounded-lg overflow-hidden border border-white/10 group">
                                        <Image
                                            key={`${currentWardrobe.id}-men`}
                                            src={currentWardrobe.realisticImages.men}
                                            alt={`What to wear for ${currentWardrobe.title} — men`}
                                            fill
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                            priority
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
                                        <span className="absolute bottom-4 left-4 right-4 text-[10px] uppercase tracking-[0.3em]" style={{ color: P.gold }}>For him</span>
                                    </div>
                                )}
                                {(selectedAudience === "women" || selectedAudience === "all") && (
                                    <div className="relative flex-1 h-full min-h-[420px] max-h-[70vh] rounded-lg overflow-hidden border border-white/10 group">
                                        <Image
                                            key={`${currentWardrobe.id}-women`}
                                            src={currentWardrobe.realisticImages.women}
                                            alt={`What to wear for ${currentWardrobe.title} — women`}
                                            fill
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                            priority
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
                                        <span className="absolute bottom-4 left-4 right-4 text-[10px] uppercase tracking-[0.3em]" style={{ color: P.gold }}>For her</span>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>

                {/* Right: What to wear / What not to wear */}
                <div className="xl:col-span-5 space-y-8">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.5em] block mb-2" style={{ color: P.gold }}>{currentWardrobe.title}</span>
                        <h2 className="font-serif text-2xl md:text-3xl mb-2 leading-tight" style={{ color: P.cream }}>{dressCode.title}</h2>
                        <p className="font-body text-sm leading-relaxed italic" style={{ color: "rgba(245,239,230,0.65)" }}>{dressCode.description}</p>
                    </div>

                    {/* What to wear */}
                    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
                        <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2" style={{ backgroundColor: "rgba(212,175,55,0.08)" }}>
                            <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "rgba(45,166,99,0.3)", color: "#4ade80" }}>✓</span>
                            <span className="text-[11px] uppercase tracking-[0.3em] font-body" style={{ color: P.cream }}>What to wear</span>
                        </div>
                        <ul className="p-5 space-y-3">
                            {dressCode.dos.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(245,239,230,0.9)" }}>
                                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full border flex items-center justify-center" style={{ borderColor: "rgba(74,222,128,0.5)", color: "#4ade80" }}>✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* What to avoid */}
                    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
                        <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2" style={{ backgroundColor: "rgba(139,26,26,0.12)" }}>
                            <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "rgba(239,68,68,0.25)", color: "#f87171" }}>✕</span>
                            <span className="text-[11px] uppercase tracking-[0.3em] font-body" style={{ color: P.cream }}>What to avoid</span>
                        </div>
                        <ul className="p-5 space-y-3">
                            {dressCode.donts.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(245,239,230,0.8)" }}>
                                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full border flex items-center justify-center" style={{ borderColor: "rgba(248,113,113,0.5)", color: "#f87171" }}>✕</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Suggested colors & fabrics — one line each */}
                    <div className="pt-2 space-y-2">
                        <p className="text-xs" style={{ color: "rgba(245,239,230,0.6)" }}>
                            <span className="uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Suggested colors</span> — {currentWardrobe.palette.bestColors.join(", ")}
                        </p>
                        <p className="text-xs" style={{ color: "rgba(245,239,230,0.6)" }}>
                            <span className="uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Fabrics</span> — {currentWardrobe.fabrics.join(", ")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ReferenceLooksGrid({ selectors }: { selectors: WardrobePlannerState["selectors"] }) {
    const { currentWardrobe, selectedAudience, selectedChapter } = selectors;

    const filteredLooks = useMemo(() => {
        if (selectedAudience === "all") return [...currentWardrobe.men, ...currentWardrobe.women];
        return selectedAudience === "men" ? currentWardrobe.men : currentWardrobe.women;
    }, [currentWardrobe, selectedAudience]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
            <div className="flex items-center gap-4 mb-14">
                <span className="text-[10px] uppercase tracking-[0.5em] font-body" style={{ color: P.gold }}>Curated Inspiration</span>
                <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" key={selectedChapter}>
                {filteredLooks.map((look) => (
                    <div key={`${selectedChapter}-${look.id}`} className="group relative aspect-[3/4] overflow-hidden border border-white/5 bg-white/[0.02]">
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 scale-100 group-hover:scale-105">
                            <Image
                                key={`${selectedChapter}-${look.id}-img`}
                                src={look.image}
                                alt={look.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
                            <span className="text-[9px] uppercase tracking-[0.3em] font-body" style={{ color: P.gold }}>{look.id.includes('-m-') ? 'For Him' : 'For Her'}</span>
                            <h4 className="font-serif text-2xl text-white">{look.name}</h4>
                            <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{look.description}</p>
                            <div className="flex gap-2 pt-2">
                                {look.tags.map(t => (
                                    <span key={t} className="text-[8px] uppercase tracking-[0.1em] px-2 py-1 border border-white/10 text-white/40">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function WardrobeEtiquetteNote() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <div className="relative p-12 border border-white/5 bg-white/[0.02]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rotate-45 border border-white/10 flex items-center justify-center bg-bgDeep">
                    <span className="text-gold text-lg">!</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-body mb-6 block" style={{ color: P.gold }}>Etiquette Note</span>
                <p className="font-serif italic text-xl text-white/80 leading-relaxed">
                    "We cherish your presence and want you to feel comfortable while honoring the sanctity of the ceremonies.
                    Modest attire is requested for religious rituals, and we invite you to embrace the
                    colors of the celebration wherever possible."
                </p>
                <div className="mt-8 pt-8 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-body" style={{ color: P.cream }}>T&amp;S Styling Committee</p>
                </div>
            </div>
        </div>
    );
}

export default function RoyalWardrobePage() {
    const { selectors, actions } = useWardrobePlanner();

    return (
        <div className="min-h-screen relative" style={{ backgroundColor: P.bg }}>
            <WardrobeHero />
            <ChapterSelector
                selectedChapter={selectors.selectedChapter}
                onSelect={actions.setSelectedChapter}
            />

            <WardrobeShowcase selectors={selectors} actions={actions} />
            <WardrobeEtiquetteNote />

            {/* Decorative Jharokha frame at corners */}
            <div className="fixed bottom-10 right-10 w-32 h-44 opacity-10 pointer-events-none hidden lg:block">
                {/* Placeholder for JharokhaArch component from LandingExperience */}
            </div>
        </div>
    );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTS } from "@/content/events";
import FadeInView from "@/components/motion/FadeInView";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type AspectType = "tall" | "wide" | "square";

interface GalleryItem {
  id: number;
  event: string;
  src: string;
  aspect: AspectType;
  label: string;
}

const GALLERY_ITEMS: GalleryItem[] = EVENTS.flatMap((event, eventIdx) =>
  event.galleryImages.map((src, imgIdx) => ({
    id: eventIdx * 10 + imgIdx,
    event: event.title,
    src,
    aspect: (["tall", "square", "wide", "square"] as AspectType[])[imgIdx % 4],
    label: [
      `${event.title} — ambience`,
      `${event.title} — details`,
      `${event.title} — atmosphere`,
      `${event.title} — moments`,
    ][imgIdx % 4],
  }))
);

const ASPECT_HEIGHTS: Record<AspectType, string> = {
  tall: "h-96",
  wide: "h-52",
  square: "h-72",
};

const EVENT_NAMES = ["All", ...EVENTS.map((e) => e.title)];

export default function GalleryContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.event === activeFilter);

  const currentItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null
    );
  }, [filteredItems.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredItems.length) % filteredItems.length
        : null
    );
  }, [filteredItems.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 text-center">
        <FadeInView>
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/60 font-body mb-6">
            Captured Moments
          </p>
        </FadeInView>
        <FadeInView delay={0.1}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-100 tracking-tight">
            Gallery
          </h1>
        </FadeInView>
        <FadeInView delay={0.2}>
          <p className="mt-6 text-stone-400 text-lg md:text-xl font-body max-w-xl mx-auto leading-relaxed">
            Moments captured, memories preserved
          </p>
        </FadeInView>
        <FadeInView delay={0.3}>
          <div className="h-px w-12 bg-amber-400/20 mx-auto mt-10" />
        </FadeInView>
      </section>

      {/* Filter Pills */}
      <section className="px-6 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {EVENT_NAMES.map((name) => (
            <button
              key={name}
              onClick={() => {
                setActiveFilter(name);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-body transition-all duration-300 border ${
                activeFilter === name
                  ? "bg-amber-400/15 border-amber-400/40 text-amber-300"
                  : "bg-white/[0.03] border-white/[0.08] text-stone-500 hover:text-stone-300 hover:border-white/15"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="mb-4 break-inside-avoid"
              >
                <motion.button
                  onClick={() => setLightboxIndex(index)}
                  className="w-full rounded-xl overflow-hidden relative group cursor-pointer block"
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={`w-full ${ASPECT_HEIGHTS[item.aspect]} relative`}>
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-white/90 text-sm font-body">
                        {item.label}
                      </p>
                      <p className="text-white/50 text-xs font-body mt-1">
                        {item.event}
                      </p>
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                        <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Upload Your Photos */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="max-w-2xl mx-auto text-center">
          <FadeInView>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-100 mb-4">
              Upload Your Photos
            </h2>
            <p className="text-stone-400 font-body mb-10">
              Share your captured moments from the celebration
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 md:p-16 hover:border-amber-400/20 transition-colors duration-500 group">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-400/10 transition-colors duration-500">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-500 group-hover:text-amber-400/70 transition-colors duration-500">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div>
                  <p className="text-stone-300 font-body text-sm">
                    Drag & drop your photos here
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-amber-400/40 font-body mt-3">
                    Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => {
          if (!open) closeLightbox();
        }}
      >
        <DialogContent className="sm:max-w-4xl bg-stone-950/95 border-white/5 backdrop-blur-xl p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{currentItem?.label ?? "Gallery Image"}</DialogTitle>
            <DialogDescription>{currentItem?.event ?? "Wedding gallery photo"}</DialogDescription>
          </DialogHeader>

          {currentItem && (
            <div className="relative">
              <div className="w-full h-[60vh] md:h-[75vh] relative rounded-lg overflow-hidden">
                <Image
                  src={currentItem.src}
                  alt={currentItem.label}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white/90 text-lg font-body">{currentItem.label}</p>
                <p className="text-white/50 text-sm font-body mt-1">{currentItem.event}</p>
              </div>

              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300"
                    aria-label="Next image"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}

              <div className="absolute top-4 right-14 text-[11px] uppercase tracking-[0.2em] text-white/40 font-body">
                {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {filteredItems.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

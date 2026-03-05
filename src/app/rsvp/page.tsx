"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { z } from "zod";
import { EVENTS } from "@/content/events";
import type { RSVPFormData } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInView from "@/components/motion/FadeInView";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  P,
  RoyalPageHero,
  RoyalPageWrapper,
  RoyalSectionFrame,
  RoyalDivider,
} from "@/components/shared/RoyalPageLayout";

const rsvpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  attending: z.enum(["yes", "no", "maybe"], {
    message: "Please select your attendance status",
  }),
  eventsAttending: z.array(z.string()),
  dietaryRestrictions: z.string().optional().or(z.literal("")),
  plusOne: z.boolean(),
  plusOneName: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

type FormErrors = Partial<Record<keyof RSVPFormData, string>>;

const INITIAL_FORM: RSVPFormData = {
  name: "",
  email: "",
  phone: "",
  attending: "yes",
  eventsAttending: [],
  dietaryRestrictions: "",
  plusOne: false,
  plusOneName: "",
  notes: "",
};

const ATTENDING_OPTIONS = [
  {
    value: "yes" as const,
    label: "Joyfully Accept",
    icon: <path d="M20 6 9 17l-5-5" />,
  },
  {
    value: "no" as const,
    label: "Regretfully Decline",
    icon: (
      <>
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
      </>
    ),
  },
  {
    value: "maybe" as const,
    label: "Not Sure Yet",
    icon: (
      <>
        <path d="M12 17h.01" />
        <path d="M12 13a2.5 2.5 0 0 0-2-2.45A2.5 2.5 0 0 1 12 6a2.5 2.5 0 0 1 2.5 2.5" />
      </>
    ),
  },
];

const inputClass = `font-body h-12 rounded-sm text-sm`;

export default function RSVPPage() {
  const [form, setForm] = useState<RSVPFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = <K extends keyof RSVPFormData>(
    key: K,
    value: RSVPFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggleEvent = (slug: string) => {
    setForm((prev) => ({
      ...prev,
      eventsAttending: prev.eventsAttending.includes(slug)
        ? prev.eventsAttending.filter((s) => s !== slug)
        : [...prev.eventsAttending, slug],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = rsvpSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      const firstErrorField = Object.keys(fieldErrors)[0];
      if (firstErrorField && formRef.current) {
        const el = formRef.current.querySelector(
          `[name="${firstErrorField}"]`
        );
        if (el instanceof HTMLElement) el.focus();
      }
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to submit RSVP. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <RoyalPageWrapper>
          <div className="min-h-screen flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-lg"
            >
              {/* Diya SVG */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6"
              >
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                  <ellipse cx="40" cy="58" rx="22" ry="8" fill={`${P.gold}18`} stroke={`${P.gold}40`} strokeWidth="1" />
                  <path d="M24 55 C24 45, 56 45, 56 55" fill={`${P.gold}12`} stroke={`${P.gold}50`} strokeWidth="1" />
                  <path d="M28 48 C28 42, 52 42, 52 48" fill={`${P.gold}08`} stroke={`${P.gold}30`} strokeWidth="0.8" />
                  <motion.g
                    animate={{ y: [-1, 1, -1], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ellipse cx="40" cy="32" rx="5" ry="12" fill="url(#flame-grad)" opacity="0.9" />
                    <ellipse cx="40" cy="34" rx="3" ry="7" fill="url(#flame-inner)" opacity="0.8" />
                  </motion.g>
                  <motion.circle
                    cx="40" cy="30" r="18"
                    fill="none" stroke={`${P.gold}15`} strokeWidth="0.5"
                    animate={{ r: [18, 28, 18], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <radialGradient id="flame-grad" cx="50%" cy="70%" r="50%">
                      <stop offset="0%" stopColor="#fff3c4" />
                      <stop offset="40%" stopColor={P.gold} />
                      <stop offset="100%" stopColor="#8b4513" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="flame-inner" cx="50%" cy="60%" r="50%">
                      <stop offset="0%" stopColor="#fffbe6" />
                      <stop offset="100%" stopColor={P.gold} stopOpacity="0.3" />
                    </radialGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Sanskrit blessing */}
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-serif text-lg md:text-xl mb-2 italic"
                style={{ color: `${P.gold}cc` }}
              >
                शुभं भवतु
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-[10px] uppercase tracking-[0.4em] font-body mb-8"
                style={{ color: `${P.gold}60` }}
              >
                May auspiciousness prevail
              </motion.p>

              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${P.gold}40)` }} />
                <svg width="12" height="12" viewBox="0 0 12 12" fill={`${P.gold}60`}>
                  <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" />
                </svg>
                <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${P.gold}40)` }} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="font-serif text-3xl md:text-5xl mb-3"
                style={{ color: P.cream }}
              >
                {form.name},
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="font-serif italic text-xl md:text-2xl mb-3"
                style={{ color: `${P.cream}cc` }}
              >
                आपकी उपस्थिति हमारा सौभाग्य
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="font-body text-sm md:text-base mb-4 leading-relaxed"
                style={{ color: `${P.cream}70` }}
              >
                Your presence is our blessing
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="font-body text-xs max-w-sm mx-auto mb-10 leading-relaxed"
                style={{ color: `${P.cream}50` }}
              >
                We look forward to celebrating this beautiful occasion with you in Udaipur. Your love and blessings mean everything to us.
              </motion.p>

              {/* Decorative mandala ring */}
              <motion.div
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="flex items-center justify-center gap-3 mb-10"
              >
                <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${P.gold}25)` }} />
                <p className="text-[10px] tracking-[0.3em] font-body" style={{ color: `${P.gold}50` }}>
                  तरुष & संजना
                </p>
                <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${P.gold}25)` }} />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3 font-body text-sm uppercase tracking-[0.15em] transition-all duration-300"
                  style={{
                    color: P.gold,
                    border: `1px solid ${P.gold}30`,
                    backgroundColor: `${P.gold}08`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </RoyalPageWrapper>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <RoyalPageWrapper>
        <RoyalPageHero
          label="You're Invited"
          title="RSVP"
          subtitle="We'd love to have you celebrate with us"
        />

        <section className="px-6 pb-24 md:pb-32">
          <div className="max-w-2xl mx-auto">
            <FadeInView delay={0.3}>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Personal Information */}
                <RoyalSectionFrame glow className="p-6 md:p-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="font-serif text-base mb-2" style={{ color: `${P.cream}cc` }}>
                        Full Name <span style={{ color: `${P.gold}99` }}>*</span>
                      </Label>
                      <Input
                        id="name" name="name" type="text" value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Your full name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={inputClass}
                        style={{
                          backgroundColor: `${P.muted}40`,
                          borderColor: `${P.gold}12`,
                          color: P.cream,
                        }}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-2 text-sm font-body" style={{ color: "#e57373" }} role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="font-serif text-base mb-2" style={{ color: `${P.cream}cc` }}>
                        Email <span style={{ color: `${P.gold}99` }}>*</span>
                      </Label>
                      <Input
                        id="email" name="email" type="email" value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="your@email.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={inputClass}
                        style={{
                          backgroundColor: `${P.muted}40`,
                          borderColor: `${P.gold}12`,
                          color: P.cream,
                        }}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-2 text-sm font-body" style={{ color: "#e57373" }} role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="font-serif text-base mb-2" style={{ color: `${P.cream}cc` }}>
                        Phone <span className="text-xs font-body" style={{ color: `${P.cream}40` }}>(optional)</span>
                      </Label>
                      <Input
                        id="phone" name="phone" type="tel" value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        className={inputClass}
                        style={{
                          backgroundColor: `${P.muted}40`,
                          borderColor: `${P.gold}12`,
                          color: P.cream,
                        }}
                      />
                    </div>
                  </div>
                </RoyalSectionFrame>

                {/* Attendance */}
                <RoyalSectionFrame className="p-6 md:p-8">
                  <fieldset>
                    <legend className="font-serif text-base mb-5" style={{ color: `${P.cream}cc` }}>
                      Will you be attending? <span style={{ color: `${P.gold}99` }}>*</span>
                    </legend>
                    <div className="grid grid-cols-3 gap-3">
                      {ATTENDING_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className="relative flex flex-col items-center gap-3 p-4 md:p-5 rounded-sm cursor-pointer transition-all duration-300"
                          style={{
                            backgroundColor:
                              form.attending === option.value
                                ? `${P.gold}12`
                                : `${P.muted}30`,
                            border: `1px solid ${
                              form.attending === option.value
                                ? `${P.gold}40`
                                : `${P.gold}0a`
                            }`,
                            color:
                              form.attending === option.value
                                ? P.gold
                                : `${P.cream}60`,
                          }}
                        >
                          <input
                            type="radio" name="attending" value={option.value}
                            checked={form.attending === option.value}
                            onChange={() => updateField("attending", option.value)}
                            className="sr-only"
                          />
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            {option.icon}
                          </svg>
                          <span className="text-[10px] md:text-xs uppercase tracking-widest font-body text-center leading-tight">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.attending && (
                      <p className="mt-3 text-sm font-body" style={{ color: "#e57373" }} role="alert">
                        {errors.attending}
                      </p>
                    )}
                  </fieldset>
                </RoyalSectionFrame>

                {/* Events */}
                <RoyalSectionFrame className="p-6 md:p-8">
                  <fieldset>
                    <legend className="font-serif text-base mb-5" style={{ color: `${P.cream}cc` }}>
                      Which events will you attend?
                    </legend>
                    <div className="space-y-3">
                      {EVENTS.map((event) => {
                        const isSelected = form.eventsAttending.includes(event.slug);
                        return (
                          <label
                            key={event.slug}
                            className="flex items-center gap-4 p-4 rounded-sm cursor-pointer transition-all duration-300"
                            style={{
                              backgroundColor: isSelected ? `${P.gold}0a` : `${P.muted}20`,
                              border: `1px solid ${isSelected ? `${P.gold}25` : `${P.gold}08`}`,
                            }}
                          >
                            <div
                              className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0 transition-all duration-300"
                              style={{
                                border: `2px solid ${isSelected ? P.gold : `${P.cream}25`}`,
                                backgroundColor: isSelected ? `${P.gold}20` : "transparent",
                              }}
                            >
                              {isSelected && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: P.gold }}>
                                  <path d="M20 6 9 17l-5-5" />
                                </svg>
                              )}
                            </div>
                            <input type="checkbox" checked={isSelected} onChange={() => toggleEvent(event.slug)} className="sr-only" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-body" style={{ color: `${P.cream}cc` }}>
                                {event.title}
                              </p>
                              <p className="text-xs font-body mt-0.5" style={{ color: `${P.cream}40` }}>
                                {event.date} &middot; {event.time}
                              </p>
                            </div>
                            <div
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: event.palette.primary }}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </RoyalSectionFrame>

                {/* Dietary Restrictions */}
                <RoyalSectionFrame className="p-6 md:p-8">
                  <Label htmlFor="dietary" className="font-serif text-base mb-2" style={{ color: `${P.cream}cc` }}>
                    Dietary Restrictions{" "}
                    <span className="text-xs font-body" style={{ color: `${P.cream}40` }}>(optional)</span>
                  </Label>
                  <Textarea
                    id="dietary" name="dietaryRestrictions"
                    value={form.dietaryRestrictions}
                    onChange={(e) => updateField("dietaryRestrictions", e.target.value)}
                    placeholder="Any allergies or dietary preferences..."
                    rows={3}
                    className="font-body rounded-sm resize-none text-sm"
                    style={{
                      backgroundColor: `${P.muted}40`,
                      borderColor: `${P.gold}12`,
                      color: P.cream,
                    }}
                  />
                </RoyalSectionFrame>

                {/* Plus One */}
                <RoyalSectionFrame className="p-6 md:p-8">
                  <div className="space-y-4">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <div
                        className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          border: `2px solid ${form.plusOne ? P.gold : `${P.cream}25`}`,
                          backgroundColor: form.plusOne ? `${P.gold}20` : "transparent",
                        }}
                      >
                        {form.plusOne && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: P.gold }}>
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <input type="checkbox" checked={form.plusOne} onChange={(e) => updateField("plusOne", e.target.checked)} className="sr-only" />
                      <span className="font-serif text-base" style={{ color: `${P.cream}cc` }}>
                        I&apos;ll be bringing a plus one
                      </span>
                    </label>

                    <AnimatePresence>
                      {form.plusOne && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2">
                            <Label htmlFor="plusOneName" className="font-serif text-base mb-2" style={{ color: `${P.cream}cc` }}>
                              Plus One&apos;s Name
                            </Label>
                            <Input
                              id="plusOneName" name="plusOneName" type="text"
                              value={form.plusOneName}
                              onChange={(e) => updateField("plusOneName", e.target.value)}
                              placeholder="Their full name"
                              className={inputClass}
                              style={{
                                backgroundColor: `${P.muted}40`,
                                borderColor: `${P.gold}12`,
                                color: P.cream,
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </RoyalSectionFrame>

                {/* Notes */}
                <RoyalSectionFrame className="p-6 md:p-8">
                  <Label htmlFor="notes" className="font-serif text-base mb-2" style={{ color: `${P.cream}cc` }}>
                    Additional Notes{" "}
                    <span className="text-xs font-body" style={{ color: `${P.cream}40` }}>(optional)</span>
                  </Label>
                  <Textarea
                    id="notes" name="notes" value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Anything else you'd like us to know..."
                    rows={4}
                    className="font-body rounded-sm resize-none text-sm"
                    style={{
                      backgroundColor: `${P.muted}40`,
                      borderColor: `${P.gold}12`,
                      color: P.cream,
                    }}
                  />
                </RoyalSectionFrame>

                {/* Submit */}
                <div className="text-center pt-4">
                  <RoyalDivider className="mb-8" />
                  {submitError && (
                    <p className="mb-4 text-sm font-body px-4 py-3 rounded-sm" style={{ color: "#e57373", backgroundColor: "rgba(229,115,115,0.08)", border: "1px solid rgba(229,115,115,0.2)" }}>
                      {submitError}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="px-12 py-6 h-auto rounded-sm text-sm uppercase tracking-[0.2em] font-body font-medium transition-all duration-700 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      color: P.bg,
                      background: `linear-gradient(to right, ${P.gold}, #c9a030)`,
                      boxShadow: `0 12px 32px rgba(212,175,55,0.2)`,
                    }}
                  >
                    {submitting ? "Sending..." : "Send RSVP"}
                  </Button>
                  <p className="mt-4 text-xs font-body" style={{ color: `${P.cream}33` }}>
                    You can update your response anytime
                  </p>
                </div>
              </form>
            </FadeInView>
          </div>
        </section>
      </RoyalPageWrapper>
      <Footer />
    </>
  );
}

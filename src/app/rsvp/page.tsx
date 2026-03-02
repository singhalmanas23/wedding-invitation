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
    icon: (
      <path d="M20 6 9 17l-5-5" />
    ),
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

export default function RSVPPage() {
  const [form, setForm] = useState<RSVPFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
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

    localStorage.setItem("rsvp", JSON.stringify(result.data));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 200,
              }}
              className="w-24 h-24 rounded-full bg-amber-400/10 border border-amber-400/30 mx-auto mb-8 flex items-center justify-center"
            >
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-400"
              >
                <motion.path
                  d="M20 6 9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-[11px] uppercase tracking-[0.3em] text-amber-400/60 font-body mb-4"
            >
              RSVP Confirmed
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-serif text-4xl md:text-5xl text-stone-100 mb-4"
            >
              Thank you, {form.name}!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-stone-400 font-body text-lg mb-10 leading-relaxed"
            >
              We can&apos;t wait to celebrate with you
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-sm font-body uppercase tracking-[0.15em] hover:bg-amber-400/20 hover:border-amber-400/40 transition-all duration-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-950">
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 text-center">
          <FadeInView>
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/60 font-body mb-6">
              You&apos;re Invited
            </p>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-100 tracking-tight">
              RSVP
            </h1>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="mt-6 text-stone-400 text-lg md:text-xl font-body max-w-xl mx-auto leading-relaxed">
              We&apos;d love to have you celebrate with us
            </p>
          </FadeInView>
          <FadeInView delay={0.3}>
            <div className="h-px w-12 bg-amber-400/20 mx-auto mt-10" />
          </FadeInView>
        </section>

        {/* Form */}
        <section className="px-6 pb-24 md:pb-32">
          <div className="max-w-2xl mx-auto">
            <FadeInView delay={0.3}>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-8"
                noValidate
              >
                {/* Personal Information */}
                <div className="bg-white/2 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="font-serif text-stone-200 text-base mb-2"
                    >
                      Full Name{" "}
                      <span className="text-amber-400/60">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? "name-error" : undefined
                      }
                      className="bg-white/3 border-white/8 text-stone-100 placeholder:text-stone-600 focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20 h-12 rounded-xl font-body"
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        className="mt-2 text-sm text-red-400/80 font-body"
                        role="alert"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="font-serif text-stone-200 text-base mb-2"
                    >
                      Email{" "}
                      <span className="text-amber-400/60">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="your@email.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className="bg-white/3 border-white/8 text-stone-100 placeholder:text-stone-600 focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20 h-12 rounded-xl font-body"
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="mt-2 text-sm text-red-400/80 font-body"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="phone"
                      className="font-serif text-stone-200 text-base mb-2"
                    >
                      Phone{" "}
                      <span className="text-stone-600 text-xs font-body">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="bg-white/3 border-white/8 text-stone-100 placeholder:text-stone-600 focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20 h-12 rounded-xl font-body"
                    />
                  </div>
                </div>

                {/* Attendance */}
                <div className="bg-white/2 border border-white/5 rounded-2xl p-6 md:p-8">
                  <fieldset>
                    <legend className="font-serif text-stone-200 text-base mb-5">
                      Will you be attending?{" "}
                      <span className="text-amber-400/60">*</span>
                    </legend>
                    <div className="grid grid-cols-3 gap-3">
                      {ATTENDING_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className={`relative flex flex-col items-center gap-3 p-4 md:p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                            form.attending === option.value
                              ? "bg-amber-400/10 border-amber-400/30 text-amber-300"
                              : "bg-white/2 border-white/8 text-stone-500 hover:border-white/15 hover:text-stone-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="attending"
                            value={option.value}
                            checked={form.attending === option.value}
                            onChange={() =>
                              updateField("attending", option.value)
                            }
                            className="sr-only"
                          />
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {option.icon}
                          </svg>
                          <span className="text-[10px] md:text-xs uppercase tracking-widest font-body text-center leading-tight">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.attending && (
                      <p
                        className="mt-3 text-sm text-red-400/80 font-body"
                        role="alert"
                      >
                        {errors.attending}
                      </p>
                    )}
                  </fieldset>
                </div>

                {/* Events */}
                <div className="bg-white/2 border border-white/5 rounded-2xl p-6 md:p-8">
                  <fieldset>
                    <legend className="font-serif text-stone-200 text-base mb-5">
                      Which events will you attend?
                    </legend>
                    <div className="space-y-3">
                      {EVENTS.map((event) => {
                        const isSelected = form.eventsAttending.includes(
                          event.slug
                        );
                        return (
                          <label
                            key={event.slug}
                            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                              isSelected
                                ? "bg-amber-400/8 border-amber-400/25"
                                : "bg-white/1 border-white/5 hover:border-white/12"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                                isSelected
                                  ? "bg-amber-400/20 border-amber-400/60"
                                  : "border-white/20"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  className="text-amber-400"
                                >
                                  <path d="M20 6 9 17l-5-5" />
                                </svg>
                              )}
                            </div>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleEvent(event.slug)}
                              className="sr-only"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-stone-200 text-sm font-body">
                                {event.title}
                              </p>
                              <p className="text-stone-500 text-xs font-body mt-0.5">
                                {event.date} &middot; {event.time}
                              </p>
                            </div>
                            <div
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{
                                backgroundColor: event.palette.primary,
                              }}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                {/* Dietary Restrictions */}
                <div className="bg-white/2 border border-white/5 rounded-2xl p-6 md:p-8">
                  <Label
                    htmlFor="dietary"
                    className="font-serif text-stone-200 text-base mb-2"
                  >
                    Dietary Restrictions{" "}
                    <span className="text-stone-600 text-xs font-body">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="dietary"
                    name="dietaryRestrictions"
                    value={form.dietaryRestrictions}
                    onChange={(e) =>
                      updateField("dietaryRestrictions", e.target.value)
                    }
                    placeholder="Any allergies or dietary preferences..."
                    rows={3}
                    className="bg-white/3 border-white/8 text-stone-100 placeholder:text-stone-600 focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20 rounded-xl font-body resize-none"
                  />
                </div>

                {/* Plus One */}
                <div className="bg-white/2 border border-white/5 rounded-2xl p-6 md:p-8 space-y-4">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                        form.plusOne
                          ? "bg-amber-400/20 border-amber-400/60"
                          : "border-white/20 group-hover:border-white/30"
                      }`}
                    >
                      {form.plusOne && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-amber-400"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={form.plusOne}
                      onChange={(e) =>
                        updateField("plusOne", e.target.checked)
                      }
                      className="sr-only"
                    />
                    <span className="font-serif text-stone-200 text-base">
                      I&apos;ll be bringing a plus one
                    </span>
                  </label>

                  <AnimatePresence>
                    {form.plusOne && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2">
                          <Label
                            htmlFor="plusOneName"
                            className="font-serif text-stone-200 text-base mb-2"
                          >
                            Plus One&apos;s Name
                          </Label>
                          <Input
                            id="plusOneName"
                            name="plusOneName"
                            type="text"
                            value={form.plusOneName}
                            onChange={(e) =>
                              updateField("plusOneName", e.target.value)
                            }
                            placeholder="Their full name"
                            className="bg-white/3 border-white/8 text-stone-100 placeholder:text-stone-600 focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20 h-12 rounded-xl font-body"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Additional Notes */}
                <div className="bg-white/2 border border-white/5 rounded-2xl p-6 md:p-8">
                  <Label
                    htmlFor="notes"
                    className="font-serif text-stone-200 text-base mb-2"
                  >
                    Additional Notes{" "}
                    <span className="text-stone-600 text-xs font-body">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Anything else you'd like us to know..."
                    rows={4}
                    className="bg-white/3 border-white/8 text-stone-100 placeholder:text-stone-600 focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20 rounded-xl font-body resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    className="px-12 py-6 h-auto rounded-full bg-linear-to-r from-amber-400/20 to-amber-600/20 border border-amber-400/30 text-amber-200 hover:from-amber-400/30 hover:to-amber-600/30 hover:border-amber-400/50 transition-all duration-500 text-sm uppercase tracking-[0.2em] font-body"
                  >
                    Send RSVP
                  </Button>
                  <p className="mt-4 text-stone-600 text-xs font-body">
                    You can update your response anytime
                  </p>
                </div>
              </form>
            </FadeInView>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

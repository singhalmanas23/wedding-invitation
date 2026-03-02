"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeInView from "@/components/motion/FadeInView";

type Step = "phone" | "otp" | "verifying";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "otp") {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  const handleSendOtp = useCallback(() => {
    if (phone.replace(/\s/g, "").length >= 10) {
      setStep("otp");
    }
  }, [phone]);

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;

      const digit = value.slice(-1);
      const next = [...otp];
      next[index] = digit;
      setOtp(next);

      if (digit && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      if (next.every((d) => d !== "")) {
        setStep("verifying");
        sessionStorage.setItem("wedding-guest-auth", "true");
        setTimeout(() => router.push("/guest"), 1500);
      }
    },
    [otp, router],
  );

  const handleOtpKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        const next = [...otp];
        next[index - 1] = "";
        setOtp(next);
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp],
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-950">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <FadeInView className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl md:text-5xl text-stone-100 tracking-tight mb-4">
              Guest Portal
            </h1>
            <p className="text-stone-400 font-body text-sm md:text-base leading-relaxed max-w-sm mx-auto">
              Enter your phone number to access your personalized wedding
              experience
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-400/[0.03] to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              {step === "phone" && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative space-y-6"
                >
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-body mb-2.5">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 h-12 px-4 flex items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-stone-400 font-body text-sm">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                        placeholder="98XXX XXXXX"
                        className="flex-1 h-12 px-4 rounded-lg border border-white/[0.08] bg-white/[0.03] text-stone-100 font-body text-base placeholder:text-stone-600 outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSendOtp}
                    disabled={phone.replace(/\s/g, "").length < 10}
                    className="w-full h-12 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-body font-semibold text-sm tracking-wide hover:from-amber-400 hover:to-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
                  >
                    Send OTP
                  </button>
                </motion.div>
              )}

              {step === "otp" && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative space-y-6"
                >
                  <div className="text-center">
                    <p className="text-stone-400 font-body text-sm">
                      OTP sent to{" "}
                      <span className="text-stone-200">+91 {phone}</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-body mb-3 text-center">
                      Enter Verification Code
                    </label>
                    <div className="flex items-center justify-center gap-3">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => {
                            inputRefs.current[i] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="w-14 h-14 text-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-stone-100 font-serif text-2xl outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all caret-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setStep("phone");
                      setOtp(["", "", "", ""]);
                    }}
                    className="w-full text-center text-stone-500 hover:text-amber-400 font-body text-xs tracking-wide transition-colors"
                  >
                    Change phone number
                  </button>
                </motion.div>
              )}

              {step === "verifying" && (
                <motion.div
                  key="verifying"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center justify-center py-8 gap-5"
                >
                  <div className="relative w-10 h-10">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-amber-400/20"
                      style={{ borderTopColor: "rgb(251 191 36)" }}
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                      }}
                    />
                  </div>
                  <p className="text-stone-300 font-body text-sm tracking-wide">
                    Verifying...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <FadeInView delay={0.3} className="mt-8 text-center">
            <p className="text-stone-600 font-body text-[11px] tracking-wide">
              Your personalized itinerary, room details, and event information
              — all in one place.
            </p>
          </FadeInView>
        </FadeInView>
      </main>

      <Footer />
    </div>
  );
}

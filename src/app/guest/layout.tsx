"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

const NAV_ITEMS = [
  {
    id: "itinerary",
    label: "My Itinerary",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    id: "pickup",
    label: "Pickup Details",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17h2a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H3v9h2" />
        <path d="M14 17h3l2-5H9l2 5h3" />
        <circle cx="7.5" cy="21.5" r="1.5" />
        <circle cx="16.5" cy="21.5" r="1.5" />
        <path d="M5.5 12V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v7" />
      </svg>
    ),
  },
  {
    id: "room",
    label: "Room Assignment",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14" />
        <path d="M9 21V13h6v8" />
        <path d="M1 21h22" />
        <path d="M10 9h4" />
      </svg>
    ),
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
  },
];

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeSection, setActiveSection] = useState("itinerary");

  useEffect(() => {
    const flag = sessionStorage.getItem("wedding-guest-auth");
    if (!flag) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    if (!authorized) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [authorized]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950">
      <Navbar />

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-20 bottom-0 w-64 border-r border-white/[0.04] bg-stone-950/80 backdrop-blur-sm z-30 pt-8 pb-6">
          <nav className="flex-1 px-4 space-y-1">
            {NAV_ITEMS.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-body text-sm transition-all duration-200 group ${
                  activeSection === id
                    ? "bg-amber-400/[0.08] text-amber-300"
                    : "text-stone-500 hover:text-stone-300 hover:bg-white/[0.03]"
                }`}
              >
                <span
                  className={`transition-colors duration-200 ${
                    activeSection === id
                      ? "text-amber-400"
                      : "text-stone-600 group-hover:text-stone-400"
                  }`}
                >
                  {icon}
                </span>
                {label}
              </button>
            ))}
          </nav>

          <div className="px-6">
            <div className="h-px bg-white/[0.04] mb-4" />
            <button
              onClick={() => {
                sessionStorage.removeItem("wedding-guest-auth");
                router.push("/login");
              }}
              className="flex items-center gap-3 text-stone-600 hover:text-stone-400 font-body text-xs tracking-wide transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-64 pb-20 lg:pb-0">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-white/[0.06]">
        <div className="flex items-center justify-around h-16 px-2">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors duration-200 ${
                activeSection === id
                  ? "text-amber-400"
                  : "text-stone-600 active:text-stone-400"
              }`}
            >
              {icon}
              <span className="text-[9px] font-body tracking-wider uppercase">
                {label.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

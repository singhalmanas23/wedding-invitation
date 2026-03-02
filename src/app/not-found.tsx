import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-950 text-stone-100 px-6">
      <p className="text-amber-400/60 text-sm tracking-[0.3em] uppercase mb-4">
        Lost in the celebration
      </p>
      <h1 className="font-serif text-5xl md:text-7xl mb-6">404</h1>
      <p className="text-stone-400 text-lg mb-10 text-center max-w-md">
        This page doesn&apos;t exist — but the celebration does. Let&apos;s get
        you back on track.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full text-sm tracking-wider uppercase hover:from-amber-500 hover:to-amber-600 transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}

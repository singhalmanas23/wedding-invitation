import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoyalWardrobePage from "@/components/sections/RoyalWardrobe";

export default function WardrobePage() {
    return (
        <main>
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0c0a09]" />}>
                <RoyalWardrobePage />
            </Suspense>
            <Footer />
        </main>
    );
}

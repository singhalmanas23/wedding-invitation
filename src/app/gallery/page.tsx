import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryContent from "./gallery-content";

export const metadata: Metadata = {
  title: "Gallery — T & S Wedding",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <GalleryContent />
      <Footer />
    </>
  );
}

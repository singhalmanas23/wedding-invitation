import type { Metadata } from "next";
import TravelContent from "./TravelContent";

export const metadata: Metadata = {
  title: "Royal Arrival — T & S Wedding",
};

export default function TravelPage() {
  return <TravelContent />;
}

import { Metadata } from "next";
import ItineraryContent from "./ItineraryContent";

export const metadata: Metadata = {
  title: "Itinerary — T & S Wedding",
  description: "Your guide to three days of celebration",
  openGraph: {
    title: "Itinerary — T & S Wedding",
    description: "Your guide to three days of celebration",
  },
};

export default function ItineraryPage() {
  return <ItineraryContent />;
}

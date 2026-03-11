import { Metadata } from "next";
import ItineraryContent from "./ItineraryContent";

export const metadata: Metadata = {
  title: "Itinerary — T & S Wedding",
  description: "The celebration in Udaipur (Apr 20–21)",
  openGraph: {
    title: "Itinerary — T & S Wedding",
    description: "The celebration in Udaipur (Apr 20–21)",
  },
};

export default function ItineraryPage() {
  return <ItineraryContent />;
}

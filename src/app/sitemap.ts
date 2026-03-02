import { MetadataRoute } from "next";
import { EVENTS } from "@/content/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tanviandsahil.com";

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/itinerary`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/travel`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/stay`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/rsvp`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  const chapterRoutes = EVENTS.map((event) => ({
    url: `${baseUrl}/chapter/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...chapterRoutes];
}

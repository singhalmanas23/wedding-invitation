import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EVENTS, getEventBySlug } from "@/content/events";
import ChapterContent from "./ChapterContent";

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return { title: "Chapter Not Found — T & S Wedding" };
  }

  return {
    title: `${event.title} — T & S Wedding`,
    description: event.tagline,
    openGraph: {
      title: `${event.title} — T & S Wedding`,
      description: event.tagline,
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return <ChapterContent event={event} />;
}

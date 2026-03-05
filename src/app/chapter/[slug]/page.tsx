import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EVENTS, getEventBySlug } from "@/content/events";
import ChapterContent from "./ChapterContent";
import FirstChapterContent from "./FirstChapterContent";
import SecondChapterContent from "./SecondChapterContent";
import ThirdChapterContent from "./ThirdChapterContent";
import FourthChapterContent from "./FourthChapterContent";
import FifthChapterContent from "./FifthChapterContent";
import SixthChapterContent from "./SixthChapterContent";
import SeventhChapterContent from "./SeventhChapterContent";

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

  if (slug === "first-chapter") {
    return <FirstChapterContent event={event} />;
  }

  if (slug === "courtyard-edit") {
    return <SecondChapterContent event={event} />;
  }

  if (slug === "midnight-cathedral") {
    return <FourthChapterContent event={event} />;
  }

  if (slug === "world-of-our-own") {
    return <FifthChapterContent event={event} />;
  }

  if (slug === "royal-court") {
    return <SixthChapterContent event={event} />;
  }

  if (slug === "thrill-theory") {
    return <SeventhChapterContent event={event} />;
  }

  return <ChapterContent event={event} />;
}

import { ChapterPalette } from "@/types";

interface DressCodeBadgeProps {
  title: string;
  palette: ChapterPalette;
}

export default function DressCodeBadge({ title, palette }: DressCodeBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-body font-medium border"
      style={{
        color: palette.accent,
        borderColor: `${palette.accent}30`,
        backgroundColor: `${palette.accent}0a`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: palette.accent }}
      />
      {title}
    </span>
  );
}

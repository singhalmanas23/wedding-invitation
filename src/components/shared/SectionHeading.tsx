import { P } from "@/components/shared/RoyalPageLayout";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {/* Gold flourish above */}
      <div
        className={`flex items-center gap-2 mb-6 ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
        aria-hidden="true"
      >
        <div
          className="h-px w-8 md:w-14"
          style={{
            background: `linear-gradient(to right, transparent, ${P.gold}25)`,
          }}
        />
        <div
          className="w-1 h-1 rotate-45"
          style={{ border: `1px solid ${P.gold}30` }}
        />
        <div
          className="h-px w-8 md:w-14"
          style={{
            background: `linear-gradient(to left, transparent, ${P.gold}25)`,
          }}
        />
      </div>

      <h2
        className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight"
        style={{ color: `${P.cream}e6` }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-base md:text-lg font-body max-w-xl mx-auto leading-relaxed"
          style={{ color: `${P.cream}66` }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

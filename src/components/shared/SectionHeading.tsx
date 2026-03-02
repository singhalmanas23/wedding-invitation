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
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-100 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-stone-400 text-base md:text-lg font-body max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

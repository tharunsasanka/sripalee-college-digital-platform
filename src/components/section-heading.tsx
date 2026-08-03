export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#741f2b]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-[#4e111b] md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-7 text-black/65 md:text-lg">{description}</p> : null}
      <div className={`gold-line mt-6 ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}

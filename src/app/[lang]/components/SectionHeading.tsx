interface SectionHeadingProps {
  heading: string;
  description?: string;
  align?: "left" | "center";
  accentColor?: "red" | "teal";
}

export default function SectionHeading({
  heading,
  description,
  align = "center",
  accentColor = "teal",
}: SectionHeadingProps) {
  const accentBar =
    accentColor === "red"
      ? "bg-ami-red"
      : "bg-ami-teal";

  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      <div
        className={`w-10 h-1 rounded-full mb-4 ${accentBar} ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      <h2 className="text-2xl md:text-3xl font-bold text-ami-navy tracking-tight">
        {heading}
      </h2>
      {description && (
        <p className="mt-3 text-ami-slate max-w-2xl leading-relaxed text-base md:text-lg mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

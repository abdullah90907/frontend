

interface WhatWeDoItem {
  id: number;
  text: string;
}

interface WhatWeDoProps {
  data: {
    heading: string;
    description?: string;
    items?: WhatWeDoItem[];
  };
}

// Fallback list — always shows even when CMS returns empty
const FALLBACK_ITEMS = [
  "Professional video production for brands and organizations",
  "Social media content creation and management",
  "Branding, digital strategy, and marketing campaigns",
  "Academic congress and event organization",
  "Live streaming and event coverage",
  "Research publication support and academic writing",
  "Manuscript formatting and preparation",
  "Scientific infographic and figure design",
  "Publication-ready visual material production",
  "Post-event media production and documentation",
  "Digital marketing and growth strategies",
  "Corporate and institutional collaborations",
];

const HIGHLIGHT_CARDS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Media & Video",
    color: "text-ami-teal",
    bg: "bg-ami-teal/8",
    border: "border-ami-teal/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Digital Strategy",
    color: "text-ami-red",
    bg: "bg-ami-red/8",
    border: "border-ami-red/20",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Academic Services",
    color: "text-ami-navy",
    bg: "bg-ami-navy/8",
    border: "border-ami-navy/20",
  },
];

export default function WhatWeDo({ data }: WhatWeDoProps) {
  const rawItems = data?.items ?? [];
  const displayItems =
    rawItems.length > 0
      ? rawItems.map((it) => it.text)
      : FALLBACK_ITEMS;

  return (
    <section className="section-padding bg-white" id="what-we-do">
      <div className="container-ami">
        {/* Heading — on white background */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-ami-red rounded-full" />
            <span className="text-ami-red text-xs font-semibold uppercase tracking-widest">
              Our Capabilities
            </span>
            <div className="w-8 h-0.5 bg-ami-red rounded-full" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ami-navy tracking-tight">
            {data?.heading || "What We Do"}
          </h2>
          {data?.description && (
            <p className="mt-3 text-ami-slate text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* ── 3 category highlight cards ── */}
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {HIGHLIGHT_CARDS.map((card) => (
            <div
              key={card.title}
              className={`flex items-center gap-4 p-5 rounded-xl border border-ami-gray-200 bg-ami-gray-warm`}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-card ${card.color}`}>
                {card.icon}
              </div>
              <span className="text-ami-navy font-semibold text-sm leading-snug">{card.title}</span>
            </div>
          ))}
        </div>

        {/* ── Checklist grid ── */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((text, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-ami-gray-warm border border-ami-gray-200 hover:border-ami-teal/40 hover:bg-white transition-default group"
            >
              {/* Check badge */}
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-ami-teal/15 border border-ami-teal/30 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-ami-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-ami-slate group-hover:text-ami-navy leading-relaxed transition-default">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

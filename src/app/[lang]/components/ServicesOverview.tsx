import Link from "next/link";
import SectionHeading from "./SectionHeading";

interface ServicesOverviewProps {
  data: {
    heading?: string;
    description?: string;
  };
}

const SERVICES = [
  {
    title: "Video Production",
    description: "Professional video production for brands, organizations, and digital campaigns — from concept to final cut.",
    icon: "🎬",
    href: "/services/video-production",
    image: "/images/tech-1.jpg",
    tag: "Media",
    tagColor: "bg-ami-navy text-white",
  },
  {
    title: "Content Creation",
    description: "High-quality, audience-driven content for social media, websites, blogs, and marketing channels.",
    icon: "✍️",
    href: "/services/content-creation",
    image: "/images/tech-2.jpg",
    tag: "Creative",
    tagColor: "bg-ami-teal text-white",
  },
  {
    title: "Social Media Management",
    description: "Strategic planning, scheduling, and community engagement to grow your digital presence.",
    icon: "📱",
    href: "/services/social-media-management",
    image: "/images/services-bg.jpg",
    tag: "Digital",
    tagColor: "bg-ami-teal text-white",
  },
  {
    title: "Branding & Digital Strategy",
    description: "Complete brand identity design, positioning, messaging, and comprehensive digital strategy.",
    icon: "🎯",
    href: "/services/branding-digital-strategy",
    image: "/images/branding-vs-marketing.jpg",
    tag: "Strategy",
    tagColor: "bg-ami-red text-white",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven SEO, SEM, and performance marketing campaigns for measurable, lasting growth.",
    icon: "📊",
    href: "/services/digital-marketing",
    image: "/images/digital_marketing.png",
    tag: "Growth",
    tagColor: "bg-ami-red text-white",
  },
  {
    title: "Research Publication Support",
    description: "Academic writing, manuscript formatting, scientific visuals, and publication-ready materials.",
    icon: "📚",
    href: "/services/research-publication-support",
    image: "/images/research_publication.png",
    tag: "Academic",
    tagColor: "bg-ami-navy text-white",
  },
];

export default function ServicesOverview({ data }: ServicesOverviewProps) {
  return (
    <section className="section-padding bg-ami-gray-warm" id="services-overview">
      <div className="container-ami">
        <SectionHeading
          heading={data?.heading || "Our Services"}
          description={data?.description || "Delivering high-impact visual, digital, and academic communication solutions"}
          accentColor="teal"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <Link key={svc.href} href={svc.href} className="group block">
              <div className="card-base overflow-hidden h-full flex flex-col">

                {/* ── Image slot — fixed 16/9 aspect ratio ── */}
                <div className="relative aspect-[16/9] bg-ami-gray-100 overflow-hidden">
                  {svc.image ? (
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ami-gray-100 to-ami-gray-200">
                      <span className="text-5xl">{svc.icon}</span>
                    </div>
                  )}

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-ami-navy/0 group-hover:bg-ami-navy/30 transition-default" />

                  {/* Category tag badge */}
                  <span
                    className={`absolute top-3 left-3 text-2xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${svc.tagColor}`}
                  >
                    {svc.tag}
                  </span>
                </div>

                {/* ── Card body ── */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="font-semibold text-ami-navy text-base mb-2 group-hover:text-ami-teal transition-default leading-snug">
                    {svc.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-8 h-0.5 bg-ami-gray-200 group-hover:bg-ami-teal transition-default mb-3 rounded-full" />

                  {/* Description */}
                  <p className="text-ami-gray-400 text-sm leading-relaxed flex-1">
                    {svc.description}
                  </p>

                  {/* CTA row */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-ami-teal text-xs font-semibold group-hover:gap-2 transition-all">
                      Learn more
                      <svg
                        className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <div className="w-7 h-7 rounded-full bg-ami-gray-100 flex items-center justify-center group-hover:bg-ami-teal/10 transition-default">
                      <span className="text-base leading-none">{svc.icon}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-12">
          <Link href="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

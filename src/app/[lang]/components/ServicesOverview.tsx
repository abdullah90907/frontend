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
    description: "Professional video production for brands, organizations, and digital campaigns.",
    icon: "🎬",
    href: "/services/video-production",
    image: "/images/tech-1.jpg",
  },
  {
    title: "Content Creation",
    description: "High-quality content for social media, websites, and marketing channels.",
    icon: "✍️",
    href: "/services/content-creation",
    image: "/images/tech-2.jpg",
  },
  {
    title: "Social Media Management",
    description: "Strategic social media planning, scheduling, and audience engagement.",
    icon: "📱",
    href: "/services/social-media-management",
    image: "/images/services-bg.jpg",
  },
  {
    title: "Branding & Digital Strategy",
    description: "Complete brand identity and digital strategy solutions.",
    icon: "🎯",
    href: "/services/branding-digital-strategy",
    image: null,
  },
  {
    title: "Digital Marketing",
    description: "Data-driven digital marketing campaigns for measurable growth.",
    icon: "📊",
    href: "/services/digital-marketing",
    image: null,
  },
  {
    title: "Research Publication Support",
    description: "Academic writing, manuscript formatting, and publication-ready materials.",
    icon: "📚",
    href: "/services/research-publication-support",
    image: null,
  },
];

export default function ServicesOverview({ data }: ServicesOverviewProps) {
  return (
    <section className="section-padding bg-ami-gray-warm" id="services-overview">
      <div className="container-ami">
        <SectionHeading
          heading={data?.heading || "Our Services"}
          description={data?.description || "Delivering high-impact visual and communication solutions"}
          accentColor="teal"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <Link key={svc.href} href={svc.href} className="group block">
              <div className="card-base overflow-hidden h-full flex flex-col group-hover:border-ami-teal">
                {/* Image slot – fixed aspect ratio */}
                <div className="relative aspect-[16/9] bg-ami-gray-100 overflow-hidden">
                  {svc.image ? (
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ami-gray-100 to-ami-gray-200">
                      <span className="text-4xl">{svc.icon}</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-ami-navy/0 group-hover:bg-ami-navy/20 transition-default" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-ami-navy text-base mb-1.5 group-hover:text-ami-teal transition-default">
                    {svc.title}
                  </h3>
                  <p className="text-ami-gray-400 text-sm leading-relaxed flex-1">
                    {svc.description}
                  </p>
                  <div className="mt-3 flex items-center text-ami-teal text-xs font-medium">
                    <span>Learn more</span>
                    <svg className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

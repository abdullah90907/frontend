import ServicesOverviewGrid from "./ServicesOverviewGrid";
import SectionHeading from "./SectionHeading";
import { getAllServices } from "../utils/strapi";
import { getStrapiMedia } from "../utils/api-helpers";

interface ServicesOverviewProps {
  data: {
    heading?: string;
    description?: string;
  };
}

// Fallback when CMS has no services yet — ensures the section never looks empty
const FALLBACK_SERVICES = [
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

// Maps category names to tag labels/colors
function getCategoryTag(catName?: string): { tag: string; tagColor: string } {
  if (!catName) return { tag: "Service", tagColor: "bg-ami-teal text-white" };
  const lower = catName.toLowerCase();
  if (lower.includes("media") || lower.includes("video"))
    return { tag: "Media", tagColor: "bg-ami-navy text-white" };
  if (lower.includes("content") || lower.includes("creative"))
    return { tag: "Creative", tagColor: "bg-ami-teal text-white" };
  if (lower.includes("social") || lower.includes("digital marketing"))
    return { tag: "Digital", tagColor: "bg-ami-teal text-white" };
  if (lower.includes("brand") || lower.includes("strategy"))
    return { tag: "Strategy", tagColor: "bg-ami-red text-white" };
  if (lower.includes("market") || lower.includes("growth"))
    return { tag: "Growth", tagColor: "bg-ami-red text-white" };
  if (lower.includes("academ") || lower.includes("research") || lower.includes("publication"))
    return { tag: "Academic", tagColor: "bg-ami-navy text-white" };
  return { tag: "Service", tagColor: "bg-ami-teal text-white" };
}

export default async function ServicesOverview({ data }: ServicesOverviewProps) {
  // Fetch services from CMS
  const cmsServices = await getAllServices();

  // Map CMS data to display format, or fall back to hardcoded list
  const services =
    cmsServices.length > 0
      ? cmsServices.map((svc: any) => {
          const attrs = svc.attributes || svc;
          const coverUrl = getStrapiMedia(attrs.coverImage?.data?.attributes?.url ?? null);
          const catName = attrs.serviceCategory?.data?.attributes?.name;
          const catSlug = attrs.serviceCategory?.data?.attributes?.slug;
          const { tag, tagColor } = getCategoryTag(catName || attrs.title);

          return {
            title: attrs.title,
            description: attrs.summary || "",
            icon: "📋",
            href: catSlug ? `/${catSlug}/${attrs.slug}` : `/services/${attrs.slug}`,
            image: coverUrl || null,
            tag,
            tagColor,
          };
        })
      : FALLBACK_SERVICES;

  return (
    <section className="section-padding bg-ami-gray-warm" id="services-overview">
      <div className="container-ami">
        <SectionHeading
          heading={data?.heading || "Our Services"}
          description={data?.description || "Delivering high-impact visual, digital, and academic communication solutions"}
          accentColor="teal"
        />

        <ServicesOverviewGrid
          services={services}
          mode="link"
          ctaHref="/services"
          ctaLabel="View All Services"
        />
      </div>
    </section>
  );
}

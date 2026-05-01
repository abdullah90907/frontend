import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { getServiceCategories } from "../utils/strapi";
import { getStrapiMedia } from "../utils/api-helpers";

interface ServiceGridProps {
  data: {
    heading?: string;
    description?: string;
  };
}

export default async function ServiceGrid({ data }: ServiceGridProps) {
  const categories = await getServiceCategories();

  return (
    <section className="section-padding bg-white" id="service-grid">
      <div className="container-ami">
        <SectionHeading
          heading={data?.heading || "Our Services"}
          description={data?.description || "Comprehensive scientific and academic services"}
          accentColor="teal"
        />

        {categories.length === 0 ? (
          <p className="text-center text-ami-gray-400 py-8">Services coming soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat: any) => {
              const attrs = cat.attributes || cat;
              const iconUrl = getStrapiMedia(
                attrs.icon?.data?.attributes?.url ?? null
              );
              const serviceCount = attrs.services?.data?.length ?? 0;

              return (
                <Link
                  key={cat.id}
                  href={`/${attrs.slug}`}
                  className="group block"
                >
                  <div className="card-base p-6 h-full flex flex-col group-hover:border-ami-teal">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-ami-teal/10 flex items-center justify-center mb-5 group-hover:bg-ami-teal/20 transition-default">
                      {iconUrl ? (
                        <img src={iconUrl} alt="" className="w-6 h-6 object-contain" />
                      ) : (
                        <svg className="w-6 h-6 text-ami-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-semibold text-ami-navy text-lg mb-2 group-hover:text-ami-teal transition-default">
                      {attrs.name}
                    </h3>
                    {attrs.description && (
                      <p className="text-ami-slate text-sm leading-relaxed flex-1 line-clamp-3">
                        {attrs.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-ami-gray-200 flex items-center justify-between">
                      <span className="text-2xs text-ami-gray-400 font-medium">
                        {serviceCount} {serviceCount === 1 ? "service" : "services"}
                      </span>
                      <span className="text-ami-teal text-xs font-medium flex items-center group-hover:translate-x-0.5 transition-transform">
                        Explore
                        <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

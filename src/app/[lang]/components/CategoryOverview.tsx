import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import { getServicesByCategorySlug } from "../utils/strapi";
import { getStrapiMedia } from "../utils/api-helpers";

interface CategoryOverviewProps {
  data: {
    heading?: string;
    description?: string;
    categorySlug: string;
  };
}

export default async function CategoryOverview({ data }: CategoryOverviewProps) {
  const services = await getServicesByCategorySlug(data.categorySlug);

  return (
    <section className="section-padding bg-ami-gray-warm" id="category-overview">
      <div className="container-ami">
        {(data.heading || data.description) && (
          <SectionHeading
            heading={data.heading || "Our Services"}
            description={data.description}
            accentColor="teal"
          />
        )}

        {services.length === 0 ? (
          <p className="text-center text-ami-gray-400 py-8">
            Services in this category are being prepared.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((svc: any) => {
              const attrs = svc.attributes || svc;
              const catSlug =
                attrs.serviceCategory?.data?.attributes?.slug ?? data.categorySlug;
              const iconUrl = getStrapiMedia(
                attrs.icon?.data?.attributes?.url ?? null
              );

              return (
                <ServiceCard
                  key={svc.id}
                  title={attrs.title}
                  summary={attrs.summary}
                  slug={attrs.slug}
                  categorySlug={catSlug}
                  iconUrl={iconUrl}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

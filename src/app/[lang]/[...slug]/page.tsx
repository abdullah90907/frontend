import {Metadata} from "next";
import {getPageBySlug} from "@/app/[lang]/utils/get-page-by-slug";
import {FALLBACK_SEO} from "@/app/[lang]/utils/constants";
import componentResolver from "../utils/component-resolver";
import ServiceGrid from "../components/ServiceGrid";


type Props = {
    params: {
        lang: string,
        slug: string[]
    }
}

function resolveSlug(slug: string | string[]): string {
    if (Array.isArray(slug)) return slug.join('/');
    return slug;
}


export async function generateMetadata({params}: Props): Promise<Metadata> {
    const slugStr = resolveSlug(params.slug);
    const page = await getPageBySlug(slugStr, params.lang);

    if (!page?.data?.[0]?.attributes?.seo) return FALLBACK_SEO;
    const metadata = page.data[0].attributes.seo;

    return {
        title: `${metadata.metaTitle} | Advanced Multiple Inc.`,
        description: metadata.metaDescription,
    };
}


export default async function PageRoute({params}: Props) {
    const slugStr = resolveSlug(params.slug);
    const page = await getPageBySlug(slugStr, params.lang);

    if (!page?.data || page.data.length === 0) {
        return (
            <div className="container-ami py-20 text-center">
                <h1 className="text-2xl font-bold text-ami-navy mb-3">Page Not Found</h1>
                <p className="text-ami-slate">
                    The page <span className="font-mono text-ami-teal">/{slugStr}</span> has not been created in the CMS yet.
                </p>
                <p className="text-sm text-ami-gray-400 mt-2">
                    Create a Page entry in Strapi with slug &quot;{slugStr}&quot; to populate this page.
                </p>
            </div>
        );
    }

    const contentSections = page.data[0].attributes.contentSections;
    if (!contentSections || contentSections.length === 0) {
        if (slugStr === "services") {
            return (
                <ServiceGrid
                    data={{
                        heading: "Our Services",
                        description: "Explore our complete range of services",
                    }}
                />
            );
        }
        return (
            <div className="container-ami py-20 text-center">
                <h1 className="text-2xl font-bold text-ami-navy mb-3">
                    {page.data[0].attributes.heading || page.data[0].attributes.shortName || slugStr}
                </h1>
                <p className="text-ami-slate">
                    This page is being prepared. Content sections will appear here once added in the CMS.
                </p>
            </div>
        );
    }

    if (slugStr === "services") {
        const filteredSections = contentSections.filter((section: any) => {
            return section.__component !== "sections.service-grid" && section.__component !== "sections.category-overview";
        });
        return filteredSections.map((section: any, index: number) => componentResolver(section, index));
    }

    return contentSections.map((section: any, index: number) => componentResolver(section, index));
}

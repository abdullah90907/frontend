import Link from "next/link";

interface ServiceCardProps {
  title: string;
  summary?: string;
  slug: string;
  categorySlug?: string;
  iconUrl?: string | null;
}

export default function ServiceCard({
  title,
  summary,
  slug,
  categorySlug,
  iconUrl,
}: ServiceCardProps) {
  const href = categorySlug
    ? `/${categorySlug}/${slug}`
    : `/${slug}`;

  return (
    <Link href={href} className="group block">
      <div className="card-base p-5 h-full flex flex-col group-hover:border-ami-teal">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-ami-gray-warm flex items-center justify-center mb-4 group-hover:bg-ami-teal/10 transition-default">
          {iconUrl ? (
            <img src={iconUrl} alt="" className="w-5 h-5 object-contain" />
          ) : (
            <svg
              className="w-5 h-5 text-ami-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </div>

        {/* Content */}
        <h3 className="font-semibold text-ami-navy text-sm mb-1.5 group-hover:text-ami-teal transition-default">
          {title}
        </h3>
        {summary && (
          <p className="text-ami-gray-400 text-xs leading-relaxed line-clamp-2 flex-1">
            {summary}
          </p>
        )}

        {/* Arrow */}
        <div className="mt-3 flex items-center text-ami-teal text-xs font-medium opacity-0 group-hover:opacity-100 transition-default">
          <span>Learn more</span>
          <svg className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

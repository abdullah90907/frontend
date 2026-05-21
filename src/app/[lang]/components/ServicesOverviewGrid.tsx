"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  href: string;
  image: string | null;
  tag: string;
  tagColor: string;
}

interface ServicesOverviewGridProps {
  services: ServiceItem[];
  initialCount?: number;
  mode?: "toggle" | "link";
  ctaHref?: string;
  ctaLabel?: string;
}

export default function ServicesOverviewGrid({
  services,
  initialCount = 6,
  mode = "toggle",
  ctaHref = "/services",
  ctaLabel = "View All Services",
}: ServicesOverviewGridProps) {
  const pathname = usePathname();
  const isServicesPage = Boolean(pathname && /\/services(\/|$)/.test(pathname));
  const effectiveMode = isServicesPage ? "toggle" : mode;
  const [showAll, setShowAll] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const visibleServices = useMemo(() => {
    if (showAll) return services;
    return services.slice(0, initialCount);
  }, [services, showAll, initialCount]);

  const canToggle = services.length > initialCount;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleServices.map((svc) => (
          <Link key={svc.href} href={svc.href} className="group block">
            <div className="card-base overflow-hidden h-full flex flex-col">
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

                <div className="absolute inset-0 bg-ami-navy/0 group-hover:bg-ami-navy/30 transition-default" />

                <span
                  className={`absolute top-3 left-3 text-2xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${svc.tagColor}`}
                >
                  {svc.tag}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-ami-navy text-base mb-2 group-hover:text-ami-teal transition-default leading-snug">
                  {svc.title}
                </h3>
                <div className="w-8 h-0.5 bg-ami-gray-200 group-hover:bg-ami-teal transition-default mb-3 rounded-full" />
                <p className="text-ami-gray-400 text-sm leading-relaxed flex-1">
                  {svc.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-ami-teal text-xs font-semibold group-hover:gap-2 transition-all">
                    Learn more
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <div className="text-center mt-12">
        {effectiveMode === "link" ? (
          <Link href={ctaHref} className="btn-primary">
            {ctaLabel}
          </Link>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                if (!canToggle) {
                  setNotice("No more services available yet.");
                  return;
                }
                setNotice(null);
                setShowAll((prev) => !prev);
              }}
              className="btn-primary"
            >
              {showAll ? "Show Less" : "View All Services"}
            </button>
            {notice && (
              <p className="mt-3 text-sm text-ami-gray-400">
                {notice}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getLocaleFromPath(pathname: string) {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/i);
  return match ? match[1] : null;
}

export default function ServicesOverviewCta() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname || "");
  const href = locale ? `/${locale}/services#category-overview` : "/services#category-overview";

  return (
    <Link href={href} className="btn-primary">
      View All Services
    </Link>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

/* ── Navigation data structure ───────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Introduction", href: "/about" },
      { label: "Mission", href: "/about/mission" },
      { label: "Our Team", href: "/about/our-team" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Video Production", href: "/services/video-production" },
      { label: "Content Creation", href: "/services/content-creation" },
      { label: "Social Media Management", href: "/services/social-media-management" },
      { label: "Branding & Digital Strategy", href: "/services/branding-digital-strategy" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Research Publication Support", href: "/services/research-publication-support" },
      { label: "Academic Writing & Editing", href: "/services/academic-writing-editing" },
      { label: "Manuscript Formatting", href: "/services/manuscript-formatting" },
      { label: "Infographic & Figure Design", href: "/services/infographic-figure-design" },
      { label: "Scientific Image Design", href: "/services/scientific-image-design" },
      { label: "Publication-Ready Material", href: "/services/publication-ready-material" },
    ],
  },
  {
    label: "Congresses",
    href: "/congresses",
    children: [
      { label: "Academic Congresses", href: "/congresses/academic-congresses" },
      { label: "Scientific Exhibitions", href: "/congresses/scientific-exhibitions" },
      { label: "Event Coverage Photo/Video", href: "/congresses/event-coverage" },
      { label: "Live Streaming", href: "/congresses/live-streaming" },
      { label: "Promotional Content", href: "/congresses/promotional-content" },
      { label: "Post-Event Media Production", href: "/congresses/post-event-media" },
    ],
  },
  {
    label: "Affiliations",
    href: "/affiliations",
    children: [
      { label: "Corporate Affiliations", href: "/affiliations/corporate-affiliations" },
      { label: "Partner Organizations", href: "/affiliations/partner-organizations" },
      { label: "Institutional Collaborations", href: "/affiliations/institutional-collaborations" },
      { label: "Academic & Industry Associations", href: "/affiliations/academic-industry-associations" },
      { label: "Strategic Alliances", href: "/affiliations/strategic-alliances" },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    children: [
      { label: "Sample Videos", href: "/portfolio/sample-videos" },
      { label: "Past Projects", href: "/portfolio/past-projects" },
      { label: "Client Work", href: "/portfolio/client-work" },
      { label: "Research Article Samples", href: "/portfolio/research-article-samples" },
      { label: "Infographic / Figure Samples", href: "/portfolio/infographic-figure-samples" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/* ── Desktop dropdown item ─ */
function DesktopNavItem({
  item,
  currentPath,
}: {
  item: (typeof NAV_ITEMS)[0];
  currentPath: string;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const hasChildren = "children" in item && item.children && item.children.length > 0;
  const isActive =
    currentPath === item.href ||
    (hasChildren && item.children!.some((c) => currentPath === c.href));

  const handleEnter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-default rounded-md
          ${isActive ? "text-ami-red" : "text-ami-navy hover:text-ami-teal"}`}
      >
        {item.label}
        {hasChildren && (
          <svg
            className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>

      {/* Dropdown */}
      {hasChildren && open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-ami-gray-200 rounded-lg shadow-elevated py-2 z-50 max-h-[70vh] overflow-y-auto">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block px-4 py-2 text-sm transition-default
                ${currentPath === child.href
                  ? "text-ami-red bg-ami-gray-warm font-medium"
                  : "text-ami-slate hover:text-ami-teal hover:bg-ami-gray-warm"
                }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Navbar ─ */
export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const path = usePathname();

  // Strip the lang prefix for matching (e.g. /en/about → /about)
  const currentPath = path.replace(/^\/[a-z]{2}(\/|$)/, "/");

  return (
    <header className="bg-white border-b border-ami-gray-200 sticky top-0 z-40 shadow-nav">
      {/* Top bar – email & website */}
      <div className="bg-ami-navy text-white">
        <div className="container-ami flex items-center justify-between py-1.5 text-xs">
          <a href="mailto:office@advancedmultiple.ca" className="hover:text-ami-teal-light transition-default">
            office@advancedmultiple.ca
          </a>
          <a href="https://advancedmultiple.ca" target="_blank" rel="noopener" className="hover:text-ami-teal-light transition-default hidden sm:inline">
            advancedmultiple.ca
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-ami">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/images/ami-logo.png" alt="Advanced Multiple Inc." className="h-12 w-auto" />
            <div className="hidden sm:block">
              <span className="text-base font-bold text-ami-navy leading-tight block">
                Advanced Multiple
              </span>
              <span className="text-2xs text-ami-gray-400 leading-tight block">
                Incorporation, Canada
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem key={item.href} item={item} currentPath={currentPath} />
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="xl:hidden p-2 rounded-md text-ami-navy hover:bg-ami-gray-warm transition-default"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-ami-gray-200 bg-white shadow-elevated">
          <nav className="container-ami py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const hasChildren = "children" in item && item.children && item.children.length > 0;
              const isExpanded = mobileExpanded === item.href;

              return (
                <div key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2.5 text-sm font-medium rounded-md flex-1 transition-default
                        ${currentPath === item.href ? "text-ami-red bg-ami-gray-warm" : "text-ami-navy hover:bg-ami-gray-warm"}`}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item.href)}
                        className="p-2 text-ami-gray-400 hover:text-ami-navy transition-default"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {hasChildren && isExpanded && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-ami-gray-200 pl-3">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-3 py-2 text-sm rounded-md transition-default
                            ${currentPath === child.href
                              ? "text-ami-red font-medium"
                              : "text-ami-slate hover:text-ami-teal hover:bg-ami-gray-warm"
                            }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

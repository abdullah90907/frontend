"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, type ReactNode } from "react";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface NavSection {
  id?: number;
  label: string;
  href: string;
  links: Array<NavLink>;
}

const DEFAULT_NAV_SECTIONS: Array<NavSection> = [
  {
    id: 1,
    label: "Home",
    href: "/",
    links: [],
  },
  {
    id: 2,
    label: "About",
    href: "/about",
    links: [
      { id: 21, text: "Introduction", url: "/about", newTab: false },
      { id: 22, text: "Mission", url: "/about/mission", newTab: false },
      { id: 23, text: "Our Team", url: "/about/our-team", newTab: false },
    ],
  },
  {
    id: 3,
    label: "Services",
    href: "/services",
    links: [
      { id: 31, text: "Video Production", url: "/services/video-production", newTab: false },
      { id: 32, text: "Content Creation", url: "/services/content-creation", newTab: false },
      { id: 33, text: "Social Media Management", url: "/services/social-media-management", newTab: false },
      { id: 34, text: "Branding & Digital Strategy", url: "/services/branding-digital-strategy", newTab: false },
      { id: 35, text: "Digital Marketing", url: "/services/digital-marketing", newTab: false },
      { id: 36, text: "Research Publication Support", url: "/services/research-publication-support", newTab: false },
      { id: 37, text: "Academic Writing & Editing", url: "/services/academic-writing-editing", newTab: false },
      { id: 38, text: "Manuscript Formatting", url: "/services/manuscript-formatting", newTab: false },
      { id: 39, text: "Infographic & Figure Design", url: "/services/infographic-figure-design", newTab: false },
      { id: 40, text: "Scientific Image Design", url: "/services/scientific-image-design", newTab: false },
      { id: 41, text: "Publication-Ready Material", url: "/services/publication-ready-material", newTab: false },
    ],
  },
  {
    id: 4,
    label: "Congresses",
    href: "/congresses",
    links: [
      { id: 41, text: "Academic Congresses", url: "/congresses/academic-congresses", newTab: false },
      { id: 42, text: "Scientific Exhibitions", url: "/congresses/scientific-exhibitions", newTab: false },
      { id: 43, text: "Event Coverage Photo/Video", url: "/congresses/event-coverage", newTab: false },
      { id: 44, text: "Live Streaming", url: "/congresses/live-streaming", newTab: false },
      { id: 45, text: "Promotional Content", url: "/congresses/promotional-content", newTab: false },
      { id: 46, text: "Post-Event Media Production", url: "/congresses/post-event-media", newTab: false },
    ],
  },
  {
    id: 5,
    label: "Affiliations",
    href: "/affiliations",
    links: [
      { id: 51, text: "Corporate Affiliations", url: "/affiliations/corporate-affiliations", newTab: false },
      { id: 52, text: "Partner Organizations", url: "/affiliations/partner-organizations", newTab: false },
      { id: 53, text: "Institutional Collaborations", url: "/affiliations/institutional-collaborations", newTab: false },
      { id: 54, text: "Academic & Industry Associations", url: "/affiliations/academic-industry-associations", newTab: false },
      { id: 55, text: "Strategic Alliances", url: "/affiliations/strategic-alliances", newTab: false },
    ],
  },
  {
    id: 6,
    label: "Portfolio",
    href: "/portfolio",
    links: [
      { id: 61, text: "Sample Videos", url: "/portfolio/sample-videos", newTab: false },
      { id: 62, text: "Past Projects", url: "/portfolio/past-projects", newTab: false },
      { id: 63, text: "Client Work", url: "/portfolio/client-work", newTab: false },
      { id: 64, text: "Research Article Samples", url: "/portfolio/research-article-samples", newTab: false },
      { id: 65, text: "Infographic / Figure Samples", url: "/portfolio/infographic-figure-samples", newTab: false },
    ],
  },
  {
    id: 7,
    label: "Contact",
    href: "/contact",
    links: [],
  },
];

const DEFAULT_CONTACT_LINKS: Array<NavLink> = [
  { id: 1, text: "office@advancedmultiple.ca", url: "mailto:office@advancedmultiple.ca", newTab: false },
  { id: 2, text: "advancedmultiple.ca", url: "https://advancedmultiple.ca", newTab: true },
  { id: 3, text: "advancedmultiple.com", url: "https://advancedmultiple.com", newTab: true },
];

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");
}

function NavigationLink({
  href,
  newTab,
  className,
  children,
  onClick,
}: {
  href: string;
  newTab?: boolean;
  className: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const openInNewTab = Boolean(newTab) || href.startsWith("http://") || href.startsWith("https://");

  if (!isExternalHref(href) && !openInNewTab) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

/* ── Desktop dropdown item ─ */
function DesktopNavItem({
  item,
  currentPath,
}: {
  item: NavSection;
  currentPath: string;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const hasChildren = item.links.length > 0;
  const isActive =
    currentPath === item.href ||
    (hasChildren && item.links.some((c) => currentPath === c.url));

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
      <NavigationLink
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
      </NavigationLink>

      {/* Dropdown */}
      {hasChildren && open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-ami-gray-200 rounded-lg shadow-elevated py-2 z-50 max-h-[70vh] overflow-y-auto">
          {item.links.map((child) => (
            <NavigationLink
              key={child.id}
              href={child.url}
              newTab={child.newTab}
              className={`block px-4 py-2 text-sm transition-default
                ${currentPath === child.url
                  ? "text-ami-red bg-ami-gray-warm font-medium"
                  : "text-ami-slate hover:text-ami-teal hover:bg-ami-gray-warm"
                }`}
            >
              {child.text}
            </NavigationLink>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Navbar ─ */
export default function Navbar({
  links,
  sections,
  contactLinks,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  sections?: Array<NavSection>;
  contactLinks?: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const path = usePathname();

  // Strip the lang prefix for matching (e.g. /en/about → /about)
  const currentPath = path.replace(/^\/[a-z]{2}(\/|$)/, "/");
  const topbarLinks = contactLinks && contactLinks.length > 0 ? contactLinks : DEFAULT_CONTACT_LINKS;
  const navigationSections = sections && sections.length > 0 ? sections : DEFAULT_NAV_SECTIONS;
  const displayLogo = logoUrl ? logoUrl : "/images/ami-logo.png";
  const emailLinks = topbarLinks.filter((link) => link.url.startsWith("mailto:"));
  const siteLinks = topbarLinks.filter((link) => !link.url.startsWith("mailto:"));

  return (
    <header className="bg-white border-b border-ami-gray-200 sticky top-0 z-40 shadow-nav">
      {/* Top bar – email & website */}
      <div className="bg-ami-navy text-white">
        <div className="container-ami flex flex-col gap-y-1 py-1.5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {emailLinks.map((link) => (
              <NavigationLink
                key={link.id}
                href={link.url}
                newTab={link.newTab}
                className="hover:text-ami-teal-light transition-default"
              >
                {link.text}
              </NavigationLink>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:justify-end">
            {siteLinks.map((link) => (
              <NavigationLink
                key={link.id}
                href={link.url}
                newTab={link.newTab}
                className="hover:text-ami-teal-light transition-default"
              >
                {link.text}
              </NavigationLink>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-ami">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img src={displayLogo} alt={logoText || "Advanced Multiple Inc."} className="h-12 w-auto" />
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
            {navigationSections.map((item) => (
              <DesktopNavItem key={item.id} item={item} currentPath={currentPath} />
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
            {navigationSections.map((item) => {
                const hasChildren = item.links.length > 0;
                const isExpanded = mobileExpanded === item.href;

                return (
                  <div key={item.id}>
                    <div className="flex items-center justify-between">
                      <NavigationLink
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2.5 text-sm font-medium rounded-md flex-1 transition-default ${currentPath === item.href ? "text-ami-red bg-ami-gray-warm" : "text-ami-navy hover:bg-ami-gray-warm"}`}
                      >
                        {item.label}
                      </NavigationLink>
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
                        {item.links.map((child) => (
                          <NavigationLink
                            key={child.id}
                            href={child.url}
                            newTab={child.newTab}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-2 text-sm rounded-md transition-default ${currentPath === child.url
                              ? "text-ami-red font-medium"
                              : "text-ami-slate hover:text-ami-teal hover:bg-ami-gray-warm"
                            }`}
                          >
                            {child.text}
                          </NavigationLink>
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

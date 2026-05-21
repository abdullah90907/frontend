"use client";
import Link from "next/link";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

const FOOTER_SERVICE_LINKS = [
  { label: "Video Production", href: "/services/video-production" },
  { label: "Content Creation", href: "/services/content-creation" },
  { label: "Social Media Management", href: "/services/social-media-management" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Research Publication Support", href: "/services/research-publication-support" },
];

const FOOTER_COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/about/our-team" },
  { label: "Congresses", href: "/congresses" },
  { label: "Affiliations", href: "/affiliations" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_CONTACT_LINKS: Array<FooterLink> = [
  { id: 1, url: "mailto:office@advancedmultiple.ca", newTab: false, text: "office@advancedmultiple.ca" },
  { id: 2, url: "https://advancedmultiple.ca", newTab: true, text: "advancedmultiple.ca" },
  { id: 3, url: "https://advancedmultiple.com", newTab: true, text: "advancedmultiple.com" },
];

export default function Footer({
  logoUrl,
  logoText,
  contactLinks,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  contactLinks: Array<FooterLink>;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {
  const renderedContactLinks = contactLinks && contactLinks.length > 0 ? contactLinks : DEFAULT_CONTACT_LINKS;
  const displayLogo = logoUrl ? logoUrl : "/images/ami-logo.png";

  return (
    <footer className="bg-ami-navy text-white">
      {/* Main footer */}
      <div className="container-ami py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={displayLogo} alt={logoText || "AMI"} className="h-12 w-auto brightness-0 invert" />
              <div>
                <span className="text-base font-bold block leading-tight">
                  Advanced Multiple
                </span>
                <span className="text-2xs text-gray-400 block leading-tight">
                  Incorporation, Canada
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-xs">
              A modern digital media and content production company delivering high-impact visual and communication solutions.
            </p>
            <div className="space-y-1.5">
              {renderedContactLinks.map((link) => {
                const isMail = link.url.startsWith("mailto:");
                const isWeb = link.url.startsWith("http://") || link.url.startsWith("https://");

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.newTab ? "_blank" : undefined}
                    rel={link.newTab ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-ami-teal-light transition-default"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isMail ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      ) : isWeb ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 10-5.656 5.656m1.414-1.414a2 2 0 112.828-2.828m4.95-4.95a8 8 0 10-11.314 11.314l1.414-1.414a6 6 0 118.486-8.486l-1.414 1.414" />
                      )}
                    </svg>
                    {link.text}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-ami-teal-light transition-default"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-ami-teal-light transition-default"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CMS Links Column */}
          <div>
            {menuLinks && menuLinks.length > 0 && (
              <>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2.5">
                  {menuLinks.map((link: FooterLink) => (
                    <li key={link.id}>
                      <Link
                        href={link.url}
                        className="text-sm text-gray-400 hover:text-ami-teal-light transition-default"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-ami py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Advanced Multiple Incorporation. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks?.map((link: FooterLink) => (
              <Link
                key={link.id}
                href={link.url}
                className="text-xs text-gray-500 hover:text-gray-300 transition-default"
              >
                {link.text}
              </Link>
            ))}
            <span className="text-gray-600">|</span>
            <a
              href="https://abdullahsiddique.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-ami-teal-light transition-default"
            >
              Developed by <span className="font-medium text-gray-400">Abdullah Siddique</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

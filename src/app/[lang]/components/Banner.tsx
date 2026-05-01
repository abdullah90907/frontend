"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface BannerProps {
  data: {
    heading: string;
    text: string;
    type: string;
    show: boolean;
    link: {
      id: number;
      url: string;
      newTab: boolean;
      text: string;
    };
  };
}

export default function Banner({ data }: BannerProps) {
  const [showBanner, setShowBanner] = useState(true);
  const pathname = usePathname();

  if (!data || !showBanner || !data.show) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm z-50">
      <div className="bg-white border border-ami-gray-200 rounded-lg shadow-elevated p-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-ami-navy">{data.heading}</p>
            <p className="text-xs text-ami-slate mt-1 leading-relaxed">{data.text}</p>
            {data.link && (
              <Link
                href={data.link.url}
                target={data.link.newTab ? "_blank" : "_self"}
                className="inline-block mt-2 text-xs font-medium text-ami-teal hover:text-ami-teal-dark transition-default"
              >
                {data.link.text} →
              </Link>
            )}
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="flex-shrink-0 text-ami-gray-400 hover:text-ami-navy transition-default"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

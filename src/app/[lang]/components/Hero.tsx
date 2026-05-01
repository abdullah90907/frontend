import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture?.data?.attributes?.url ?? null);

  return (
    <section className="relative bg-ami-navy overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ami-navy via-ami-navy/95 to-ami-navy/80" />

      <div className="container-ami relative z-10 flex flex-col justify-center py-16 lg:py-24 lg:flex-row lg:justify-between lg:items-center gap-10">
        {/* Text Content */}
        <div className="flex flex-col justify-center text-center lg:max-w-2xl lg:text-left">
          {/* Tag line */}
          <div className="inline-flex items-center gap-2 mb-5 justify-center lg:justify-start">
            <div className="w-8 h-0.5 bg-ami-red rounded-full" />
            <span className="text-ami-teal-light text-sm font-medium tracking-wider uppercase">
              Digital Media & Content Production
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-5 tracking-tight">
            {data.title}
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            {data.description}
          </p>

          {data.buttons && data.buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-center lg:justify-start">
              {data.buttons.map((button: Button, index: number) => (
                <Link
                  key={index}
                  href={button.url}
                  target={button.newTab ? "_blank" : "_self"}
                  className={
                    button.type === "primary"
                      ? "btn-primary"
                      : "inline-flex items-center justify-center px-6 py-2.5 bg-transparent text-white font-medium text-sm rounded-md border border-white/30 hover:bg-white/10 transition-default"
                  }
                >
                  {button.text}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Hero Image / Logo */}
        <div className="flex items-center justify-center lg:flex-shrink-0">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={data.picture?.data?.attributes?.alternativeText || "Advanced Multiple Inc."}
              className="object-contain max-h-72 sm:max-h-80 lg:max-h-96 w-auto drop-shadow-2xl"
              width={500}
              height={400}
              priority
            />
          ) : (
            <div className="relative">
              <div className="absolute -inset-4 bg-ami-teal/10 rounded-full blur-3xl" />
              <img
                src="/images/ami-logo.png"
                alt="Advanced Multiple Incorporation"
                className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ami-red via-ami-teal to-ami-red" />
    </section>
  );
}

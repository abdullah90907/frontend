import Link from "next/link";
import SectionHeading from "./SectionHeading";

interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: Feature[];
  };
}

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
}

function Feature({ title, description, showLink, newTab, url, text }: Feature) {
  return (
    <div className="card-base p-6 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-lg bg-ami-teal/10 flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 text-ami-teal"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-ami-navy mb-2">{title}</h3>
      <p className="text-sm text-ami-slate leading-relaxed flex-1">{description}</p>
      {showLink && url && text && (
        <Link
          href={url}
          target={newTab ? "_blank" : "_self"}
          className="btn-teal mt-4 text-xs"
        >
          {text}
        </Link>
      )}
    </div>
  );
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-ami">
        <SectionHeading
          heading={data.heading}
          description={data.description}
          accentColor="teal"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.feature?.map((feature: Feature, index: number) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

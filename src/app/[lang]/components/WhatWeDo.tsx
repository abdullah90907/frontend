import SectionHeading from "./SectionHeading";

interface WhatWeDoItem {
  id: number;
  text: string;
}

interface WhatWeDoProps {
  data: {
    heading: string;
    description?: string;
    items?: WhatWeDoItem[];
  };
}

export default function WhatWeDo({ data }: WhatWeDoProps) {
  const items = data?.items ?? [];

  return (
    <section className="section-padding bg-white" id="what-we-do">
      <div className="container-ami">
        <SectionHeading
          heading={data.heading || "What We Do"}
          description={data.description}
          accentColor="red"
        />

        {items.length === 0 ? (
          <p className="text-center text-ami-gray-400 py-4">Content coming soon.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {items.map((item, index) => (
              <div
                key={item.id || index}
                className="flex items-start gap-3 p-4 rounded-lg hover:bg-ami-gray-warm transition-default group"
              >
                {/* Bullet indicator */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-ami-red group-hover:scale-125 transition-transform" />
                </div>
                <p className="text-sm text-ami-slate leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import SectionHeading from "./SectionHeading";

interface CompanyIntroProps {
  data: {
    heading?: string;
    description?: string;
    content?: string;
  };
}

export default function CompanyIntro({ data }: CompanyIntroProps) {
  return (
    <section className="section-padding bg-white" id="company-intro">
      <div className="container-ami">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Image */}
          <div className="relative rounded-card overflow-hidden aspect-[4/3] bg-ami-gray-100">
            <img
              src="/images/about-hero.jpg"
              alt="About Advanced Multiple"
              className="w-full h-full object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-card">
              <p className="text-ami-navy font-bold text-sm">Since Establishment</p>
              <p className="text-ami-teal text-xs">Empowering Digital Growth</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="w-10 h-1 rounded-full mb-4 bg-ami-red" />
            <h2 className="text-2xl md:text-3xl font-bold text-ami-navy tracking-tight mb-4">
              {data?.heading || "Welcome to Advanced Multiple"}
            </h2>
            <div className="space-y-4 text-ami-slate leading-relaxed text-sm md:text-base">
              <p>
                {data?.description || "Advanced Multiple is a modern digital media and content production company delivering high-impact visual and communication solutions. We specialize in creating professional videos, social media content, and digital products that help individuals, organizations, and brands communicate effectively and grow their presence in today's competitive digital landscape."}
              </p>
              <p>
                {data?.content || "Our work focuses on transforming ideas into engaging, audience-driven content. From short-form videos and reels to full-scale digital campaigns, we combine creativity, strategy, and technical expertise to produce content that performs across platforms."}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-ami-teal/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-ami-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-ami-navy font-medium">Professional Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-ami-red/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-ami-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm text-ami-navy font-medium">Results-Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

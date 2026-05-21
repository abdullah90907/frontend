import { getStrapiMedia } from "../utils/api-helpers";

interface FounderMessageProps {
  data: {
    heading?: string;
    content?: string;
    photo?: {
      data?: {
        attributes?: {
          url?: string;
          alternativeText?: string;
        };
      };
    };
  };
}

function renderParagraphs(text?: string) {
  if (!text) return null;
  return text
    .split(/\n\n+/)
    .map((block, index) => (
      <p key={index} className={index > 0 ? "mt-3" : undefined}>
        {block.trim()}
      </p>
    ));
}

export default function FounderMessage({ data }: FounderMessageProps) {
  const photoUrl = data?.photo?.data?.attributes?.url
    ? getStrapiMedia(data.photo.data.attributes.url)
    : null;
  const photoAlt = data?.photo?.data?.attributes?.alternativeText || "Dr. Taha Nazir";

  return (
    <section className="section-padding-sm bg-white" id="founder-message">
      <div className="container-ami">
        <div className="rounded-xl border border-ami-gray-200 bg-ami-gray-warm/80 p-6 md:p-8 shadow-card animate-fade-in">
          <div className="mb-5 flex justify-center">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={photoAlt}
                className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover border border-ami-gray-200 shadow-card"
              />
            ) : (
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-ami-gray-100 border border-ami-gray-200 shadow-card flex items-center justify-center text-ami-navy font-semibold">
                TN
              </div>
            )}
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-ami-navy mb-3 text-center">
            {data?.heading || "Dr. Taha Nazir"}
          </h3>
          <div className="text-ami-slate text-sm md:text-base leading-relaxed text-center">
            {renderParagraphs(data?.content)}
          </div>
        </div>
      </div>
    </section>
  );
}
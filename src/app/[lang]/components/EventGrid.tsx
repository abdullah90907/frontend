import SectionHeading from "./SectionHeading";
import { getAllEvents } from "../utils/strapi";
import { getStrapiMedia } from "../utils/api-helpers";

interface EventGridProps {
  data: {
    heading?: string;
    description?: string;
  };
}

export default async function EventGrid({ data }: EventGridProps) {
  const events = await getAllEvents();

  const now = new Date();
  
  // Sort and filter events
  const upcomingEvents = events.filter((e: any) => new Date(e.attributes.eventDate) >= now);
  const pastEvents = events.filter((e: any) => new Date(e.attributes.eventDate) < now);

  // Helper to format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderEventCard = (event: any, isPast: boolean = false) => {
    const attrs = event.attributes;
    const coverUrl = getStrapiMedia(attrs.coverImage?.data?.attributes?.url ?? null);

    return (
      <div key={event.id} className={`card-base flex flex-col h-full overflow-hidden ${isPast ? 'opacity-80 grayscale-[30%]' : ''}`}>
        {/* Image */}
        <div className="relative h-48 bg-ami-gray-200">
          {coverUrl ? (
            <img src={coverUrl} alt={attrs.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-ami-gray-100">
              <span className="text-4xl">📅</span>
            </div>
          )}
          {/* Badge */}
          <span className={`absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-white ${isPast ? 'bg-ami-gray-400' : 'bg-ami-red'}`}>
            {attrs.eventType || 'Event'}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-semibold text-ami-navy text-xl mb-2 leading-snug">{attrs.title}</h3>
          
          <div className="space-y-2 mt-auto pt-4">
            {/* Date */}
            <div className="flex items-center text-sm text-ami-slate">
              <svg className="w-4 h-4 mr-2 text-ami-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {formatDate(attrs.eventDate)} 
                {attrs.endDate && ` - ${formatDate(attrs.endDate)}`}
              </span>
            </div>
            
            {/* Location */}
            {attrs.location && (
              <div className="flex items-center text-sm text-ami-slate">
                <svg className="w-4 h-4 mr-2 text-ami-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{attrs.location}</span>
              </div>
            )}
          </div>
          
          {attrs.description && (
             <p className="text-sm text-ami-slate mt-4 line-clamp-3">{attrs.description}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="section-padding bg-white" id="events">
      <div className="container-ami">
        <SectionHeading
          heading={data?.heading || "Events & Congresses"}
          description={data?.description || "Join us at our upcoming academic and scientific events."}
          accentColor="teal"
        />

        {events.length === 0 ? (
          <p className="text-center text-ami-gray-400 py-8">No events currently scheduled.</p>
        ) : (
          <div className="space-y-16">
            
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-ami-navy mb-6 flex items-center">
                  <span className="w-2 h-8 bg-ami-red mr-3 rounded-full"></span>
                  Upcoming Events
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((e: any) => renderEventCard(e, false))}
                </div>
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-ami-slate mb-6 flex items-center">
                  <span className="w-2 h-8 bg-ami-gray-300 mr-3 rounded-full"></span>
                  Past Events
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pastEvents.map((e: any) => renderEventCard(e, true))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
}

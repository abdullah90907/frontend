import SectionHeading from "./SectionHeading";
import TeamCard from "./TeamCard";
import { getTeamMembers } from "../utils/strapi";
import { getStrapiMedia } from "../utils/api-helpers";

interface TeamGridProps {
  data: {
    heading?: string;
    description?: string;
  };
}

export default async function TeamGrid({ data }: TeamGridProps) {
  const members = await getTeamMembers();

  return (
    <section className="section-padding bg-ami-gray-warm" id="team-grid">
      <div className="container-ami">
        <SectionHeading
          heading={data?.heading || "Our Team"}
          description={data?.description || "Meet the professionals behind our services"}
          accentColor="teal"
        />

        {members.length === 0 ? (
          <p className="text-center text-ami-gray-400 py-8">Team members coming soon.</p>
        ) : (
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {members.map((member: any) => {
              const attrs = member.attributes || member;
              const photoUrl = getStrapiMedia(
                attrs.photo?.data?.attributes?.url ?? null
              );

              return (
                <TeamCard
                  key={member.id}
                  name={attrs.name}
                  role={attrs.role}
                  bio={attrs.bio}
                  photoUrl={photoUrl}
                  email={attrs.email}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

import SectionHeading from "./SectionHeading";
import ContactBlock from "./ContactBlock";
import { getContactDepartments } from "../utils/strapi";

interface ContactGridProps {
  data: {
    heading?: string;
    description?: string;
  };
}

export default async function ContactGrid({ data }: ContactGridProps) {
  const departments = await getContactDepartments();

  return (
    <section className="section-padding bg-white" id="contact-grid">
      <div className="container-ami">
        <SectionHeading
          heading={data?.heading || "Contact Us"}
          description={data?.description || "Reach out to the right department"}
          accentColor="red"
        />

        {departments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-ami-gray-400 mb-4">Department contacts coming soon.</p>
            <a
              href="mailto:office@advancedmultiple.ca"
              className="btn-primary"
            >
              Email Us
            </a>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((dept: any) => {
              const attrs = dept.attributes || dept;
              return (
                <ContactBlock
                  key={dept.id}
                  name={attrs.name}
                  email={attrs.email}
                  phone={attrs.phone}
                  description={attrs.description}
                />
              );
            })}
          </div>
        )}

        {/* General contact fallback */}
        <div className="mt-12 pt-8 border-t border-ami-gray-200 text-center">
          <p className="text-sm text-ami-gray-400 mb-2">General inquiries</p>
          <a
            href="mailto:office@advancedmultiple.ca"
            className="text-ami-teal font-medium hover:text-ami-teal-dark transition-default"
          >
            office@advancedmultiple.ca
          </a>
        </div>
      </div>
    </section>
  );
}

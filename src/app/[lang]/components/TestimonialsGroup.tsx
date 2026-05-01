import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TestimonialProps {
  id: string;
  text: string;
  authorName: string;
  picture: {
    data: {
      id: string;
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
}

interface TestimonialsGroupProps {
  data: {
    id: string;
    title: string;
    description: string;
    testimonials: TestimonialProps[];
  };
}

function Testimonial({ text, authorName }: TestimonialProps) {
  return (
    <div className="card-base p-6 flex flex-col">
      <div className="rich-text flex-1 text-sm">
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
      <div className="mt-4 pt-4 border-t border-ami-gray-200">
        <p className="font-semibold text-ami-navy text-sm">{authorName}</p>
      </div>
    </div>
  );
}

export default function TestimonialsGroup({ data }: TestimonialsGroupProps) {
  return (
    <section className="section-padding bg-ami-gray-warm">
      <div className="container-ami">
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <h2 className="text-3xl font-bold text-ami-navy">{data.title}</h2>
          <p className="mt-3 text-ami-slate leading-relaxed">{data.description}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {data.testimonials?.map((testimonial: TestimonialProps) => (
            <Testimonial key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

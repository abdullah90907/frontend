interface HeadingProps {
  data: {
    heading: string;
    description?: string;
  };
}

export default function Heading({ data }: HeadingProps) {
  return (
    <div className="bg-ami-gray-warm border-b border-ami-gray-200">
      <div className="container-ami py-10 md:py-14 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-ami-navy tracking-tight">
          {data.heading}
        </h1>
        {data.description && (
          <p className="mt-3 text-ami-slate max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
}

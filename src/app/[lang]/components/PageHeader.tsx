interface PageHeaderProps {
  heading: string,
  text?: string,
}

export default function PageHeader({ heading, text } : PageHeaderProps) {
  return (
    <div className="bg-ami-gray-warm border-b border-ami-gray-200">
      <div className="container-ami py-10 md:py-14 text-center">
        {text && <span className="text-ami-teal text-sm font-medium tracking-wider uppercase">{text}</span>}
        <h1 className="text-3xl md:text-4xl font-bold text-ami-navy mt-2 tracking-tight">{heading}</h1>
      </div>
    </div>
  );
}

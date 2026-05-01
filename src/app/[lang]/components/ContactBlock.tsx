interface ContactBlockProps {
  name: string;
  email?: string;
  phone?: string;
  description?: string;
}

export default function ContactBlock({
  name,
  email,
  phone,
  description,
}: ContactBlockProps) {
  return (
    <div className="card-base p-6 h-full flex flex-col">
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-ami-red/10 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-ami-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>

      {/* Department name */}
      <h3 className="font-semibold text-ami-navy text-base mb-2">{name}</h3>

      {description && (
        <p className="text-ami-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>
      )}

      {/* Contact info */}
      <div className="space-y-2 pt-3 border-t border-ami-gray-200">
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm text-ami-slate hover:text-ami-teal transition-default"
          >
            <svg className="w-4 h-4 text-ami-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{email}</span>
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm text-ami-slate hover:text-ami-teal transition-default"
          >
            <svg className="w-4 h-4 text-ami-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{phone}</span>
          </a>
        )}
      </div>
    </div>
  );
}

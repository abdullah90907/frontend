import { getStrapiMedia } from "../utils/api-helpers";

interface TeamCardProps {
  name: string;
  role?: string;
  bio?: string;
  photoUrl?: string | null;
  email?: string;
}

export default function TeamCard({
  name,
  role,
  bio,
  photoUrl,
  email,
}: TeamCardProps) {
  return (
    <div className="card-base p-5 text-center">
      {/* Photo */}
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-ami-gray-100 overflow-hidden flex items-center justify-center">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg className="w-8 h-8 text-ami-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>

      {/* Info */}
      <h3 className="font-semibold text-ami-navy text-sm">{name}</h3>
      {role && (
        <p className="text-ami-teal text-xs font-medium mt-0.5">{role}</p>
      )}
      {bio && (
        <p className="text-ami-gray-400 text-xs leading-relaxed mt-2 line-clamp-3">
          {bio}
        </p>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="inline-block mt-3 text-xs text-ami-teal hover:text-ami-teal-dark transition-default break-all max-w-full"
        >
          {email}
        </a>
      )}
    </div>
  );
}

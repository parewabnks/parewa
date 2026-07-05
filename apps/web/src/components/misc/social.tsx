import { resolveIcon } from "@/helpers/resolve_icon";

import Link from "next/link";

import { SocialInt } from "@/types/social";

export default function Social({ social }: { social: SocialInt }) {
  const Icon = resolveIcon(social.icon.name);

  if (!Icon) return null;

  return (
    <div className="flex gap-4 justify-center md:justify-start">
      <Link
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.title}
      >
        <Icon className="w-6 h-6 text-gray-300 hover:text-white transition-colors duration-200" />
      </Link>
    </div>
  );
}
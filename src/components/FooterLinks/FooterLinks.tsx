import Link from "next/link";
import type { FooterLinksProps } from "./@type";

export function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <nav aria-label={`Footer ${title}`}>
      <h2 className="text-lg font-medium leading-7 text-white">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map(({ label, href }) => (
          <li key={label} className="leading-6">
            <Link href={href} className="transition-colors hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

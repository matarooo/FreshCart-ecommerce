import Link from "next/link";
import type { SectionHeadingProps } from "./@type";
export function SectionHeading({
  first,
  accent,
  href,
  linkLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 className="border-l-4 border-emerald-500 pl-3 text-xl font-bold text-slate-800 sm:text-2xl">
        {first} <span className="text-emerald-600">{accent}</span>
      </h2>
      {href && (
        <Link
          href={href}
          className="text-xs font-medium text-brand hover:underline sm:text-sm"
        >
          {linkLabel ?? "View all"} →
        </Link>
      )}
    </div>
  );
}

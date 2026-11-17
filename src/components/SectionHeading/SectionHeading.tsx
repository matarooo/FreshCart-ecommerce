import Link from "next/link";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { SectionHeadingProps } from "./@type";
export function SectionHeading({
  first,
  accent,
  href,
  linkLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <h2 className="flex-initial text-2xl font-bold text-gray-800 before:mr-3 before:inline-block before:h-8 before:w-1.5 before:rounded-full before:bg-linear-to-b before:from-emerald-500 before:to-emerald-700 before:align-middle md:text-3xl">
        {first} <span className="text-emerald-600">{accent}</span>
      </h2>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-base font-medium text-brand transition-colors hover:text-green-700"
        >
          {linkLabel ?? "View all"}
          <StoreIcon name="arrow" className="size-5" />
        </Link>
      )}
    </div>
  );
}

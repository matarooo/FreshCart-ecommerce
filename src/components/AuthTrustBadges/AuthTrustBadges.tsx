import { AuthIcon } from "@/components/AuthIcon/AuthIcon";

export function AuthTrustBadges() {
  return (
    <ul
      aria-label="Shopping security and ratings"
      className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-500"
    >
      {(
        [
          { icon: "lock", label: "SSL Secured" },
          { icon: "users", label: "50K+ Users" },
          { icon: "star", label: "4.9 Rating" },
        ] as const
      ).map(({ icon, label }) => (
        <li key={label} className="flex items-center gap-1">
          <AuthIcon name={icon} className="size-3.5" />
          {label}
        </li>
      ))}
    </ul>
  );
}

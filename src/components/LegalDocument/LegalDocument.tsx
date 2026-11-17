import Link from "next/link";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import { PageBanner } from "@/components/PageBanner/PageBanner";
import type { LegalDocumentProps } from "./@type";

export function LegalDocument({
  title,
  icon,
  notice,
  articles,
  related,
}: LegalDocumentProps) {
  const amber = notice.tone === "amber";
  return (
    <main
      id="main-content"
      className="flex-1 bg-linear-to-b from-gray-50 via-gray-50 to-white"
    >
      <PageBanner
        title={title}
        icon={icon}
        subtitle={
          <>
            Last updated: <time dateTime="2026-02">February 2026</time>
          </>
        }
        prominent
      />
      <div className="store-container py-8 sm:py-12">
        <section
          className={`flex items-start gap-4 rounded-3xl border bg-linear-to-br p-5 shadow-sm sm:p-8 ${amber ? "border-amber-300 from-amber-50 to-amber-100/60 text-amber-900" : "border-green-200 from-green-50 to-emerald-50 text-emerald-950"}`}
        >
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-lg ${amber ? "bg-amber-500 shadow-amber-500/20" : "bg-green-500 shadow-green-600/25"}`}
          >
            <StoreIcon name={icon} className="size-6" />
          </span>
          <div>
            <h2 className="text-lg font-bold">{notice.title}</h2>
            <p className="mt-2 leading-[1.65]">{notice.text}</p>
          </div>
        </section>

        <div className="mt-8 grid gap-5 md:grid-cols-2 sm:mt-12 sm:gap-8">
          {articles.map((article, index) => {
            const number = index + 1;
            return (
              <article
                key={article.title}
                className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
              >
                <header className="mb-6 flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-green-100 to-green-50 text-brand [&_svg]:size-6">
                    {article.icon}
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-wider text-green-700 uppercase">
                      Article {number}
                    </p>
                    <h2 className="mt-0.5 text-xl font-bold leading-6 text-gray-900">
                      {article.title}
                    </h2>
                  </div>
                </header>
                {"clauses" in article ? (
                  <ol className="space-y-3.5 text-sm leading-5 text-gray-700">
                    {article.clauses.map(({ label, text }, clause) => (
                      <li key={text} className="flex items-start gap-3">
                        <span className="shrink-0 rounded-md bg-green-50 px-2 text-xs leading-5 font-bold text-green-700">
                          {number}.{clause + 1}
                        </span>
                        <span>
                          {label && (
                            <>
                              <strong className="font-bold text-gray-900">
                                {label}
                              </strong>{" "}
                            </>
                          )}
                          {text}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm leading-6 text-gray-700">
                    {article.body}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <nav
          aria-label="Legal page navigation"
          className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:mt-12 sm:pt-8"
        >
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 text-gray-700 transition-colors hover:bg-gray-200"
          >
            <StoreIcon name="arrow" className="size-4 rotate-180" /> Back to
            Home
          </Link>
          <Link
            href={related.href}
            className="store-button min-h-13 rounded-xl bg-green-500 px-6 text-base shadow-lg shadow-green-600/20 hover:bg-brand"
          >
            {related.label} <StoreIcon name="arrow" className="size-5" />
          </Link>
        </nav>
      </div>
    </main>
  );
}

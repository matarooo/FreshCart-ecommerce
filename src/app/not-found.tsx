import Link from "next/link";
import { GoBackButton } from "@/components/GoBackButton/GoBackButton";
import { NotFoundIcon } from "@/components/icons/NotFoundIcon/NotFoundIcon";

export const metadata = { title: "Page Not Found | FreshCart" };

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative isolate flex min-h-[760px] flex-1 items-center justify-center overflow-hidden bg-gray-50 px-4 py-20 text-center sm:min-h-[calc(100svh-120px)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-16 -right-12 size-96 rounded-full bg-green-50 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-green-50 blur-3xl" />
        <NotFoundIcon
          name="apple"
          className="absolute top-[10%] left-[5%] size-7 -rotate-12 text-green-200"
        />
        <NotFoundIcon
          name="carrot"
          className="absolute top-[20%] right-[10%] size-7 rotate-6 text-green-200"
        />
        <NotFoundIcon
          name="carrot"
          className="absolute top-[42%] right-[5%] size-5 text-green-100"
        />
        <NotFoundIcon
          name="apple"
          className="absolute top-1/2 left-[15%] size-5 text-green-100"
        />
        <NotFoundIcon
          name="leaf"
          className="absolute bottom-[24%] left-[8%] size-7 text-green-200"
        />
        <NotFoundIcon
          name="sprout"
          className="absolute right-[15%] bottom-[12%] size-8 -rotate-6 text-green-200"
        />
      </div>
      <div className="flex w-full max-w-xl flex-col items-center">
        <div className="relative mb-8">
          <div className="flex h-36 w-48 items-center justify-center rounded-[24px] border border-white bg-gradient-to-br from-white to-green-50 shadow-[0_14px_50px_#22c55e15]">
            <NotFoundIcon name="cart" className="size-16 text-green-300" />
          </div>
          <span className="absolute -top-5 -right-6 flex size-20 items-center justify-center rounded-full border-[6px] border-white bg-gradient-to-br from-green-500 to-green-600 text-xl font-black text-white shadow-lg shadow-green-800/15">
            404
          </span>
          <div
            aria-hidden="true"
            className="mt-6 flex items-center justify-center gap-3 text-green-400"
          >
            <span className="size-2 rounded-full bg-current" />
            <span className="h-3 w-6 rounded-b-full border-b-2 border-current" />
            <span className="size-2 rounded-full bg-current" />
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-[40px]">
          Oops! Nothing Here
        </h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
          Looks like this page went out of stock! Don’t worry,
          <br className="hidden sm:block" /> there’s plenty more fresh content
          to explore.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="store-button min-h-12 gap-3 px-6 shadow-lg shadow-green-700/15"
          >
            <NotFoundIcon name="home" className="size-4" />
            Go to Homepage
          </Link>
          <GoBackButton />
        </div>
        <nav
          aria-label="Popular destinations"
          className="mt-10 w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:px-7"
        >
          <h2 className="mb-4 text-[10px] font-medium uppercase tracking-wider text-gray-400">
            Popular Destinations
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              ["All Products", "/shop"],
              ["Categories", "/categories"],
              ["Today’s Deals", "/shop?deals=true"],
              ["Contact Us", "/contact"],
            ].map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                className={`rounded-xl px-3 py-2.5 text-xs font-medium transition-colors ${index === 0 ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-gray-100 text-slate-600 hover:bg-gray-200"}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}

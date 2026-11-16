import { NavIcon } from "@/components/NavIcon/NavIcon";
import type { SearchBarProps } from "./@type";

export function SearchBar({ id }: SearchBarProps) {
  return (
    <search className="min-w-0 flex-1">
      <form
        action="/shop"
        className="flex h-12 min-w-0 flex-1 items-center rounded-full border border-gray-200 bg-gray-50/60 p-1 pl-5 focus-within:border-brand"
      >
        <label htmlFor={id} className="sr-only">
          Search products
        </label>
        <input
          id={id}
          name="q"
          type="search"
          placeholder="Search for products, brands and more..."
          className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-gray-400 focus-visible:outline-none"
          required
        />
        <button
          type="submit"
          aria-label="Search"
          className="ml-2 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-green-700"
        >
          <NavIcon name="search" className="size-[18px]" />
        </button>
      </form>
    </search>
  );
}

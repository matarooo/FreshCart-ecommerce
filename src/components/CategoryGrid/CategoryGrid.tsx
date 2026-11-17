import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/categories/category.api";
import type { CategoryGridProps } from "./@type";
export async function CategoryGrid({ catalog }: CategoryGridProps) {
  const categories = await getCategories();
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 ${catalog ? "gap-4 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5" : "gap-4 lg:grid-cols-6"}`}
    >
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/categories/${category._id}`}
          className={`group flex flex-col items-center bg-white text-center shadow-sm transition-shadow hover:shadow-md ${catalog ? "rounded-2xl border border-gray-100 p-4 pb-8 sm:p-6 sm:pb-12" : "justify-center rounded-lg p-4"}`}
        >
          <Image
            src={category.image}
            alt=""
            width={catalog ? 320 : 80}
            height={catalog ? 320 : 80}
            sizes={catalog ? "(min-width: 1280px) 235px, 40vw" : "80px"}
            className={
              catalog
                ? "mb-4 aspect-square w-full rounded-xl object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                : "mb-3 size-20 rounded-full bg-green-100 object-cover transition group-hover:bg-green-200"
            }
          />
          <h3
            className={
              catalog
                ? "text-base font-bold text-gray-900"
                : "text-base font-medium"
            }
          >
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}

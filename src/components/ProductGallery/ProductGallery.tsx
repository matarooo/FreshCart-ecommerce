"use client";
import Image from "next/image";
import { useState } from "react";
import type { ProductGalleryProps } from "./@type";
export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(images[0]);
  return (
    <div className="h-fit rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <Image
        src={selected}
        alt={name}
        width={345}
        height={461}
        sizes="(max-width: 767px) 90vw, 345px"
        preload
        className="aspect-[3/4] w-full rounded object-contain"
      />
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {images.map((src, index) => (
          <button
            type="button"
            key={src}
            aria-label={`View ${name} image ${index + 1}`}
            aria-pressed={selected === src}
            onClick={() => setSelected(src)}
            className={`shrink-0 cursor-pointer overflow-hidden border-4 transition-colors ${selected === src ? "border-blue-600" : "border-transparent hover:border-gray-200"}`}
          >
            <Image
              src={src}
              alt=""
              width={92}
              height={126}
              className="h-24 w-18 object-contain sm:h-[126px] sm:w-[92px]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

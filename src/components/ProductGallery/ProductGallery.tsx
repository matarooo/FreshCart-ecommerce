"use client";
import Image from "next/image";
import { useState } from "react";
import type { ProductGalleryProps } from "./@type";
export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(images[0]);
  return (
    <div className="h-fit rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <Image
        src={selected}
        alt={name}
        width={345}
        height={461}
        sizes="(max-width: 767px) 90vw, 340px"
        preload
        className="aspect-[3/4] w-full rounded object-contain"
      />
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((src, index) => (
          <button
            type="button"
            key={src}
            aria-label={`View ${name} image ${index + 1}`}
            aria-pressed={selected === src}
            onClick={() => setSelected(src)}
            className={`shrink-0 overflow-hidden rounded border-2 ${selected === src ? "border-brand" : "border-gray-100"}`}
          >
            <Image
              src={src}
              alt=""
              width={72}
              height={88}
              className="h-22 w-18 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

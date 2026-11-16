import Image from "next/image";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { OrderThumbnailProps } from "./@type";

export function OrderThumbnail({ image, size = "small" }: OrderThumbnailProps) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl bg-gray-50 ${size === "large" ? "size-18 rounded-2xl border border-gray-100 sm:size-28" : "size-14 sm:size-16"}`}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          width={112}
          height={112}
          sizes={size === "large" ? "(min-width: 640px) 90px, 52px" : "48px"}
          className="size-3/4 rounded-sm object-contain"
        />
      ) : (
        <StoreIcon name="box" className="size-6 text-gray-400" />
      )}
    </span>
  );
}

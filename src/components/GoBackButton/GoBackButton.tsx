"use client";
import { useRouter } from "next/navigation";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
export function GoBackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.replace("/");
      }}
      className="store-outline-button min-h-12 gap-3 px-6 font-semibold shadow-sm"
    >
      <StoreIcon name="arrow" className="size-4 rotate-180" />
      Go Back
    </button>
  );
}

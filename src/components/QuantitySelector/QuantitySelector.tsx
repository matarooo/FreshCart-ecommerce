"use client";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { QuantitySelectorProps } from "./@type";
export function QuantitySelector({
  value,
  max,
  onChange,
  label = "product",
  disabled = false,
  large = false,
}: QuantitySelectorProps) {
  return (
    <div
      className={`inline-flex items-center rounded-lg bg-white ${large ? "h-13 gap-3 border-2 border-gray-200 p-1.5" : "h-10 gap-2 border border-gray-200 p-1"}`}
    >
      <button
        type="button"
        aria-label={`Decrease quantity of ${label}`}
        disabled={disabled || value <= 1}
        onClick={() => onChange(value - 1)}
        className={`flex items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 ${large ? "size-9" : "size-8"}`}
      >
        <StoreIcon name="minus" className="size-4" />
      </button>
      <output
        aria-label={`Quantity of ${label}`}
        className={`text-center ${large ? "min-w-14 text-lg" : "min-w-7 text-sm font-semibold"}`}
      >
        {value}
      </output>
      <button
        type="button"
        aria-label={`Increase quantity of ${label}`}
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className={`flex items-center justify-center rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${large ? "size-9 text-slate-600 hover:bg-gray-100" : "size-8 bg-brand text-white hover:bg-green-700"}`}
      >
        <StoreIcon name="plus" className="size-4" />
      </button>
    </div>
  );
}

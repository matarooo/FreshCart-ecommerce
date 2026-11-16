"use client";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { QuantitySelectorProps } from "./@type";
export function QuantitySelector({
  value,
  max,
  onChange,
  label = "product",
  disabled = false,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white p-1">
      <button
        type="button"
        aria-label={`Decrease quantity of ${label}`}
        disabled={disabled || value <= 1}
        onClick={() => onChange(value - 1)}
        className="flex size-8 items-center justify-center rounded-md text-slate-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <StoreIcon name="minus" className="size-4" />
      </button>
      <output
        aria-label={`Quantity of ${label}`}
        className="min-w-7 text-center text-sm font-semibold"
      >
        {value}
      </output>
      <button
        type="button"
        aria-label={`Increase quantity of ${label}`}
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className="flex size-8 items-center justify-center rounded-md bg-brand text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <StoreIcon name="plus" className="size-4" />
      </button>
    </div>
  );
}

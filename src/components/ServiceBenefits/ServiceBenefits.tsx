import type { StoreIconName } from "@/components/icons/StoreIcon/@type";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import type { ServiceBenefitsProps } from "./@type";

const benefits: {
  icon: StoreIconName;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    icon: "truck",
    title: "Free Shipping",
    description: "On orders over 550 EGP",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: "shield",
    title: "Secure Payment",
    description: "100% secure transactions",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: "return",
    title: "Easy Returns",
    description: "30-day return policy",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: "headset",
    title: "24/7 Support",
    description: "Dedicated support team",
    color: "bg-purple-50 text-purple-500",
  },
];
export function ServiceBenefits({ compact }: ServiceBenefitsProps) {
  return (
    <div
      className={`grid gap-3 ${compact ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}
    >
      {benefits.slice(0, compact ? 3 : 4).map((benefit) => (
        <div
          key={benefit.title}
          className={`flex items-center gap-3 ${compact ? "py-2" : "rounded-lg border border-gray-200 bg-white p-4"}`}
        >
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${benefit.color}`}
          >
            <StoreIcon name={benefit.icon} className="size-5" />
          </span>
          <div>
            <h3 className="text-xs font-semibold">{benefit.title}</h3>
            <p className="mt-1 text-[10px] text-muted sm:text-xs">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

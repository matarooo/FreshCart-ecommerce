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
    description: "On orders over 500 EGP",
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
    description: "14-day return policy",
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
      className={`grid gap-4 ${compact ? "grid-cols-1 sm:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}
    >
      {benefits.slice(0, compact ? 3 : 4).map((benefit) => (
        <div
          key={benefit.title}
          className={`flex items-center ${compact ? "gap-3 py-2" : "gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"}`}
        >
          <span
            className={`flex shrink-0 items-center justify-center rounded-full ${compact ? "size-10" : "size-12"} ${benefit.color}`}
          >
            <StoreIcon
              name={benefit.icon}
              className={compact ? "size-5" : "size-6"}
            />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {benefit.title}
            </h3>
            <p className="text-xs text-muted">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

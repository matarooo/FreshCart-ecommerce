import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";

export function FooterBenefits() {
  return (
    <div className="hidden border-y border-green-100 bg-[#f0fdf4] lg:block">
      <ul className="mx-auto grid max-w-[1368px] grid-cols-4 gap-6 px-4 py-6 text-[#111827]">
        <li className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-[#00ad45]">
            <NavIcon name="truck" />
          </span>
          <div>
            <p className="font-medium">Free Shipping</p>
            <p className="text-xs text-slate-500">On orders over 500 EGP</p>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-[#00ad45]">
            <FooterIcon name="returns" className="size-5" />
          </span>
          <div>
            <p className="font-medium">Easy Returns</p>
            <p className="text-xs text-slate-500">14-day return policy</p>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-[#00ad45]">
            <FooterIcon name="shield" className="size-5" />
          </span>
          <div>
            <p className="font-medium">Secure Payment</p>
            <p className="text-xs text-slate-500">100% secure checkout</p>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-[#00ad45]">
            <NavIcon name="headset" />
          </span>
          <div>
            <p className="font-medium">24/7 Support</p>
            <p className="text-xs text-slate-500">Contact us anytime</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

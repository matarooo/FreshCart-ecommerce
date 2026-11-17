import Image from "next/image";
import { AuthIcon } from "@/components/AuthIcon/AuthIcon";
import { FooterIcon } from "@/components/FooterIcon/FooterIcon";
import { NavIcon } from "@/components/NavIcon/NavIcon";
import signInPromotion from "../../../public/images/banners/sign-in-promotion.png";
import type { AuthPromotionProps } from "./@type";

export function AuthPromotion({ mode }: AuthPromotionProps) {
  if (mode === "sign-in") {
    return (
      <section
        aria-label="FreshCart shopping benefits"
        className="hidden self-center text-center lg:block"
      >
        <div className="relative aspect-[616/384] overflow-hidden rounded-2xl bg-white shadow-lg">
          <Image
            src={signInPromotion}
            alt="A shopping cart filled with fresh vegetables and groceries"
            fill
            sizes="(min-width: 1280px) 616px, 47vw"
            className="object-cover"
          />
        </div>
        <h2 className="mt-6 text-[30px] font-bold leading-tight text-slate-800">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        <p className="mt-4 text-lg leading-7 text-slate-600">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>
        <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <NavIcon name="truck" className="size-4 text-brand" />
            Free Delivery
          </li>
          <li className="flex items-center gap-2">
            <FooterIcon name="shield" className="size-4 text-brand" />
            Secure Payment
          </li>
          <li className="flex items-center gap-2">
            <NavIcon name="headset" className="size-4 text-brand" />
            24/7 Support
          </li>
        </ul>
      </section>
    );
  }

  return (
    <section aria-labelledby="signup-welcome" className="text-slate-700">
      <h2
        id="signup-welcome"
        className="max-w-60 text-4xl font-bold leading-[1.15] tracking-tight lg:max-w-none"
      >
        Welcome to <span className="text-brand">FreshCart</span>
      </h2>
      <p className="mt-3 text-xl leading-7">
        Join thousands of happy customers who enjoy fresh groceries delivered
        right to their doorstep.
      </p>
      <ul className="mt-8 space-y-6">
        <li className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-200 text-brand">
            <AuthIcon name="star" className="size-6" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">Premium Quality</h3>
            <p className="mt-0.5 leading-6">
              Premium quality products sourced from trusted suppliers.
            </p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-200 text-brand">
            <NavIcon name="truck" className="size-6" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">Fast Delivery</h3>
            <p className="mt-0.5 leading-6">
              Same-day delivery available in most areas
            </p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-200 text-brand">
            <FooterIcon name="shield" className="size-6" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">Secure Shopping</h3>
            <p className="mt-0.5 leading-6">
              Your data and payments are completely secure
            </p>
          </div>
        </li>
      </ul>
      <figure className="mt-8 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
        <figcaption className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#77d85a] text-3xl"
          >
            👩🏻‍💼
          </span>
          <div>
            <p>Sarah Johnson</p>
            <span className="mt-1 flex text-yellow-400">
              <span className="sr-only">5 out of 5 stars</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <AuthIcon key={star} name="star" className="size-5" />
              ))}
            </span>
          </div>
        </figcaption>
        <blockquote className="mt-4 text-base italic leading-6 text-slate-600">
          &quot;FreshCart has transformed my shopping experience. The quality of
          the products is outstanding, and the delivery is always on time.
          Highly recommend!&quot;
        </blockquote>
      </figure>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { StoreIcon } from "@/components/icons/StoreIcon/StoreIcon";
import "swiper/css";
import market from "../../../public/images/banners/fresh-market.png";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    label: "Shop Now",
    secondary: { label: "View Deals", href: "/shop?deals=true" },
    color: "text-green-500",
  },
  {
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
    label: "Shop Now",
    secondary: { label: "Learn More", href: "/categories" },
    color: "text-blue-500",
  },
  {
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    label: "Order Now",
    secondary: { label: "Delivery Info", href: "/contact" },
    color: "text-purple-500",
  },
];

export function HomeHero() {
  const slider = useRef<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const arrows =
    "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-green-500 shadow-lg transition duration-300 hover:bg-white hover:text-green-600 motion-safe:hover:scale-110 md:flex";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Store offers"
      className="relative overflow-hidden bg-green-600 text-white"
    >
      <Swiper
        modules={[A11y, Keyboard]}
        onSwiper={(instance) => {
          slider.current = instance;
        }}
        onBeforeInit={(instance) => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            instance.params.speed = 0;
          }
        }}
        onSlideChange={(instance) => setActive(instance.realIndex)}
        speed={300}
        loop
        keyboard={{ enabled: true, onlyInViewport: true }}
      >
        {slides.map((slide, index) => {
          const Heading = index === 0 ? "h1" : "h2";
          return (
            <SwiperSlide key={slide.title}>
              <div
                className="relative isolate flex h-[400px] items-center"
                inert={active !== index}
              >
                <Image
                  src={market}
                  alt=""
                  fill
                  preload={index === 0}
                  sizes="100vw"
                  className="-z-20 object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-green-500/90 to-green-400/50" />
                <div className="store-container px-8">
                  <Heading className="mb-4 max-w-96 text-3xl leading-9 font-bold">
                    {slide.title}
                  </Heading>
                  <p className="mb-4">{slide.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/shop"
                      className={`inline-flex min-h-11 items-center rounded-lg border-2 border-white/50 bg-white px-6 py-2 font-semibold transition-transform duration-200 motion-safe:hover:scale-105 ${slide.color}`}
                    >
                      {slide.label}
                    </Link>
                    <Link
                      href={slide.secondary.href}
                      className="inline-flex min-h-11 items-center rounded-lg border-2 border-white/50 px-6 py-2 font-semibold transition duration-200 hover:bg-white/15 motion-safe:hover:scale-105"
                    >
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute inset-x-0 bottom-[15px] z-10 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Show offer ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => slider.current?.slideToLoop(index)}
            className={`h-3 cursor-pointer rounded-full motion-safe:transition-[width,background-color] motion-safe:duration-300 ${active === index ? "w-8 bg-white" : "w-3 bg-white/50"}`}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous offer"
        onClick={() => slider.current?.slidePrev()}
        className={`${arrows} left-4`}
      >
        <StoreIcon name="chevron" className="size-5 rotate-180" />
      </button>
      <button
        type="button"
        aria-label="Next offer"
        onClick={() => slider.current?.slideNext()}
        className={`${arrows} right-4`}
      >
        <StoreIcon name="chevron" className="size-5" />
      </button>
    </section>
  );
}

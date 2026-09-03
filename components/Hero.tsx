"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/lib/site";
import { FloatingLamp } from "@/components/FloatingLamp";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-name, .hero-role, .hero-brief, .hero-scroll", {
        y: 28,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="hero relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-16"
    >
      <FloatingLamp />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="hero-name font-serif text-[16vw] leading-[0.88] tracking-tight md:text-[7.5rem]">
          {site.name}
        </h1>
        <p className="hero-role mt-5 text-sm tracking-[0.22em] uppercase md:text-base">
          {site.role}
        </p>
        <p className="hero-brief mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          {site.brief}
        </p>
      </div>

      <div className="hero-scroll absolute bottom-8 z-10 flex items-center gap-3 text-xs tracking-[0.28em] uppercase text-muted">
        <span className="h-px w-10 bg-white/15" />
        Scroll
      </div>
    </section>
  );
}

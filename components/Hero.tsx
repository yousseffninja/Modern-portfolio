"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, splitChars, splitWords } from "@/lib/motion";
import { site } from "@/lib/site";
import { FloatingLamp } from "@/components/FloatingLamp";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const name = root.current?.querySelector<HTMLElement>(".hero-name");
      const brief = root.current?.querySelector<HTMLElement>(".hero-brief");
      if (name) splitChars(name);
      if (brief) splitWords(brief);

      gsap.from(".hero-name .char-inner", {
        yPercent: 130,
        rotateX: -70,
        opacity: 0,
        duration: 1.15,
        stagger: 0.035,
        ease: "power4.out",
      });
      gsap.from(".hero-role", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        delay: 0.45,
        ease: "power3.out",
      });
      gsap.from(".hero-brief .word-inner", {
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        stagger: 0.018,
        delay: 0.55,
        ease: "power3.out",
      });
      gsap.from(".hero-scroll", {
        opacity: 0,
        y: 12,
        delay: 1.1,
        duration: 0.8,
      });
      gsap.to(".hero-scroll-line", {
        scaleX: 1.7,
        transformOrigin: "left center",
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2,
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
        <h1 className="hero-name font-serif text-[16vw] leading-[0.9] tracking-tight md:text-[7.5rem]">
          {site.name}
        </h1>
        <p className="hero-role mt-5 text-sm tracking-[0.2em] uppercase md:text-base">
          {site.role}
        </p>
        <p className="hero-brief mt-6 max-w-xl text-base leading-[1.8] md:text-lg">
          {site.brief}
        </p>
      </div>

      <div className="hero-scroll absolute bottom-8 z-10 flex items-center gap-3 text-xs tracking-[0.28em] uppercase text-muted">
        <span className="hero-scroll-line h-px w-10 origin-left bg-white/20" />
        Scroll
      </div>
    </section>
  );
}

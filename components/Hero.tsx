"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/lib/site";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line .word-inner");
      gsap.from(lines, {
        yPercent: 120,
        duration: 1.15,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.1,
      });
      gsap.from(".hero-meta, .hero-cta, .hero-scroll", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.55,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-28 md:px-8 md:pb-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="hero-meta flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <p>{site.role}</p>
          <p>{site.availability}</p>
        </div>

        <h1 className="max-w-5xl font-serif text-[14vw] leading-[0.88] tracking-tight text-ink sm:text-[11vw] lg:text-[7.6rem]">
          <span className="hero-line clip-reveal">
            <span className="word-inner">Interfaces</span>
          </span>
          <span className="hero-line clip-reveal">
            <span className="word-inner italic text-ink/80">made of light.</span>
          </span>
        </h1>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="hero-cta max-w-md text-base leading-relaxed text-muted md:text-lg">
            I build dark, cinematic websites with scroll-driven motion, glass
            blur, and lighting that follows the user.
          </p>
          <a
            href="#work"
            className="hero-cta btn-light inline-flex w-fit items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg"
          >
            See selected work
          </a>
        </div>

        <div className="hero-scroll mt-6 flex items-center gap-3 text-xs tracking-[0.28em] uppercase text-muted">
          <span className="h-px w-10 bg-white/20" />
          Scroll
        </div>
      </div>
    </section>
  );
}

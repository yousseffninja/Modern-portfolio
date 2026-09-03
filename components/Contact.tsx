"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title .word-inner", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });
      gsap.from(".contact-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative z-10 px-5 py-28 md:px-8 md:py-36">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/8 px-6 py-16 md:px-14 md:py-24">
        <div className="pointer-events-none absolute -left-10 top-0 h-64 w-64 rounded-full bg-ice/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-8 bottom-0 h-64 w-64 rounded-full bg-violet/25 blur-3xl" />
        <p className="relative text-xs tracking-[0.28em] uppercase text-muted">04 / Contact</p>
        <h2 className="contact-title relative mt-5 max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl">
          <span className="clip-reveal">
            <span className="word-inner">Let&apos;s put some</span>
          </span>
          <span className="clip-reveal">
            <span className="word-inner italic"> light on it.</span>
          </span>
        </h2>
        <div className="contact-cta relative mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${site.email}`}
            className="btn-light inline-flex w-fit rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg"
          >
            {site.email}
          </a>
          <p className="text-sm text-muted">Available for product sites, systems, and motion work.</p>
        </div>
      </div>
    </section>
  );
}

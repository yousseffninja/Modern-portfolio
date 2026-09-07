"use client";

import { useLayoutEffect, useRef, type PointerEvent } from "react";
import { gsap, splitWords } from "@/lib/motion";
import { site } from "@/lib/site";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const btn = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const title = root.current?.querySelector<HTMLElement>(".contact-title");
      if (title) splitWords(title);

      gsap.from(".contact-title .word-inner", {
        yPercent: 120,
        rotate: 8,
        duration: 1.05,
        stagger: 0.07,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
      gsap.from(".contact-kicker, .contact-cta", {
        y: 28,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.fromTo(
        ".contact-glow-a",
        { scale: 0.7, opacity: 0.15 },
        {
          scale: 1.15,
          opacity: 0.45,
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = btn.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.35, ease: "power3.out" });
  };

  const onLeave = () => {
    if (!btn.current) return;
    gsap.to(btn.current, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <section id="contact" ref={root} className="relative z-10 px-5 py-28 md:px-8 md:py-36">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/8 px-6 py-16 md:px-14 md:py-24">
        <div className="contact-glow-a pointer-events-none absolute -left-10 top-0 h-64 w-64 rounded-full bg-ice/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-8 bottom-0 h-64 w-64 rounded-full bg-violet/14 blur-3xl" />
        <p className="contact-kicker relative text-xs tracking-[0.28em] uppercase text-muted">
          05 / Contact
        </p>
        <h2 className="contact-title relative mt-5 max-w-3xl font-serif text-5xl leading-[1.05] md:text-7xl">
          Let&apos;s put some light on it.
        </h2>
        <div className="contact-cta relative mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            ref={btn}
            href={`mailto:${site.email}`}
            className="btn-light inline-flex w-fit rounded-full bg-ink px-6 py-3 "
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <p className="text-sm font-medium font-black text-[#0a0a0a]">
              {site.email}
            </p>
          </a>
          <p className="text-sm leading-relaxed text-muted">
            Available for product sites, systems, and motion work.
          </p>
        </div>
      </div>
    </section>
  );
}

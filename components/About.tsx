"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, splitWords } from "@/lib/motion";
import { site } from "@/lib/site";

export function About() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heading = root.current?.querySelector<HTMLElement>(".about-heading");
      if (heading) splitWords(heading);

      gsap.from(".about-heading .word-inner", {
        yPercent: 120,
        rotate: 6,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".about-copy p", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".about-panel", {
        x: 80,
        rotateY: -14,
        opacity: 0,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".about-panel dd", {
        y: 16,
        opacity: 0,
        stagger: 0.1,
        delay: 0.25,
        scrollTrigger: { trigger: root.current, start: "top 68%" },
      });
      gsap.fromTo(
        ".about-glow",
        { scale: 0.6, x: -40, opacity: 0.1 },
        {
          scale: 1.2,
          x: 30,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="about-copy">
          <p className="text-xs tracking-[0.28em] uppercase text-muted">03 / About</p>
          <h2 className="about-heading mt-4 max-w-xl font-serif text-4xl leading-[1.15] md:text-6xl">
            I build software that stays readable, even in the dark.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            Full-stack work with React, Next.js, Node, NestJS, and Spring Boot.
            I care about calm interfaces, clear structure, and motion that
            helps — not motion that shouts.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            This page is a small studio for that: a torch in the hero, scroll
            that breathes, and light that never has to be harsh.
          </p>
        </div>

        <div className="about-panel relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-8">
          <div className="about-glow pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-violet/20 blur-3xl" />
          <dl className="relative space-y-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Name</dt>
              <dd className="mt-1 text-xl">{site.name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Focus</dt>
              <dd className="mt-1 text-xl">Full-stack, APIs, UI</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Based</dt>
              <dd className="mt-1 text-xl">{site.location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Status</dt>
              <dd className="mt-1 text-xl text-ice">{site.availability}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

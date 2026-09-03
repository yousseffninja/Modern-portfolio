"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-copy p, .about-panel", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });

      gsap.fromTo(
        ".about-glow",
        { scale: 0.7, opacity: 0.2 },
        {
          scale: 1.15,
          opacity: 0.7,
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
          <p className="text-xs tracking-[0.28em] uppercase text-muted">02 / About</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-6xl">
            A developer who treats lighting like a layout tool.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            I work at the edge of design and engineering. Pages should feel
            physical: a soft blur under the header, a key light in the hero, and
            motion that starts only when you arrive.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            This site is a living kit for that idea — GSAP on scroll, glass on
            the chrome, and a spotlight that follows the cursor.
          </p>
        </div>

        <div className="about-panel relative overflow-hidden rounded-3xl border border-white/8 bg-white/4 p-8">
          <div className="about-glow pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-ice/30 blur-3xl" />
          <dl className="relative space-y-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Name</dt>
              <dd className="mt-1 text-xl">{site.name}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Focus</dt>
              <dd className="mt-1 text-xl">Motion, product UI, systems</dd>
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

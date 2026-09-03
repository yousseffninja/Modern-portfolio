"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-chip", {
        y: 28,
        opacity: 0,
        scale: 0.96,
        duration: 0.55,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={root} className="relative z-10 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.28em] uppercase text-muted">03 / Skills</p>
        <h2 className="mt-3 font-serif text-4xl italic md:text-5xl">Tools I keep close</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {site.skills.map((skill) => (
            <span
              key={skill}
              className="skill-chip rounded-full border border-white/10 bg-white/4 px-5 py-2.5 text-sm text-ink/90"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

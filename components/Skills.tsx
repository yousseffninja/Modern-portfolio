"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { site } from "@/lib/site";

export function Skills() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-intro", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      const loop = (selector: string, direction: number) => {
        const track = root.current?.querySelector<HTMLElement>(selector);
        if (!track) return;
        const width = track.scrollWidth / 2;
        gsap.fromTo(
          track,
          { x: direction > 0 ? 0 : -width },
          {
            x: direction > 0 ? -width : 0,
            duration: 28,
            ease: "none",
            repeat: -1,
          },
        );
      };

      loop(".skill-track-a", 1);
      loop(".skill-track-b", -1);
    }, root);

    return () => ctx.revert();
  }, []);

  const rowA = [...site.skills, ...site.skills];
  const rowB = [...site.skills.slice().reverse(), ...site.skills.slice().reverse()];

  return (
    <section id="skills" ref={root} className="relative z-10 py-20">
      <div className="skills-intro mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-xs tracking-[0.28em] uppercase text-muted">04 / Skills</p>
        <h2 className="mt-3 font-serif text-4xl italic md:text-5xl">Tools I keep close</h2>
      </div>

      <div className="skill-marquee mt-12 space-y-4">
        <div className="overflow-hidden">
          <div className="skill-track-a flex w-max gap-3">
            {rowA.map((skill, i) => (
              <span
                key={`a-${skill}-${i}`}
                className="rounded-full border border-white/10 bg-white/4 px-6 py-3 text-sm text-ink/85"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="skill-track-b flex w-max gap-3">
            {rowB.map((skill, i) => (
              <span
                key={`b-${skill}-${i}`}
                className="rounded-full border border-white/10 bg-white/4 px-6 py-3 text-sm text-ink/85"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

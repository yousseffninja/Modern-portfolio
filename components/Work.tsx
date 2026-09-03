"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getDistance = () =>
        Math.max(0, trackEl.scrollWidth - window.innerWidth + 64);

      const tween = gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(".project-card", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 75%",
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={section} className="relative z-10 overflow-hidden py-8 md:py-0">
      <div className="mx-auto max-w-6xl px-5 md:px-8 md:pt-24">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-muted">01 / Work</p>
            <h2 className="mt-3 font-serif text-5xl italic md:text-6xl">Selected projects</h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted md:block">
            Drag the page down. The gallery moves sideways with the scroll.
          </p>
        </div>
      </div>

      <div
        ref={track}
        className="flex w-full flex-col gap-5 px-5 pb-8 md:w-max md:flex-row md:items-stretch md:gap-6 md:px-8 md:pb-20"
      >
        {site.projects.map((project, index) => (
          <article
            key={project.title}
            className="project-card relative min-h-[420px] w-full overflow-hidden rounded-3xl p-6 md:h-[62vh] md:w-[72vw] md:max-w-[820px] md:p-8"
            style={{ "--card-accent": project.accent } as CSSProperties}
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>0{index + 1}</span>
                <span>{project.year}</span>
              </div>
              <div>
                <p className="text-sm text-ice">{project.type}</p>
                <h3 className="mt-2 font-serif text-4xl md:text-6xl">{project.title}</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                  {project.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

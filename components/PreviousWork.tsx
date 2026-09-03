"use client";

import { useLayoutEffect, useRef, type PointerEvent } from "react";
import { gsap, splitWords } from "@/lib/motion";
import { site } from "@/lib/site";

export function PreviousWork() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const title = section.querySelector<HTMLElement>(".prev-title");
    if (title) splitWords(title);

    const ctx = gsap.context(() => {
      gsap.from(".prev-title .word-inner", {
        yPercent: 120,
        duration: 1,
        stagger: 0.07,
        ease: "power4.out",
        scrollTrigger: { trigger: section, start: "top 78%" },
      });

      gsap.from(".prev-row", {
        y: 48,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".prev-list", start: "top 80%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const onEnter = (event: PointerEvent<HTMLElement>) => {
    const row = event.currentTarget;
    const extra = row.querySelector<HTMLElement>(".prev-extra");
    gsap.to(row, { y: -6, duration: 0.35, ease: "power3.out" });
    gsap.to(row.querySelector(".prev-fill"), {
      scaleX: 1,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(row.querySelector(".prev-arrow"), {
      x: 8,
      duration: 0.35,
      ease: "power3.out",
    });
    if (extra) {
      gsap.to(extra, {
        height: extra.scrollHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const onLeave = (event: PointerEvent<HTMLElement>) => {
    const row = event.currentTarget;
    gsap.to(row, { y: 0, duration: 0.4, ease: "power3.out" });
    gsap.to(row.querySelector(".prev-fill"), {
      scaleX: 0,
      duration: 0.35,
      ease: "power3.inOut",
    });
    gsap.to(row.querySelector(".prev-arrow"), {
      x: 0,
      duration: 0.35,
      ease: "power3.out",
    });
    gsap.to(row.querySelector(".prev-extra"), {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <section id="previous" ref={root} className="relative z-10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.28em] uppercase text-muted">02 / Previous work</p>
        <h2 className="prev-title mt-3 max-w-2xl font-serif text-5xl md:text-6xl">
          Companies I worked with.
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
          Hover a row to open the role, the years, and a short note on what I
          built there.
        </p>

        <div className="prev-list mt-14">
          {site.previousWork.map((item) => (
            <article
              key={item.company}
              className="prev-row"
              onPointerEnter={onEnter}
              onPointerLeave={onLeave}
            >
              <div className="prev-fill" aria-hidden />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted">{item.period}</p>
                  <h3 className="mt-1 font-serif text-3xl md:text-5xl">{item.company}</h3>
                  <p className="mt-2 text-sm text-ink/80">
                    {item.role}
                    <span className="text-muted"> · {item.location}</span>
                  </p>
                </div>
                <span className="prev-arrow mt-3 text-xl text-ink/70" aria-hidden>
                  →
                </span>
              </div>
              <div className="prev-extra">
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/75 md:text-base">
                  {item.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="prev-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

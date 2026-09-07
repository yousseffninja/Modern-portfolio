"use client";

import { useLayoutEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { gsap, splitWords } from "@/lib/motion";
import { site } from "@/lib/site";

function GitHubIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    const title = sectionEl.querySelector<HTMLElement>(".work-title");
    if (title) splitWords(title);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(".work-title .word-inner", {
        yPercent: 120,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionEl, start: "top 78%" },
      });

      const getDistance = () =>
        Math.max(0, trackEl.scrollWidth - window.innerWidth + 64);

      const scrollTween = gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${getDistance() * 1.2}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.88, rotate: -3, opacity: 0.45 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 92%",
              end: "left 55%",
              scrub: true,
            },
          },
        );

        const photo = card.querySelector(".project-photo img");
        if (photo) {
          gsap.fromTo(
            photo,
            { scale: 1.18 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 90%",
                end: "left 40%",
                scrub: true,
              },
            },
          );
        }
      });

      return () => scrollTween.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(".project-card", {
        y: 80,
        rotate: 4,
        opacity: 0,
        stagger: 0.14,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionEl, start: "top 78%" },
      });
    });

    return () => mm.revert();
  }, []);

  const onEnter = (event: PointerEvent<HTMLElement>) => {
    const img = event.currentTarget.querySelector(".project-photo img");
    if (!img) return;
    gsap.to(img, { scale: 1.08, duration: 0.7, ease: "power3.out" });
  };

  const onLeave = (event: PointerEvent<HTMLElement>) => {
    const img = event.currentTarget.querySelector(".project-photo img");
    if (!img) return;
    gsap.to(img, { scale: 1, duration: 0.7, ease: "power3.out" });
  };

  return (
    <section id="work" ref={section} className="relative z-10 py-8 md:py-0">
      <div className="work-intro mx-auto max-w-6xl px-5 md:px-8 md:pt-24 overflow-visible">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-muted">01 / Work</p>
            <h2 className="work-title mt-3 font-serif text-5xl italic md:text-6xl">
              Selected projects
            </h2>
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="flex w-full flex-col gap-5 px-5 pb-8 md:w-max md:flex-row md:items-stretch md:gap-6 md:px-8 md:pb-20"
        style={{ perspective: 1200 }}
      >
        {site.projects.map((project, index) => (
          <article
            key={project.title}
            className="project-card relative flex min-h-[520px] w-full flex-col overflow-hidden rounded-3xl p-5 md:h-[62vh] md:w-[72vw] md:max-w-[820px] md:p-6"
            style={{ "--card-accent": project.accent } as CSSProperties}
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
          >
            <div className="project-photo relative mb-5 min-h-[220px] flex-1 overflow-hidden rounded-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 72vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>0{index + 1}</span>
                <span>{project.year}</span>
              </div>
              <p className="mt-3 text-sm text-ice">{project.type}</p>
              <h3 className="mt-1 font-serif text-3xl md:text-5xl">{project.title}</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                {project.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-ink/80 transition-colors hover:bg-white/5"
                    title="Live URL"
                  >
                    <ExternalLink size={14} />
                    <span>Live</span>
                  </a>
                )}
                {project.frontendRepo && (
                  <a
                    href={project.frontendRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-ink/80 transition-colors hover:bg-white/5"
                    title="Frontend Repository"
                  >
                    <GitHubIcon size={14} />
                    <span>Frontend</span>
                  </a>
                )}
                {project.backendRepo && (
                  <a
                    href={project.backendRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-ink/80 transition-colors hover:bg-white/5"
                    title="Backend Repository"
                  >
                    <GitHubIcon size={14} />
                    <span>Backend</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.25,
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return <div ref={bar} className="scroll-progress" aria-hidden />;
}

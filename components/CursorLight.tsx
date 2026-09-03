"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

export function CursorLight() {
  const orb = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = orb.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={orb} className="cursor-light" aria-hidden />;
}

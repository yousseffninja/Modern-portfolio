"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

export function AmbientLights() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".orb-a", {
        x: 40,
        y: 24,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-b", {
        x: -36,
        y: 18,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#15131c]" />
      <div className="orb orb-a -top-36 left-[18%] h-[420px] w-[420px] bg-[#5a4d78]/22" />
      <div className="orb orb-b -top-28 right-[12%] h-[380px] w-[460px] bg-[#3d4a62]/16" />
    </div>
  );
}

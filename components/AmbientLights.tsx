"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AmbientLights() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    el.style.setProperty("--mx", `${window.innerWidth * 0.5}px`);
    el.style.setProperty("--my", "140px");

    const onMove = (event: MouseEvent) => {
      gsap.to(el, {
        "--mx": `${event.clientX}px`,
        "--my": `${event.clientY}px`,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMove);

    const ctx = gsap.context(() => {
      gsap.to(".orb-a", {
        x: 70,
        y: 40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-b", {
        x: -80,
        y: 50,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-c", {
        x: 40,
        y: -30,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, el);

    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="orb orb-a -top-24 left-[8%] h-[420px] w-[420px] bg-[#4da3ff]/45" />
      <div className="orb orb-b -top-32 right-[6%] h-[460px] w-[520px] bg-[#a78bfa]/35" />
      <div className="orb orb-c top-24 left-1/2 h-[280px] w-[280px] -translate-x-1/2 bg-[#fbbf24]/12" />
      <div className="spotlight" />
    </div>
  );
}

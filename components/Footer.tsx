"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { site } from "@/lib/site";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-inner", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 95%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative z-10 border-t border-white/8 px-5 py-8 md:px-8">
      <div className="footer-inner mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <div className="flex gap-5">
          {site.socials.map((social) => (
            <a key={social.label} href={social.href} className="hover:text-ink">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

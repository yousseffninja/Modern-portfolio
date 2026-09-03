"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site } from "@/lib/site";

export function Header() {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = header.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.15,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={header} className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-16 items-center justify-between px-5 md:px-8">
        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-item text-sm text-white/55 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="text-sm text-white/60 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>

        <div className="nav-item flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Available
          </span>
          <a
            href="#contact"
            className="rounded-full bg-[#c4b5fd] px-4 py-1.5 text-sm font-medium text-[#1b1528]"
          >
            Resume
          </a>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-[#08070f]/90 px-5 py-4 md:hidden">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 text-lg text-white/90"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

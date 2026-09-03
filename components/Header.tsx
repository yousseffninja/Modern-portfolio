"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

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

      ScrollTrigger.create({
        start: 40,
        onUpdate: (self) => {
          el.classList.toggle("is-scrolled", self.scroll() > 40);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={header}
      className="glass fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-500 [&:is(.is-scrolled)]:bg-[rgba(5,6,10,0.62)] [&:is(.is-scrolled)]:shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        <a href="#top" className="text-sm tracking-[0.22em] uppercase text-ink/90">
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-item text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-item btn-light rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-ink"
          >
            Let&apos;s talk
          </a>
        </nav>

        <button
          type="button"
          className="text-sm text-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/8 px-5 py-4 md:hidden">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 text-lg text-ink/90"
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

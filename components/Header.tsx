"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { gsap } from "@/lib/motion";
import { site } from "@/lib/site";

export function Header() {
  const header = useRef<HTMLElement>(null);
  const resume = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = header.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.2,
      });
    }, el);

    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > last && y > 80;
      gsap.to(el, { y: hide ? -90 : 0, duration: 0.45, ease: "power3.out" });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, []);

  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = resume.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    gsap.to(el, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.3,
      y: (event.clientY - rect.top - rect.height / 2) * 0.3,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    if (!resume.current) return;
    gsap.to(resume.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <header ref={header} className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-16 items-center justify-between px-5 md:px-8">
        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-item text-sm text-white/50 transition-colors hover:text-white/85"
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
          <a
            ref={resume}
            href="https://drive.google.com/file/d/1q3OqWzHV9lRefGw-8dsVoqCZc-nnFmH2/view?usp=sharing"
            className="rounded-full bg-[#b7a8d9] px-4 py-1.5"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <p className="text-sm font-medium text-black">
              Resume
            </p>
          </a>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-[#15131c]/92 px-5 py-4 md:hidden">
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

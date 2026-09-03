"use client";

import { useLayoutEffect, useRef, type PointerEvent } from "react";
import gsap from "gsap";

const CORD_REST = 112;
const PULL_MAX = 78;
const PULL_TOGGLE = 38;

export function FloatingLamp() {
  const beam = useRef<HTMLDivElement>(null);
  const fixture = useRef<HTMLDivElement>(null);
  const cordLine = useRef<HTMLSpanElement>(null);
  const on = useRef(true);
  const pulling = useRef(false);
  const startY = useRef(0);
  const pull = useRef(0);

  useLayoutEffect(() => {
    const beamEl = beam.current;
    const fixtureEl = fixture.current;
    if (!beamEl || !fixtureEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([beamEl, fixtureEl], { rotation: -8, transformOrigin: "50% 0%" });
      return;
    }

    const tween = gsap.fromTo(
      [beamEl, fixtureEl],
      { rotation: 24 },
      {
        rotation: -24,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 0%",
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  const setLight = (next: boolean) => {
    on.current = next;
    const hero = fixture.current?.closest(".hero");
    hero?.classList.toggle("lamp-off", !next);

    gsap.to(".lamp-cone, .lamp-cone-visible", {
      opacity: next ? 1 : 0,
      duration: 0.28,
      ease: next ? "power2.out" : "power2.in",
    });
    gsap.to(".lamp-bulb", {
      opacity: next ? 1 : 0,
      duration: 0.22,
    });
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    pulling.current = true;
    startY.current = event.clientY;
    pull.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-pulling");
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!pulling.current || !cordLine.current) return;
    const dy = Math.max(0, Math.min(PULL_MAX, event.clientY - startY.current));
    pull.current = dy;
    gsap.set(cordLine.current, { height: CORD_REST + dy });
  };

  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!pulling.current) return;
    pulling.current = false;
    event.currentTarget.classList.remove("is-pulling");

    const shouldToggle = pull.current >= PULL_TOGGLE;
    gsap.to(cordLine.current, {
      height: CORD_REST,
      duration: 0.4,
      ease: "back.out(2.2)",
    });

    if (shouldToggle) {
      setLight(!on.current);
    }
    pull.current = 0;
  };

  return (
    <>
      <div className="lamp-blend" aria-hidden>
        <div ref={beam} className="lamp-pendulum">
          <div className="lamp-cone" />
        </div>
      </div>

      <div className="lamp-fixture-layer">
        <div ref={fixture} className="lamp-pendulum">
          <div className="lamp-cone-visible" aria-hidden />
          <svg
            className="lamp-svg"
            width="72"
            height="132"
            viewBox="0 0 72 132"
            fill="none"
            aria-hidden
          >
            <rect x="35" y="0" width="2" height="62" fill="#0b0b0d" />
            <path
              d="M16 74C16 62 25 58 36 58C47 58 56 62 56 74L58 82C48 90 24 90 14 82L16 74Z"
              fill="#09090b"
            />
            <path
              d="M18 75C18 65 26 62 36 62C46 62 54 65 54 75"
              stroke="#1c1c22"
              strokeWidth="1.2"
            />
            <g className="lamp-bulb">
              <ellipse cx="36" cy="83" rx="16" ry="5.5" fill="#eadfff" opacity="0.7" />
              <ellipse cx="36" cy="83" rx="7" ry="2.4" fill="#ffffff" opacity="0.55" />
            </g>
          </svg>
        </div>

        <button
          type="button"
          className="lamp-cord"
          aria-label="Pull the lamp cord"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span className="lamp-cord-mount" />
          <span ref={cordLine} className="lamp-cord-line" />
          <span className="lamp-cord-handle">
            <span className="lamp-cord-led" />
          </span>
        </button>
      </div>
    </>
  );
}

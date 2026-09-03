"use client";

export function AmbientLights() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#08070f]" />
      <div className="orb -top-32 left-1/2 h-[520px] w-[720px] -translate-x-1/2 bg-[#5b4d8a]/25" />
    </div>
  );
}

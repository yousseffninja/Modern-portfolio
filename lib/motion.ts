import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  [...text].forEach((char) => {
    const wrap = document.createElement("span");
    wrap.className = "char";
    const inner = document.createElement("span");
    inner.className = "char-inner";
    inner.textContent = char === " " ? "\u00a0" : char;
    wrap.appendChild(inner);
    el.appendChild(wrap);
  });
}

export function splitWords(el: HTMLElement) {
  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.textContent = "";
  words.forEach((word) => {
    const wrap = document.createElement("span");
    wrap.className = "word";
    const inner = document.createElement("span");
    inner.className = "word-inner";
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    el.appendChild(document.createTextNode(" "));
  });
}

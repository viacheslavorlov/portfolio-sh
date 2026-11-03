import { THEMES } from "./const";
import { state } from "./state";

export const $ = (s: string): HTMLElement | null => document.querySelector(s);
export const h = (s: string) =>
    String(s).replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c],
    );
export const fmtTime = (d: Date) => d.toTimeString().slice(0, 8);
export const smooth = () =>
    matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";

export function setTheme(name, o = {}) {
    if (!THEMES.includes(name)) return;
    state.theme = name;
    document.body.dataset.theme = name;
    $("#sbTheme")!.textContent = name;
    document
      .querySelectorAll(".thm")
      .forEach((b) => b.classList.toggle("on", b.dataset.thm === name));
    try {
      localStorage.setItem("pf-theme", name);
    } catch (e) {}
    if (!o.silent) log("ok", "theme ▸ " + name);
  }


export function cycleTheme() {
    setTheme(THEMES[(THEMES.indexOf(state.theme) + 1) % THEMES.length]);
  }
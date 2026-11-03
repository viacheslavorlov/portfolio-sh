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

/* ═══════════════ state ═══════════════ */
export const state = {
    page: "about",
    theme: "amber",
    open: new Set(["ledgerline"]),
    bootAt: Date.now(),
    hiring: false,
};
export const hist = [];
export let hIdx = -1,
    gg = false;
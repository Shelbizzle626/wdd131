/* ============================================================
   main.js — shared behavior across all pages
   ============================================================ */
"use strict";

// --- Mobile navigation toggle (DOM select + event listener + modify) ---
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", `${isOpen}`);
    toggle.textContent = isOpen ? "\u2715" : "\u2630"; // ✕ / ☰
  });
}

// --- Dynamic footer year ---
function initFooterYear() {
  const yearEl = document.querySelector("#year");
  if (yearEl) {
    yearEl.textContent = `${new Date().getFullYear()}`;
  }
}

// --- Visit counter using localStorage ---
function initVisitCounter() {
  const target = document.querySelector("#visit-count");
  if (!target) return;

  const stored = Number(localStorage.getItem("cq_visits") || "0");
  const visits = stored + 1;
  localStorage.setItem("cq_visits", `${visits}`);

  const noun = visits === 1 ? "time" : "times";
  target.textContent = `You have opened Checkpoint QA ${visits} ${noun} on this device.`;
}

// --- Greet a returning tester by name (set on the contact form) ---
function initGreeting() {
  const banner = document.querySelector("#greeting");
  if (!banner) return;

  const name = localStorage.getItem("cq_name");
  if (name) {
    banner.textContent = `Welcome back, ${name}.`;
    banner.hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFooterYear();
  initVisitCounter();
  initGreeting();
});

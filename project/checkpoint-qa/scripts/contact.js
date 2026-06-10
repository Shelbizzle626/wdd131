/* ============================================================
   contact.js — saves the tester's name to localStorage so the
   site can greet returning users. The form itself is a standard
   GET form that submits to thanks.html (works without JS too).
   ============================================================ */
"use strict";

function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", () => {
    const nameField = document.querySelector("#name");
    if (nameField && nameField.value.trim() !== "") {
      localStorage.setItem("cq_name", nameField.value.trim());
    }
    // Let the browser proceed with the normal GET submission.
  });
}

document.addEventListener("DOMContentLoaded", initContactForm);

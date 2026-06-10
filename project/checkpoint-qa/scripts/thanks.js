/* ============================================================
   thanks.js — reads the submitted form values from the URL
   query string and displays a confirmation summary.
   ============================================================ */
"use strict";

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: params.get("name") || "",
    email: params.get("email") || "",
    role: params.get("role") || "",
    platform: params.get("platform") || "",
    topic: params.get("topic") || "",
    message: params.get("message") || "",
    updates: params.get("updates")
  };
}

function renderSummary() {
  const target = document.querySelector("#summary");
  if (!target) return;

  const data = getParams();

  if (data.name === "" && data.email === "") {
    target.innerHTML = `<p>No submission details were found. Please <a href="contact.html">return to the form</a>.</p>`;
    return;
  }

  const heading = document.querySelector("#thanks-heading");
  if (heading && data.name !== "") {
    heading.textContent = `Thanks, ${data.name}!`;
  }

  const updatesText = data.updates ? "Yes" : "No";
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Role", data.role],
    ["Primary platform", data.platform],
    ["Topic", data.topic],
    ["Wants updates", updatesText],
    ["Message", data.message]
  ];

  const dl = rows
    .filter(([, value]) => value !== "")
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join("");

  target.innerHTML = `<dl>${dl}</dl>`;
}

document.addEventListener("DOMContentLoaded", renderSummary);

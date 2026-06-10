/* ============================================================
   checklists.js — interactive QA checklist tool
   Meets WDD131 dynamic-JS spec:
   - multiple functions
   - DOM select / modify / event listening
   - conditional branching
   - objects, arrays, array methods
   - template literals only for string output
   - localStorage persistence
   ============================================================ */
"use strict";

const STORAGE_KEY = "cq_checklist_v1";
const STATUSES = ["untested", "pass", "fail", "blocked"];

// --- State -----------------------------------------------------------------
let state = {
  platform: "web",
  title: "Untitled checklist",
  items: [],
  filter: "all"
};

// --- Persistence -----------------------------------------------------------
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) {
      state = parsed;
      if (!state.filter) state.filter = "all";
      state.items.forEach((item) => {
        if (item.notes === undefined) item.notes = "";
      })
      return true;
    }
  } catch (err) {
    console.warn("Could not parse saved checklist:", err);
  }
  return false;
}

// --- Helpers ---------------------------------------------------------------
function makeId() {
  return `chk_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

function loadTemplate(platformKey) {
  const template = window.CQ_TEMPLATES[platformKey];
  if (!template) return;

  state.platform = platformKey;
  state.title = `${template.label} smoke checklist`;
  state.items = template.items.map((item) => ({
    id: makeId(),
    text: item.text,
    priority: item.priority,
    status: "untested",
    notes: ""
  }));
  state.filter = "all";
  saveState();
  render();
}

function addItem(text, priority) {
  const clean = text.trim();
  if (clean === "") return false; // conditional guard

  state.items.push({
    id: makeId(),
    text: clean,
    priority: priority,
    status: "untested",
    notes: ""
  });
  saveState();
  render();
  return true;
}

function setStatus(id, status) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;
  item.status = status;
  saveState();
  render();
}

function setNote(id, value) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;
  item.notes = value;
  saveState();
}

function deleteItem(id) {
  state.items = state.items.filter((entry) => entry.id !== id);
  saveState();
  render();
}

function clearAll() {
  state.items = [];
  saveState();
  render();
}

function setFilter(filter) {
  state.filter = filter;
  render();
}

// --- Computed summary (array methods + objects) ----------------------------
function computeSummary() {
  const total = state.items.length;
  const counts = state.items.reduce(
    (acc, item) => {
      acc[item.status] += 1;
      return acc;
    },
    { untested: 0, pass: 0, fail: 0, blocked: 0 }
  );

  const tested = total - counts.untested;
  const percent = total === 0 ? 0 : Math.round((tested / total) * 100);
  const hardFails = state.items.filter(
    (item) => item.status === "fail" && item.priority === "P1"
  );

  return { total, counts, percent, hardFails };
}

// --- Rendering (template literals only) ------------------------------------
function statusButtons(item) {
  return STATUSES.map((status) => {
    const active = item.status === status ? " active" : "";
    const labels = {
      untested: "Untested",
      pass: "Pass",
      fail: "Fail",
      blocked: "Blocked"
    };
    return `<button type="button" class="status-btn${active}" data-set="${status}"
              data-action="status" data-id="${item.id}" data-status="${status}"
              aria-pressed="${item.status === status}">${labels[status]}</button>`;
  }).join("");
}

function itemMarkup(item) {
  const showNotes = item.status === "fail" || item.status === "blocked";
  const notesBlock = showNotes
    ? `<textarea class="notes-field" data-action="note" data-id="${item.id}"
         placeholder="What happened? Steps to reproduce, expected vs. actual…"
         aria-label="Notes for: ${item.text}">${item.notes}</textarea>`
    : "";

  return `
    <li class="check-item" data-status="${item.status}">
      <div class="check-main">
        <span class="pill ${item.priority.toLowerCase()}">${item.priority}</span>
        <span class="check-text">
          ${item.text}
          <span class="meta">status: ${item.status}</span>
        </span>
      </div>
      <div class="status-group">
        ${statusButtons(item)}
        <button type="button" class="link-btn" data-action="delete" data-id="${item.id}">Remove</button>
      </div>
      ${notesBlock}
    </li>`;
}

function renderList() {
  const list = document.querySelector("#checklist");
  if (!list) return;

  // conditional branching on filter value
  let visible;
  if (state.filter === "all") {
    visible = state.items;
  } else {
    visible = state.items.filter((item) => item.status === state.filter);
  }

  if (visible.length === 0) {
    const message =
      state.items.length === 0
        ? "No checks yet. Load a platform template or add your own check above."
        : `No checks match the "${state.filter}" filter.`;
    list.innerHTML = `<li class="empty">${message}</li>`;
    return;
  }

  list.innerHTML = visible.map(itemMarkup).join("");
}

function renderScorecard() {
  const { total, counts, percent, hardFails } = computeSummary();

  const fields = {
    "#stat-total": total,
    "#stat-pass": counts.pass,
    "#stat-fail": counts.fail,
    "#stat-blocked": counts.blocked
  };
  Object.entries(fields).forEach(([selector, value]) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = `${value}`;
  });

  const bar = document.querySelector("#progress-bar");
  const pctLabel = document.querySelector("#progress-label");
  if (bar) bar.style.width = `${percent}%`;
  if (pctLabel) pctLabel.textContent = `${percent}% tested`;

  const hardFailBox = document.querySelector("#hard-fail");
  if (hardFailBox) {
    if (hardFails.length > 0) {
      const names = hardFails.map((item) => item.text).join("; ");
      hardFailBox.innerHTML = `<strong>Hard-fail blocker:</strong> ${hardFails.length} priority-1 check(s) failing &mdash; ${names}. This build is not shippable.`;
      hardFailBox.hidden = false;
    } else {
      hardFailBox.hidden = true;
    }
  }

  const titleEl = document.querySelector("#checklist-title");
  if (titleEl) titleEl.textContent = `${state.title}`;
}

function renderFilters() {
  document.querySelectorAll(".chip").forEach((chip) => {
    const isActive = chip.dataset.filter === state.filter;
    chip.setAttribute("aria-pressed", `${isActive}`);
  });
}

function render() {
  renderScorecard();
  renderFilters();
  renderList();
}

// --- Export to clipboard (extra feature, template literals) ----------------
function buildExport() {
  const { total, counts, percent } = computeSummary();
  const lines = state.items.map((item) => {
    const mark = item.status === "pass" ? "[x]" : item.status === "fail" ? "[!]" : "[ ]";
    return `${mark} ${item.priority} ${item.text} (${item.status})`;
  });
  return `Checkpoint QA — ${state.title}\nPlatform: ${state.platform}\nTested: ${percent}% | Pass: ${counts.pass} | Fail: ${counts.fail} | Blocked: ${counts.blocked} | Total: ${total}\n\n${lines.join("\n")}`;
}

async function copyExport() {
  const text = buildExport();
  const note = document.querySelector("#export-note");
  try {
    await navigator.clipboard.writeText(text);
    if (note) note.textContent = "Copied checklist summary to clipboard.";
  } catch (err) {
    if (note) note.textContent = "Copy failed — your browser blocked clipboard access.";
  }
}

// --- Event wiring ----------------------------------------------------------
function initTool() {
  const list = document.querySelector("#checklist");
  if (!list) return; // not on the tool page

  // Event delegation for per-item buttons
  list.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const action = button.dataset.action;
    const id = button.dataset.id;

    list.addEventListener("input", (event) => {
      const field = event.target.closest(".notes-field");
      if (!field.dataset.id, field.value);
    });

    if (action === "status") {
      setStatus(id, button.dataset.status);
    } else if (action === "delete") {
      deleteItem(id);
    }
  });

  // Add-item form
  const form = document.querySelector("#add-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#new-check");
    const priority = document.querySelector("#new-priority").value;
    const added = addItem(input.value, priority);
    if (added) {
      input.value = "";
      input.focus();
    }
  });

  // Platform template loader
  const platformSelect = document.querySelector("#platform-select");
  platformSelect.addEventListener("change", (event) => {
    loadTemplate(event.target.value);
  });

  // Filter chips
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => setFilter(chip.dataset.filter));
  });

  // Clear + export
  document.querySelector("#clear-btn").addEventListener("click", () => {
    if (state.items.length === 0) return;
    const ok = window.confirm("Clear every check from this checklist?");
    if (ok) clearAll();
  });
  document.querySelector("#export-btn").addEventListener("click", copyExport);

  // Initialize state: restore saved work or seed a starter template
  const restored = loadState();
  if (!restored) {
    loadTemplate("web");
  } else {
    if (document.querySelector("#platform-select")) {
      document.querySelector("#platform-select").value = state.platform;
    }
    render();
  }
}

document.addEventListener("DOMContentLoaded", initTool);

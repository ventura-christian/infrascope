"use strict";

export function initUI() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("active");
    }
  });
}

export function renderSystems(systems) {
  const container = document.getElementById("systems-container");

  container.innerHTML = "";

  systems.forEach((system) => {
    const card = document.createElement("div");

    card.classList.add("system-card", system.status);
    card.innerHTML = `<span>${system.name}</span><span>${system.latency}ms</span>`;

    container.appendChild(card);
  });
}

const toggle = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !toggle.contains(e.target)) {
    menu.classList.remove("active");
  }
});

const modeLinks = document.querySelectorAll("[data-mode]");
const body = document.body;

const signalValue = document.getElementById("signal-value");

modeLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const mode = link.getAttribute("data-mode");

    body.setAttribute("data-mode", mode);

    const label = document.getElementById("mode-label");

    if (label) label.textContent = `[${mode.toUpperCase()}]`;

    document.body.classList.remove("mode-switch");
    void document.body.offsetWidth;
    document.body.classList.add("mode-switch");

    document.dispatchEvent(new CustomEvent("modeChange", { detail: mode }));
  });
});

const glyphLayer = document.querySelector(".dashboard-glyphs");

document.addEventListener("modeChange", (e) => {
  const mode = e.detail;

  let text = "";

  if (mode === "idle") {
    text = "SYSTEM STANDBY AWAITING INPUT";
  }

  if (mode === "dashboard") {
    text = "SYS ONLINE NODE ACTIVE LATENCY OK";
  }

  if (mode === "storage") {
    text = "CACHE WRITE READ MEMORY INDEX IO";
  }

  if (mode === "feed") {
    text = "STREAM DATA PACKET EVENT LOG SIGNAL";
  }

  glyphLayer.style.setProperty("--glyph-content", `"${text}`);
});

export function renderFeed(feed) {
  const container = document.getElementById("feed-container");

  if (!container) return;

  container.innerHTML = "";

  feed.forEach((entry) => {
    const div = document.createElement("div");
    div.classList.add("feed-entry");

    div.innerHTML = `
    <span class="feed-time">[${entry.timestamp}]</span>
    <span class="feed-msg">[${entry.message}]</span>
    `;

    container.appendChild(div);
  });
}

export function renderStorage(notes) {
  const container = document.getElementById("storage-list");

  if (!container) return;

  container.innerHTML = "";

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.classList.add("storage-item");
    div.textContent = note;

    container.appendChild(div);
  });
}

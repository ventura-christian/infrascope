"use strict";

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

const modeLinks = document.querySelectorAll("[data-mode]");
const body = document.body;
const label = document.getElementById("mode-label");

const signalValue = document.getElementById("signal-value");

const contextMode = document.getElementById("context-mode");

modeLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const mode = link.getAttribute("data-mode");

    body.setAttribute("data-mode", mode);

    label.textContent = `[${mode.toUpperCase()}]`;
    contextMode.textContent = mode.toUpperCase();

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

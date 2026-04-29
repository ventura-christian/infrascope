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

modeLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const mode = link.getAttribute("data-mode");

    body.setAttribute("data-mode", mode);
    label.textContent = `[${mode.toUpperCase()}]`;
  });
});

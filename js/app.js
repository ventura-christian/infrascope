"use strict";

/*
  InfraScope: Main Application File

  This file controls:
    - application state
    - system simulation
    - UI mode switching
    - event logging
    - integration between modules (API, UI, storage)

    All core functionality is orchestrated from this entry point.

*/

import { initUI } from "./ui.js";
import { fetchSystems } from "./api.js";
import { renderSystems, renderFeed, renderStorage } from "./ui.js";
import { saveNote, getNotes } from "./storage.js";

const state = {
  systems: [],
  feed: [],
  session: {
    startTime: Date.now(),
    interactions: 0,
    lastInteraction: Date.now(),
  },
};

function updateInteraction() {
  state.session.lastInteraction = Date.now();
  state.session.interactions++;

  logEvent("User interaction detected");
}
document.addEventListener("click", updateInteraction);
document.addEventListener("keydown", updateInteraction);
document.addEventListener("scroll", updateInteraction);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updateInteraction();
  }
});

function simulateSession() {
  const now = Date.now();
  const inactiveTime = now - state.session.lastInteraction;

  if (inactiveTime > 60000) {
    logEvent("Session inactive");
  }
}

setInterval(simulateSession, 5000);

async function init() {
  state.systems = await fetchSystems();
  renderSystems(state.systems);

  const notes = getNotes();
  renderStorage(notes);
}

init();

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("storage-input");
  const button = document.getElementById("storage-save");

  if (!input || !button) return;

  button.addEventListener("click", () => {
    const value = input.value.trim();

    if (!value) return;

    saveNote(value);

    const updated = getNotes();
    renderStorage(updated);

    input.value = "";
  });
});

// Maintains a bounded event log (max 20 entries) to simulate constrained system memory

// while ensuring newest events are prioritized for real-time UI rendering.
function logEvent(message) {
  const timestamp = new Date().toLocaleTimeString();

  state.feed.unshift({
    message,
    timestamp,
  });

  if (state.feed.length > 20) {
    state.feed.pop();
  }

  console.log(`[${timestamp}] ${message}`);
  renderFeed(state.feed);
}

// Simulates real-world infrastructure instability by introducing controlled latency variance

// and deriving system health states from performance thresholds (online → degraded → offline).
function simulateSystems() {
  state.systems = state.systems.map((system) => {
    let latency = system.latency;
    let prevStatus = system.status;

    latency += Math.floor(Math.random() * 40 - 20);
    if (latency < 10) latency = 10;

    let status = "online";
    if (latency > 120) status = "degraded";
    if (latency > 200) status = "offline";

    if (status !== prevStatus) {
      logEvent(`${system.name} changed to ${status}`);
    }

    return {
      ...system,
      latency,
      status,
    };
  });

  renderSystems(state.systems);
}

setInterval(simulateSystems, 3000);

$(document).ready(function () {
  if ($(".carousel").length) {
    $(".carousel").on("init", function () {
      $(this).css("visibility", "visible");
    });

    $(".carousel").slick({
      autoplay: true,
      arrows: false,
      dots: true,
      autoplaySpeed: 1500,
      speed: 300,
    });
  }
});

// Centralized UI state controller that synchronizes DOM, visual label, and global mode state

// using a custom event to decouple UI rendering from state mutation logic.
function setMode(mode) {
  document.body.setAttribute("data-mode", mode);

  const label = document.getElementById("mode-label");
  if (label) label.textContent = `[${mode.toUpperCase()}]`;

  document.dispatchEvent(
    new CustomEvent("modeChange", {
      detail: mode,
    }),
  );
}

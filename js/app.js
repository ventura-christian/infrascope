"use strict";

import { fetchSystems } from "./api.js";
import { renderSystems, renderFeed } from "./ui.js";

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
}

init();
console.log("INIT SUCCESS");

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
  console.log("FEED STATE:", state.feed);

  renderFeed(state.feed);
}

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

"use strict";

export async function fetchSystems() {
  try {
    const response = await fetch("data/systems.json");

    if (!response.ok) {
      throw new Error("Failed to fetch systems");
    }

    const data = await response.json();
    return data.systems;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}

"use strict";

const STORAGE_KEY = "infra_notes";

export function saveNote(note) {
  const notes = getNotes();
  notes.unshift(note);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function getNotes() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export type Note = {
  id: string
  title: string
  subject: string
  description?: string
  fileName: string
  fileType: string
  fileSize: number
  createdAt: number
  dataUrl: string
}

const STORAGE_KEY = "nv_notes_v1"

function safeParse(json: string | null): Note[] {
  if (!json) return []
  try {
    return JSON.parse(json) as Note[]
  } catch {
    return []
  }
}

function readAll(): Note[] {
  if (typeof window === "undefined") return []
  return safeParse(window.localStorage.getItem(STORAGE_KEY))
}

function writeAll(notes: Note[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export function addNote(note: Note) {
  const notes = readAll()
  notes.unshift(note)
  writeAll(notes)
  try {
    window.localStorage.setItem(`${STORAGE_KEY}_ts`, String(Date.now()))
  } catch {}
}

export function getNotes(): Note[] {
  return readAll()
}

export function clearNotes() {
  writeAll([])
}

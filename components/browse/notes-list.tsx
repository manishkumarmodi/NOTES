"use client"

import { useEffect, useState } from "react"
import { getNotes, type Note } from "@/lib/notes-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    setNotes(getNotes())
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith("nv_notes_v1")) setNotes(getNotes())
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  if (!notes.length) {
    return <p className="text-muted-foreground">No notes yet. Upload your first engineering note.</p>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((n) => (
        <Card key={n.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-pretty">{n.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {n.subject || "Engineering"}
              </Badge>
              <span className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleDateString()}</span>
            </div>
            {n.description ? <p className="text-sm text-muted-foreground line-clamp-3">{n.description}</p> : null}
            <div className="text-xs text-muted-foreground">
              {n.fileName} • {n.fileType || "file"} • {Math.round(n.fileSize / 1024)} KB
            </div>
            {n.dataUrl ? (
              <Button asChild size="sm" aria-label={`Download ${n.title}`}>
                <a href={n.dataUrl} download={n.fileName}>
                  Download
                </a>
              </Button>
            ) : (
              <Button size="sm" variant="outline" disabled>
                Download unavailable
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

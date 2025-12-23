"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUploadZone } from "./file-upload-zone"
import { useAuth } from "@/components/auth/auth-provider"
import { addNote } from "@/lib/notes-store"

interface UploadFormData {
  title: string
  subject: string
  description: string
  file: File | null
}

export function UploadForm() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<UploadFormData>({
    title: "",
    subject: "",
    description: "",
    file: null,
  })

  const handleInputChange = (field: keyof UploadFormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }))
  }

  async function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      router.push("/")
      return
    }
    if (!formData.file || !formData.title.trim() || !formData.subject.trim() || !formData.description.trim()) return

    setLoading(true)
    try {
      const dataUrl = await fileToDataUrl(formData.file)
      addNote({
        id: crypto.randomUUID(),
        title: formData.title.trim(),
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        fileName: formData.file.name,
        fileType: formData.file.type,
        fileSize: formData.file.size,
        createdAt: Date.now(),
        dataUrl,
      })

      setFormData({ title: "", subject: "", description: "", file: null })
      router.push("/browse")
    } catch (error) {
      console.error("[v0] Upload failed:", (error as Error).message)
      alert("Upload failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">You need to be signed in to upload notes.</p>
          <Button onClick={() => router.push("/")}>Go to Home</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Upload Engineering Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>Upload File *</Label>
            <FileUploadZone onFileSelect={(file) => handleInputChange("file", file)} selectedFile={formData.file} />
            <p className="text-xs text-muted-foreground">Accepted: PDF, DOCX, PPT, TXT</p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., Signals and Systems - Midterm Summary"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          {/* Subject (free text) */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              type="text"
              placeholder="e.g., Algorithms, Thermodynamics, Circuit Analysis"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description/Summary *</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe the content (topics covered, exam focus, etc.)"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={
              loading ||
              !formData.file ||
              !formData.title.trim() ||
              !formData.subject.trim() ||
              !formData.description.trim()
            }
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload Notes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

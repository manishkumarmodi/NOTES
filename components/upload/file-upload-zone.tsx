"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, type File, X, AlertCircle } from "lucide-react"

interface FileUploadZoneProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
}

export function FileUploadZone({ onFileSelect, selectedFile }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState("")

  const acceptedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
  ]

  const maxFileSize = 10 * 1024 * 1024 // 10MB

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return "Please upload a PDF, DOCX, PPT, or TXT file"
    }
    if (file.size > maxFileSize) {
      return "File size must be less than 10MB"
    }
    return null
  }

  const handleFile = (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }
    setError("")
    onFileSelect(file)
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0])
      }
    },
    [], // Removed handleFile from dependencies
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    onFileSelect(null)
    setError("")
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄"
    if (type.includes("word") || type.includes("document")) return "📝"
    if (type.includes("presentation") || type.includes("powerpoint")) return "📊"
    if (type.includes("text")) return "📋"
    return "📁"
  }

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <Card
          className={`border-2 border-dashed transition-colors ${
            dragActive ? "border-accent bg-accent/5" : "border-muted-foreground/25"
          } ${error ? "border-destructive" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="p-8 text-center">
            <Upload className={`mx-auto h-12 w-12 mb-4 ${dragActive ? "text-accent" : "text-muted-foreground"}`} />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop your file here, or click to browse</p>
              <p className="text-sm text-muted-foreground">Supports PDF, DOCX, PPT, TXT files up to 10MB</p>
            </div>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.ppt,.pptx,.txt"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline" className="mt-4 bg-transparent">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose File
              </label>
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{getFileIcon(selectedFile.type)}</div>
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

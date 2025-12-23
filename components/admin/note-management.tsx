"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Search, Eye, Flag, Calendar } from "lucide-react"

interface PendingNote {
  id: string
  title: string
  subject: string
  description: string
  uploader: string
  uploaderAvatar: string
  fileType: string
  fileSize: string
  uploadDate: string
  status: "pending" | "approved" | "rejected"
  flagged: boolean
  flagReason?: string
}

// Mock data
const mockPendingNotes: PendingNote[] = [
  {
    id: "pending-1",
    title: "Advanced Machine Learning Algorithms",
    subject: "Computer Science",
    description:
      "Comprehensive guide to ML algorithms including neural networks, decision trees, and ensemble methods.",
    uploader: "John Doe",
    uploaderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    fileType: "PDF",
    fileSize: "3.2 MB",
    uploadDate: "2024-01-25",
    status: "pending",
    flagged: false,
  },
  {
    id: "pending-2",
    title: "Organic Chemistry Lab Manual",
    subject: "Chemistry",
    description:
      "Complete lab manual with procedures, safety guidelines, and expected results for organic chemistry experiments.",
    uploader: "Sarah Wilson",
    uploaderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    fileType: "PDF",
    fileSize: "5.1 MB",
    uploadDate: "2024-01-24",
    status: "pending",
    flagged: true,
    flagReason: "Potential copyright violation",
  },
  {
    id: "pending-3",
    title: "Statistics and Probability Theory",
    subject: "Mathematics",
    description: "Detailed notes covering probability distributions, hypothesis testing, and statistical inference.",
    uploader: "Mike Chen",
    uploaderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    fileType: "DOCX",
    fileSize: "1.8 MB",
    uploadDate: "2024-01-23",
    status: "pending",
    flagged: false,
  },
]

export function NoteManagement() {
  const [notes, setNotes] = useState<PendingNote[]>(mockPendingNotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.uploader.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || note.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (noteId: string) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, status: "approved" as const } : note)))
  }

  const handleReject = (noteId: string) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, status: "rejected" as const } : note)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Note Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes by title, subject, or uploader..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{note.title}</h3>
                        {note.flagged && (
                          <Badge variant="destructive" className="flex items-center space-x-1">
                            <Flag className="h-3 w-3" />
                            <span>Flagged</span>
                          </Badge>
                        )}
                      </div>
                      <Badge variant="secondary" className="mb-2">
                        {note.subject}
                      </Badge>
                      <p className="text-muted-foreground text-sm mb-3">{note.description}</p>

                      {note.flagged && note.flagReason && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
                          <p className="text-red-800 text-sm font-medium">Flag Reason:</p>
                          <p className="text-red-700 text-sm">{note.flagReason}</p>
                        </div>
                      )}
                    </div>
                    <Badge className={getStatusColor(note.status)}>
                      {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={note.uploaderAvatar || "/placeholder.svg"} alt={note.uploader} />
                          <AvatarFallback>{note.uploader.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{note.uploader}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(note.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <span>
                        {note.fileType} • {note.fileSize}
                      </span>
                    </div>

                    {note.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(note.id)}>
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button size="sm" onClick={() => handleApprove(note.id)}>
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notes found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Download, Star, Eye, BookOpen, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BookmarkedNote {
  id: string
  title: string
  subject: string
  description: string
  author: string
  uploader: string
  rating: number
  downloads: number
  views: number
  tags: string[]
  bookmarkedDate: string
  fileType: string
}

// Mock bookmarked notes - replace with actual API calls
const mockBookmarkedNotes: BookmarkedNote[] = [
  {
    id: "1",
    title: "Advanced Calculus - Integration Techniques",
    subject: "Mathematics",
    description: "Comprehensive guide covering all integration techniques with step-by-step examples.",
    author: "Dr. Smith",
    uploader: "Sarah Chen",
    rating: 4.9,
    downloads: 1250,
    views: 3400,
    tags: ["Calculus", "Integration", "Math"],
    bookmarkedDate: "2024-01-20",
    fileType: "PDF",
  },
  {
    id: "2",
    title: "Data Structures & Algorithms Complete Guide",
    subject: "Computer Science",
    description: "Complete coverage of data structures and algorithms with code examples.",
    author: "Prof. Johnson",
    uploader: "Alex Kumar",
    rating: 4.8,
    downloads: 980,
    views: 2800,
    tags: ["DSA", "Programming", "Algorithms"],
    bookmarkedDate: "2024-01-18",
    fileType: "PDF",
  },
  {
    id: "3",
    title: "Organic Chemistry Reaction Mechanisms",
    subject: "Chemistry",
    description: "Detailed explanation of organic reaction mechanisms with visual diagrams.",
    author: "Dr. Wilson",
    uploader: "Maria Rodriguez",
    rating: 4.7,
    downloads: 750,
    views: 2100,
    tags: ["Organic", "Reactions", "Mechanisms"],
    bookmarkedDate: "2024-01-15",
    fileType: "PDF",
  },
]

export function BookmarkedNotes() {
  const { user } = useAuth()
  const router = useRouter()
  const [bookmarkedNotes, setBookmarkedNotes] = useState<BookmarkedNote[]>(mockBookmarkedNotes)
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")

  if (!user) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your bookmarks.</p>
          <Button onClick={() => router.push("/")}>Go to Home</Button>
        </CardContent>
      </Card>
    )
  }

  const subjects = ["all", ...Array.from(new Set(bookmarkedNotes.map((note) => note.subject)))]

  const filteredNotes = bookmarkedNotes.filter((note) => {
    const matchesSearch =
      searchQuery === "" ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSubject = subjectFilter === "all" || note.subject === subjectFilter

    return matchesSearch && matchesSubject
  })

  const handleRemoveBookmark = (noteId: string) => {
    setBookmarkedNotes(bookmarkedNotes.filter((note) => note.id !== noteId))
  }

  const handleDownload = (note: BookmarkedNote) => {
    console.log(`Downloading: ${note.title}`)
    alert(`Downloading: ${note.title}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">My Bookmarks</h1>
          <p className="text-lg text-muted-foreground">Notes you've saved for later</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Heart className="h-4 w-4 text-red-500" />
          <span>{bookmarkedNotes.length} bookmarked notes</span>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your bookmarked notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookmarked Notes */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{note.subject}</Badge>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {note.rating}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {note.views}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg text-balance leading-tight">
                  <Link href={`/notes/${note.id}`} className="hover:text-accent transition-colors">
                    {note.title}
                  </Link>
                </CardTitle>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Author: {note.author}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Uploaded by: {note.uploader}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Bookmarked: {new Date(note.bookmarkedDate).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm text-pretty line-clamp-3">{note.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {note.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {note.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{note.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {note.downloads}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {note.fileType}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveBookmark(note.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                    <Button size="sm" onClick={() => handleDownload(note)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No bookmarks found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || subjectFilter !== "all"
                ? "No bookmarks match your current filters."
                : "You haven't bookmarked any notes yet. Start exploring and save notes for later!"}
            </p>
            <Button asChild>
              <Link href="/browse">Browse Notes</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

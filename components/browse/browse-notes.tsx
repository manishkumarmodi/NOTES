"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-provider"
import { Search, Filter, Download, Star, Eye, User, Calendar, BookOpen, Heart } from "lucide-react"
import Link from "next/link"

interface Note {
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
  semester: string
  year: string
  fileType: string
  uploadDate: string
  isPremium: boolean
}

// Mock data - replace with actual API call
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Advanced Calculus - Integration Techniques",
    subject: "Mathematics",
    description:
      "Comprehensive guide covering all integration techniques with step-by-step examples and practice problems.",
    author: "Dr. Smith",
    uploader: "Sarah Chen",
    rating: 4.9,
    downloads: 1250,
    views: 3400,
    tags: ["Calculus", "Integration", "Math", "Advanced"],
    semester: "3rd Semester",
    year: "2024",
    fileType: "PDF",
    uploadDate: "2024-01-15",
    isPremium: false,
  },
  {
    id: "2",
    title: "Data Structures & Algorithms Complete Guide",
    subject: "Computer Science",
    description:
      "Complete coverage of data structures and algorithms with code examples in multiple programming languages.",
    author: "Prof. Johnson",
    uploader: "Alex Kumar",
    rating: 4.8,
    downloads: 980,
    views: 2800,
    tags: ["DSA", "Programming", "Algorithms", "Data Structures"],
    semester: "4th Semester",
    year: "2024",
    fileType: "PDF",
    uploadDate: "2024-01-10",
    isPremium: false,
  },
  {
    id: "3",
    title: "Organic Chemistry Reaction Mechanisms",
    subject: "Chemistry",
    description:
      "Detailed explanation of organic reaction mechanisms with visual diagrams and real-world applications.",
    author: "Dr. Wilson",
    uploader: "Maria Rodriguez",
    rating: 4.7,
    downloads: 750,
    views: 2100,
    tags: ["Organic", "Reactions", "Mechanisms", "Chemistry"],
    semester: "2nd Semester",
    year: "2024",
    fileType: "PDF",
    uploadDate: "2024-01-08",
    isPremium: false,
  },
  {
    id: "4",
    title: "Microeconomics Principles & Applications",
    subject: "Economics",
    description: "Fundamental principles of microeconomics with real-world applications and case studies.",
    author: "Prof. Davis",
    uploader: "David Thompson",
    rating: 4.6,
    downloads: 650,
    views: 1900,
    tags: ["Economics", "Microeconomics", "Theory", "Applications"],
    semester: "1st Semester",
    year: "2024",
    fileType: "DOCX",
    uploadDate: "2024-01-05",
    isPremium: false,
  },
  {
    id: "5",
    title: "Modern Physics - Quantum Mechanics",
    subject: "Physics",
    description: "Introduction to quantum mechanics with mathematical foundations and practical examples.",
    author: "Dr. Brown",
    uploader: "Emily Watson",
    rating: 4.5,
    downloads: 520,
    views: 1600,
    tags: ["Physics", "Quantum", "Modern", "Mechanics"],
    semester: "5th Semester",
    year: "2023",
    fileType: "PDF",
    uploadDate: "2023-12-20",
    isPremium: true,
  },
  {
    id: "6",
    title: "Cell Biology and Genetics",
    subject: "Biology",
    description: "Comprehensive study of cell biology and genetic principles with laboratory examples.",
    author: "Dr. Green",
    uploader: "Lisa Park",
    rating: 4.4,
    downloads: 430,
    views: 1300,
    tags: ["Biology", "Cell", "Genetics", "Laboratory"],
    semester: "2nd Semester",
    year: "2023",
    fileType: "PPT",
    uploadDate: "2023-12-15",
    isPremium: false,
  },
]

export function BrowseNotes() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [sortBy, setSortBy] = useState("downloads")
  const [bookmarkedNotes, setBookmarkedNotes] = useState<string[]>([])

  const subjects = ["all", ...Array.from(new Set(mockNotes.map((note) => note.subject)))]
  const semesters = ["all", ...Array.from(new Set(mockNotes.map((note) => note.semester)))]
  const years = ["all", ...Array.from(new Set(mockNotes.map((note) => note.year)))]

  const filteredAndSortedNotes = useMemo(() => {
    const filtered = mockNotes.filter((note) => {
      const matchesSearch =
        searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        note.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.uploader.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSubject = selectedSubject === "all" || note.subject === selectedSubject
      const matchesSemester = selectedSemester === "all" || note.semester === selectedSemester
      const matchesYear = selectedYear === "all" || note.year === selectedYear

      return matchesSearch && matchesSubject && matchesSemester && matchesYear
    })

    // Sort notes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "downloads":
          return b.downloads - a.downloads
        case "rating":
          return b.rating - a.rating
        case "recent":
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedSubject, selectedSemester, selectedYear, sortBy])

  const handleDownload = (note: Note) => {
    // Simulate download - replace with actual download logic
    console.log(`Downloading: ${note.title}`)
    alert(`Downloading: ${note.title}`)
  }

  const handleBookmark = (noteId: string) => {
    if (!user) {
      alert("Please sign in to bookmark notes")
      return
    }

    setBookmarkedNotes((prev) => (prev.includes(noteId) ? prev.filter((id) => id !== noteId) : [...prev, noteId]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSubject("all")
    setSelectedSemester("all")
    setSelectedYear("all")
    setSortBy("downloads")
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title, description, tags, author, or uploader..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject === "all" ? "All Subjects" : subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester === "all" ? "All Semesters" : semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedNotes.length} of {mockNotes.length} notes
              </p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant={note.isPremium ? "default" : "secondary"}>{note.subject}</Badge>
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
                  {note.semester}, {note.year}
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
                    onClick={() => handleBookmark(note.id)}
                    className={bookmarkedNotes.includes(note.id) ? "text-red-600" : ""}
                  >
                    <Heart className={`h-4 w-4 ${bookmarkedNotes.includes(note.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/notes/${note.id}`}>View</Link>
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

      {/* No Results */}
      {filteredAndSortedNotes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notes found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find what you're looking for.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

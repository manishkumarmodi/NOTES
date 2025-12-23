"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RatingStars } from "./rating-stars"
import { ReviewForm } from "./review-form"
import { ReviewList } from "./review-list"
import { useAuth } from "@/components/auth/auth-provider"
import { Download, Star, Eye, User, Calendar, BookOpen, ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

interface Note {
  id: string
  title: string
  subject: string
  description: string
  author: string
  uploader: string
  uploaderAvatar: string
  rating: number
  totalRatings: number
  downloads: number
  views: number
  tags: string[]
  semester: string
  year: string
  fileType: string
  fileSize: string
  uploadDate: string
  isPremium: boolean
}

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
}

// Mock data - replace with actual API calls
const mockNote: Note = {
  id: "1",
  title: "Advanced Calculus - Integration Techniques",
  subject: "Mathematics",
  description:
    "This comprehensive guide covers all major integration techniques used in advanced calculus. The document includes step-by-step examples, practice problems with detailed solutions, and real-world applications. Topics covered include integration by parts, trigonometric substitution, partial fractions, and advanced techniques for solving complex integrals. Perfect for students preparing for calculus exams or anyone looking to master integration methods.",
  author: "Dr. Smith",
  uploader: "Sarah Chen",
  uploaderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  rating: 4.9,
  totalRatings: 127,
  downloads: 1250,
  views: 3400,
  tags: ["Calculus", "Integration", "Math", "Advanced", "Examples"],
  semester: "3rd Semester",
  year: "2024",
  fileType: "PDF",
  fileSize: "2.4 MB",
  uploadDate: "2024-01-15",
  isPremium: false,
}

const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Alex Johnson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    rating: 5,
    comment:
      "Excellent notes! The step-by-step examples really helped me understand integration by parts. The practice problems are challenging but fair.",
    date: "2024-01-20",
    helpful: 23,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Maria Garcia",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    rating: 5,
    comment:
      "These notes saved my calculus grade! The explanations are clear and the examples are relevant. Highly recommend for anyone struggling with integration.",
    date: "2024-01-18",
    helpful: 19,
  },
  {
    id: "3",
    userId: "user3",
    userName: "David Kim",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    rating: 4,
    comment:
      "Good comprehensive coverage of integration techniques. Could use a few more practice problems, but overall very helpful.",
    date: "2024-01-16",
    helpful: 12,
  },
]

interface NoteDetailsProps {
  noteId: string
}

export function NoteDetails({ noteId }: NoteDetailsProps) {
  const { user } = useAuth()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [userRating, setUserRating] = useState<number>(0)

  // In a real app, you would fetch the note data based on noteId
  const note = mockNote

  const handleDownload = () => {
    console.log(`Downloading: ${note.title}`)
    alert(`Downloading: ${note.title}`)
  }

  const handleAddReview = (rating: number, comment: string) => {
    if (!user) return

    const newReview: Review = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    }

    setReviews([newReview, ...reviews])
    setUserRating(rating)
    setShowReviewForm(false)
  }

  const userHasReviewed = user && reviews.some((review) => review.userId === user.id)

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link href="/browse">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Link>
      </Button>

      {/* Note Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <Badge variant={note.isPremium ? "default" : "secondary"} className="mb-2">
              {note.subject}
            </Badge>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                {note.rating} ({note.totalRatings} reviews)
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {note.views}
              </div>
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                {note.downloads}
              </div>
            </div>
          </div>

          <CardTitle className="text-2xl md:text-3xl text-balance mb-4">{note.title}</CardTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Author: {note.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {note.semester}, {note.year}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Uploaded by: {note.uploader}
            </div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              {note.fileType} • {note.fileSize}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">{note.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {note.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={handleDownload} className="flex-1">
              <Download className="h-5 w-5 mr-2" />
              Download Notes
            </Button>
            {user && !userHasReviewed && (
              <Button variant="outline" size="lg" onClick={() => setShowReviewForm(true)}>
                <Star className="h-5 w-5 mr-2" />
                Write Review
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uploader Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={note.uploaderAvatar || "/placeholder.svg"} alt={note.uploader} />
              <AvatarFallback>{note.uploader.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{note.uploader}</h3>
              <p className="text-sm text-muted-foreground">
                Uploaded on {new Date(note.uploadDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && user && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewForm onSubmit={handleAddReview} onCancel={() => setShowReviewForm(false)} />
          </CardContent>
        </Card>
      )}

      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reviews ({reviews.length})</span>
            <div className="flex items-center space-x-2">
              <RatingStars rating={note.rating} size="sm" />
              <span className="text-sm text-muted-foreground">
                {note.rating} out of 5 ({note.totalRatings} reviews)
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewList reviews={reviews} />
        </CardContent>
      </Card>
    </div>
  )
}

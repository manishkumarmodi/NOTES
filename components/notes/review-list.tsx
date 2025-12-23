"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { RatingStars } from "./rating-stars"
import { ThumbsUp } from "lucide-react"

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

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({})

  const handleHelpfulClick = (reviewId: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }))
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to review these notes!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
          <div className="flex items-start space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
              <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{review.userName}</h4>
                  <div className="flex items-center space-x-2">
                    <RatingStars rating={review.rating} size="sm" />
                    <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-pretty leading-relaxed">{review.comment}</p>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleHelpfulClick(review.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful + (helpfulVotes[review.id] || 0)})
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

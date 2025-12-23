"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RatingStars } from "./rating-stars"

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void
  onCancel: () => void
}

export function ReviewForm({ onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Please select a rating")
      return
    }
    if (comment.trim().length < 10) {
      alert("Please write a review with at least 10 characters")
      return
    }
    onSubmit(rating, comment.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Your Rating</Label>
        <div className="flex items-center space-x-2">
          <RatingStars rating={rating} interactive onRatingChange={setRating} size="lg" />
          <span className="text-sm text-muted-foreground">
            {rating === 0 ? "Click to rate" : `${rating} out of 5 stars`}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Your Review</Label>
        <Textarea
          id="comment"
          placeholder="Share your thoughts about these notes. What did you find helpful? Any suggestions for improvement?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">{comment.length}/500 characters</p>
      </div>

      <div className="flex space-x-4">
        <Button type="submit" disabled={rating === 0 || comment.trim().length < 10}>
          Submit Review
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

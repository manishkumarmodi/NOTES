"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, X } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    newUploads: true,
    reviewResponses: true,
    weeklyDigest: false,
    systemUpdates: true,
  })

  const [followedSubjects, setFollowedSubjects] = useState(["Computer Science", "Mathematics", "Physics"])

  const [availableSubjects] = useState(["Chemistry", "Biology", "Economics", "Psychology", "History", "Literature"])

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleFollowSubject = (subject: string) => {
    if (!followedSubjects.includes(subject)) {
      setFollowedSubjects([...followedSubjects, subject])
    }
  }

  const handleUnfollowSubject = (subject: string) => {
    setFollowedSubjects(followedSubjects.filter((s) => s !== subject))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-uploads">New uploads in followed subjects</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new notes are uploaded in subjects you follow
                </p>
              </div>
              <Switch
                id="new-uploads"
                checked={notifications.newUploads}
                onCheckedChange={() => handleNotificationChange("newUploads")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="review-responses">Review responses</Label>
                <p className="text-sm text-muted-foreground">Get notified when someone responds to your reviews</p>
              </div>
              <Switch
                id="review-responses"
                checked={notifications.reviewResponses}
                onCheckedChange={() => handleNotificationChange("reviewResponses")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-digest">Weekly digest</Label>
                <p className="text-sm text-muted-foreground">Receive a weekly summary of platform activity</p>
              </div>
              <Switch
                id="weekly-digest"
                checked={notifications.weeklyDigest}
                onCheckedChange={() => handleNotificationChange("weeklyDigest")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="system-updates">System updates</Label>
                <p className="text-sm text-muted-foreground">Important announcements and system maintenance</p>
              </div>
              <Switch
                id="system-updates"
                checked={notifications.systemUpdates}
                onCheckedChange={() => handleNotificationChange("systemUpdates")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Followed Subjects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Follow subjects to get notified when new notes are uploaded in these areas.
          </p>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Currently Following</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {followedSubjects.map((subject) => (
                  <Badge key={subject} variant="default" className="flex items-center space-x-1">
                    <span>{subject}</span>
                    <button onClick={() => handleUnfollowSubject(subject)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Available Subjects</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableSubjects
                  .filter((subject) => !followedSubjects.includes(subject))
                  .map((subject) => (
                    <Button
                      key={subject}
                      variant="outline"
                      size="sm"
                      onClick={() => handleFollowSubject(subject)}
                      className="h-8"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {subject}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

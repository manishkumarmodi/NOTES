"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationSettings } from "./notification-settings"
import { User, FileText, Download, Star, Calendar, Edit, Save, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function UserProfile() {
  const { user } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || "")
  const [editedBio, setEditedBio] = useState("")

  // Mock user stats - replace with actual API calls
  const userStats = {
    notesUploaded: 23,
    totalDownloads: 1250,
    averageRating: 4.7,
    joinDate: "2023-09-15",
    totalViews: 3400,
  }

  // Mock uploaded notes - replace with actual API calls
  const uploadedNotes = [
    {
      id: "1",
      title: "Advanced Calculus - Integration Techniques",
      subject: "Mathematics",
      downloads: 456,
      rating: 4.9,
      uploadDate: "2024-01-15",
    },
    {
      id: "2",
      title: "Data Structures Complete Guide",
      subject: "Computer Science",
      downloads: 324,
      rating: 4.8,
      uploadDate: "2024-01-10",
    },
    {
      id: "3",
      title: "Organic Chemistry Basics",
      subject: "Chemistry",
      downloads: 289,
      rating: 4.6,
      uploadDate: "2024-01-05",
    },
  ]

  if (!user) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your profile.</p>
          <Button onClick={() => router.push("/")}>Go to Home</Button>
        </CardContent>
      </Card>
    )
  }

  const handleSaveProfile = () => {
    // Here you would save the profile changes to your backend
    console.log("Saving profile:", { name: editedName, bio: editedBio })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedName(user.name)
    setEditedBio("")
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Profile</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notes">My Notes</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editedBio}
                          onChange={(e) => setEditedBio(e.target.value)}
                          placeholder="Tell us about yourself..."
                          rows={3}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleSaveProfile}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                        <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <p className="text-muted-foreground">{user.email}</p>
                      <p className="text-muted-foreground">{editedBio || "No bio added yet. Click edit to add one!"}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        Joined {new Date(userStats.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{userStats.notesUploaded}</div>
                <div className="text-sm text-muted-foreground">Notes Uploaded</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Download className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{userStats.totalDownloads}</div>
                <div className="text-sm text-muted-foreground">Total Downloads</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{userStats.averageRating}</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{userStats.totalViews}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Uploaded Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedNotes.map((note) => (
                  <div key={note.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{note.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <Badge variant="secondary">{note.subject}</Badge>
                        <span>Uploaded {new Date(note.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {note.downloads}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {note.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} disabled />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

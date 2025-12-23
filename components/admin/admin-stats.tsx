"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, FileText, Download, Star, TrendingUp, AlertTriangle } from "lucide-react"

export function AdminStats() {
  // Mock data - replace with actual API calls
  const stats = {
    totalUsers: 5247,
    totalNotes: 10432,
    totalDownloads: 125847,
    averageRating: 4.6,
    pendingApprovals: 23,
    flaggedContent: 5,
    monthlyGrowth: {
      users: 12.5,
      notes: 8.3,
      downloads: 15.7,
    },
    topSubjects: [
      { name: "Computer Science", count: 2341, percentage: 22.4 },
      { name: "Mathematics", count: 1876, percentage: 18.0 },
      { name: "Physics", count: 1432, percentage: 13.7 },
      { name: "Chemistry", count: 1298, percentage: 12.4 },
      { name: "Biology", count: 1156, percentage: 11.1 },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{stats.monthlyGrowth.users}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNotes.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{stats.monthlyGrowth.notes}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{stats.monthlyGrowth.downloads}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <div className="text-xs text-muted-foreground">Out of 5.0 stars</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Pending Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Notes awaiting approval</span>
              <span className="font-semibold text-yellow-600">{stats.pendingApprovals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Flagged content</span>
              <span className="font-semibold text-red-600">{stats.flaggedContent}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Subjects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.topSubjects.map((subject, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{subject.name}</span>
                  <span className="text-muted-foreground">{subject.count} notes</span>
                </div>
                <Progress value={subject.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

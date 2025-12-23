"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminStats } from "./admin-stats"
import { NoteManagement } from "./note-management"
import { UserManagement } from "./user-management"
import { CategoryManagement } from "./category-management"
import { Button } from "@/components/ui/button"
import { Shield, Users, FileText, Settings, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

export function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock admin check - in a real app, you'd check user roles from your backend
  const isAdmin = user?.email === "admin@noteverse.com" || user?.name.toLowerCase().includes("admin")

  if (!user) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">You need to be signed in to access the admin dashboard.</p>
          <Button onClick={() => router.push("/")}>Go to Home</Button>
        </CardContent>
      </Card>
    )
  }

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access the admin dashboard. This area is restricted to administrators only.
          </p>
          <Button onClick={() => router.push("/")} variant="outline">
            Go to Home
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage NoteVerse platform and monitor system activity</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Administrator: {user.name}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Notes</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Categories</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AdminStats />
        </TabsContent>

        <TabsContent value="notes">
          <NoteManagement />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="categories">
          <CategoryManagement />
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reported Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No reported content at this time.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

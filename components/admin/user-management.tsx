"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Mail, Calendar, FileText, Download, Ban, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  joinDate: string
  notesUploaded: number
  totalDownloads: number
  status: "active" | "suspended" | "banned"
  role: "user" | "admin"
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    joinDate: "2023-09-15",
    notesUploaded: 23,
    totalDownloads: 1250,
    status: "active",
    role: "user",
  },
  {
    id: "2",
    name: "Alex Kumar",
    email: "alex.kumar@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    joinDate: "2023-10-02",
    notesUploaded: 18,
    totalDownloads: 980,
    status: "active",
    role: "user",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    joinDate: "2023-08-20",
    notesUploaded: 31,
    totalDownloads: 750,
    status: "active",
    role: "user",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@noteverse.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    joinDate: "2023-01-01",
    notesUploaded: 5,
    totalDownloads: 0,
    status: "active",
    role: "admin",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "suspended" as const } : user)))
  }

  const handleActivateUser = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "active" as const } : user)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "suspended":
        return "bg-yellow-100 text-yellow-800"
      case "banned":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          {user.role === "admin" && (
                            <Badge variant="default" className="flex items-center space-x-1">
                              <Shield className="h-3 w-3" />
                              <span>Admin</span>
                            </Badge>
                          )}
                          <Badge className={getStatusColor(user.status)}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                          <FileText className="h-4 w-4" />
                          <span>Notes</span>
                        </div>
                        <div className="font-semibold">{user.notesUploaded}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-1">
                          <Download className="h-4 w-4" />
                          <span>Downloads</span>
                        </div>
                        <div className="font-semibold">{user.totalDownloads}</div>
                      </div>

                      {user.role !== "admin" && (
                        <div className="flex space-x-2">
                          {user.status === "active" ? (
                            <Button size="sm" variant="outline" onClick={() => handleSuspendUser(user.id)}>
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend
                            </Button>
                          ) : (
                            <Button size="sm" onClick={() => handleActivateUser(user.id)}>
                              Activate
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

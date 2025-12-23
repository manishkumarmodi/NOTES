"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Tag } from "lucide-react"

interface Category {
  id: string
  name: string
  notesCount: number
  color: string
}

interface TagItem {
  id: string
  name: string
  usageCount: number
  category?: string
}

// Mock data
const mockCategories: Category[] = [
  { id: "1", name: "Computer Science", notesCount: 2341, color: "bg-blue-100 text-blue-800" },
  { id: "2", name: "Mathematics", notesCount: 1876, color: "bg-green-100 text-green-800" },
  { id: "3", name: "Physics", notesCount: 1432, color: "bg-purple-100 text-purple-800" },
  { id: "4", name: "Chemistry", notesCount: 1298, color: "bg-orange-100 text-orange-800" },
  { id: "5", name: "Biology", notesCount: 1156, color: "bg-teal-100 text-teal-800" },
]

const mockTags: TagItem[] = [
  { id: "1", name: "Algorithms", usageCount: 456, category: "Computer Science" },
  { id: "2", name: "Calculus", usageCount: 389, category: "Mathematics" },
  { id: "3", name: "Quantum", usageCount: 234, category: "Physics" },
  { id: "4", name: "Organic", usageCount: 198, category: "Chemistry" },
  { id: "5", name: "Genetics", usageCount: 167, category: "Biology" },
  { id: "6", name: "Programming", usageCount: 523, category: "Computer Science" },
  { id: "7", name: "Statistics", usageCount: 298, category: "Mathematics" },
]

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [tags, setTags] = useState<TagItem[]>(mockTags)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newTagName, setNewTagName] = useState("")
  const [editingCategory, setEditingCategory] = useState<string | null>(null)

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        notesCount: 0,
        color: "bg-gray-100 text-gray-800",
      }
      setCategories([...categories, newCategory])
      setNewCategoryName("")
    }
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
  }

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag: TagItem = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        usageCount: 0,
      }
      setTags([...tags, newTag])
      setNewTagName("")
    }
  }

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories Management */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
              />
              <Button onClick={handleAddCategory}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className={category.color}>{category.name}</Badge>
                    <span className="text-sm text-muted-foreground">{category.notesCount} notes</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => setEditingCategory(category.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteCategory(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tags Management */}
        <Card>
          <CardHeader>
            <CardTitle>Tags Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="New tag name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              />
              <Button onClick={handleAddTag}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{tag.name}</span>
                    <span className="text-sm text-muted-foreground">({tag.usageCount} uses)</span>
                    {tag.category && (
                      <Badge variant="outline" className="text-xs">
                        {tag.category}
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteTag(tag.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Category Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-foreground">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Total Categories</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-foreground">{tags.length}</div>
              <div className="text-sm text-muted-foreground">Total Tags</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-foreground">
                {categories.reduce((sum, cat) => sum + cat.notesCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Notes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

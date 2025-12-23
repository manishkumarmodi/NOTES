import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Star, Eye } from "lucide-react"
import Link from "next/link"

export function TrendingNotes() {
  const trendingNotes = [
    {
      id: 1,
      title: "Advanced Calculus - Integration Techniques",
      subject: "Mathematics",
      author: "Sarah Chen",
      downloads: 1250,
      rating: 4.9,
      views: 3400,
      tags: ["Calculus", "Integration", "Math"],
      description: "Comprehensive guide covering all integration techniques with step-by-step examples.",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms Complete Guide",
      subject: "Computer Science",
      author: "Alex Kumar",
      downloads: 980,
      rating: 4.8,
      views: 2800,
      tags: ["DSA", "Programming", "Algorithms"],
      description: "Complete coverage of data structures and algorithms with code examples in multiple languages.",
    },
    {
      id: 3,
      title: "Organic Chemistry Reaction Mechanisms",
      subject: "Chemistry",
      author: "Maria Rodriguez",
      downloads: 750,
      rating: 4.7,
      views: 2100,
      tags: ["Organic", "Reactions", "Mechanisms"],
      description: "Detailed explanation of organic reaction mechanisms with visual diagrams.",
    },
    {
      id: 4,
      title: "Microeconomics Principles & Applications",
      subject: "Economics",
      author: "David Thompson",
      downloads: 650,
      rating: 4.6,
      views: 1900,
      tags: ["Economics", "Microeconomics", "Theory"],
      description: "Fundamental principles of microeconomics with real-world applications and examples.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trending Notes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the most popular and highly-rated study materials from our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {trendingNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{note.subject}</Badge>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                <CardTitle className="text-xl text-balance">{note.title}</CardTitle>
                <p className="text-sm text-muted-foreground">by {note.author}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-pretty">{note.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Download className="h-4 w-4 mr-1" />
                    {note.downloads} downloads
                  </div>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/browse">View All Notes</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

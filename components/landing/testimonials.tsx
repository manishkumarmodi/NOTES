import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Emily Johnson",
      role: "Computer Science Student",
      university: "MIT",
      content:
        "NoteVerse has been a game-changer for my studies. The quality of notes here is incredible, and I've saved so much time finding exactly what I need.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    {
      name: "Michael Chen",
      role: "Pre-Med Student",
      university: "Stanford University",
      content:
        "The biology and chemistry notes on NoteVerse helped me ace my MCAT prep. The community here is so supportive and knowledgeable.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      name: "Sarah Williams",
      role: "Business Major",
      university: "Harvard Business School",
      content:
        "I love how easy it is to upload and share my notes. The feedback from other students has helped me improve my note-taking skills too.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Students Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of students who have transformed their study experience with NoteVerse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-pretty">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.university}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

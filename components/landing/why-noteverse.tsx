import { Card, CardContent } from "@/components/ui/card"
import { Shield, Upload, Filter, Users, Clock, Star } from "lucide-react"

export function WhyNoteVerse() {
  const features = [
    {
      icon: Shield,
      title: "100% Free Access",
      description: "No hidden fees or premium barriers. All notes are freely accessible to every student.",
    },
    {
      icon: Upload,
      title: "Easy Uploads",
      description:
        "Upload your notes in seconds with our intuitive interface. Support for PDF, DOCX, PPT, and TXT files.",
    },
    {
      icon: Filter,
      title: "Advanced Filters",
      description: "Find exactly what you need with powerful search and filtering by subject, year, tags, and more.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by students, for students. Rate and review notes to help others find the best content.",
    },
    {
      icon: Clock,
      title: "Always Updated",
      description: "Fresh content uploaded daily by students from universities worldwide.",
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "Community ratings and reviews ensure you get the highest quality study materials.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose NoteVerse?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We've built the ultimate platform for students to share knowledge and succeed together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg mr-4">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

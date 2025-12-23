import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/landing/hero-section"
import { WhyNoteVerse } from "@/components/landing/why-noteverse"
import { Testimonials } from "@/components/landing/testimonials"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhyNoteVerse />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

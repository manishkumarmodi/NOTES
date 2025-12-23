import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import NotesList from "@/components/browse/notes-list"

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Browse Engineering Notes</h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              View notes uploaded by students. This list only shows uploaded notes—no demo items.
            </p>
          </div>
          <NotesList />
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BookmarkedNotes } from "@/components/bookmarks/bookmarked-notes"

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <BookmarkedNotes />
        </div>
      </main>
      <Footer />
    </div>
  )
}

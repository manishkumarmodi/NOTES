import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { NoteDetails } from "@/components/notes/note-details"

interface NotePageProps {
  params: {
    id: string
  }
}

export default function NotePage({ params }: NotePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <NoteDetails noteId={params.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

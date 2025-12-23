import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { UploadForm } from "@/components/upload/upload-form"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Upload Your Notes</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Share your knowledge with the community. Upload your study notes and help fellow students succeed.
            </p>
          </div>
          <UploadForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

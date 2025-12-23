import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { UserProfile } from "@/components/profile/user-profile"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <UserProfile />
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <AdminDashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}

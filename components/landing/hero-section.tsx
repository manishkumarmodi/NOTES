"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthModal } from "@/components/auth/auth-modal"
import { useAuth } from "@/components/auth/auth-provider"
import { Search, Upload, Download, BookOpen } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const { user } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("register")
  const [searchQuery, setSearchQuery] = useState("")

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      <section className="relative py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-accent/10 rounded-full">
                <BookOpen className="h-16 w-16 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Your Universe of Notes</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">Upload, Share, and Learn</p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
              Join thousands of students sharing knowledge through high-quality study notes. Find exactly what you need
              or contribute to help others succeed.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for notes by subject, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-lg border-2 focus:border-accent"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {user ? (
              <>
                <Button size="lg" className="px-8 py-4 text-lg" asChild>
                  <Link href="/upload">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Notes
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent" asChild>
                  <Link href="/browse">
                    <Download className="mr-2 h-5 w-5" />
                    Browse Notes
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="px-8 py-4 text-lg" onClick={() => openAuthModal("register")}>
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg bg-transparent"
                  onClick={() => openAuthModal("login")}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">10K+</div>
              <div className="text-muted-foreground">Study Notes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">5K+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Subjects Covered</div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultMode={authMode} />
    </>
  )
}

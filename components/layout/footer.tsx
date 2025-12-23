import { BookOpen, Mail, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-foreground">NoteVerse</span>
            </div>
            <p className="text-muted-foreground text-pretty">
              Your universe of notes. Empowering students worldwide to share knowledge and succeed together.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Browse Notes
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Upload Notes
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Search
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Categories
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Report Content
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2024 NoteVerse. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="mailto:hello@noteverse.com"
              className="flex items-center text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              hello@noteverse.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

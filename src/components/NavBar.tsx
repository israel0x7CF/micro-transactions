import Link from "next/link"
import { Home, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Home className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  microtransactionss
                </Link>
                {/* <Link
                  href="/about"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link> */}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


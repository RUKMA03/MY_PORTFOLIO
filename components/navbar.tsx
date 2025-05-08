"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Extracurriculars", path: "/extracurriculars" },
    { name: "Certifications", path: "/certifications" },
    { name: "Hackathons", path: "/hackathons" },
    { name: "Skills Tracker", path: "/skills-tracker" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-portfolio-darkPurple dark:text-portfolio-lightPink">
              Rukma Rao
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === item.path
                    ? "text-portfolio-magenta dark:text-portfolio-pink"
                    : "text-gray-700 hover:text-portfolio-lavender dark:text-gray-300 dark:hover:text-portfolio-lightPink"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <ModeToggle />
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === item.path
                    ? "bg-portfolio-lightPink text-portfolio-darkPurple"
                    : "text-gray-700 hover:bg-gray-100 hover:text-portfolio-lavender dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-portfolio-lightPink"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

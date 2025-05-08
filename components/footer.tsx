import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="border-t bg-white py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 md:text-left">
              © {new Date().getFullYear()} Rukma Rao. All rights reserved. |
              <Link
                href="https://patreon.com/DanceandWriteGirl"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-portfolio-lavender hover:text-portfolio-magenta dark:text-portfolio-lightPink"
              >
                Patreon
              </Link>{" "}
              |
              <Link
                href="https://substack.com/2rukmarao"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-portfolio-lavender hover:text-portfolio-magenta dark:text-portfolio-lightPink"
              >
                Substack
              </Link>
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/in/rukma-rao-78a193284/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-portfolio-lavender dark:text-gray-400 dark:hover:text-portfolio-lightPink"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/RUKMA03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-portfolio-lavender dark:text-gray-400 dark:hover:text-portfolio-lightPink"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="mailto:rukmarao2003@gmail.com"
              className="text-gray-600 transition-colors hover:text-portfolio-lavender dark:text-gray-400 dark:hover:text-portfolio-lightPink"
            >
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { PixelatedBackground } from "@/components/pixelated-background"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <PixelatedBackground />
      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-lg bg-white/90 p-8 shadow-lg dark:bg-gray-900/90">
          <h1 className="mb-8 text-center text-4xl font-bold text-portfolio-darkPurple dark:text-portfolio-lightPink">
            About Me
          </h1>

          <div className="mb-8 flex flex-col items-center justify-center md:flex-row md:space-x-8">
            <div className="mb-6 md:mb-0">
              <div className="rounded-full border-4 border-portfolio-magenta p-1">
                <div className="h-48 w-48 overflow-hidden rounded-full bg-portfolio-lightPink">
                  <Image src="/profile-image.png" alt="Rukma Rao" width={192} height={192} className="object-cover" />
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold text-portfolio-darkPurple dark:text-portfolio-lightPink">
                Rukma Rao
              </h2>
              <p className="mb-4 text-lg font-medium text-portfolio-deepPurple dark:text-portfolio-pink">
                Aspiring Data Engineer
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">Chennai, Tamil Nadu 603203</p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">Phone: 8106692610</p>
            </div>
          </div>

          <div className="mb-8 prose max-w-none dark:prose-invert">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              I am pursuing a B.Tech in Computer Science Engineering undergraduate with a specialisation in Information
              Technology from SRM University, Kattankulathur. I have a strong passion for big data, data handling, data
              orchestration, and data-driven business decisions. My journey began with an elective that ignited my
              interest in the world of big data, and since then, I've continually built on my skills through projects
              and courses.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              I have also participated in multiple hackathons to gain practical experience in my technical sphere.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              In the extracurricular field, I currently lead sponsorship and finance efforts for student clubs like IoT
              Alliance and Cherry+ Network, and have hands-on experience in web development and digital content
              creation. I am a member of Toastmasters International, an American public-speaking forum, which allows me
              to blend technical expertise with strong communication and storytelling abilities. I'm also a creative at
              heart—writing, dancing, and drawing inspiration from characters across media.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-portfolio-darkPurple dark:text-portfolio-lightPink">
              Education
            </h3>
            <div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <p className="font-medium text-portfolio-deepPurple dark:text-portfolio-pink">2022-2026</p>
              <p className="font-semibold">
                B. Tech: Computer Science Engineering with specialization in Information Technology
              </p>
              <p>CURRENT SEMESTER: 6TH</p>
              <p>CGPA (End of 5th Semester): 9.26</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <p className="font-medium text-portfolio-deepPurple dark:text-portfolio-pink">2018-2021</p>
              <p className="font-semibold">P. OBUL REDDY PUBLIC SCHOOL – HYDERABAD</p>
              <p>10th percentage: 97%</p>
              <p>12th percentage: 85.4%</p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link
              href="https://www.linkedin.com/in/rukma-rao-78a193284/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-portfolio-lavender px-4 py-2 text-white transition-colors hover:bg-portfolio-magenta"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/RUKMA03"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-portfolio-lavender px-4 py-2 text-white transition-colors hover:bg-portfolio-magenta"
            >
              <Github size={20} />
              <span>GitHub</span>
            </Link>
            <Link
              href="mailto:rukmarao2003@gmail.com"
              className="flex items-center space-x-2 rounded-full bg-portfolio-lavender px-4 py-2 text-white transition-colors hover:bg-portfolio-magenta"
            >
              <Mail size={20} />
              <span>rukmarao2003@gmail.com</span>
            </Link>
            <Link
              href="https://patreon.com/DanceandWriteGirl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-portfolio-lavender px-4 py-2 text-white transition-colors hover:bg-portfolio-magenta"
            >
              <span>Patreon</span>
            </Link>
            <Link
              href="https://substack.com/2rukmarao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-portfolio-lavender px-4 py-2 text-white transition-colors hover:bg-portfolio-magenta"
            >
              <span>Substack</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

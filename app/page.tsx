import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { PixelatedBackground } from "@/components/pixelated-background"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <PixelatedBackground />
      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="rounded-full border-4 border-[#B24D95] p-1">
            <div className="h-40 w-40 overflow-hidden rounded-full bg-[#E4C3E2]">
              <Image src="/profile-image.png" alt="Rukma Rao" width={160} height={160} className="object-cover" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-[#302071] dark:text-[#F1A7E1]">Rukma Rao</h1>
          <p className="text-2xl font-medium text-[#130B2B] dark:text-[#F1A7E1]">Aspiring Data Engineer</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about">
              <Button className="bg-[#926FBD] hover:bg-[#B24D95]">About Me</Button>
            </Link>
            <Link href="/skills">
              <Button className="bg-[#926FBD] hover:bg-[#B24D95]">Skills</Button>
            </Link>
            <Link href="/projects">
              <Button className="bg-[#926FBD] hover:bg-[#B24D95]">Projects</Button>
            </Link>
            <Link href="/extracurriculars">
              <Button className="bg-[#926FBD] hover:bg-[#B24D95]">Extracurriculars</Button>
            </Link>
            <Link href="/certifications">
              <Button className="bg-[#926FBD] hover:bg-[#B24D95]">Certifications</Button>
            </Link>
            <Link href="/hackathons">
              <Button className="bg-[#926FBD] hover:bg-[#B24D95]">Hackathons</Button>
            </Link>
            <Link href="/skills-tracker">
              <Button className="bg-[#926FBD] hover:bg-[#B24D95]">Skills Tracker</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

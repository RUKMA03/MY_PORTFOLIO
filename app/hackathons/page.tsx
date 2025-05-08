"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, ExternalLink, Edit, Trash } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { HackathonForm } from "@/components/hackathon-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Hackathon {
  id: string
  name: string
  organizer: string
  date: string
  description: string
  technologies: string[]
  achievement?: string
  certificateUrl?: string
  imageUrl?: string
}

export default function HackathonsPage() {
  const { isAuthorized } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null)

  // Sample hackathons data
  const [hackathons, setHackathons] = useState<Hackathon[]>([
    {
      id: "1",
      name: "SRM Hackathon 9.0",
      organizer: "SRM Institute of Science & Technology",
      date: "April 2025",
      description:
        "Participated in Hackathon 9.0, held on 11th and 12th April, 2025, hosted by TEAM SRM HACKATHON, Department of Networking and Communications, School of Computing, at SRM Institute of Science and Technology, Kattankulathur Campus, Tamil Nadu.",
      technologies: ["Problem Solving", "Innovation", "Teamwork"],
      imageUrl: "/certificates/srm-hackathon-9-new.png",
    },
    {
      id: "2",
      name: "SRM Hackathon 8.0",
      organizer: "SRM Institute of Science & Technology",
      date: "April 2024",
      description:
        "Participated in SRM Hackathon 8.0 between 8th to 9th April, 2024 at Mini Hall-2, SRMIST, KTR Campus, Chengalpattu Dt, Tamil Nadu.",
      technologies: ["Coding", "Problem Solving", "Innovation"],
      imageUrl: "/certificates/srm-hackathon-8.jpeg",
    },
    {
      id: "3",
      name: "Smart India Hackathon (Internal Edition)",
      organizer: "SRM Institute of Science and Technology",
      date: "September 2024",
      description:
        "Participated in the Smart India Hackathon (Internal Edition) from 1st to 3rd September 2024 at SRM Institute of Science and Technology, Kattankulathur, Chennai.",
      technologies: ["Innovation", "Problem Solving", "Technology Solutions"],
      imageUrl: "/certificates/smart-india-hackathon.jpeg",
    },
    {
      id: "4",
      name: "Layer Hackathon",
      organizer: "Blockchain Club SRM and Team Gen-Y",
      date: "April 2023",
      description:
        "Attended the 24-hour Hackathon 'Layer', conducted at SRM Institute of Science & Technology, by Blockchain Club SRM and Team Gen-Y from 17th April to 19th April, 2023.",
      technologies: ["Blockchain", "Web Development", "Problem Solving"],
      imageUrl: "/certificates/layer-hackathon.jpeg",
    },
    {
      id: "5",
      name: "Postscript Workshop",
      organizer: "Cherry+ Network",
      date: "April 2024",
      description:
        "Participated in Postscript, a comprehensive workshop on Backend for App Development, focusing on a hands-on approach to NODE.JS and MONGO DB, conducted on April 16th, 2024.",
      technologies: ["Node.js", "MongoDB", "Backend Development"],
      imageUrl: "/certificates/cherry-network-postscript.jpeg",
    },
  ])

  const handleAddHackathon = (newHackathon: Hackathon) => {
    setHackathons([...hackathons, newHackathon])
    setShowForm(false)
  }

  const handleUpdateHackathon = (updatedHackathon: Hackathon) => {
    setHackathons(hackathons.map((hackathon) => (hackathon.id === updatedHackathon.id ? updatedHackathon : hackathon)))
    setEditingHackathon(null)
  }

  const handleDeleteHackathon = (id: string) => {
    setHackathons(hackathons.filter((hackathon) => hackathon.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-portfolio-darkPurple dark:text-portfolio-lightPink">Hackathons</h1>
        {isAuthorized && (
          <Button onClick={() => setShowForm(!showForm)} className="bg-portfolio-magenta hover:bg-portfolio-darkPurple">
            {showForm ? "Cancel" : "Add New Hackathon"}
          </Button>
        )}
      </div>

      {showForm && isAuthorized && (
        <div className="mb-8">
          <HackathonForm onSubmit={handleAddHackathon} />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {hackathons.map((hackathon) => (
          <Card key={hackathon.id} className="overflow-hidden">
            <CardHeader className="bg-portfolio-yellow/10">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
                    {hackathon.name}
                  </CardTitle>
                  <CardDescription>
                    {hackathon.organizer} | {hackathon.date}
                  </CardDescription>
                </div>
                {hackathon.achievement && (
                  <Badge className="bg-portfolio-yellow text-portfolio-deepPurple">
                    <Trophy className="mr-1 h-3 w-3" />
                    {hackathon.achievement}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-4 text-gray-700 dark:text-gray-300">{hackathon.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {hackathon.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-portfolio-yellow/20 text-portfolio-deepPurple dark:text-portfolio-yellow"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {hackathon.imageUrl && (
                <div className="mt-4 overflow-hidden rounded-md border">
                  <Image
                    src={hackathon.imageUrl || "/placeholder.svg"}
                    alt={`${hackathon.name} Certificate`}
                    width={800}
                    height={600}
                    className="w-full object-contain"
                  />
                  <div className="bg-gray-50 p-2 text-center dark:bg-gray-800">
                    <Button variant="link" asChild>
                      <Link href={hackathon.imageUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Full Certificate
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            {isAuthorized && (
              <CardFooter className="flex justify-end space-x-2 bg-gray-50 dark:bg-gray-800">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-portfolio-magenta hover:bg-portfolio-magenta/10 hover:text-portfolio-darkPurple"
                  onClick={() => setEditingHackathon(hackathon)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                  onClick={() => handleDeleteHackathon(hackathon.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {editingHackathon && (
        <Dialog open={!!editingHackathon} onOpenChange={(open) => !open && setEditingHackathon(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Hackathon</DialogTitle>
            </DialogHeader>
            <HackathonForm hackathon={editingHackathon} onSubmit={handleUpdateHackathon} isEditing={true} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

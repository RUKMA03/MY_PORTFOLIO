"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { ExtracurricularForm } from "@/components/extracurricular-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit, Trash } from "lucide-react"

interface Extracurricular {
  id: string
  title: string
  organization: string
  period: string
  description: string
  achievements?: string[]
}

export default function ExtracurricularsPage() {
  const { isAuthorized } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Extracurricular | null>(null)

  // Sample extracurricular data
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([
    {
      id: "1",
      title: "Sponsorship and Finance Lead",
      organization: "IoT Alliance, Student Club",
      period: "November 2024 - Current",
      description:
        "Corporate Head of Sponsorship and Finance domain for the student organization, IoT Alliance. Position entails securing sponsors and collaborations for student-club-led events and activities.",
    },
    {
      id: "2",
      title: "Volunteer",
      organization: "Indian Council of Social Welfare (ICSW)",
      period: "June 2024 - July 2024",
      description:
        "Assisted in creation of content-posts for social media pages, reels, short videos, posters. Provided written content for the website. Shot videos showcasing their work. Helped develop dedicated plans for their projects.",
    },
    {
      id: "3",
      title: "Finance Manager",
      organization: "Cherry+ Network, Student Club",
      period: "May 2023 - Current",
      description:
        "Working as a Finance manager with one associate below me. The finance domain secures finances for events conducted by the student club and keeps tracks of expenses. Creating P&L statements; summaries. Conducted interviews for next batch of interns.",
    },
    {
      id: "4",
      title: "Web-Dev Intern",
      organization: "RepuNext",
      period: "June 2023 - July 2023",
      description:
        "Studied user requirements to gain strong understanding of project initiatives and deadlines. Developed testing code for web-based applications. Guidance was provided for development of personal project.",
    },
    {
      id: "5",
      title: "Member",
      organization: "Toastmasters International",
      period: "October 2023 - Current",
      description:
        "Member of a community club of Toastmasters International based in Chennai- 360 TOASTMASTERS CLUB. Pathway: Engaging Humour Level 1- Project 4 completed.",
    },
    {
      id: "6",
      title: "Committee Member",
      organization: "Aaruush, SRM Student Club",
      period: "2024 - 2024",
      description:
        "Committee member of Quality Assurance subdomain. Worked to ensure that events and workshops hosted by the club were up to standard. Helped ensure smooth flow of events and scout opportunities for further development.",
    },
  ])

  const handleAddExtracurricular = (newItem: Extracurricular) => {
    setExtracurriculars([...extracurriculars, newItem])
    setShowForm(false)
  }

  const handleUpdateExtracurricular = (updatedItem: Extracurricular) => {
    setExtracurriculars(extracurriculars.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    setEditingItem(null)
  }

  const handleDeleteExtracurricular = (id: string) => {
    setExtracurriculars(extracurriculars.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-portfolio-darkPurple dark:text-portfolio-lightPink">
          Extracurricular Activities
        </h1>
        {isAuthorized && (
          <Button onClick={() => setShowForm(!showForm)} className="bg-portfolio-magenta hover:bg-portfolio-darkPurple">
            {showForm ? "Cancel" : "Add New Activity"}
          </Button>
        )}
      </div>

      {showForm && isAuthorized && (
        <div className="mb-8">
          <ExtracurricularForm onSubmit={handleAddExtracurricular} />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {extracurriculars.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="bg-portfolio-coral/10">
              <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
                {item.title}
              </CardTitle>
              <CardDescription>
                {item.organization} | {item.period}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 dark:text-gray-300">{item.description}</p>

              {item.achievements && item.achievements.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 font-medium text-portfolio-deepPurple dark:text-portfolio-pink">
                    Key Achievements:
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300">
                    {item.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            {isAuthorized && (
              <CardFooter className="flex justify-end space-x-2 bg-gray-50 dark:bg-gray-800">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-portfolio-magenta hover:bg-portfolio-magenta/10 hover:text-portfolio-darkPurple"
                  onClick={() => setEditingItem(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                  onClick={() => handleDeleteExtracurricular(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Extracurricular Activity</DialogTitle>
            </DialogHeader>
            <ExtracurricularForm activity={editingItem} onSubmit={handleUpdateExtracurricular} isEditing={true} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

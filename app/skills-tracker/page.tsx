"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Edit, Trash, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { SkillTrackerForm } from "@/components/skill-tracker-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface SkillProgress {
  progress: number
  notes: string
}

interface Skill {
  id: string
  name: string
  category: string
  description: string
  currentProgress: number
  progressHistory: SkillProgress[]
  resources?: string[]
  imageUrl?: string
}

export default function SkillsTrackerPage() {
  const { isAuthorized } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [showProgressForm, setShowProgressForm] = useState(false)
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)
  const [progressInput, setProgressInput] = useState(0)
  const [progressNote, setProgressNote] = useState("")

  // Sample skills data
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "1",
      name: "Advanced Data Visualization",
      category: "Data Science",
      description:
        "Learning advanced data visualization techniques using Python libraries like Matplotlib, Seaborn, and Plotly.",
      currentProgress: 65,
      progressHistory: [
        { progress: 0, notes: "Started learning basics of Matplotlib" },
        { progress: 20, notes: "Completed basic visualizations with Matplotlib" },
        { progress: 40, notes: "Started working with Seaborn for statistical visualizations" },
        { progress: 65, notes: "Learning interactive visualizations with Plotly" },
      ],
      resources: ["Udemy Course: Data Visualization with Python", "Book: Python Data Science Handbook"],
    },
    {
      id: "2",
      name: "Cloud Data Engineering",
      category: "Cloud Computing",
      description: "Building expertise in cloud-based data engineering solutions using AWS services.",
      currentProgress: 45,
      progressHistory: [
        { progress: 0, notes: "Started with AWS S3 basics" },
        { progress: 15, notes: "Learned about AWS Glue for ETL processes" },
        { progress: 30, notes: "Working with AWS Redshift for data warehousing" },
        { progress: 45, notes: "Learning AWS Lambda for serverless data processing" },
      ],
      resources: ["AWS Documentation", "Coursera: AWS Data Engineering Specialization"],
    },
    {
      id: "3",
      name: "Big Data Processing",
      category: "Data Engineering",
      description:
        "Learning big data processing frameworks like Apache Spark and Hadoop for handling large-scale data.",
      currentProgress: 25,
      progressHistory: [
        { progress: 0, notes: "Started with Hadoop basics" },
        { progress: 10, notes: "Set up Hadoop environment" },
        { progress: 25, notes: "Learning Apache Spark fundamentals" },
      ],
      resources: ["Udemy: Apache Spark with Scala", "Book: Learning Spark"],
    },
  ])

  const handleAddSkill = (newSkill: Skill) => {
    setSkills([...skills, newSkill])
    setShowForm(false)
  }

  const handleUpdateSkill = (updatedSkill: Skill) => {
    setSkills(skills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill)))
    setEditingSkill(null)
  }

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const handleUpdateProgress = () => {
    if (selectedSkillId && progressNote.trim()) {
      setSkills(
        skills.map((skill) => {
          if (skill.id === selectedSkillId) {
            const newProgress: SkillProgress = {
              progress: progressInput,
              notes: progressNote,
            }
            return {
              ...skill,
              currentProgress: progressInput,
              progressHistory: [...skill.progressHistory, newProgress],
            }
          }
          return skill
        }),
      )
      setShowProgressForm(false)
      setSelectedSkillId(null)
      setProgressInput(0)
      setProgressNote("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-portfolio-darkPurple dark:text-portfolio-lightPink">Skills Tracker</h1>
        {isAuthorized && (
          <Button onClick={() => setShowForm(!showForm)} className="bg-portfolio-magenta hover:bg-portfolio-darkPurple">
            {showForm ? "Cancel" : "Add New Skill"}
          </Button>
        )}
      </div>

      {showForm && isAuthorized && (
        <div className="mb-8">
          <SkillTrackerForm onSubmit={handleAddSkill} />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skill) => (
          <Card key={skill.id} className="overflow-hidden">
            <CardHeader className="bg-portfolio-pink/10">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
                    {skill.name}
                  </CardTitle>
                  <CardDescription>
                    <Badge
                      variant="outline"
                      className="mr-2 bg-portfolio-pink/20 text-portfolio-deepPurple dark:text-portfolio-pink"
                    >
                      {skill.category}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-portfolio-magenta dark:text-portfolio-pink">
                    {skill.currentProgress}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4">
                <Progress value={skill.currentProgress} className="h-2" />
              </div>

              <p className="mb-4 text-gray-700 dark:text-gray-300">{skill.description}</p>

              {skill.resources && skill.resources.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-2 font-medium text-portfolio-deepPurple dark:text-portfolio-pink">
                    Learning Resources:
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {skill.resources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="mb-2 font-medium text-portfolio-deepPurple dark:text-portfolio-pink">
                  Progress History:
                </h4>
                <div className="max-h-40 space-y-2 overflow-y-auto">
                  {skill.progressHistory.map((entry, index) => (
                    <div key={index} className="rounded-md bg-gray-50 p-2 dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm text-portfolio-magenta dark:text-portfolio-pink">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          {entry.progress}%
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{entry.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            {isAuthorized && (
              <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-800">
                <Button
                  variant="outline"
                  className="text-portfolio-magenta hover:bg-portfolio-magenta/10 hover:text-portfolio-darkPurple"
                  onClick={() => {
                    setSelectedSkillId(skill.id)
                    setProgressInput(skill.currentProgress)
                    setShowProgressForm(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Update Progress
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-portfolio-magenta hover:bg-portfolio-magenta/10 hover:text-portfolio-darkPurple"
                    onClick={() => setEditingSkill(skill)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    onClick={() => handleDeleteSkill(skill.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {editingSkill && (
        <Dialog open={!!editingSkill} onOpenChange={(open) => !open && setEditingSkill(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Skill</DialogTitle>
            </DialogHeader>
            <SkillTrackerForm skill={editingSkill} onSubmit={handleUpdateSkill} isEditing={true} />
          </DialogContent>
        </Dialog>
      )}

      {showProgressForm && (
        <Dialog open={showProgressForm} onOpenChange={setShowProgressForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Progress</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="progress">Current Progress (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={progressInput}
                  onChange={(e) => setProgressInput(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="progressNote">Progress Note</Label>
                <Textarea
                  id="progressNote"
                  value={progressNote}
                  onChange={(e) => setProgressNote(e.target.value)}
                  placeholder="Describe what you've learned or accomplished..."
                  rows={4}
                />
              </div>
              <Button
                onClick={handleUpdateProgress}
                className="w-full bg-portfolio-magenta hover:bg-portfolio-darkPurple"
              >
                Save Progress
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

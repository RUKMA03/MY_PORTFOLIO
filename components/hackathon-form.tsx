"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import Link from "next/link"

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

interface HackathonFormProps {
  onSubmit: (hackathon: Hackathon) => void
  hackathon?: Hackathon
  isEditing?: boolean
}

export function HackathonForm({ onSubmit, hackathon, isEditing = false }: HackathonFormProps) {
  const [name, setName] = useState("")
  const [organizer, setOrganizer] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [achievement, setAchievement] = useState("")
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [technology, setTechnology] = useState("")
  const [technologies, setTechnologies] = useState<string[]>([])
  const [existingCertUrl, setExistingCertUrl] = useState<string | undefined>("")
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>("")

  // Initialize form with existing hackathon data if editing
  useEffect(() => {
    if (hackathon && isEditing) {
      setName(hackathon.name)
      setOrganizer(hackathon.organizer)
      setDate(hackathon.date)
      setDescription(hackathon.description)
      setAchievement(hackathon.achievement || "")
      setTechnologies(hackathon.technologies)
      setExistingCertUrl(hackathon.certificateUrl)
      setExistingImageUrl(hackathon.imageUrl)
    }
  }, [hackathon, isEditing])

  const handleAddTechnology = () => {
    if (technology.trim() && !technologies.includes(technology.trim())) {
      setTechnologies([...technologies, technology.trim()])
      setTechnology("")
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, you would upload the files to a storage service
    // and get URLs back. For this demo, we'll simulate that.
    const certificateUrl = certificateFile ? `/uploads/${certificateFile.name}` : existingCertUrl

    const imageUrl = imageFile ? `/uploads/${imageFile.name}` : existingImageUrl

    const newHackathon: Hackathon = {
      id: hackathon?.id || Date.now().toString(),
      name,
      organizer,
      date,
      description,
      technologies,
      achievement: achievement || undefined,
      certificateUrl,
      imageUrl,
    }

    onSubmit(newHackathon)
  }

  return (
    <Card className={isEditing ? "border-0 shadow-none" : ""}>
      {!isEditing && (
        <CardHeader>
          <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
            {isEditing ? "Edit Hackathon" : "Add New Hackathon"}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Hackathon Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizer">Organizer</Label>
            <Input id="organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., October 2023"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievement">Achievement (Optional)</Label>
            <Input
              id="achievement"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              placeholder="e.g., Top 10 Finalist"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificateFile">
              Certificate File {existingCertUrl && "(Leave empty to keep current file)"}
            </Label>
            <Input
              id="certificateFile"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const files = e.target.files
                if (files && files.length > 0) {
                  setCertificateFile(files[0])
                }
              }}
            />
            {existingCertUrl && (
              <div className="mt-2 text-sm text-gray-500">
                Current file:{" "}
                <Link href={existingCertUrl} className="text-portfolio-yellow hover:underline">
                  {existingCertUrl.split("/").pop()}
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageFile">Project Image {existingImageUrl && "(Leave empty to keep current image)"}</Label>
            <Input
              id="imageFile"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                const files = e.target.files
                if (files && files.length > 0) {
                  setImageFile(files[0])
                }
              }}
            />
            {existingImageUrl && (
              <div className="mt-2 text-sm text-gray-500">
                Current image:{" "}
                <Link href={existingImageUrl} className="text-portfolio-yellow hover:underline">
                  {existingImageUrl.split("/").pop()}
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="technology">Technologies Used</Label>
            <div className="flex space-x-2">
              <Input
                id="technology"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                placeholder="Add a technology..."
              />
              <Button
                type="button"
                onClick={handleAddTechnology}
                className="bg-portfolio-yellow hover:bg-portfolio-magenta"
              >
                Add
              </Button>
            </div>

            {technologies.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center rounded-full bg-portfolio-yellow/20 px-3 py-1 text-sm text-portfolio-deepPurple dark:text-portfolio-yellow"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(tech)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="submit" className="bg-portfolio-magenta hover:bg-portfolio-darkPurple">
              {isEditing ? "Update Hackathon" : "Save Hackathon"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

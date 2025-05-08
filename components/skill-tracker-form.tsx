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

interface SkillTrackerFormProps {
  onSubmit: (skill: Skill) => void
  skill?: Skill
  isEditing?: boolean
}

export function SkillTrackerForm({ onSubmit, skill, isEditing = false }: SkillTrackerFormProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [currentProgress, setCurrentProgress] = useState(0)
  const [progressNote, setProgressNote] = useState("")
  const [resource, setResource] = useState("")
  const [resources, setResources] = useState<string[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>("")

  // Initialize form with existing skill data if editing
  useEffect(() => {
    if (skill && isEditing) {
      setName(skill.name)
      setCategory(skill.category)
      setDescription(skill.description)
      setCurrentProgress(skill.currentProgress)
      setResources(skill.resources || [])
      setExistingImageUrl(skill.imageUrl)
    }
  }, [skill, isEditing])

  const handleAddResource = () => {
    if (resource.trim()) {
      setResources([...resources, resource.trim()])
      setResource("")
    }
  }

  const handleRemoveResource = (res: string) => {
    setResources(resources.filter((r) => r !== res))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, you would upload the image file to a storage service
    // and get a URL back. For this demo, we'll simulate that.
    const imageUrl = imageFile ? `/uploads/${imageFile.name}` : existingImageUrl

    // Create initial progress history entry if not editing
    let progressHistory: SkillProgress[] = []

    if (isEditing && skill) {
      progressHistory = skill.progressHistory
    } else {
      const initialProgress: SkillProgress = {
        progress: currentProgress,
        notes: progressNote || "Started learning",
      }
      progressHistory = [initialProgress]
    }

    const newSkill: Skill = {
      id: skill?.id || Date.now().toString(),
      name,
      category,
      description,
      currentProgress,
      progressHistory,
      resources: resources.length > 0 ? resources : undefined,
      imageUrl,
    }

    onSubmit(newSkill)
  }

  return (
    <Card className={isEditing ? "border-0 shadow-none" : ""}>
      {!isEditing && (
        <CardHeader>
          <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
            {isEditing ? "Edit Skill" : "Add New Skill to Track"}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Data Science, Programming, Design"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentProgress">Current Progress (%)</Label>
            <Input
              id="currentProgress"
              type="number"
              min="0"
              max="100"
              value={currentProgress}
              onChange={(e) => setCurrentProgress(Number.parseInt(e.target.value))}
              required
            />
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="progressNote">Initial Progress Note</Label>
              <Textarea
                id="progressNote"
                value={progressNote}
                onChange={(e) => setProgressNote(e.target.value)}
                rows={2}
                placeholder="Describe your starting point or initial progress..."
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="resource">Learning Resources (Optional)</Label>
            <div className="flex space-x-2">
              <Input
                id="resource"
                value={resource}
                onChange={(e) => setResource(e.target.value)}
                placeholder="Add a book, course, website..."
              />
              <Button
                type="button"
                onClick={handleAddResource}
                className="bg-portfolio-pink hover:bg-portfolio-magenta"
              >
                Add
              </Button>
            </div>

            {resources.length > 0 && (
              <div className="mt-2 space-y-2">
                {resources.map((res, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md bg-portfolio-pink/10 p-2">
                    <span className="text-sm">{res}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveResource(res)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageFile">Related Image {existingImageUrl && "(Leave empty to keep current image)"}</Label>
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
                <Link href={existingImageUrl} className="text-portfolio-pink hover:underline">
                  {existingImageUrl.split("/").pop()}
                </Link>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="submit" className="bg-portfolio-magenta hover:bg-portfolio-darkPurple">
              {isEditing ? "Update Skill" : "Save Skill"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

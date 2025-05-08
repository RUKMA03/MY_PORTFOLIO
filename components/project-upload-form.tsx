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

interface Project {
  id: string
  title: string
  description: string
  githubUrl: string
  pdfUrl?: string
  codePreview?: string
  technologies: string[]
  imageUrl?: string // Add imageUrl as an optional property
}

interface ProjectUploadFormProps {
  onSubmit: (project: Project) => void
  project?: Project
  isEditing?: boolean
}

export function ProjectUploadForm({ onSubmit, project, isEditing = false }: ProjectUploadFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [codePreview, setCodePreview] = useState("")
  const [technology, setTechnology] = useState("")
  const [technologies, setTechnologies] = useState<string[]>([])
  const [existingPdfUrl, setExistingPdfUrl] = useState<string | undefined>("")
  
  // Set the image URL directly in the code (no need for user input)
  const defaultImageUrl = "/images/agriflow.jpg"  // This is where your image is located in the public folder

  // Initialize form with existing project data if editing
  useEffect(() => {
    if (project && isEditing) {
      setTitle(project.title)
      setDescription(project.description)
      setGithubUrl(project.githubUrl)
      setCodePreview(project.codePreview || "")
      setTechnologies(project.technologies)
      setExistingPdfUrl(project.pdfUrl)
    }
  }, [project, isEditing])

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

    // In a real application, you would upload the PDF file to a storage service
    // and get a URL back. For this demo, we'll simulate that.
    const pdfUrl = pdfFile ? `/uploads/${pdfFile.name}` : existingPdfUrl

    const newProject: Project = {
      id: project?.id || Date.now().toString(),
      title,
      description,
      githubUrl,
      pdfUrl,
      codePreview: codePreview || undefined,
      technologies,
      imageUrl: defaultImageUrl,  // Directly include the image URL
    }

    onSubmit(newProject)
  }

  return (
    <Card className={isEditing ? "border-0 shadow-none" : ""}>
      {!isEditing && (
        <CardHeader>
          <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
            {isEditing ? "Edit Project" : "Add New Project"}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
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
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pdfFile">
              Project Report (PDF) {existingPdfUrl && "(Leave empty to keep current file)"}
            </Label>
            <Input
              id="pdfFile"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const files = e.target.files
                if (files && files.length > 0) {
                  setPdfFile(files[0])
                }
              }}
            />
            {existingPdfUrl && (
              <div className="mt-2 text-sm text-gray-500">
                Current file:{" "}
                <Link href={existingPdfUrl} className="text-portfolio-lavender hover:underline">
                  {existingPdfUrl.split("/").pop()}
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="codePreview">Code Preview (Optional)</Label>
            <Textarea
              id="codePreview"
              value={codePreview}
              onChange={(e) => setCodePreview(e.target.value)}
              rows={6}
              placeholder="Paste a code snippet here..."
            />
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
                className="bg-portfolio-lavender hover:bg-portfolio-magenta"
              >
                Add
              </Button>
            </div>

            {technologies.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center rounded-full bg-portfolio-lavender/20 px-3 py-1 text-sm text-portfolio-darkPurple dark:text-portfolio-lightPink"
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

          {/* Display Image */}
          {defaultImageUrl && (
            <div className="mt-4">
              <img src={defaultImageUrl} alt="Project Image" className="w-full h-auto" />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="submit" className="bg-portfolio-magenta hover:bg-portfolio-darkPurple">
              {isEditing ? "Update Project" : "Save Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

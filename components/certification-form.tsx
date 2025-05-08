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

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  skills: string[]
  certificateUrl?: string
}

interface CertificationFormProps {
  onSubmit: (certification: Certification) => void
  certification?: Certification
  isEditing?: boolean
}

export function CertificationForm({ onSubmit, certification, isEditing = false }: CertificationFormProps) {
  const [title, setTitle] = useState("")
  const [issuer, setIssuer] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [certificateFile, setCertificateFile] = useState<File | null>(null)
  const [skill, setSkill] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [existingCertUrl, setExistingCertUrl] = useState<string | undefined>("")

  // Initialize form with existing certification data if editing
  useEffect(() => {
    if (certification && isEditing) {
      setTitle(certification.title)
      setIssuer(certification.issuer)
      setDate(certification.date)
      setDescription(certification.description)
      setSkills(certification.skills)
      setExistingCertUrl(certification.certificateUrl)
    }
  }, [certification, isEditing])

  const handleAddSkill = () => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()])
      setSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, you would upload the certificate file to a storage service
    // and get a URL back. For this demo, we'll simulate that.
    const certificateUrl = certificateFile ? `/uploads/${certificateFile.name}` : existingCertUrl

    const newCertification: Certification = {
      id: certification?.id || Date.now().toString(),
      title,
      issuer,
      date,
      description,
      skills,
      certificateUrl,
    }

    onSubmit(newCertification)
  }

  return (
    <Card className={isEditing ? "border-0 shadow-none" : ""}>
      {!isEditing && (
        <CardHeader>
          <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
            {isEditing ? "Edit Certification" : "Add New Certification"}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Certification Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization</Label>
            <Input id="issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date Received</Label>
            <Input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., June 2023 or 2023"
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
                <Link href={existingCertUrl} className="text-portfolio-mint hover:underline">
                  {existingCertUrl.split("/").pop()}
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skill">Skills Gained</Label>
            <div className="flex space-x-2">
              <Input id="skill" value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Add a skill..." />
              <Button type="button" onClick={handleAddSkill} className="bg-portfolio-mint hover:bg-portfolio-magenta">
                Add
              </Button>
            </div>

            {skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <div
                    key={s}
                    className="flex items-center rounded-full bg-portfolio-mint/20 px-3 py-1 text-sm text-portfolio-darkPurple dark:text-portfolio-lightPink"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s)}
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
              {isEditing ? "Update Certification" : "Save Certification"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

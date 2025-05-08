"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface Extracurricular {
  id: string
  title: string
  organization: string
  period: string
  description: string
  achievements?: string[]
}

interface ExtracurricularFormProps {
  onSubmit: (extracurricular: Extracurricular) => void
  activity?: Extracurricular
  isEditing?: boolean
}

export function ExtracurricularForm({ onSubmit, activity, isEditing = false }: ExtracurricularFormProps) {
  const [title, setTitle] = useState("")
  const [organization, setOrganization] = useState("")
  const [period, setPeriod] = useState("")
  const [description, setDescription] = useState("")
  const [achievement, setAchievement] = useState("")
  const [achievements, setAchievements] = useState<string[]>([])

  // Initialize form with existing activity data if editing
  useEffect(() => {
    if (activity && isEditing) {
      setTitle(activity.title)
      setOrganization(activity.organization)
      setPeriod(activity.period)
      setDescription(activity.description)
      setAchievements(activity.achievements || [])
    }
  }, [activity, isEditing])

  const handleAddAchievement = () => {
    if (achievement.trim()) {
      setAchievements([...achievements, achievement.trim()])
      setAchievement("")
    }
  }

  const handleRemoveAchievement = (item: string) => {
    setAchievements(achievements.filter((a) => a !== item))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newExtracurricular: Extracurricular = {
      id: activity?.id || Date.now().toString(),
      title,
      organization,
      period,
      description,
      achievements: achievements.length > 0 ? achievements : undefined,
    }

    onSubmit(newExtracurricular)
  }

  return (
    <Card className={isEditing ? "border-0 shadow-none" : ""}>
      {!isEditing && (
        <CardHeader>
          <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
            {isEditing ? "Edit Extracurricular Activity" : "Add New Extracurricular Activity"}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Position/Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization/Club</Label>
            <Input id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="period">Time Period</Label>
            <Input
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="e.g., June 2023 - Present"
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
            <Label htmlFor="achievement">Key Achievements (Optional)</Label>
            <div className="flex space-x-2">
              <Input
                id="achievement"
                value={achievement}
                onChange={(e) => setAchievement(e.target.value)}
                placeholder="Add an achievement..."
              />
              <Button
                type="button"
                onClick={handleAddAchievement}
                className="bg-portfolio-coral hover:bg-portfolio-magenta"
              >
                Add
              </Button>
            </div>

            {achievements.length > 0 && (
              <div className="mt-2 space-y-2">
                {achievements.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md bg-portfolio-coral/10 p-2">
                    <span className="text-sm">{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(item)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="submit" className="bg-portfolio-magenta hover:bg-portfolio-darkPurple">
              {isEditing ? "Update Activity" : "Save Activity"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

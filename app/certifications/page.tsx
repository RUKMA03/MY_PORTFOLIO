"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { CertificationForm } from "@/components/certification-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  skills: string[]
  certificateUrl?: string
}

export default function CertificationsPage() {
  const { isAuthorized } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [editingCert, setEditingCert] = useState<Certification | null>(null)

  // Sample certifications data
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      title: "Lean Six Sigma Green Belt Certification",
      issuer: "Six Sigma Council",
      date: "2023",
      description:
        "Completed comprehensive training in Lean Six Sigma methodologies, focusing on process improvement and waste reduction techniques.",
      skills: ["Process Improvement", "Data Analysis", "Problem Solving"],
    },
    {
      id: "2",
      title: "AWS Academy Data Engineer",
      issuer: "Amazon Web Services",
      date: "2023",
      description:
        "Gained expertise in AWS data engineering services, including data storage, processing, and analytics solutions.",
      skills: ["AWS", "Data Engineering", "Cloud Computing", "Big Data"],
    },
    {
      id: "3",
      title: "CISCO-Networking Basics",
      issuer: "Cisco",
      date: "2022",
      description:
        "Learned fundamental networking concepts, protocols, and technologies essential for IT infrastructure.",
      skills: ["Networking", "IT Infrastructure", "Protocols"],
    },
    {
      id: "4",
      title: "CISCO-Introduction to DS",
      issuer: "Cisco",
      date: "2022",
      description:
        "Introduction to data science concepts, methodologies, and tools for analyzing and interpreting complex data.",
      skills: ["Data Science", "Analytics", "Statistical Analysis"],
    },
  ])

  const handleAddCertification = (newCertification: Certification) => {
    setCertifications([...certifications, newCertification])
    setShowForm(false)
  }

  const handleUpdateCertification = (updatedCert: Certification) => {
    setCertifications(certifications.map((cert) => (cert.id === updatedCert.id ? updatedCert : cert)))
    setEditingCert(null)
  }

  const handleDeleteCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-portfolio-darkPurple dark:text-portfolio-lightPink">Certifications</h1>
        {isAuthorized && (
          <Button onClick={() => setShowForm(!showForm)} className="bg-portfolio-magenta hover:bg-portfolio-darkPurple">
            {showForm ? "Cancel" : "Add New Certification"}
          </Button>
        )}
      </div>

      {showForm && isAuthorized && (
        <div className="mb-8">
          <CertificationForm onSubmit={handleAddCertification} />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <CardHeader className="bg-portfolio-mint/10">
              <CardTitle className="text-xl text-portfolio-darkPurple dark:text-portfolio-lightPink">
                {cert.title}
              </CardTitle>
              <CardDescription>
                {cert.issuer} | {cert.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-4 text-gray-700 dark:text-gray-300">{cert.description}</p>

              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-portfolio-mint/20 text-portfolio-deepPurple dark:text-portfolio-mint"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-800">
              {cert.certificateUrl ? (
                <Button asChild variant="outline">
                  <Link href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    View Certificate
                  </Link>
                </Button>
              ) : (
                <div></div>
              )}
              {isAuthorized && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-portfolio-magenta hover:bg-portfolio-magenta/10 hover:text-portfolio-darkPurple"
                    onClick={() => setEditingCert(cert)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    onClick={() => handleDeleteCertification(cert.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {editingCert && (
        <Dialog open={!!editingCert} onOpenChange={(open) => !open && setEditingCert(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Certification</DialogTitle>
            </DialogHeader>
            <CertificationForm certification={editingCert} onSubmit={handleUpdateCertification} isEditing={true} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

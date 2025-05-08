"use client"

import { useState, useEffect } from "react"

interface PDFViewerProps {
  pdfUrl: string
}

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simple timeout to simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center">
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-magenta"></div>
        </div>
      ) : (
        <iframe src={`${pdfUrl}#toolbar=0&navpanes=0`} className="w-full h-full border-0" title="PDF Viewer" />
      )}
    </div>
  )
}

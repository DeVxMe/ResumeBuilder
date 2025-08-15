"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, File, Download, Sparkles } from "lucide-react"
import { downloadResumeAsPDF, downloadResumeAsDOCX } from "@/lib/resume-generator"
import type { Resume } from "@/types/resume"

interface CompletionDialogProps {
  isOpen: boolean
  onClose: () => void
  data: Partial<Resume>
}

export function CompletionDialog({ isOpen, onClose, data }: CompletionDialogProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "docx" | null>(null)

  const handleDownload = async (format: "pdf" | "docx") => {
    if (!data.full_name) {
      alert("Please add your name before downloading")
      return
    }

    setIsDownloading(true)
    setDownloadFormat(format)

    try {
      if (format === "pdf") {
        await downloadResumeAsPDF(data)
      } else {
        await downloadResumeAsDOCX(data)
      }
    } catch (error) {
      console.error("Download failed:", error)
      alert("Failed to download resume. Please try again.")
    } finally {
      setTimeout(() => {
        setIsDownloading(false)
        setDownloadFormat(null)
      }, 500)
    }
  }

  const handlePDFDownload = () => {
    handleDownload("pdf")
  }

  const handleDOCXDownload = () => {
    handleDownload("docx")
  }

  const completionPercentage = () => {
    let completed = 0
    const total = 5

    if (data.full_name) completed++
    if (data.experience && data.experience.length > 0) completed++
    if (data.education && data.education.length > 0) completed++
    if (data.skills && data.skills.length > 0) completed++
    if (data.projects && data.projects.length > 0) completed++

    return Math.round((completed / total) * 100)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden bg-white">
        <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/25 p-4 rounded-full">
              <Sparkles className="h-8 w-8" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold mb-2">Resume Complete! 🎉</DialogTitle>
          <p className="text-emerald-100">Your professional resume is ready to download</p>
        </div>

        <div className="p-6 space-y-6 bg-white">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Completion Status</h3>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{completionPercentage()}% Complete</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${data.full_name ? "text-emerald-500" : "text-gray-300"}`} />
                <span className={`text-sm ${data.full_name ? "text-gray-900" : "text-gray-500"}`}>Personal Info</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${data.experience?.length ? "text-emerald-500" : "text-gray-300"}`} />
                <span className={`text-sm ${data.experience?.length ? "text-gray-900" : "text-gray-500"}`}>
                  Experience
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${data.education?.length ? "text-emerald-500" : "text-gray-300"}`} />
                <span className={`text-sm ${data.education?.length ? "text-gray-900" : "text-gray-500"}`}>
                  Education
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${data.skills?.length ? "text-emerald-500" : "text-gray-300"}`} />
                <span className={`text-sm ${data.skills?.length ? "text-gray-900" : "text-gray-500"}`}>Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${data.projects?.length ? "text-emerald-500" : "text-gray-300"}`} />
                <span className={`text-sm ${data.projects?.length ? "text-gray-900" : "text-gray-500"}`}>Projects</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">Download Your Resume</h3>
              <p className="text-sm text-gray-700">Choose your preferred format</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handlePDFDownload}
                disabled={isDownloading}
                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white shadow-lg"
              >
                <FileText className="h-5 w-5 mr-3" />
                <div className="flex flex-col items-start">
                  <span className="font-semibold">
                    {isDownloading && downloadFormat === "pdf" ? "Generating PDF..." : "Download as PDF"}
                  </span>
                  <span className="text-xs text-red-100">Best for sharing and printing</span>
                </div>
                {!isDownloading && <Download className="h-4 w-4 ml-auto" />}
              </Button>

              <Button
                onClick={handleDOCXDownload}
                disabled={isDownloading}
                variant="outline"
                className="w-full h-14 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 bg-white text-gray-900 shadow-md"
              >
                <File className="h-5 w-5 mr-3 text-blue-600" />
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-gray-900">
                    {isDownloading && downloadFormat === "docx" ? "Generating DOCX..." : "Download as DOCX"}
                  </span>
                  <span className="text-xs text-gray-700">Editable Word document</span>
                </div>
                {!isDownloading && <Download className="h-4 w-4 ml-auto text-blue-600" />}
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 bg-white"
            >
              Continue Editing Resume
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

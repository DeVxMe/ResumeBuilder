"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Palette, Layout, Download, Share2 } from "lucide-react"
import { ModernTemplate } from "./templates/modern-template"
import { ClassicTemplate } from "./templates/classic-template"
import { MinimalTemplate } from "./templates/minimal-template"
import { downloadResumeAsPDF, downloadResumeAsDOCX } from "@/lib/resume-generator"
import type { Resume } from "@/types/resume"

interface PreviewOverlayProps {
  isOpen: boolean
  onClose: () => void
  data: Partial<Resume>
  onTemplateChange: (templateId: string) => void
  onThemeColorChange: (color: string) => void
}

const TEMPLATES = [
  { id: "modern", name: "Modern Professional", component: ModernTemplate },
  { id: "classic", name: "Classic Traditional", component: ClassicTemplate },
  { id: "minimal", name: "Minimal Clean", component: MinimalTemplate },
]

const THEME_COLORS = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Gray", value: "#6b7280" },
]

export function PreviewOverlay({ isOpen, onClose, data, onTemplateChange, onThemeColorChange }: PreviewOverlayProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const currentTemplate = TEMPLATES.find((t) => t.id === data.template_id) || TEMPLATES[0]
  const TemplateComponent = currentTemplate.component

  const handleDownload = async (format: "pdf" | "docx") => {
    if (!data.full_name) {
      alert("Please add your name before downloading")
      return
    }

    setIsDownloading(true)
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
      }, 100)
    }
  }

  const handlePDFDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleDownload("pdf")
  }

  const handleDOCXDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleDownload("docx")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-white to-gray-50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-heading">Resume Preview</DialogTitle>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                Live Preview
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex h-full overflow-hidden">
          {/* Controls Sidebar */}
          <div className="w-80 border-r bg-gray-50/50 p-6 space-y-6 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Template Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4 text-indigo-600" />
                <label className="text-sm font-semibold text-gray-900">Template</label>
              </div>
              <Select value={data.template_id} onValueChange={onTemplateChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Theme Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-indigo-600" />
                <label className="text-sm font-semibold text-gray-900">Theme Color</label>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {THEME_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => onThemeColorChange(color.value)}
                    className={`w-12 h-12 rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                      data.theme_color === color.value
                        ? "border-gray-900 scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <Button
                onClick={handlePDFDownload}
                disabled={isDownloading}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                type="button"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? "Generating..." : "Download PDF"}
              </Button>
              <Button
                onClick={handleDOCXDownload}
                disabled={isDownloading}
                variant="outline"
                className="w-full bg-transparent"
                type="button"
              >
                <Download className="h-4 w-4 mr-2" />
                Download DOCX
              </Button>
              <Button variant="outline" className="w-full bg-transparent" type="button">
                <Share2 className="h-4 w-4 mr-2" />
                Share Resume
              </Button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 bg-gray-100 p-8 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
                <div className="w-full min-h-[1056px]">
                  <TemplateComponent data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

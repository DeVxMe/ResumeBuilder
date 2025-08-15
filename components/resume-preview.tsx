"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Eye, Share2, FileText, File } from "lucide-react"
import { ModernTemplate } from "./templates/modern-template"
import { ClassicTemplate } from "./templates/classic-template"
import { MinimalTemplate } from "./templates/minimal-template"
import { downloadResumeAsPDF, downloadResumeAsDOCX } from "@/lib/resume-generator"
import type { Resume } from "@/types/resume"

interface ResumePreviewProps {
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

export function ResumePreview({ data, onTemplateChange, onThemeColorChange }: ResumePreviewProps) {
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
      setIsDownloading(false)
    }
  }

  return (
    <Card className="shadow-lg sticky top-8 border border-gray-200 bg-white">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-lg text-gray-900">Preview</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              <Share2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" disabled={isDownloading} className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                  {isDownloading && <span className="ml-1">...</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem onClick={() => handleDownload("pdf")} disabled={isDownloading} className="text-gray-700 hover:bg-gray-50">
                  <FileText className="h-4 w-4 mr-2" />
                  Download as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("docx")} disabled={isDownloading} className="text-gray-700 hover:bg-gray-50">
                  <File className="h-4 w-4 mr-2" />
                  Download as DOCX
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Template Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Template</label>
          <Select value={data.template_id} onValueChange={onTemplateChange}>
            <SelectTrigger className="w-full border border-gray-300 bg-white text-gray-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              {TEMPLATES.map((template) => (
                <SelectItem key={template.id} value={template.id} className="text-gray-700 hover:bg-gray-50">
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Theme Color Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Theme Color</label>
          <div className="flex flex-wrap gap-2">
            {THEME_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => onThemeColorChange(color.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  data.theme_color === color.value ? "border-gray-900 scale-110" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Resume Preview */}
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
          <div className="transform scale-[0.6] origin-top-left w-[166.67%] h-[166.67%] overflow-hidden">
            <div className="w-full min-h-[1056px] bg-white">
              <TemplateComponent data={data} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

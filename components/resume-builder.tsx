"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle, Eye, Sparkles } from "lucide-react"
import { PersonalInfoForm } from "./forms/personal-info-form"
import { ExperienceForm } from "./forms/experience-form"
import { EducationForm } from "./forms/education-form"
import { SkillsForm } from "./forms/skills-form"
import { ProjectsForm } from "./forms/projects-form"
import { PreviewOverlay } from "./preview-overlay"
import { CompletionDialog } from "./completion-dialog"
import type { Resume } from "@/types/resume"

const STEPS = [
  { id: "personal", title: "Personal Info", description: "Basic contact details" },
  { id: "experience", title: "Experience", description: "Professional background" },
  { id: "education", title: "Education", description: "Academic qualifications" },
  { id: "skills", title: "Skills", description: "Technical and soft skills" },
  { id: "projects", title: "Projects", description: "Portfolio and achievements" },
]

export function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [resumeData, setResumeData] = useState<Partial<Resume>>({
    title: "My Resume",
    template_id: "modern",
    theme_color: "#6366f1",
    is_public: false,
    view_count: 0,
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  })
  const [isSaved, setIsSaved] = useState(false)
  const [showPreviewOverlay, setShowPreviewOverlay] = useState(false)
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

  const progress = ((currentStep + 1) / STEPS.length) * 100

  useEffect(() => {
    const savedData = localStorage.getItem("resume-draft")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setResumeData(parsed)
      } catch (error) {
        console.error("Error loading saved resume:", error)
      }
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("resume-draft", JSON.stringify(resumeData))
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [resumeData])

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const updateResumeData = (data: Partial<Resume>) => {
    console.log("Updating resume data:", data) // Debug log
    setResumeData((prev) => {
      const updated = { ...prev, ...data }
      console.log("New resume data:", updated) // Debug log
      return updated
    })
  }

  const handleTemplateChange = (templateId: string) => {
    updateResumeData({ template_id: templateId })
  }

  const handleThemeColorChange = (color: string) => {
    updateResumeData({ theme_color: color })
  }

  const handleComplete = () => {
    setShowCompletionDialog(true)
  }

  const handlePreviewClick = () => {
    setShowPreviewOverlay(true)
  }

  const handleCompleteClick = () => {
    setShowCompletionDialog(true)
  }

  const renderCurrentForm = () => {
    switch (STEPS[currentStep].id) {
      case "personal":
        return <PersonalInfoForm data={resumeData} onUpdate={updateResumeData} />
      case "experience":
        return <ExperienceForm data={resumeData} onUpdate={updateResumeData} />
      case "education":
        return <EducationForm data={resumeData} onUpdate={updateResumeData} />
      case "skills":
        return <SkillsForm data={resumeData} onUpdate={updateResumeData} />
      case "projects":
        return <ProjectsForm data={resumeData} onUpdate={updateResumeData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent mb-3">
            Let's build your resume step by step
          </h1>
          <p className="text-lg text-gray-600">Fill out your details, and we'll guide you through the process.</p>
          {isSaved && (
            <div className="flex items-center gap-2 text-green-600 text-sm mt-3 bg-green-50 px-3 py-2 rounded-lg w-fit">
              <CheckCircle className="h-4 w-4" />
              <span>Changes saved automatically</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-4 bg-gray-200" />
        </div>

        {/* Step Navigation */}
        <div className="mb-8">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-max">
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    index === currentStep
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                      : index < currentStep
                        ? "bg-green-100 text-green-800 hover:bg-green-200 border border-green-200"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {index < currentStep && <CheckCircle className="h-4 w-4" />}
                    {step.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Form Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b bg-gradient-to-r from-white to-gray-50/50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-heading text-2xl text-gray-900">{STEPS[currentStep].title}</CardTitle>
                  <p className="text-gray-600 mt-1">{STEPS[currentStep].description}</p>
                </div>
                <Button
                  onClick={handlePreviewClick}
                  className="bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Resume
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 max-h-[70vh] overflow-y-auto scroll-smooth">{renderCurrentForm()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 border-2 px-6 py-3"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-3">
              {currentStep < STEPS.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-6 py-3"
                >
                  Next Step
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleCompleteClick}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3"
                >
                  <Sparkles className="h-4 w-4" />
                  Complete Resume
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <PreviewOverlay
        isOpen={showPreviewOverlay}
        onClose={() => setShowPreviewOverlay(false)}
        data={resumeData}
        onTemplateChange={handleTemplateChange}
        onThemeColorChange={handleThemeColorChange}
      />

      <CompletionDialog
        isOpen={showCompletionDialog}
        onClose={() => setShowCompletionDialog(false)}
        data={resumeData}
      />
    </div>
  )
}

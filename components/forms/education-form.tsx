"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { Resume, Education } from "@/types/resume"

interface EducationFormProps {
  data: Partial<Resume>
  onUpdate: (data: Partial<Resume>) => void
}

export function EducationForm({ data, onUpdate }: EducationFormProps) {
  const education = data.education || []

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field_of_study: "",
      location: "",
      start_date: "",
      end_date: "",
      gpa: "",
      description: "",
    }
    onUpdate({ education: [...education, newEducation] })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate({ education: updated })
  }

  const removeEducation = (index: number) => {
    const updated = education.filter((_, i) => i !== index)
    onUpdate({ education: updated })
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-gray-900">Education</h3>
          <p className="text-gray-600">Add your academic qualifications</p>
        </div>
        <Button onClick={addEducation} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <Card className="border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No education added yet</p>
            <Button onClick={addEducation} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Add Your Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <Card key={edu.id} className="border border-gray-200">
              <CardHeader className="pb-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-gray-900">Education #{index + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">Institution *</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      placeholder="University of California"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">Field of Study</Label>
                    <Input
                      value={edu.field_of_study}
                      onChange={(e) => updateEducation(index, "field_of_study", e.target.value)}
                      placeholder="Computer Science"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) => updateEducation(index, "location", e.target.value)}
                      placeholder="Berkeley, CA"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">Start Date</Label>
                    <Input
                      type="month"
                      value={edu.start_date}
                      onChange={(e) => updateEducation(index, "start_date", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">End Date</Label>
                    <Input
                      type="month"
                      value={edu.end_date}
                      onChange={(e) => updateEducation(index, "end_date", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">GPA (Optional)</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                      placeholder="3.8"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium">Additional Details</Label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                    placeholder="Relevant coursework, honors, activities..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900 resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

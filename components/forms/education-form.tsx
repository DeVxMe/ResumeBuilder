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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold">Education</h3>
          <p className="text-gray-600">Add your academic qualifications</p>
        </div>
        <Button onClick={addEducation} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No education added yet</p>
            <Button onClick={addEducation} variant="outline">
              Add Your Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <Card key={edu.id}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Education #{index + 1}</CardTitle>
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
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution *</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      placeholder="University of California"
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field_of_study}
                      onChange={(e) => updateEducation(index, "field_of_study", e.target.value)}
                      placeholder="Computer Science"
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) => updateEducation(index, "location", e.target.value)}
                      placeholder="Berkeley, CA"
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={edu.start_date}
                      onChange={(e) => updateEducation(index, "start_date", e.target.value)}
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={edu.end_date}
                      onChange={(e) => updateEducation(index, "end_date", e.target.value)}
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA (Optional)</Label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                      placeholder="3.8"
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Additional Details</Label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                    placeholder="Relevant coursework, honors, activities..."
                    rows={3}
                    className="focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
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

"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { Resume, Experience } from "@/types/resume"

interface ExperienceFormProps {
  data: Partial<Resume>
  onUpdate: (data: Partial<Resume>) => void
}

export function ExperienceForm({ data, onUpdate }: ExperienceFormProps) {
  const experiences = data.experience || []

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      achievements: [],
    }
    onUpdate({ experience: [...experiences, newExperience] })
  }

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...experiences]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate({ experience: updated })
  }

  const removeExperience = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index)
    onUpdate({ experience: updated })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold">Work Experience</h3>
          <p className="text-gray-600">Add your professional work history</p>
        </div>
        <Button onClick={addExperience} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No work experience added yet</p>
            <Button onClick={addExperience} variant="outline">
              Add Your First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 max-h-[50vh] overflow-y-auto scroll-smooth pr-2">
          {experiences.map((exp, index) => (
            <Card key={exp.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Experience #{index + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title *</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="Software Engineer"
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                      readOnly={false}
                      disabled={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="Tech Corp"
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                      readOnly={false}
                      disabled={false}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(index, "location", e.target.value)}
                      placeholder="San Francisco, CA"
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                      readOnly={false}
                      disabled={false}
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="month"
                      value={exp.start_date}
                      onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                      readOnly={false}
                      disabled={false}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.end_date}
                      onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                      disabled={exp.is_current}
                      className="focus:ring-2 focus:ring-indigo-500 transition-all"
                      readOnly={false}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${index}`}
                    checked={exp.is_current}
                    onCheckedChange={(checked) => {
                      updateExperience(index, "is_current", checked)
                      if (checked) {
                        updateExperience(index, "end_date", "")
                      }
                    }}
                  />
                  <Label htmlFor={`current-${index}`}>I currently work here</Label>
                </div>

                <div className="space-y-2">
                  <Label>Job Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Describe your role, responsibilities, and key achievements..."
                    rows={4}
                    className="focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    readOnly={false}
                    disabled={false}
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

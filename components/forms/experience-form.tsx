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
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-gray-900">Work Experience</h3>
          <p className="text-gray-700">Add your professional work history</p>
        </div>
        <Button onClick={addExperience} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card className="border-dashed border-gray-300 bg-white">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-600 mb-4">No work experience added yet</p>
            <Button onClick={addExperience} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-white">
              Add Your First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 max-h-[50vh] overflow-y-auto scroll-smooth pr-2">
          {experiences.map((exp, index) => (
            <Card key={exp.id} className="relative border border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-gray-900">Experience #{index + 1}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">Job Title *</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="Software Engineer"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">Company *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="Tech Corp"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(index, "location", e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">Start Date *</Label>
                    <Input
                      type="month"
                      value={exp.start_date}
                      onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 font-medium">End Date</Label>
                    <Input
                      type="month"
                      value={exp.end_date}
                      onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                      disabled={exp.is_current}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Checkbox
                    id={`current-${index}`}
                    checked={exp.is_current}
                    onCheckedChange={(checked) => {
                      updateExperience(index, "is_current", checked)
                      if (checked) {
                        updateExperience(index, "end_date", "")
                      }
                    }}
                    className="h-5 w-5 border-2 border-gray-400 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                  <Label 
                    htmlFor={`current-${index}`} 
                    className="text-gray-900 font-medium cursor-pointer select-none"
                  >
                    I currently work here
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium">Job Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Describe your role, responsibilities, and key achievements..."
                    rows={4}
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

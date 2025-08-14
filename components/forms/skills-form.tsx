"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import type { Resume, Skill } from "@/types/resume"

interface SkillsFormProps {
  data: Partial<Resume>
  onUpdate: (data: Partial<Resume>) => void
}

const SKILL_CATEGORIES = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Databases",
  "Tools & Technologies",
  "Soft Skills",
  "Languages",
  "Other",
]

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const

export function SkillsForm({ data, onUpdate }: SkillsFormProps) {
  const skills = data.skills || []
  const [newSkill, setNewSkill] = useState({ name: "", category: "", level: "Intermediate" as const })

  const addSkill = () => {
    if (!newSkill.name.trim() || !newSkill.category) return

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name.trim(),
      category: newSkill.category,
      level: newSkill.level,
    }

    onUpdate({ skills: [...skills, skill] })
    setNewSkill({ name: "", category: "", level: "Intermediate" })
  }

  const removeSkill = (id: string) => {
    const updated = skills.filter((skill) => skill.id !== id)
    onUpdate({ skills: updated })
  }

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold mb-2">Skills</h3>
        <p className="text-gray-600">Add your technical and soft skills</p>
      </div>

      {/* Add New Skill */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Skill Name</Label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="React"
                className="focus:ring-2 focus:ring-indigo-500 transition-all"
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) => setNewSkill((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="focus:ring-2 focus:ring-indigo-500 transition-all">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Proficiency Level</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value) => setNewSkill((prev) => ({ ...prev, level: value as typeof newSkill.level }))}
              >
                <SelectTrigger className="focus:ring-2 focus:ring-indigo-500 transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={addSkill} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Display */}
      {Object.keys(groupedSkills).length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No skills added yet</p>
            <p className="text-sm text-gray-400">Add your first skill above</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="flex items-center gap-2 px-3 py-1 text-sm">
                      <span>{skill.name}</span>
                      <span className="text-xs opacity-70">({skill.level})</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="ml-1 hover:text-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

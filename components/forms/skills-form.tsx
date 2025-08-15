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
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: SKILL_CATEGORIES[0], // Default first category
    level: "Intermediate" as const
  })

  const addSkill = () => {
    const name = newSkill.name.trim()
    if (!name) return

    const skill: Skill = {
      id: Date.now().toString(),
      name,
      category: newSkill.category,
      level: newSkill.level,
    }

    onUpdate({ skills: [...skills, skill] })
    setNewSkill({ name: "", category: SKILL_CATEGORIES[0], level: "Intermediate" })
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
    {} as Record<string, Skill[]>
  )

  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-heading font-semibold mb-2 text-gray-900">Skills</h3>
        <p className="text-gray-700">Add your technical and soft skills</p>
      </div>

      {/* Add New Skill */}
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-base text-gray-900">Add New Skill</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium">Skill Name</Label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="React"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium">Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) => setNewSkill((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className="bg-white border border-gray-200 shadow-lg z-50 min-w-[200px]"
                  sideOffset={4}
                >
                  {SKILL_CATEGORIES.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-gray-700 hover:bg-gray-50 cursor-pointer px-3 py-2"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium">Proficiency Level</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value) => setNewSkill((prev) => ({ ...prev, level: value as typeof newSkill.level }))}
              >
                <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className="bg-white border border-gray-200 shadow-lg z-50 min-w-[150px]"
                  sideOffset={4}
                >
                  {SKILL_LEVELS.map((level) => (
                    <SelectItem
                      key={level}
                      value={level}
                      className="text-gray-700 hover:bg-gray-50 cursor-pointer px-3 py-2"
                    >
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={addSkill}
                disabled={!newSkill.name.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 h-10 px-4 py-2 font-medium"
                type="button"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Display */}
      {Object.keys(groupedSkills).length === 0 ? (
        <Card className="border-dashed border-gray-300 bg-white">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-600 mb-4">No skills added yet</p>
            <p className="text-sm text-gray-500">Add your first skill above</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category} className="border border-gray-200 shadow-sm bg-white">
              <CardHeader className="pb-3 bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-base text-gray-900">{category}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 text-gray-800 border border-gray-300"
                    >
                      <span>{skill.name}</span>
                      <span className="text-xs opacity-70">({skill.level})</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="ml-1 hover:text-red-600 transition-colors"
                        type="button"
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

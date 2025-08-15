"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, X } from "lucide-react"
import type { Resume, Project } from "@/types/resume"

interface ProjectsFormProps {
  data: Partial<Resume>
  onUpdate: (data: Partial<Resume>) => void
}

export function ProjectsForm({ data, onUpdate }: ProjectsFormProps) {
  const projects = data.projects || []

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      start_date: "",
      end_date: "",
      url: "",
      github_url: "",
    }
    onUpdate({ projects: [...projects, newProject] })
  }

  const updateProject = (index: number, field: string, value: any) => {
    const updated = [...projects]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate({ projects: updated })
  }

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index)
    onUpdate({ projects: updated })
  }

  const addTechnology = (projectIndex: number, tech: string) => {
    if (!tech.trim()) return
    const project = projects[projectIndex]
    const technologies = [...project.technologies, tech.trim()]
    updateProject(projectIndex, "technologies", technologies)
  }

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const project = projects[projectIndex]
    const technologies = project.technologies.filter((_, i) => i !== techIndex)
    updateProject(projectIndex, "technologies", technologies)
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-gray-900">Projects</h3>
          <p className="text-gray-600">Showcase your portfolio and achievements</p>
        </div>
        <Button onClick={addProject} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No projects added yet</p>
            <Button onClick={addProject} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onUpdate={updateProject}
              onRemove={removeProject}
              onAddTechnology={addTechnology}
              onRemoveTechnology={removeTechnology}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  onUpdate: (index: number, field: string, value: any) => void
  onRemove: (index: number) => void
  onAddTechnology: (projectIndex: number, tech: string) => void
  onRemoveTechnology: (projectIndex: number, techIndex: number) => void
}

function ProjectCard({ project, index, onUpdate, onRemove, onAddTechnology, onRemoveTechnology }: ProjectCardProps) {
  const [newTech, setNewTech] = useState("")

  const handleAddTech = () => {
    onAddTechnology(index, newTech)
    setNewTech("")
  }

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-gray-900">Project #{index + 1}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Label className="text-gray-900 font-medium">Project Name *</Label>
          <Input
            value={project.name}
            onChange={(e) => onUpdate(index, "name", e.target.value)}
            placeholder="E-commerce Website"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-900 font-medium">Description *</Label>
          <Textarea
            value={project.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            placeholder="Describe what the project does, your role, and key achievements..."
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900 resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-900 font-medium">Start Date</Label>
            <Input
              type="month"
              value={project.start_date}
              onChange={(e) => onUpdate(index, "start_date", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-900 font-medium">End Date</Label>
            <Input
              type="month"
              value={project.end_date}
              onChange={(e) => onUpdate(index, "end_date", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-900 font-medium">Project URL</Label>
            <Input
              value={project.url}
              onChange={(e) => onUpdate(index, "url", e.target.value)}
              placeholder="https://myproject.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-900 font-medium">GitHub URL</Label>
            <Input
              value={project.github_url}
              onChange={(e) => onUpdate(index, "github_url", e.target.value)}
              placeholder="https://github.com/user/project"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-900 font-medium">Technologies Used</Label>
          <div className="flex gap-2">
            <Input
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="React"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white text-gray-900"
              onKeyPress={(e) => e.key === "Enter" && handleAddTech()}
            />
            <Button onClick={handleAddTech} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="secondary" className="flex items-center gap-1 bg-gray-100 text-gray-800 border border-gray-300">
                  {tech}
                  <button
                    onClick={() => onRemoveTechnology(index, techIndex)}
                    className="ml-1 hover:text-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

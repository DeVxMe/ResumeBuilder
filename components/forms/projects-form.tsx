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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold">Projects</h3>
          <p className="text-gray-600">Showcase your portfolio and achievements</p>
        </div>
        <Button onClick={addProject} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No projects added yet</p>
            <Button onClick={addProject} variant="outline">
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
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Project #{index + 1}</CardTitle>
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
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Project Name *</Label>
          <Input
            value={project.name}
            onChange={(e) => onUpdate(index, "name", e.target.value)}
            placeholder="E-commerce Website"
            className="focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label>Description *</Label>
          <Textarea
            value={project.description}
            onChange={(e) => onUpdate(index, "description", e.target.value)}
            placeholder="Describe what the project does, your role, and key achievements..."
            rows={4}
            className="focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              type="month"
              value={project.start_date}
              onChange={(e) => onUpdate(index, "start_date", e.target.value)}
              className="focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input
              type="month"
              value={project.end_date}
              onChange={(e) => onUpdate(index, "end_date", e.target.value)}
              className="focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Project URL</Label>
            <Input
              value={project.url}
              onChange={(e) => onUpdate(index, "url", e.target.value)}
              placeholder="https://myproject.com"
              className="focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label>GitHub URL</Label>
            <Input
              value={project.github_url}
              onChange={(e) => onUpdate(index, "github_url", e.target.value)}
              placeholder="https://github.com/user/project"
              className="focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Technologies Used</Label>
          <div className="flex gap-2">
            <Input
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="React"
              className="focus:ring-2 focus:ring-indigo-500 transition-all"
              onKeyPress={(e) => e.key === "Enter" && handleAddTech()}
            />
            <Button onClick={handleAddTech} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="secondary" className="flex items-center gap-1">
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

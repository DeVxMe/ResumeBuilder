"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

const TEMPLATES = [
  { value: "modern", label: "Modern Professional" },
  { value: "classic", label: "Classic Traditional" },
  { value: "minimal", label: "Minimal Clean" },
  { value: "creative", label: "Creative Designer" },
]

const INDUSTRIES = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "other", label: "Other" },
]

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (6-10 years)" },
  { value: "executive", label: "Executive (10+ years)" },
]

export function GalleryFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [template, setTemplate] = useState(searchParams.get("template") || "all")
  const [industry, setIndustry] = useState(searchParams.get("industry") || "all")
  const [experience, setExperience] = useState(searchParams.get("experience") || "all")

  const updateFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (template !== "all") params.set("template", template)
    if (industry !== "all") params.set("industry", industry)
    if (experience !== "all") params.set("experience", experience)

    const queryString = params.toString()
    router.push(`/gallery${queryString ? `?${queryString}` : ""}`)
  }

  const clearFilters = () => {
    setSearch("")
    setTemplate("all")
    setIndustry("all")
    setExperience("all")
    router.push("/gallery")
  }

  const hasActiveFilters = search || template !== "all" || industry !== "all" || experience !== "all"

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search resumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === "Enter" && updateFilters()}
          />
        </div>

        <Select value={template} onValueChange={setTemplate}>
          <SelectTrigger>
            <SelectValue placeholder="Template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Templates</SelectItem>
            {TEMPLATES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {INDUSTRIES.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger>
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {EXPERIENCE_LEVELS.map((e) => (
              <SelectItem key={e.value} value={e.value}>
                {e.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button onClick={updateFilters}>Apply Filters</Button>
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>
    </div>
  )
}

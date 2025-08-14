"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Resume } from "@/types/resume"

interface PersonalInfoFormProps {
  data: Partial<Resume>
  onUpdate: (data: Partial<Resume>) => void
}

export function PersonalInfoForm({ data, onUpdate }: PersonalInfoFormProps) {
  const handleChange = (field: string, value: string) => {
    console.log(`Updating ${field}:`, value) // Debug log
    onUpdate({ [field]: value })
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    e.stopPropagation()
    handleChange(field, e.target.value)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            value={data.full_name || ""}
            onChange={handleInputChange("full_name")}
            placeholder="John Doe"
            className="focus:ring-2 focus:ring-indigo-500 transition-all"
            autoComplete="off"
            readOnly={false}
            disabled={false}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email || ""}
            onChange={handleInputChange("email")}
            placeholder="john@example.com"
            className="focus:ring-2 focus:ring-indigo-500 transition-all"
            autoComplete="off"
            readOnly={false}
            disabled={false}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={data.phone || ""}
            onChange={handleInputChange("phone")}
            placeholder="+1 (555) 123-4567"
            className="focus:ring-2 focus:ring-indigo-500 transition-all"
            autoComplete="off"
            readOnly={false}
            disabled={false}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location || ""}
            onChange={handleInputChange("location")}
            placeholder="New York, NY"
            className="focus:ring-2 focus:ring-indigo-500 transition-all"
            autoComplete="off"
            readOnly={false}
            disabled={false}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={data.website || ""}
            onChange={handleInputChange("website")}
            placeholder="https://johndoe.com"
            className="focus:ring-2 focus:ring-indigo-500 transition-all"
            autoComplete="off"
            readOnly={false}
            disabled={false}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin || ""}
            onChange={handleInputChange("linkedin")}
            placeholder="https://linkedin.com/in/johndoe"
            className="focus:ring-2 focus:ring-indigo-500 transition-all"
            autoComplete="off"
            readOnly={false}
            disabled={false}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={data.github || ""}
          onChange={handleInputChange("github")}
          placeholder="https://github.com/johndoe"
          className="focus:ring-2 focus:ring-indigo-500 transition-all"
          autoComplete="off"
          readOnly={false}
          disabled={false}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.summary || ""}
          onChange={handleInputChange("summary")}
          placeholder="Write a brief summary of your professional background and key achievements..."
          rows={4}
          className="focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
          readOnly={false}
          disabled={false}
        />
        <p className="text-sm text-gray-500">
          A compelling summary helps recruiters quickly understand your value proposition.
        </p>
      </div>
    </div>
  )
}

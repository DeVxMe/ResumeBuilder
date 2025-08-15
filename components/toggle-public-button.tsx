"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Lock } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { generateResumeSlug } from "@/lib/seo-utils"
import type { Resume } from "@/types/resume"

interface TogglePublicButtonProps {
  resume: Resume
}

export function TogglePublicButton({ resume }: TogglePublicButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const togglePublic = async () => {
    if (!resume.full_name) {
      alert("Please add your name before making the resume public")
      return
    }

    setIsLoading(true)
    try {
      const updates: Partial<Resume> = {
        is_public: !resume.is_public,
      }

      // Generate slug if making public and doesn't have one
      if (!resume.is_public && !resume.slug) {
        updates.slug = generateResumeSlug(resume.full_name, resume.title)
      }

      const { error } = await supabase.from("resumes").update(updates).eq("id", resume.id)

      if (error) throw error

      // Refresh the page to show updated state
      window.location.reload()
    } catch (error) {
      console.error("Error toggling public status:", error)
      alert("Failed to update resume visibility")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={togglePublic}
      disabled={isLoading}
      className="h-8 w-8 p-0 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
    >
      {resume.is_public ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
    </Button>
  )
}

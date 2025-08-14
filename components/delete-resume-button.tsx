"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import type { Resume } from "@/types/resume"

interface DeleteResumeButtonProps {
  resume: Resume
}

export function DeleteResumeButton({ resume }: DeleteResumeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const deleteResume = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("resumes").delete().eq("id", resume.id)

      if (error) throw error

      // Refresh the page to show updated state
      window.location.reload()
    } catch (error) {
      console.error("Error deleting resume:", error)
      alert("Failed to delete resume")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Resume</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{resume.title}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteResume} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

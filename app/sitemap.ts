import type { MetadataRoute } from "next"
import { createServerClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://resumewithoutsignup.vercel.app"

  // Static pages with enhanced SEO priorities
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/builder`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
  ]

  try {
    // Get public resumes for dynamic pages
    const supabase = createServerClient()
    const { data: publicResumes } = await supabase
      .from("resumes")
      .select("slug, updated_at")
      .eq("is_public", true)
      .not("slug", "is", null)

    const dynamicPages =
      publicResumes?.map((resume) => ({
        url: `${baseUrl}/resume/${resume.slug}`,
        lastModified: new Date(resume.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })) || []

    return [...staticPages, ...dynamicPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticPages
  }
}

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createServerClient } from "@/lib/supabase/server"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { Button } from "@/components/ui/button"
import { Download, Share2, Eye } from "lucide-react"
import Link from "next/link"
import type { Resume } from "@/types/resume"

const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
}

interface PageProps {
  params: { slug: string }
}

async function getResumeBySlug(slug: string): Promise<Resume | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("resumes").select("*").eq("slug", slug).eq("is_public", true).single()

  if (error || !data) {
    return null
  }

  return data as Resume
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resume = await getResumeBySlug(params.slug)

  if (!resume) {
    return {
      title: "Resume Not Found",
      description: "The requested resume could not be found.",
    }
  }

  const title = `${resume.full_name}'s Resume - ${resume.title}`
  const description =
    resume.meta_description ||
    `View ${resume.full_name}'s professional resume. ${resume.summary?.slice(0, 120)}...` ||
    `Professional resume for ${resume.full_name}. View experience, education, skills, and projects.`

  return {
    title,
    description,
    keywords: [
      resume.full_name || "",
      "resume",
      "CV",
      "professional",
      ...(resume.skills?.map((skill) => skill.name) || []),
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/resume/${resume.slug}`,
      images: [
        {
          url: `/api/resume/${resume.slug}/og-image`,
          width: 1200,
          height: 630,
          alt: `${resume.full_name}'s Resume`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/resume/${resume.slug}/og-image`],
    },
    alternates: {
      canonical: `/resume/${resume.slug}`,
    },
  }
}

export default async function ResumePublicPage({ params }: PageProps) {
  const resume = await getResumeBySlug(params.slug)

  if (!resume) {
    notFound()
  }

  // Increment view count
  const supabase = createServerClient()
  await supabase
    .from("resumes")
    .update({ view_count: (resume.view_count || 0) + 1 })
    .eq("id", resume.id)

  const TemplateComponent = TEMPLATES[resume.template_id as keyof typeof TEMPLATES] || TEMPLATES.modern

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: resume.full_name,
            email: resume.email,
            telephone: resume.phone,
            address: resume.location,
            url: resume.website,
            sameAs: [resume.linkedin, resume.github].filter(Boolean),
            description: resume.summary,
            worksFor: resume.experience?.[0]
              ? {
                  "@type": "Organization",
                  name: resume.experience[0].company,
                }
              : undefined,
            alumniOf: resume.education?.map((edu) => ({
              "@type": "EducationalOrganization",
              name: edu.institution,
            })),
            knowsAbout: resume.skills?.map((skill) => skill.name),
          }),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-heading font-bold text-gray-900">
              Resume Creator
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {resume.view_count || 0} views
              </span>
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button size="sm" asChild>
                <Link href="/builder">Create Your Resume</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Resume Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <TemplateComponent data={resume} />
            </div>

            {/* Call to Action */}
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Create Your Professional Resume</h2>
              <p className="text-gray-600 mb-6">
                Build a resume like this one with our free resume builder. Choose from professional templates and export
                to PDF or DOCX.
              </p>
              <Button size="lg" asChild>
                <Link href="/builder">Start Building Your Resume</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

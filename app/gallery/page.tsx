import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Star, Users } from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "Resume Gallery - Browse Professional Resumes",
  description:
    "Browse our gallery of professional resumes created with Resume Creator. Get inspiration from real resumes across different industries and career levels.",
  keywords: [
    "resume gallery",
    "resume examples",
    "professional resumes",
    "resume inspiration",
    "CV examples",
    "resume samples",
  ],
  openGraph: {
    title: "Resume Gallery - Browse Professional Resumes",
    description:
      "Browse our gallery of professional resumes created with Resume Creator. Get inspiration from real resumes across different industries and career levels.",
    url: "/gallery",
  },
}

const mockResumes = [
  {
    id: "1",
    full_name: "Sarah Johnson",
    title: "Software Engineer Resume",
    template_id: "modern",
    theme_color: "#6366f1",
    view_count: 1250,
    experience: [{ position: "Senior Software Engineer", company: "TechCorp" }],
    skills: [{ name: "React" }, { name: "TypeScript" }, { name: "Node.js" }],
    slug: "sarah-johnson-software-engineer",
  },
  {
    id: "2",
    full_name: "Michael Chen",
    title: "Product Manager Resume",
    template_id: "classic",
    theme_color: "#059669",
    view_count: 890,
    experience: [{ position: "Product Manager", company: "StartupXYZ" }],
    skills: [{ name: "Product Strategy" }, { name: "Analytics" }, { name: "Leadership" }],
    slug: "michael-chen-product-manager",
  },
  {
    id: "3",
    full_name: "Emily Rodriguez",
    title: "UX Designer Resume",
    template_id: "minimal",
    theme_color: "#dc2626",
    view_count: 675,
    experience: [{ position: "UX Designer", company: "DesignStudio" }],
    skills: [{ name: "Figma" }, { name: "User Research" }, { name: "Prototyping" }],
    slug: "emily-rodriguez-ux-designer",
  },
]

export default function GalleryPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-heading font-bold text-gray-900">
            Resume Creator
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/builder" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Builder
            </Link>
            <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Templates
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              My Resumes
            </Link>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/builder">Start Building</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Resume Gallery</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse professional resumes created by our users. Get inspired and create your own standout resume.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10,000+</div>
              <div className="text-gray-600">Resumes Created</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-600">User Rating</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50,000+</div>
              <div className="text-gray-600">Downloads</div>
            </CardContent>
          </Card>
        </div>

        {/* Resume Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockResumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Create Your Own Professional Resume</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of professionals who have created their resumes with our builder.
          </p>
          <Button size="lg" asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/builder">Start Building Now</Link>
          </Button>
        </div>
      </main>
      </div>
    </ErrorBoundary>
  )
}

function ResumeCard({ resume }: { resume: any }) {
  const currentJob = resume.experience?.[0]
  const topSkills = resume.skills?.slice(0, 3) || []

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-md">
      <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 p-4">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: resume.theme_color || "#6366f1" }}
            >
              {resume.full_name?.charAt(0) || "R"}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{resume.full_name}</h3>
            {currentJob && (
              <p className="text-xs text-gray-600 mb-2">
                {currentJob.position} at {currentJob.company}
              </p>
            )}
            <div className="space-y-1">
              {topSkills.map((skill, index) => (
                <div key={index} className="text-xs bg-gray-200 rounded px-2 py-1 inline-block mr-1">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="font-heading text-base truncate">{resume.full_name}</CardTitle>
            {currentJob && (
              <CardDescription className="text-sm truncate">
                {currentJob.position} • {currentJob.company}
              </CardDescription>
            )}
          </div>
          <Badge variant="secondary" className="ml-2 text-xs">
            {resume.template_id}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{resume.view_count || 0}</span>
          </div>
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="sm" asChild>
          <Link href="/builder">Use This Template</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

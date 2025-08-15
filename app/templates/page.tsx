import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Crown } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "Professional Resume Templates - Free & Premium",
  description:
    "Choose from our collection of professional resume templates. Modern, classic, and creative designs that are ATS-friendly and customizable. Free and premium options available.",
  keywords: [
    "resume templates",
    "CV templates",
    "professional resume designs",
    "ATS friendly templates",
    "modern resume templates",
    "free resume templates",
  ],
  openGraph: {
    title: "Professional Resume Templates - Free & Premium",
    description:
      "Choose from our collection of professional resume templates. Modern, classic, and creative designs that are ATS-friendly and customizable.",
    url: "/templates",
  },
}

const TEMPLATES = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech and business roles",
    preview: "/templates/modern-preview.png",
    isPremium: false,
    features: ["ATS-Friendly", "Clean Design", "Professional"],
  },
  {
    id: "classic",
    name: "Classic Traditional",
    description: "Timeless format suitable for conservative industries",
    preview: "/templates/classic-preview.png",
    isPremium: false,
    features: ["Traditional", "Conservative", "Timeless"],
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simple and elegant design focusing on content",
    preview: "/templates/minimal-preview.png",
    isPremium: false,
    features: ["Minimal", "Clean", "Content-Focused"],
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Bold and artistic layout for creative professionals",
    preview: "/templates/creative-preview.png",
    isPremium: false,
    features: ["Creative", "Artistic", "Bold"],
  },
  {
    id: "executive",
    name: "Executive Premium",
    description: "Sophisticated layout for senior-level positions",
    preview: "/templates/executive-preview.png",
    isPremium: true,
    features: ["Premium", "Executive", "Sophisticated"],
  },
]

export default function TemplatesPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-heading font-bold text-gray-900">
              Resume Creator
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/builder" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                Builder
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                Gallery
              </Link>
              <Button variant="outline" asChild className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Professional Resume Templates</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates. All templates are ATS-friendly and fully
              customizable.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((template) => (
              <Card key={template.id} className="relative overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 shadow-sm bg-white">
                {template.isPremium && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500 text-yellow-900 border-yellow-600">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                )}
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <img
                    src={`/abstract-geometric-shapes.png?height=400&width=300&query=${template.name} resume template preview`}
                    alt={`${template.name} template preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-heading text-gray-900">{template.name}</CardTitle>
                  <CardDescription className="text-gray-700">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                    <Link href={`/builder?template=${template.id}`}>Use This Template</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Ready to Build Your Resume?</h2>
            <p className="text-gray-700 mb-6">Start with any template and customize it to match your style.</p>
            <Button size="lg" asChild className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">
              <Link href="/builder">Start Building Now</Link>
            </Button>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Download, Share2 } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "My Resumes - Resume Creator",
  description: "Manage your resumes and track their performance.",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-heading font-bold text-gray-900">
            Resume Creator
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Gallery
            </Link>
            <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Templates
            </Link>
            <Button asChild>
              <Link href="/builder">
                <Plus className="h-4 w-4 mr-2" />
                New Resume
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">My Resumes</h1>
            <p className="text-gray-600">Create and manage your professional resumes</p>
          </div>
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/builder">
              <Plus className="h-4 w-4 mr-2" />
              Create New Resume
            </Link>
          </Button>
        </div>

        {/* Quick Start Section */}
        <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  Ready to create your first resume?
                </h3>
                <p className="text-gray-600 mb-4">
                  Choose from our professional templates and build your resume in minutes
                </p>
                <div className="flex gap-3">
                  <Button asChild>
                    <Link href="/builder">Start Building</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/templates">Browse Templates</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg opacity-20"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Resumes Section */}
        <div className="mb-8">
          <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">Recent Resumes</h2>
          <div className="text-center py-12 text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-lg mb-2">No resumes yet</p>
            <p className="text-sm">Your created resumes will appear here</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="h-6 w-6 text-blue-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Easy Editor</CardTitle>
              <CardDescription>Intuitive form-based editor with real-time preview</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Multiple Formats</CardTitle>
              <CardDescription>Export as PDF or DOCX with perfect formatting</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="h-6 w-6 text-purple-600" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Easy Sharing</CardTitle>
              <CardDescription>Share your resume with a simple link</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Share2, Zap, Edit, Palette, CheckCircle, Users, Star } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-heading font-bold text-gray-900">Resume Without Signup</h1>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/templates" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                Templates
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                Gallery
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                My Resumes
              </Link>
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link href="/builder">Start Building</Link>
              </Button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-6 leading-tight">
              Free Resume Builder - <span className="text-indigo-600">No Signup Required</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create professional, ATS-friendly resumes instantly with our free resume builder. No registration, no email
              required, no limits. Choose from modern templates and export to PDF or DOCX immediately.
            </p>

            <div className="flex items-center justify-center gap-6 mb-10 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">No Signup Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Instant Download</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4 h-auto text-white shadow-lg" asChild>
                <Link href="/builder">
                  <Edit className="h-5 w-5 mr-2" />
                  Create Resume Now - Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-md" asChild>
                <Link href="/templates">
                  <Palette className="h-5 w-5 mr-2" />
                  View Free Templates
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="font-medium">50,000+ resumes created</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">4.8/5 user rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Why Choose Our Free Resume Builder Without Signup?
            </h3>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Everything you need to create a standout resume that gets you noticed by employers - completely free, no
              account needed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200 shadow-md bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="font-heading text-xl text-gray-900">Instant Resume Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Start building your professional resume immediately - no signup, no email verification, no waiting. Just
                  click and create your resume in minutes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200 shadow-md bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="font-heading text-xl text-gray-900">Free PDF & Word Export</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  Download your resume as PDF or DOCX format for free. No watermarks, no premium features - all export
                  options are completely free forever.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200 shadow-md bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="font-heading text-xl text-gray-900">ATS-Friendly Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  All our resume templates are designed to pass Applicant Tracking Systems (ATS) and get your resume seen
                  by human recruiters.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 bg-white/70">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-heading font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Do I really need to sign up?</h4>
                <p className="text-gray-700">
                  No! You can create, edit, and download professional resumes without any signup or registration. Just
                  start building immediately.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Is this resume builder completely free?</h4>
                <p className="text-gray-700">
                  Yes, 100% free with no hidden costs, premium features, or credit requirements. All templates and export
                  options are free forever.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Are the templates ATS-friendly?</h4>
                <p className="text-gray-700">
                  All our resume templates are designed to pass Applicant Tracking Systems (ATS) and are optimized for
                  both automated screening and human review.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Can I download in different formats?</h4>
                <p className="text-gray-700">
                  Yes, you can export your resume as PDF or DOCX (Word) format for free, with no watermarks or
                  limitations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-heading font-bold mb-4">
              Create Your Professional Resume Now - No Signup Required
            </h3>
            <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
              Join thousands of job seekers who have created winning resumes with our free, no-signup resume builder
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 h-auto bg-white text-indigo-600 hover:bg-gray-100 shadow-lg" asChild>
              <Link href="/builder">Start Building Your Free Resume</Link>
            </Button>
            <p className="text-sm text-indigo-200 mt-4">No email required • No account needed • Instant access</p>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  )
}

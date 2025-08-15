import { ResumeBuilder } from "@/components/resume-builder"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata = {
  title: "Resume Builder - Create Your Professional Resume",
  description: "Build your professional resume step by step with our intuitive form interface.",
}

export default function BuilderPage() {
  return (
    <ErrorBoundary>
      <ResumeBuilder />
    </ErrorBoundary>
  )
}

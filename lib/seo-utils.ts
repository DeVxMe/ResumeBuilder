import type { Resume } from "@/types/resume"

export function generateResumeSlug(fullName: string, title?: string): string {
  const baseName = fullName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  const titlePart = title
    ? `-${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`
    : ""
  const randomSuffix = Math.random().toString(36).substring(2, 8)

  return `${baseName}${titlePart}-${randomSuffix}`
}

export function generateMetaDescription(resume: Partial<Resume>): string {
  const parts: string[] = []

  if (resume.full_name) {
    parts.push(`${resume.full_name}'s professional resume`)
  }

  if (resume.experience?.[0]) {
    parts.push(`${resume.experience[0].position} at ${resume.experience[0].company}`)
  }

  if (resume.skills && resume.skills.length > 0) {
    const topSkills = resume.skills
      .slice(0, 3)
      .map((skill) => skill.name)
      .join(", ")
    parts.push(`Skills: ${topSkills}`)
  }

  if (resume.summary) {
    const shortSummary = resume.summary.slice(0, 100) + (resume.summary.length > 100 ? "..." : "")
    parts.push(shortSummary)
  }

  return parts.join(". ").slice(0, 160)
}

export function generateStructuredData(resume: Resume) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resume.full_name,
    email: resume.email,
    telephone: resume.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: resume.location,
    },
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
    hasOccupation: resume.experience?.map((exp) => ({
      "@type": "Occupation",
      name: exp.position,
      occupationLocation: {
        "@type": "Place",
        name: exp.location,
      },
    })),
  }
}

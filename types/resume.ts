export interface Resume {
  id: string
  user_id?: string
  title: string
  slug?: string

  // Personal Information
  full_name?: string
  email?: string
  phone?: string
  location?: string
  website?: string
  linkedin?: string
  github?: string
  summary?: string

  // Professional Data
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]

  // Template and styling
  template_id: string
  theme_color: string

  // SEO and sharing
  is_public: boolean
  meta_description?: string
  view_count: number

  // Timestamps
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location?: string
  start_date: string
  end_date?: string
  is_current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field_of_study?: string
  location?: string
  start_date: string
  end_date?: string
  gpa?: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  start_date?: string
  end_date?: string
  url?: string
  github_url?: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issue_date: string
  expiry_date?: string
  credential_id?: string
  url?: string
}

export interface Language {
  id: string
  name: string
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native"
}

export interface ResumeTemplate {
  id: string
  name: string
  description: string
  preview_image?: string
  is_premium: boolean
}

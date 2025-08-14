"use client"

import { Mail, Phone, MapPin, Globe } from "lucide-react"
import type { Resume } from "@/types/resume"

interface ClassicTemplateProps {
  data: Partial<Resume>
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const themeColor = data.theme_color || "#374151"

  return (
    <div className="w-full max-w-[8.5in] mx-auto bg-white text-gray-900 font-serif text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: themeColor }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: themeColor }}>
          {data.full_name || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
          {data.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span>{data.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-8 space-y-6">
        {/* Professional Summary */}
        {data.summary && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              Professional Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className="text-gray-600 text-sm">
                      {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="font-semibold text-gray-700">{exp.company}</p>
                    {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                  </div>
                  {exp.description && <p className="text-gray-700 text-justify">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      {edu.field_of_study && <p className="text-gray-600 text-sm italic">{edu.field_of_study}</p>}
                    </div>
                    <div className="text-right text-gray-600 text-sm">
                      <p>
                        {edu.start_date} - {edu.end_date}
                      </p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              Skills & Competencies
            </h2>
            <div className="space-y-2">
              {Object.entries(
                data.skills.reduce(
                  (acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = []
                    acc[skill.category].push(skill)
                    return acc
                  },
                  {} as Record<string, typeof data.skills>,
                ),
              ).map(([category, skills]) => (
                <div key={category} className="flex">
                  <span className="font-semibold text-gray-900 w-32 flex-shrink-0">{category}:</span>
                  <span className="text-gray-700">{skills.map((skill) => skill.name).join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              Notable Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {(project.start_date || project.end_date) && (
                      <span className="text-gray-600 text-sm">
                        {project.start_date} - {project.end_date}
                      </span>
                    )}
                  </div>
                  {project.description && <p className="text-gray-700 text-justify mb-2">{project.description}</p>}
                  {project.technologies.length > 0 && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">Technologies:</span> {project.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

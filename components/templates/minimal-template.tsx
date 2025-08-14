"use client"

import type { Resume } from "@/types/resume"

interface MinimalTemplateProps {
  data: Partial<Resume>
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const themeColor = data.theme_color || "#000000"

  return (
    <div className="w-full max-w-[8.5in] mx-auto bg-white text-gray-900 font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light mb-4" style={{ color: themeColor }}>
          {data.full_name || "Your Name"}
        </h1>
        <div className="space-y-1 text-gray-600">
          {data.email && <p>{data.email}</p>}
          {data.phone && <p>{data.phone}</p>}
          {data.location && <p>{data.location}</p>}
          {data.website && <p>{data.website}</p>}
        </div>
      </div>

      <div className="space-y-8">
        {/* Professional Summary */}
        {data.summary && (
          <section>
            <h2 className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: themeColor }}>
              About
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <span className="text-gray-500 text-xs">
                      {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
                  {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: themeColor }}>
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <span className="text-gray-500 text-xs">
                      {edu.start_date} — {edu.end_date}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  {edu.field_of_study && <p className="text-gray-500 text-xs">{edu.field_of_study}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: themeColor }}>
              Skills
            </h2>
            <div className="space-y-3">
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
                <div key={category}>
                  <h3 className="text-xs font-medium text-gray-900 mb-1">{category}</h3>
                  <p className="text-gray-700 text-sm">{skills.map((skill) => skill.name).join(" • ")}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: themeColor }}>
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-medium text-gray-900 mb-1">{project.name}</h3>
                  {project.description && <p className="text-gray-700 text-sm mb-2">{project.description}</p>}
                  {project.technologies.length > 0 && (
                    <p className="text-gray-500 text-xs">{project.technologies.join(" • ")}</p>
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

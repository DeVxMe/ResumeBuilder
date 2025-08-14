"use client"

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from "lucide-react"
import type { Resume } from "@/types/resume"

interface ModernTemplateProps {
  data: Partial<Resume>
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const themeColor = data.theme_color || "#6366f1"

  return (
    <div className="w-full max-w-[8.5in] mx-auto bg-white text-gray-900 font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}80 100%)`,
          }}
        />
        <div className="relative px-8 py-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: themeColor }}>
            {data.full_name || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            {data.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{data.phone}</span>
              </div>
            )}
            {data.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{data.location}</span>
              </div>
            )}
            {data.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{data.website}</span>
              </div>
            )}
            {data.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </div>
            )}
            {data.github && (
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Professional Summary */}
        {data.summary && (
          <section>
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-gray-600 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                        </span>
                      </div>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.field_of_study && <p className="text-gray-600 text-sm">{edu.field_of_study}</p>}
                  </div>
                  <div className="text-right text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {edu.start_date} - {edu.end_date}
                      </span>
                    </div>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
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
                  <h3 className="font-semibold text-gray-900 mb-1">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 rounded text-white text-xs font-medium"
                        style={{ backgroundColor: themeColor }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2
              className="text-lg font-bold mb-3 pb-1 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {(project.start_date || project.end_date) && (
                      <div className="text-gray-600 text-sm flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {project.start_date} - {project.end_date}
                        </span>
                      </div>
                    )}
                  </div>
                  {project.description && <p className="text-gray-700 mb-2">{project.description}</p>}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
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

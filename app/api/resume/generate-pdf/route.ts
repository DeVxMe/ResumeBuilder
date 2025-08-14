import { type NextRequest, NextResponse } from "next/server"
import type { Resume } from "@/types/resume"

export async function POST(request: NextRequest) {
  try {
    const resumeData: Partial<Resume> = await request.json()

    if (!resumeData) {
      return NextResponse.json({ error: "Resume data is required" }, { status: 400 })
    }

    const htmlContent = generateResumeHTML(resumeData)

    // Return HTML for client-side PDF generation
    return new Response(htmlContent, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="${resumeData.full_name?.replace(/\s+/g, "_") || "resume"}_resume.html"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}

function generateResumeHTML(resumeData: Partial<Resume>): string {
  const themeColor = resumeData.theme_color || "#2563eb"

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${resumeData.full_name || "Resume"}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { 
      size: A4; 
      margin: 0.5in; 
    }
    body { 
      font-family: 'Inter', sans-serif; 
      line-height: 1.4; 
      color: #2d3748;
      background: white;
      font-size: 11pt;
      max-width: 8.5in;
      margin: 0 auto;
    }
    .header { 
      text-align: center; 
      margin-bottom: 20px; 
      border-bottom: 2px solid ${themeColor};
      padding-bottom: 12px;
    }
    .name { 
      font-size: 22pt; 
      font-weight: 700; 
      color: ${themeColor}; 
      margin-bottom: 4px;
      letter-spacing: 0.3px;
    }
    .title { 
      font-size: 12pt; 
      color: #4a5568; 
      margin-bottom: 8px;
      font-weight: 500;
    }
    .contact { 
      display: flex; 
      justify-content: center;
      gap: 12px; 
      flex-wrap: wrap; 
      font-size: 10pt; 
      color: #4a5568;
    }
    .section { 
      margin-bottom: 16px; 
      page-break-inside: avoid;
    }
    .section-title { 
      font-size: 12pt; 
      font-weight: 600; 
      color: ${themeColor}; 
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }
    .item { 
      margin-bottom: 12px; 
      page-break-inside: avoid;
    }
    .item-title { 
      font-weight: 600; 
      color: #2d3748;
      font-size: 11pt;
      margin-bottom: 2px;
    }
    .item-subtitle { 
      color: ${themeColor}; 
      font-weight: 500;
      font-size: 10pt;
      margin-bottom: 4px;
    }
    .item-description { 
      color: #4a5568; 
      font-size: 10pt;
      line-height: 1.4;
      text-align: justify;
    }
    .skills-container { 
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      gap: 8px; 
    }
    .skill-group { 
      margin-bottom: 6px; 
    }
    .skill-title { 
      font-weight: 600; 
      color: #2d3748; 
      font-size: 10pt;
      margin-bottom: 2px;
    }
    .skill-list { 
      color: #4a5568;
      font-size: 10pt;
      line-height: 1.3;
    }
    .summary { 
      color: #4a5568;
      font-size: 11pt;
      line-height: 1.5;
      text-align: justify;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="name">${resumeData.full_name || ""}</h1>
    ${resumeData.title ? `<p class="title">${resumeData.title}</p>` : ""}
    <div class="contact">
      ${resumeData.email ? `<span>${resumeData.email}</span>` : ""}
      ${resumeData.phone ? `<span>${resumeData.phone}</span>` : ""}
      ${resumeData.location ? `<span>${resumeData.location}</span>` : ""}
      ${resumeData.website ? `<span>${resumeData.website}</span>` : ""}
    </div>
  </div>

  ${
    resumeData.summary
      ? `
  <div class="section">
    <h2 class="section-title">Professional Summary</h2>
    <p class="summary">${resumeData.summary}</p>
  </div>`
      : ""
  }

  ${
    resumeData.experience && resumeData.experience.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">Professional Experience</h2>
    ${resumeData.experience
      .map(
        (exp) => `
    <div class="item">
      <div class="item-title">${exp.position || ""}</div>
      <div class="item-subtitle">${exp.company || ""}</div>
      ${exp.description ? `<div class="item-description">${exp.description}</div>` : ""}
    </div>`,
      )
      .join("")}
  </div>`
      : ""
  }

  ${
    resumeData.education && resumeData.education.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">Education</h2>
    ${resumeData.education
      .map(
        (edu) => `
    <div class="item">
      <div class="item-title">${edu.degree || ""}</div>
      <div class="item-subtitle">${edu.institution || ""}</div>
    </div>`,
      )
      .join("")}
  </div>`
      : ""
  }

  ${
    resumeData.skills && resumeData.skills.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">Core Competencies</h2>
    <div class="skills-container">
      ${resumeData.skills
        .map(
          (skill) => `
      <div class="skill-group">
        <div class="skill-title">${skill.category || ""}</div>
        <div class="skill-list">${skill.items && Array.isArray(skill.items) ? skill.items.join(" • ") : ""}</div>
      </div>`,
        )
        .join("")}
    </div>
  </div>`
      : ""
  }

  ${
    resumeData.projects && resumeData.projects.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">Key Projects</h2>
    ${resumeData.projects
      .map(
        (project) => `
    <div class="item">
      <div class="item-title">${project.name || ""}</div>
      ${project.url ? `<div class="item-subtitle">${project.url}</div>` : ""}
      ${project.description ? `<div class="item-description">${project.description}</div>` : ""}
      ${project.technologies && Array.isArray(project.technologies) ? `<div class="item-description"><strong>Technologies:</strong> ${project.technologies.join(" • ")}</div>` : ""}
    </div>`,
      )
      .join("")}
  </div>`
      : ""
  }
</body>
</html>`
}

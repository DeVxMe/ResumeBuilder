import { type NextRequest, NextResponse } from "next/server"
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx"
import type { Resume } from "@/types/resume"

export async function POST(request: NextRequest) {
  try {
    const resumeData: Partial<Resume> = await request.json()

    if (!resumeData) {
      return NextResponse.json({ error: "Resume data is required" }, { status: 400 })
    }

    // Generate DOCX document
    const doc = await generateResumeDocument(resumeData)

    // Convert to buffer
    const buffer = await Packer.toBuffer(doc)

    // Return as downloadable file
    const filename = `${resumeData.full_name?.replace(/\s+/g, "_") || "resume"}_resume.docx`

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Error generating DOCX:", error)
    return NextResponse.json({ error: "Failed to generate resume" }, { status: 500 })
  }
}

async function generateResumeDocument(data: Partial<Resume>): Promise<Document> {
  const children: Paragraph[] = []

  // Header with name and contact info
  if (data.full_name) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: data.full_name,
            bold: true,
            size: 32,
            color: data.theme_color?.replace("#", "") || "000000",
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
    )
  }

  // Contact information
  const contactInfo: string[] = []
  if (data.email) contactInfo.push(data.email)
  if (data.phone) contactInfo.push(data.phone)
  if (data.location) contactInfo.push(data.location)
  if (data.website) contactInfo.push(data.website)

  if (contactInfo.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactInfo.join(" | "),
            size: 20,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      }),
    )
  }

  // Professional Summary
  if (data.summary) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "PROFESSIONAL SUMMARY",
            bold: true,
            size: 24,
            color: data.theme_color?.replace("#", "") || "000000",
          }),
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
    )

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: data.summary,
            size: 22,
          }),
        ],
        spacing: { after: 300 },
      }),
    )
  }

  // Work Experience
  if (data.experience && data.experience.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "WORK EXPERIENCE",
            bold: true,
            size: 24,
            color: data.theme_color?.replace("#", "") || "000000",
          }),
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
    )

    data.experience.forEach((exp) => {
      // Job title and dates
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.position,
              bold: true,
              size: 22,
            }),
            new TextRun({
              text: ` | ${exp.start_date} - ${exp.is_current ? "Present" : exp.end_date}`,
              size: 20,
            }),
          ],
          spacing: { before: 100, after: 50 },
        }),
      )

      // Company and location
      const companyInfo = [exp.company, exp.location].filter(Boolean).join(" | ")
      if (companyInfo) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: companyInfo,
                italic: true,
                size: 20,
              }),
            ],
            spacing: { after: 100 },
          }),
        )
      }

      // Description
      if (exp.description) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.description,
                size: 20,
              }),
            ],
            spacing: { after: 200 },
          }),
        )
      }
    })
  }

  // Education
  if (data.education && data.education.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "EDUCATION",
            bold: true,
            size: 24,
            color: data.theme_color?.replace("#", "") || "000000",
          }),
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
    )

    data.education.forEach((edu) => {
      // Degree and dates
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree,
              bold: true,
              size: 22,
            }),
            new TextRun({
              text: ` | ${edu.start_date} - ${edu.end_date}`,
              size: 20,
            }),
          ],
          spacing: { before: 100, after: 50 },
        }),
      )

      // Institution and field
      const eduInfo = [edu.institution, edu.field_of_study].filter(Boolean).join(" | ")
      if (eduInfo) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: eduInfo,
                italic: true,
                size: 20,
              }),
            ],
            spacing: { after: 100 },
          }),
        )
      }

      // GPA
      if (edu.gpa) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `GPA: ${edu.gpa}`,
                size: 20,
              }),
            ],
            spacing: { after: 200 },
          }),
        )
      }
    })
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "SKILLS",
            bold: true,
            size: 24,
            color: data.theme_color?.replace("#", "") || "000000",
          }),
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
    )

    // Group skills by category
    const skillsByCategory = data.skills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill.name)
        return acc
      },
      {} as Record<string, string[]>,
    )

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${category}: `,
              bold: true,
              size: 20,
            }),
            new TextRun({
              text: skills.join(", "),
              size: 20,
            }),
          ],
          spacing: { after: 100 },
        }),
      )
    })
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "PROJECTS",
            bold: true,
            size: 24,
            color: data.theme_color?.replace("#", "") || "000000",
          }),
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
    )

    data.projects.forEach((project) => {
      // Project name and dates
      const projectHeader = [
        project.name,
        project.start_date && project.end_date ? `${project.start_date} - ${project.end_date}` : "",
      ]
        .filter(Boolean)
        .join(" | ")

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: projectHeader,
              bold: true,
              size: 22,
            }),
          ],
          spacing: { before: 100, after: 50 },
        }),
      )

      // Description
      if (project.description) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: project.description,
                size: 20,
              }),
            ],
            spacing: { after: 100 },
          }),
        )
      }

      // Technologies
      if (project.technologies.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Technologies: ${project.technologies.join(", ")}`,
                italic: true,
                size: 20,
              }),
            ],
            spacing: { after: 200 },
          }),
        )
      }
    })
  }

  return new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  })
}

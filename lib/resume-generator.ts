"use client"

import type { Resume } from "@/types/resume"
import { jsPDF } from "jspdf"

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 99, g: 102, b: 241 } // Default indigo
}

export async function downloadResumeAsPDF(resumeData: Partial<Resume>) {
  try {
    const doc = new jsPDF("p", "mm", "a4")

    // A4 dimensions: 210 x 297 mm
    const pageWidth = 210
    const pageHeight = 297
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    const themeColor = resumeData.theme_color || "#6366f1"
    const themeRGB = hexToRgb(themeColor)

    const lightThemeRGB = { r: themeRGB.r + 40, g: themeRGB.g + 40, b: themeRGB.b + 40 }
    const darkGray = { r: 45, g: 45, b: 45 }
    const mediumGray = { r: 85, g: 85, b: 85 }
    const lightGray = { r: 248, g: 250, b: 252 }

    let yPosition = margin

    // Header section - Name
    doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(resumeData.full_name || "Your Name", pageWidth / 2, yPosition + 8, { align: "center" })
    yPosition += 18

    doc.setTextColor(102, 102, 102) // text-gray-600 equivalent
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    const contactItems = []
    if (resumeData.email) contactItems.push(resumeData.email)
    if (resumeData.phone) contactItems.push(resumeData.phone)
    if (resumeData.location) contactItems.push(resumeData.location)
    if (resumeData.website) contactItems.push(resumeData.website)
    if (resumeData.linkedin) contactItems.push("LinkedIn Profile")
    if (resumeData.github) contactItems.push("GitHub Profile")

    const contactLine = contactItems.join(" • ")
    doc.text(contactLine, pageWidth / 2, yPosition, { align: "center" })
    yPosition += 15

    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Professional Summary
    if (resumeData.summary) {
      doc.setFillColor(lightGray.r, lightGray.g, lightGray.b)
      doc.rect(margin - 5, yPosition - 5, contentWidth + 10, 12, "F")

      doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Professional Summary", margin, yPosition + 2)

      doc.setDrawColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setLineWidth(1.2)
      doc.line(margin, yPosition + 4, margin + 80, yPosition + 4)
      yPosition += 12

      doc.setTextColor(darkGray.r, darkGray.g, darkGray.b)
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      const summaryLines = doc.splitTextToSize(resumeData.summary, contentWidth)
      summaryLines.forEach((line: string, index: number) => {
        doc.text(line, margin, yPosition + index * 4.5)
      })
      yPosition += summaryLines.length * 4.5 + 15
    }

    // Work Experience
    if (resumeData.experience && resumeData.experience.length > 0) {
      if (yPosition > pageHeight - 60) {
        doc.addPage()
        yPosition = margin
      }

      doc.setFillColor(lightGray.r, lightGray.g, lightGray.b)
      doc.rect(margin - 5, yPosition - 5, contentWidth + 10, 12, "F")

      doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Work Experience", margin, yPosition + 2)

      doc.setDrawColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setLineWidth(1.2)
      doc.line(margin, yPosition + 4, margin + 80, yPosition + 4)
      yPosition += 15

      resumeData.experience.forEach((exp, index) => {
        if (yPosition > pageHeight - 40) {
          doc.addPage()
          yPosition = margin
        }

        if (index % 2 === 0) {
          doc.setFillColor(252, 252, 252)
          doc.rect(margin - 3, yPosition - 3, contentWidth + 6, 25, "F")
        }

        doc.setTextColor(darkGray.r, darkGray.g, darkGray.b)
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text(exp.position || "", margin, yPosition)

        if (exp.start_date || exp.end_date) {
          const dateText = `${exp.start_date || ""} - ${exp.is_current ? "Present" : exp.end_date || ""}`
          doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
          doc.setFontSize(9)
          doc.setFont("helvetica", "bold")
          doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
        }
        yPosition += 6

        doc.setTextColor(mediumGray.r, mediumGray.g, mediumGray.b)
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(exp.company || "", margin, yPosition)

        if (exp.location) {
          doc.setTextColor(mediumGray.r, mediumGray.g, mediumGray.b)
          doc.setFontSize(9)
          doc.text(exp.location, pageWidth - margin, yPosition, { align: "right" })
        }
        yPosition += 6

        if (exp.description) {
          doc.setTextColor(darkGray.r, darkGray.g, darkGray.b)
          doc.setFontSize(10)
          const descLines = doc.splitTextToSize(exp.description, contentWidth)
          descLines.forEach((line: string, index: number) => {
            doc.text(line, margin, yPosition + index * 4.5)
          })
          yPosition += descLines.length * 4.5 + 10
        }
      })
    }

    if (resumeData.education && resumeData.education.length > 0) {
      if (yPosition > pageHeight - 50) {
        doc.addPage()
        yPosition = margin
      }

      doc.setFillColor(lightGray.r, lightGray.g, lightGray.b)
      doc.rect(margin - 5, yPosition - 5, contentWidth + 10, 12, "F")

      doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Education", margin, yPosition + 2)

      doc.setDrawColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setLineWidth(1.2)
      doc.line(margin, yPosition + 4, margin + 80, yPosition + 4)
      yPosition += 15

      resumeData.education.forEach((edu) => {
        doc.setTextColor(darkGray.r, darkGray.g, darkGray.b)
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(edu.degree || "", margin, yPosition)

        if (edu.start_date || edu.end_date) {
          const dateText = `${edu.start_date || ""} - ${edu.end_date || ""}`
          doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
          doc.setFontSize(9)
          doc.setFont("helvetica", "bold")
          doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
        }
        yPosition += 5

        doc.setTextColor(mediumGray.r, mediumGray.g, mediumGray.b)
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.text(edu.institution || "", margin, yPosition)
        yPosition += 4

        if (edu.field_of_study) {
          doc.setTextColor(darkGray.r, darkGray.g, darkGray.b)
          doc.setFontSize(9)
          doc.text(edu.field_of_study, margin, yPosition)
          yPosition += 4
        }

        if (edu.gpa) {
          doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
          doc.setFont("helvetica", "bold")
          doc.text(`GPA: ${edu.gpa}`, pageWidth - margin, yPosition, { align: "right" })
          yPosition += 4
        }
        yPosition += 8
      })
    }

    // Skills section
    if (resumeData.skills && resumeData.skills.length > 0) {
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = margin
      }

      doc.setFillColor(lightGray.r, lightGray.g, lightGray.b)
      doc.rect(margin - 5, yPosition - 5, contentWidth + 10, 12, "F")

      doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Skills", margin, yPosition + 2)

      doc.setDrawColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setLineWidth(1.2)
      doc.line(margin, yPosition + 4, margin + 80, yPosition + 4)
      yPosition += 15

      const skillsByCategory = resumeData.skills.reduce(
        (acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = []
          acc[skill.category].push(skill.name)
          return acc
        },
        {} as Record<string, string[]>,
      )

      Object.entries(skillsByCategory).forEach(([category, skills]) => {
        doc.setTextColor(darkGray.r, darkGray.g, darkGray.b)
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(category, margin, yPosition)
        yPosition += 6

        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")

        let xPosition = margin
        skills.forEach((skill, index) => {
          const skillWidth = doc.getTextWidth(skill) + 6

          if (index % 3 === 0) {
            doc.setFillColor(themeRGB.r, themeRGB.g, themeRGB.b)
          } else if (index % 3 === 1) {
            doc.setFillColor(lightThemeRGB.r, lightThemeRGB.g, lightThemeRGB.b)
          } else {
            doc.setFillColor(themeRGB.r - 20, themeRGB.g - 20, themeRGB.b - 20)
          }

          doc.roundedRect(xPosition, yPosition - 4, skillWidth, 6, 2, 2, "F")

          doc.setTextColor(255, 255, 255)
          doc.text(skill, xPosition + 3, yPosition)

          xPosition += skillWidth + 4

          if (xPosition > pageWidth - margin - 30) {
            xPosition = margin
            yPosition += 8
          }
        })
        yPosition += 12
      })
    }

    // Projects section
    if (resumeData.projects && resumeData.projects.length > 0) {
      if (yPosition > pageHeight - 50) {
        doc.addPage()
        yPosition = margin
      }

      doc.setFillColor(lightGray.r, lightGray.g, lightGray.b)
      doc.rect(margin - 5, yPosition - 5, contentWidth + 10, 12, "F")

      doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Projects", margin, yPosition + 2)

      doc.setDrawColor(themeRGB.r, themeRGB.g, themeRGB.b)
      doc.setLineWidth(1.2)
      doc.line(margin, yPosition + 4, margin + 80, yPosition + 4)
      yPosition += 15

      resumeData.projects.forEach((project, index) => {
        if (yPosition > pageHeight - 30) {
          doc.addPage()
          yPosition = margin
        }

        if (index % 2 === 0) {
          doc.setFillColor(252, 252, 252)
          doc.rect(margin - 3, yPosition - 3, contentWidth + 6, 20, "F")
        }

        doc.setTextColor(darkGray.r, darkGray.g, darkGray.b)
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(project.name || "", margin, yPosition)

        if (project.start_date || project.end_date) {
          const dateText = `${project.start_date || ""} - ${project.end_date || ""}`
          doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
          doc.setFontSize(9)
          doc.setFont("helvetica", "bold")
          doc.text(dateText, pageWidth - margin, yPosition, { align: "right" })
        }
        yPosition += 6

        if (project.description) {
          doc.setTextColor(darkGray.r, darkGray.g, darkGray.b)
          doc.setFontSize(10)
          doc.setFont("helvetica", "normal")
          const projLines = doc.splitTextToSize(project.description, contentWidth)
          projLines.forEach((line: string, index: number) => {
            doc.text(line, margin, yPosition + index * 4.5)
          })
          yPosition += projLines.length * 4.5 + 5
        }

        if (project.technologies && project.technologies.length > 0) {
          let xPosition = margin
          doc.setFontSize(8)
          doc.setFont("helvetica", "bold")

          project.technologies.forEach((tech) => {
            const techWidth = doc.getTextWidth(tech) + 4

            doc.setFillColor(240, 245, 251)
            doc.setDrawColor(themeRGB.r, themeRGB.g, themeRGB.b)
            doc.setLineWidth(0.3)
            doc.roundedRect(xPosition, yPosition - 3, techWidth, 5, 1, 1, "FD")

            doc.setTextColor(themeRGB.r, themeRGB.g, themeRGB.b)
            doc.text(tech, xPosition + 2, yPosition)

            xPosition += techWidth + 3

            if (xPosition > pageWidth - margin - 20) {
              xPosition = margin
              yPosition += 6
            }
          })
          yPosition += 10
        }
      })
    }

    const fileName = `${resumeData.full_name?.replace(/\s+/g, "_") || "resume"}_resume.pdf`
    doc.save(fileName)
  } catch (error) {
    console.error("Error downloading PDF:", error)
    throw error
  }
}

export async function downloadResumeAsDOCX(resumeData: Partial<Resume>) {
  try {
    const response = await fetch("/api/resume/generate-docx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resumeData),
    })

    if (!response.ok) {
      throw new Error("Failed to generate DOCX")
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resumeData.full_name?.replace(/\s+/g, "_") || "resume"}_resume.docx`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error("Error downloading DOCX:", error)
    throw error
  }
}

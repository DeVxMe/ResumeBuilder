import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export const runtime = "edge"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const supabase = createServerClient()
    const { data: resume } = await supabase
      .from("resumes")
      .select("*")
      .eq("slug", params.slug)
      .eq("is_public", true)
      .single()

    if (!resume) {
      return new Response("Resume not found", { status: 404 })
    }

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 16,
            padding: 60,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            maxWidth: 800,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: resume.theme_color || "#6366f1",
              marginBottom: 20,
            }}
          >
            {resume.full_name}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#64748b",
              marginBottom: 30,
            }}
          >
            Professional Resume
          </div>
          {resume.experience?.[0] && (
            <div
              style={{
                fontSize: 20,
                color: "#475569",
                marginBottom: 10,
              }}
            >
              {resume.experience[0].position} at {resume.experience[0].company}
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 30,
              fontSize: 18,
              color: "#94a3b8",
            }}
          >
            <div style={{ marginRight: 10 }}>📄</div>
            Resume Creator
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)
    return new Response("Failed to generate image", { status: 500 })
  }
}

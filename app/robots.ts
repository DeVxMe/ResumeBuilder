import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: "https://resumewithoutsignup.vercel.app/sitemap.xml",
    host: "https://resumewithoutsignup.vercel.app",
  }
}

import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Free Resume Builder - No Signup Required | Create Professional Resumes Online",
    template: "%s | Free Resume Builder - No Signup",
  },
  description:
    "Create professional resumes instantly with our free resume builder. No signup, no credits, no limits. Choose from ATS-friendly templates, export to PDF/DOCX, and share online. 100% free resume maker.",
  keywords: [
    "free resume builder no signup",
    "resume builder without registration",
    "no signup resume creator",
    "free CV maker online",
    "professional resume templates free",
    "ATS friendly resume builder",
    "resume generator no account",
    "instant resume creator",
    "free resume maker 2024",
    "online resume builder free",
    "resume builder no email required",
    "create resume without login",
    "free professional resume",
    "resume templates no signup",
    "quick resume builder",
  ],
  authors: [{ name: "Resume Without Signup" }],
  creator: "Resume Without Signup",
  publisher: "Resume Without Signup",
  metadataBase: new URL("https://resumewithoutsignup.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resumewithoutsignup.vercel.app",
    title: "Free Resume Builder - No Signup Required | Create Professional Resumes",
    description:
      "Create professional resumes instantly with our free resume builder. No signup, no credits, no limits. Choose from ATS-friendly templates and export to PDF/DOCX.",
    siteName: "Resume Without Signup",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Resume Builder - No Signup Required",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder - No Signup Required",
    description:
      "Create professional resumes instantly. No signup, no credits, no limits. Free ATS-friendly templates.",
    images: ["/og-image.png"],
    creator: "@resumenosignup",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
    "yandex-verification": "your-yandex-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8652743922598553"
     crossOrigin="anonymous"></script>
<ins class="adsbygoogle"
// @ts-ignore
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-et-29-1k-9x+xe"
     data-ad-client="ca-pub-8652743922598553"
     data-ad-slot="6833194518"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
      <meta name="google-adsense-account" content="ca-pub-8652743922598553" />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8652743922598553"
         crossOrigin="anonymous"></script>
        <link rel="icon" href="../public/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Resume Without Signup",
              description:
                "Free professional resume builder with no signup required. Create ATS-friendly resumes with modern templates and export options.",
              url: "https://resumewithoutsignup.vercel.app",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              featureList: [
                "No signup required",
                "Professional resume templates",
                "ATS-friendly designs",
                "PDF and DOCX export",
                "Real-time preview",
                "Online sharing",
                "Mobile responsive",
                "Free forever",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "1247",
              },
              author: {
                "@type": "Organization",
                name: "Resume Without Signup",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Do I need to sign up to use this resume builder?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No, you can create and download professional resumes without any signup or registration. Just start building your resume immediately.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is this resume builder completely free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, our resume builder is 100% free with no hidden costs, credits, or premium features. All templates and export options are free.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are the resume templates ATS-friendly?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all our resume templates are designed to be ATS (Applicant Tracking System) friendly, ensuring your resume passes through automated screening systems.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I export my resume to PDF and Word formats?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can export your resume to both PDF and DOCX (Word) formats for free, without any watermarks or limitations.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}

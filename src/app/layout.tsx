import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AlphaScreen | The World's First Autonomous AI Movie Studio",
  description: "Generate full-length 2-hour Hollywood-grade feature films with AlphaScreen. The most advanced AI movie maker for professional directors. Consistent characters, cinematic 4K rendering, and autonomous editing.",
  keywords: [
    "AI movie maker", 
    "generate full AI movie", 
    "autonomous AI studio", 
    "AI feature film generator", 
    "make 2 hour AI movie", 
    "hollywood style AI video", 
    "AI cinematography platform",
    "consistent AI characters",
    "professional AI filmmaking"
  ],
  authors: [{ name: "AlphaScreen Studio" }],
  openGraph: {
    title: "AlphaScreen | Autonomous AI Feature Film Production",
    description: "Disrupting Hollywood. Generate consistent 2-hour AI movies from a single script.",
    url: "https://alphascreen.pro",
    siteName: "AlphaScreen",
    images: [
      {
        url: "https://alphascreen.pro/og-image.jpg", // We will need to add this image asset
        width: 1200,
        height: 630,
        alt: "AlphaScreen Autonomous Director Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaScreen | AI Movie Maker",
    description: "The world's first autonomous engine for 2-hour AI feature films.",
    images: ["https://alphascreen.pro/twitter-image.jpg"],
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
  verification: {
    google: "your-google-verification-code", // Add this when you set up Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AlphaScreen",
              "operatingSystem": "Web",
              "applicationCategory": "MultimediaApplication",
              "description": "Autonomous AI Studio for generating full-length feature films.",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "2599",
                "highPrice": "8999",
                "priceCurrency": "USD"
              }
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { CustomCursor } from "@/components/landing/CustomCursor";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://laibarashid.dev"),
  title: {
    default: "Laiba Rashid | Full Stack Developer",
    template: "%s | Laiba Rashid",
  },
  description:
    "Associate Software Engineer specializing in Next.js, React, Node.js, TypeScript, PostgreSQL, and MongoDB. Building scalable full-stack web applications.",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "shortcut icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "apple-touch-icon", url: "/favicon.svg" },
  ],
  keywords: [
    "Laiba Rashid",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "MERN Stack",
    "PERN Stack",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Laiba Rashid" }],
  creator: "Laiba Rashid",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://laibarashid.dev",
    title: "Laiba Rashid | Full Stack Developer",
    description:
      "Associate Software Engineer building scalable full-stack web applications.",
    siteName: "Laiba Rashid Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laiba Rashid | Full Stack Developer",
    description:
      "Associate Software Engineer building scalable full-stack web applications.",
    creator: "@laibarashid",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <CustomCursor />
          <ScrollProgress />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(15, 15, 40, 0.95)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                color: "white",
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

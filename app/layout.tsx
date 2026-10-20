import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Highlander Santos | Digital Showroom",
  description: "Software engineering portfolio and digital showroom.",
  openGraph: {
    title: "Highlander Santos – Digital Showroom",
    description: "Explore projetos de desenvolvimento full‑stack, design visual e SaaS.",
    url: "https://highlandersantos.com",
    siteName: "Highlander Santos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Highlander Santos showcase",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@highlandersantos",
    creator: "@highlandersantos",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


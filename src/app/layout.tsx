import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit } from "next/font/google";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/content/site";
import { logoFileExists } from "@/lib/logo-file";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.brandStatement,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const logoReady = logoFileExists();

  return (
    <html lang="en-NG" className={`${outfit.variable} h-full antialiased`}>
      <body className={`${outfit.className} flex min-h-full flex-col bg-background text-foreground`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header logoReady={logoReady} />
        <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
          {children}
        </main>
        <Footer logoReady={logoReady} />
        <CookieBanner />
      </body>
    </html>
  );
}

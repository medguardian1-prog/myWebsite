import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { site, contact, owner } from "@/lib/site";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "web developer Durban",
    "website design South Africa",
    "freelance web developer KZN",
    "small business website South Africa",
    "affordable website Durban",
    "HOTTWIREE",
  ],
  authors: [{ name: owner.name }],
  creator: owner.name,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08070b",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: contact.phoneIntl,
  email: contact.email,
  founder: { "@type": "Person", name: owner.name },
  areaServed: { "@type": "Country", name: "South Africa" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Durban",
    addressRegion: "KwaZulu-Natal",
    addressCountry: "ZA",
  },
  sameAs: [site.instagram.url],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Standard Landing Page Site",
      price: "3300",
      priceCurrency: "ZAR",
    },
    {
      "@type": "Offer",
      name: "Care Plan",
      price: "400",
      priceCurrency: "ZAR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased bg-ink text-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

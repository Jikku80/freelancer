import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { site } from "./site";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap" });

const title = "Freelancer Baucha — Custom Web Apps, ERP & Websites in Nepal";
const description =
  "Freelance Next.js and Nest.js developer in Nepal. Custom web apps, ERP, restaurant, hotel, travel and e-commerce systems — with free Render hosting and a free .np domain setup.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  keywords: [
    "freelance web developer Nepal", "Next.js developer Nepal", "Nest.js developer",
    "custom web app", "ERP software Nepal", "restaurant management system",
    "hotel management system", "travel website", "ecommerce website Nepal", ".np domain", "Render hosting",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: "/", siteName: site.name, title, description, locale: "en_NP",
    images: [{ url: "/baucha.png", width: 1312, height: 1199, alt: "Freelancer Baucha at his desk giving a thumbs up" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/baucha.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b1230", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

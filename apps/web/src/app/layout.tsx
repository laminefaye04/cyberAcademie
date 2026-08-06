import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CyberAcademy — Apprenez la cybersécurité offensive du zéro au pro",
    template: "%s · CyberAcademy",
  },
  description:
    "Plateforme SaaS EdTech de cybersécurité offensive : roadmap guidée en 12 niveaux, labs pratiques isolés, gamification et mentor IA personnalisé.",
  keywords: [
    "cybersécurité",
    "pentest",
    "hacking éthique",
    "formation cyber",
    "labs",
    "CTF",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body
        className={`${inter.variable} ${mono.variable} min-h-full bg-night-950 font-sans text-ink`}
      >
        {children}
      </body>
    </html>
  );
}

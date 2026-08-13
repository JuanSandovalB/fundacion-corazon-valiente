import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
  "https://www.fundacioncorazonvaliente.com"
),

  title: {
    default: "Fundación Corazón Valiente",
    template: "%s | Fundación Corazón Valiente",
  },

  description:
    "Fundación Corazón Valiente acompaña, protege e impulsa a niños, familias y comunidades mediante programas sociales, voluntariado, educación y apoyo comunitario en Colombia.",

  applicationName:
    "Fundación Corazón Valiente",

  keywords: [
    "Fundación Corazón Valiente",
    "Fundación Corazón Valiente Colombia",
    "fundación social",
    "voluntariado",
    "ayuda social",
    "donaciones",
    "programas sociales",
    "comunidades",
    "niños y familias",
    "Colombia",
  ],

  authors: [
    {
      name: "Fundación Corazón Valiente",
    },
  ],

  creator: "Fundación Corazón Valiente",

  publisher: "Fundación Corazón Valiente",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Fundación Corazón Valiente",
    description:
      "Acompañamos, protegemos e impulsamos a niños, familias y comunidades para generar dignidad, esperanza y oportunidades.",
    url: "/",
    siteName: "Fundación Corazón Valiente",
    locale: "es_CO",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fundación Corazón Valiente",
    description:
      "Acompañamos, protegemos e impulsamos a niños, familias y comunidades para generar dignidad, esperanza y oportunidades.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
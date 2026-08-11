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
    "https://fundacioncorazonvaliente.com"
  ),

  title: {
    default: "Fundación Corazón Valiente",
    template: "%s | Fundación Corazón Valiente",
  },

  description:
    "Fundación dedicada al acompañamiento social, comunitario y educativo de niños, familias y comunidades.",

  applicationName:
    "Fundación Corazón Valiente",

  keywords: [
    "Fundación Corazón Valiente",
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

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Fundación Corazón Valiente",
    description:
      "Transformamos vidas a través del acompañamiento social, comunitario y educativo.",
    url: "/",
    siteName: "Fundación Corazón Valiente",
    locale: "es_CO",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fundación Corazón Valiente",
    description:
      "Transformamos vidas a través del acompañamiento social, comunitario y educativo.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
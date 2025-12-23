import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SkipToContent } from "@/lib/utils/accessibility";
import { getPersonJsonLd, getWebsiteJsonLd } from "@/lib/utils/json-ld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Optimización de carga de fuentes
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tu-dominio.com'), // Cambiar por tu dominio
  title: {
    default: "Mi Portafolio | Desarrollador Full Stack",
    template: "%s | Mi Portafolio"
  },
  description: "Portafolio profesional de desarrollo web. Especializado en Next.js, React, TypeScript y desarrollo full stack. Descubre mis proyectos y experiencia.",
  keywords: [
    "desarrollador web",
    "full stack developer",
    "react developer",
    "next.js",
    "typescript",
    "portfolio",
    "desarrollo web",
    "frontend",
    "backend",
    "programador"
  ],
  authors: [{ name: "Tu Nombre", url: "https://tu-dominio.com" }],
  creator: "Tu Nombre",
  publisher: "Tu Nombre",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://tu-dominio.com",
    siteName: "Mi Portafolio",
    title: "Mi Portafolio | Desarrollador Full Stack",
    description: "Portafolio profesional de desarrollo web. Especializado en Next.js, React, TypeScript y desarrollo full stack.",
    images: [
      {
        url: "/og-image.png", // Crear esta imagen 1200x630px
        width: 1200,
        height: 630,
        alt: "Mi Portafolio - Desarrollador Web",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Portafolio | Desarrollador Full Stack",
    description: "Portafolio profesional de desarrollo web. Especializado en Next.js, React, TypeScript y desarrollo full stack.",
    creator: "@tu_usuario", // Cambiar por tu usuario de Twitter
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Añadir cuando tengas las verificaciones
    // google: 'tu-codigo-de-verificacion',
    // yandex: 'tu-codigo-de-verificacion',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteJsonLd()) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <SkipToContent />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

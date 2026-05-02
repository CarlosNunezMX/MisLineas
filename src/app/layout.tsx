import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import FaviconLight from "@/app/favicon.ico";
import FaviconDark from "@/app/favicon_dark.ico";

export const metadata: Metadata = {
  title: "MisLíneas",
  description:
    "Consulta las líneas telefónicas vinculadas a tu CURP en las principales operadoras de México.",
  keywords: [
    "MisLíneas",
    "CURP",
    "Líneas telefónicas",
    "Telcel",
    "AT&T",
    "Altan Redes",
    "México",
    "Operadoras",
  ],
  openGraph: {
    title: "MisLíneas | Consulta tus líneas telefónicas",
    description:
      "Consulta las líneas telefónicas vinculadas a tu CURP en las principales operadoras de México.",
    url: "https://mislineas.moraxh.dev",
    siteName: "MisLíneas",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://mislineas.com.mx/preview.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MisLíneas | Consulta tus líneas telefónicas",
    description:
      "Consulta las líneas telefónicas vinculadas a tu CURP en las principales operadoras de México.",
  },
  icons: [
    {
      rel: "icon",
      media: "(prefers-color-scheme: light)",
      type: "image/ico",
      url: FaviconLight.src,
    },
    {
      rel: "icon",
      media: "(prefers-color-scheme: dark)",
      type: "image/ico",
      url: FaviconDark.src,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>{children}</body>
      <Analytics />
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import FaviconLight from "@/app/favicon.ico";
import FaviconDark from "@/app/favicon_dark.ico";

const siteUrl = "https://mislineas.com.mx";
const siteTitle =
  "MisLíneas | Consulta líneas telefónicas vinculadas a tu CURP";
const siteDescription =
  "Consulta las líneas telefónicas vinculadas a tu CURP en las principales operadoras de México.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | MisLíneas",
  },
  description: siteDescription,
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
  alternates: {
    canonical: "/",
  },
  applicationName: "MisLíneas",
  authors: [{ name: "Moraxh", url: "https://github.com/moraxh" }],
  creator: "Moraxh",
  publisher: "MisLíneas",
  category: "utility",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "MisLíneas",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/preview.png",
        width: 1912,
        height: 964,
        alt: "MisLíneas, consulta líneas telefónicas vinculadas a tu CURP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/preview.png"],
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

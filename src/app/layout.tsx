import type { Metadata } from "next";
import { Archivo, Caveat } from "next/font/google";
import { ToastProvider } from "@blurrow/ui";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

// blurrow/ui is set in archivo; it reads the font from --font-archivo
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
// the pencil: handwritten notes on the blurrow stage
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Yerassyl Bazarbayev",
  description: "Software Engineer",
  // agents that can't run the app find the full text here
  alternates: { types: { "text/markdown": "/llms.txt" } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={`${archivo.variable} ${caveat.variable}`}>
      <body className="bg-page text-ink font-sans antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
      <Analytics />
    </html>
  );
}

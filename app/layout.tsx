import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

// Editorial serif for headings + clean grotesque for body.
const display = Fraunces({ variable: "--font-display", subsets: ["latin"] });
const body = Hanken_Grotesk({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoVault — Electric Cars & Camper Vans",
  description:
    "A curated inventory of electric cars and camper vans, sourced across Germany.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <Nav />
        {children}
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}

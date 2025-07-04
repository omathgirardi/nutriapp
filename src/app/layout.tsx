import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

// Observe que precisaríamos da fonte Helvetica Now Display, 
// mas como é proprietária, usaremos Inter como substituta
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  title: "NutriPlan - Plataforma de Dietas para Personal Trainers",
  description: "Gere dietas personalizadas de forma simples e profissional para seus clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
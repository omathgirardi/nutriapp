import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";

// Observe que precisaríamos da fonte Helvetica Now Display, 
// mas como é proprietária, usaremos Inter como substituta
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-helvetica",
});

export const metadata = {
  title: "NutriPlan - Plataforma de Dietas para Personal Trainers",
  description: "Gere dietas personalizadas de forma simples e profissional para seus clientes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
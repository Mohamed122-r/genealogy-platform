import type { Metadata } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const amiri = Amiri({ 
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "شجرة النسب العائلية",
  description: "منصة رقمية احترافية لإدارة وعرض شجرة نسب عائلية/قبلية كبيرة.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${amiri.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
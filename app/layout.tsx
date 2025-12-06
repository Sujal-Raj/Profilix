import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AuthProvider from "@/components/AuthProvider";
import { ToastProvider } from "@/components/ui/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Generator",
   description: "Create stunning, ATS-friendly portfolios and resumes instantly. Showcase your skills with customizable templates for developers, designers, and professionals. Start building your dream career today!",
  keywords: ["portfolio generator", "resume builder", "ATS friendly resume", "developer portfolio", "professional portfolio", "AI portfolio creator"],
  authors: [{ name: "Sujal Raj" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
        {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}

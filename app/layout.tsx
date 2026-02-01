import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AuthProvider from "@/components/AuthProvider";
import { ToastProvider } from "@/components/ui/ToastContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profilix - Turn your resume into portfolio | Portfolio Generator",
   description: "A website that converts your resume into a portfolio website.Create stunning, ATS-friendly portfolios and resumes instantly. Showcase your skills with customizable templates for developers, designers, and professionals. Start building your dream career today!",
  keywords: ["portfolio generator","Profilix", "resume builder", "ATS friendly resume", "developer portfolio", "professional portfolio", "AI portfolio creator"],
  authors: [{ name: "Sujal Raj" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
        {children}
          </ToastProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
    </ClerkProvider>
  );
}

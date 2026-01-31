import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sohag Bhuiyan | Frontend Developer",
  description: "Portfolio of Sohag Bhuiyan - Frontend Developer specializing in React, Next.js, and modern web technologies",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Tailwind CSS", "Web Developer"],
  authors: [{ name: "Sohag Bhuiyan" }],
  openGraph: {
    title: "Sohag Bhuiyan | Frontend Developer",
    description: "Portfolio of Sohag Bhuiyan - Frontend Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
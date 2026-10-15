import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/components/SolanaProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PointPass - Solana Loyalty Points",
  description: "Merchant-issued zero-decimal loyalty points on Solana Devnet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <SolanaProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </ToastProvider>
        </SolanaProvider>
      </body>
    </html>
  );
}

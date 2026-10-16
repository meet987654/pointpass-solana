import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/components/SolanaProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PointPass | Solana Loyalty Infrastructure",
  description: "Non-custodial loyalty token standard on Solana. Zero-decimal SPL tokens, deterministic PDA pipelines, and immutable proof-of-burn receipts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050814] text-[#fafafa] font-sans selection:bg-blue-600 selection:text-white">
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

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/components/SolanaProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { Header } from "@/components/Header";

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
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Stack+Sans+Notch:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07131b] text-[#ffffff] font-sans selection:bg-[#2d7a9c] selection:text-white relative">
        {/* Architectural Petrol Atmosphere Horizon Layer (Rescue Partners Theme) */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[#07131b]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(45,122,156,0.22)_0%,rgba(14,37,52,0.18)_50%,transparent_90%)]" />
        </div>

        <SolanaProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1 relative z-10">{children}</main>
          </ToastProvider>
        </SolanaProvider>
      </body>
    </html>
  );
}

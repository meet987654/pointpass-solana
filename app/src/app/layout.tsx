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
          href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Stack+Sans+Notch:wght@200..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050814] text-[#fafafa] font-sans selection:bg-blue-600 selection:text-white relative">
        {/* WHOLE-SCREEN FIXED GLASSMORPHIC CAUSTIC BACKGROUND */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden" aria-hidden="true">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
            style={{ backgroundImage: `url('/hero-glass-caustic-bg.jpg')` }}
          />
          <div className="absolute inset-0 backdrop-blur-[14px] bg-[#050814]/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(103,186,244,0.18)_0%,rgba(29,78,216,0.15)_35%,rgba(5,8,20,0.6)_80%)]" />
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

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/components/SolanaProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { Header } from "@/components/Header";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050814] text-[#fafafa] font-sans selection:bg-blue-600 selection:text-white relative">
        {/* WHOLE-SCREEN FIXED GLASSMORPHIC CAUSTIC BACKGROUND */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Full-screen Caustic Fluted Glass + Cobalt Orb Texture */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
            style={{ backgroundImage: `url('/hero-glass-caustic-bg.jpg')` }}
          />
          {/* Global Glassmorphic Frost & Atmosphere Layer */}
          <div className="absolute inset-0 backdrop-blur-[14px] bg-[#050814]/45" />
          {/* Celestial Horizon Radial Glow */}
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

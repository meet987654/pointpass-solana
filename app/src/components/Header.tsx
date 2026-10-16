"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROGRAM_ID, getExplorerAddressUrl } from "@/lib/constants";
import { WalletMultiButtonDynamic } from "./WalletButton";

export function Header() {
  const pathname = usePathname();
  const explorerUrl = getExplorerAddressUrl(PROGRAM_ID, "devnet");

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050814]/70 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Left Side: Brand Wordmark + Navigation */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg tracking-tight text-white hover:text-blue-200 transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_12px_#67baf4]" />
            <span>PointPass</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-normal text-blue-100/70">
            <Link
              href="/"
              className={`hover:text-white transition-colors ${
                pathname === "/" ? "text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : ""
              }`}
            >
              Overview
            </Link>
            <Link
              href="/customer"
              className={`hover:text-white transition-colors ${
                pathname.startsWith("/customer") ? "text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : ""
              }`}
            >
              Customer
            </Link>
            <Link
              href="/merchant"
              className={`hover:text-white transition-colors ${
                pathname.startsWith("/merchant") ? "text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : ""
              }`}
            >
              Merchant
            </Link>
            <Link
              href="/docs"
              className={`hover:text-white transition-colors ${
                pathname.startsWith("/docs") ? "text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : ""
              }`}
            >
              Docs
            </Link>
          </nav>
        </div>

        {/* Right Side: Links + Connect Button */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://github.com/meet987654/pointpass-solana"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-blue-100/70 hover:text-white transition-colors text-xs font-mono"
          >
            GitHub
          </a>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-block text-blue-100/70 hover:text-white transition-colors font-mono text-xs"
          >
            Devnet: {PROGRAM_ID.toBase58().slice(0, 4)}...{PROGRAM_ID.toBase58().slice(-4)}
          </a>

          <WalletMultiButtonDynamic />
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROGRAM_ID, getExplorerAddressUrl } from "@/lib/constants";
import { WalletMultiButtonDynamic } from "./WalletButton";

export function Header() {
  const pathname = usePathname();
  const explorerUrl = getExplorerAddressUrl(PROGRAM_ID, "devnet");

  return (
    <header className="sticky top-0 z-50 border-b border-[#d3dde2]/10 bg-[#07131b]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Left Side: Brand Wordmark (Oddval Architectural Style) + Navigation */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#3c9bc3] shadow-[0_0_10px_#3c9bc3] transition-transform group-hover:scale-110" />
            <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-[#93c0d2] transition-colors">
              POINTPASS
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-[#d3dde2]/40 tracking-widest pl-1 border-l border-[#d3dde2]/15">
              SOLANA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-normal text-[#d3dde2]/70">
            <Link
              href="/"
              className={`hover:text-white transition-colors py-1 ${
                pathname === "/" ? "text-white font-medium border-b border-[#3c9bc3]" : ""
              }`}
            >
              Overview
            </Link>
            <Link
              href="/customer"
              className={`hover:text-white transition-colors py-1 ${
                pathname.startsWith("/customer") ? "text-white font-medium border-b border-[#3c9bc3]" : ""
              }`}
            >
              Customer
            </Link>
            <Link
              href="/merchant"
              className={`hover:text-white transition-colors py-1 ${
                pathname.startsWith("/merchant") ? "text-white font-medium border-b border-[#3c9bc3]" : ""
              }`}
            >
              Merchant
            </Link>
            <Link
              href="/docs"
              className={`hover:text-white transition-colors py-1 ${
                pathname.startsWith("/docs") ? "text-white font-medium border-b border-[#3c9bc3]" : ""
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
            className="hidden sm:inline-block text-[#d3dde2]/70 hover:text-white transition-colors text-xs font-mono"
          >
            GitHub
          </a>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-block text-[#d3dde2]/70 hover:text-white transition-colors font-mono text-xs"
          >
            Devnet: {PROGRAM_ID.toBase58().slice(0, 4)}...{PROGRAM_ID.toBase58().slice(-4)}
          </a>

          <WalletMultiButtonDynamic />
        </div>
      </div>
    </header>
  );
}

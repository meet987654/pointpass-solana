"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROGRAM_ID, getExplorerAddressUrl } from "@/lib/constants";
import { WalletMultiButtonDynamic } from "./WalletButton";

export function Header() {
  const pathname = usePathname();
  const explorerUrl = getExplorerAddressUrl(PROGRAM_ID, "devnet");

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c1c22] bg-[#09090b]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Brand Wordmark + Navigation */}
        <div className="flex items-center gap-10">
          <Link href="/" className="font-semibold text-lg tracking-tight text-white hover:text-neutral-200 transition-colors">
            PointPass
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-normal text-[#a1a1aa]">
            <Link
              href="/"
              className={`hover:text-white transition-colors ${
                pathname === "/" ? "text-white font-medium" : ""
              }`}
            >
              Overview
            </Link>
            <Link
              href="/customer"
              className={`hover:text-white transition-colors ${
                pathname.startsWith("/customer") ? "text-white font-medium" : ""
              }`}
            >
              Customer
            </Link>
            <Link
              href="/merchant"
              className={`hover:text-white transition-colors ${
                pathname.startsWith("/merchant") ? "text-white font-medium" : ""
              }`}
            >
              Merchant
            </Link>
            <Link
              href="/docs"
              className={`hover:text-white transition-colors ${
                pathname.startsWith("/docs") ? "text-white font-medium" : ""
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
            className="hidden sm:inline-block text-[#a1a1aa] hover:text-white transition-colors text-sm"
          >
            GitHub
          </a>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-block text-[#a1a1aa] hover:text-white transition-colors text-sm font-mono text-xs"
          >
            Devnet: {PROGRAM_ID.toBase58().slice(0, 4)}...{PROGRAM_ID.toBase58().slice(-4)}
          </a>

          <WalletMultiButtonDynamic />
        </div>
      </div>
    </header>
  );
}

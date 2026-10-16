"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROGRAM_ID, getExplorerAddressUrl } from "@/lib/constants";
import { WalletMultiButtonDynamic } from "./WalletButton";

function PointPassLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="square"
      className={`${className} text-white drop-shadow-[0_0_10px_rgba(142,185,203,0.85)] transition-all duration-300 group-hover:rotate-45 group-hover:scale-110`}
    >
      {/* 8-ray asterisk logo matching exact reference */}
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const explorerUrl = getExplorerAddressUrl(PROGRAM_ID, "devnet");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger navbar visibility once scroll has started from the hero section (e.g. > 50px)
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On non-home pages (/customer, /merchant, /docs), always show navbar.
  // On home page ("/"), show only after user starts scrolling down from hero.
  const isVisible = pathname !== "/" || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#07131b]/85 backdrop-blur-xl transition-all duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Left Side: Brand Logo + Wordmark + Navigation */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <PointPassLogo className="w-5 h-5 text-white group-hover:text-[#93c0d2]" />
            <span className="font-display font-medium text-xl tracking-tight text-white group-hover:text-[#93c0d2] transition-colors">
              PointPass
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-normal text-[#d3dde2]/70">
            <Link
              href="/"
              className={`hover:text-white transition-colors py-1 ${
                pathname === "/" ? "text-white font-medium border-b-2 border-[#3c9bc3]" : ""
              }`}
            >
              Overview
            </Link>
            <Link
              href="/customer"
              className={`hover:text-white transition-colors py-1 ${
                pathname.startsWith("/customer") ? "text-white font-medium border-b-2 border-[#3c9bc3]" : ""
              }`}
            >
              Customer
            </Link>
            <Link
              href="/merchant"
              className={`hover:text-white transition-colors py-1 ${
                pathname.startsWith("/merchant") ? "text-white font-medium border-b-2 border-[#3c9bc3]" : ""
              }`}
            >
              Merchant
            </Link>
            <Link
              href="/docs"
              className={`hover:text-white transition-colors py-1 ${
                pathname.startsWith("/docs") ? "text-white font-medium border-b-2 border-[#3c9bc3]" : ""
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

export default Header;

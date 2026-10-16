"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROGRAM_ID, getExplorerAddressUrl } from "@/lib/constants";
import { WalletMultiButtonDynamic } from "./WalletButton";

export function Header() {
  const pathname = usePathname();
  const explorerUrl = getExplorerAddressUrl(PROGRAM_ID, "devnet");

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#090c10]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-sm shadow-emerald-500/20">
              <div className="w-full h-full bg-[#090c10] rounded-[7px] flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                PointPass
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/"
                  ? "bg-white/[0.08] text-white"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              Overview
            </Link>
            <Link
              href="/customer"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname.startsWith("/customer")
                  ? "bg-white/[0.08] text-emerald-400"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              Customer Terminal
            </Link>
            <Link
              href="/merchant"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname.startsWith("/merchant")
                  ? "bg-white/[0.08] text-purple-400"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              Merchant Terminal
            </Link>
            <Link
              href="/docs"
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname.startsWith("/docs")
                  ? "bg-white/[0.08] text-teal-300 font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              Docs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Devnet Live</span>
          </div>

          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20 transition-all"
            title="View PointPass on Solana Explorer"
          >
            <span>Program</span>
            <span className="text-neutral-200">{PROGRAM_ID.toBase58().slice(0, 4)}...{PROGRAM_ID.toBase58().slice(-4)}</span>
            <svg className="w-3 h-3 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <a
            href="https://github.com/meet987654/pointpass-solana"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="GitHub Repository"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          <WalletMultiButtonDynamic />
        </div>
      </div>
    </header>
  );
}

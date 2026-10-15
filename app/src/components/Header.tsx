"use client";

import Link from "next/link";
import { PROGRAM_ID, getExplorerAddressUrl } from "@/lib/constants";
import { WalletMultiButtonDynamic } from "./WalletButton";

export function Header() {
  const explorerUrl = getExplorerAddressUrl(PROGRAM_ID, "devnet");

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-80">
            PointPass
          </Link>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Devnet
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white underline underline-offset-4 hidden sm:inline"
          >
            Program: {PROGRAM_ID.toBase58().slice(0, 4)}...{PROGRAM_ID.toBase58().slice(-4)}
          </a>
          <WalletMultiButtonDynamic />
        </div>
      </div>
    </header>
  );
}

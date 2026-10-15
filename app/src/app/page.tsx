"use client";

import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { PROGRAM_ID, RPC_URL, DEMO_MERCHANT, getExplorerAddressUrl } from "@/lib/constants";

export default function Home() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-4">
            Phase 5b: Customer Portal Live
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">PointPass Loyalty Protocol</h1>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
            Merchant-issued loyalty points as zero-decimal SPL tokens on Solana Devnet. Connect your wallet to view your points balance, track rewards progress, and redeem on-chain receipts.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/customer?merchant=${DEMO_MERCHANT}`}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm shadow-emerald-900/20"
            >
              Open Customer Portal →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Wallet Status
          </span>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold inline-block ${
              connected
                ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            }`}
          >
            {connected && publicKey
              ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
              : "Not Connected"}
          </span>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Devnet Program ID
          </span>
          <a
            href={getExplorerAddressUrl(PROGRAM_ID, "devnet")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline truncate block"
          >
            {PROGRAM_ID.toBase58()}
          </a>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Solana RPC
          </span>
          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 truncate block">
            {RPC_URL}
          </span>
        </div>
      </div>
    </div>
  );
}

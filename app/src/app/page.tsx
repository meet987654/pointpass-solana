"use client";

import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { PROGRAM_ID, RPC_URL, DEMO_MERCHANT, getExplorerAddressUrl } from "@/lib/constants";

export default function Home() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Hero Section */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-5">
            Solana Devnet Loyalty Protocol
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            PointPass Loyalty Protocol
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            Merchant-issued loyalty points as zero-decimal SPL tokens on Solana. Customers truly own their reward points in their own wallet, and burn them on-chain for verifiable, permanent redemption receipts.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/customer?merchant=${DEMO_MERCHANT}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm shadow-emerald-900/20"
            >
              Customer Portal →
            </Link>
            <Link
              href="/merchant"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-sm"
            >
              Merchant Dashboard →
            </Link>
          </div>
        </div>
      </div>

      {/* Two Portal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold mb-4">
              ☕
            </div>
            <h2 className="text-xl font-bold mb-2">Customer Experience</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              Connect your Phantom or Solflare wallet to view your current points balance for any store (defaulting to demo cafe <span className="font-semibold text-neutral-900 dark:text-white">Bean There Cafe</span>). Burn 10 points to claim a reward receipt.
            </p>
          </div>
          <Link
            href={`/customer?merchant=${DEMO_MERCHANT}`}
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5"
          >
            Launch Customer View <span>→</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold mb-4">
              🏪
            </div>
            <h2 className="text-xl font-bold mb-2">Merchant Experience</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              Initialize a loyalty program for your business, set reward thresholds, award points to customer wallets, and inspect an immutable audit trail of customer redemption receipts.
            </p>
          </div>
          <Link
            href="/merchant"
            className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1.5"
          >
            Launch Merchant View <span>→</span>
          </Link>
        </div>
      </div>

      {/* Protocol Metadata Grid */}
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

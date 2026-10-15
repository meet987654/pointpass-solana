"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { PROGRAM_ID, RPC_URL, getExplorerAddressUrl } from "@/lib/constants";

export default function Home() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">PointPass Program Client</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          Phase 5a: Web client and wallet provider scaffolded for live Solana Devnet.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
            <span className="text-sm font-medium">Wallet Status</span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                connected
                  ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                  : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              }`}
            >
              {connected && publicKey
                ? `Connected: ${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
                : "Not Connected"}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
            <span className="text-sm font-medium">Program ID</span>
            <a
              href={getExplorerAddressUrl(PROGRAM_ID, "devnet")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline"
            >
              {PROGRAM_ID.toBase58()}
            </a>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50">
            <span className="text-sm font-medium">RPC Endpoint</span>
            <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
              {RPC_URL}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

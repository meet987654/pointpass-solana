"use client";

import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useLoyaltyProgram } from "@/hooks/useLoyaltyProgram";
import { useReceipts } from "@/hooks/useReceipts";
import { initializeProgram, awardPoints } from "@/lib/actions";
import { getProgram } from "@/lib/program";
import { friendlyError } from "@/lib/errors";
import { getExplorerAddressUrl } from "@/lib/constants";
import { useToast } from "@/components/ToastProvider";
import { WalletMultiButtonDynamic } from "@/components/WalletButton";

export function MerchantView() {
  const { connection } = useConnection();
  const { connected, publicKey, signTransaction, signAllTransactions } = useWallet();
  const { showToast } = useToast();

  // Load loyalty program data for connected wallet
  const {
    data: programData,
    loading: programLoading,
    error: programError,
    refresh: refreshProgram,
  } = useLoyaltyProgram(publicKey);

  // Load all receipts for this merchant
  const {
    data: receipts,
    loading: receiptsLoading,
    error: receiptsError,
    refresh: refreshReceipts,
  } = useReceipts(publicKey, null);

  // Form states: Initialize
  const [initName, setInitName] = useState("Bean There Cafe");
  const [initRewardCost, setInitRewardCost] = useState("10");
  const [isInitializing, setIsInitializing] = useState(false);

  // Form states: Award
  const [awardCustomer, setAwardCustomer] = useState("");
  const [awardAmount, setAwardAmount] = useState("10");
  const [isAwarding, setIsAwarding] = useState(false);
  const [awardAddressError, setAwardAddressError] = useState<string | null>(null);

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey || !signTransaction || !signAllTransactions) {
      showToast({ message: "Please connect your wallet first", type: "error" });
      return;
    }

    const trimmedName = initName.trim();
    if (!trimmedName) {
      showToast({ message: "Store name cannot be empty", type: "error" });
      return;
    }
    const cost = parseInt(initRewardCost, 10);
    if (isNaN(cost) || cost <= 0) {
      showToast({ message: "Reward cost must be a positive number", type: "error" });
      return;
    }

    setIsInitializing(true);
    try {
      const adapterWallet = { publicKey, signTransaction, signAllTransactions };
      const program = getProgram(connection, adapterWallet);
      const sig = await initializeProgram(program, publicKey, trimmedName, cost);

      showToast({
        message: `Loyalty program "${trimmedName}" initialized successfully!`,
        type: "success",
        txSignature: sig,
      });

      await refreshProgram();
    } catch (err: unknown) {
      console.error("Initialize error:", err);
      showToast({ message: friendlyError(err), type: "error" });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleAward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey || !signTransaction || !signAllTransactions || !programData) {
      showToast({ message: "Please connect your wallet first", type: "error" });
      return;
    }

    let customerPubkey: PublicKey;
    try {
      customerPubkey = new PublicKey(awardCustomer.trim());
      setAwardAddressError(null);
    } catch {
      setAwardAddressError("Invalid Solana public key format.");
      return;
    }

    const amount = parseInt(awardAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      showToast({ message: "Award amount must be a positive integer", type: "error" });
      return;
    }

    setIsAwarding(true);
    try {
      const adapterWallet = { publicKey, signTransaction, signAllTransactions };
      const program = getProgram(connection, adapterWallet);
      const sig = await awardPoints(program, publicKey, customerPubkey, amount);

      showToast({
        message: `Successfully awarded ${amount} points to ${customerPubkey.toBase58().slice(0, 4)}...${customerPubkey.toBase58().slice(-4)}!`,
        type: "success",
        txSignature: sig,
      });

      setAwardCustomer("");
      await Promise.all([refreshProgram(), refreshReceipts()]);
    } catch (err: unknown) {
      console.error("Award error:", err);
      showToast({ message: friendlyError(err), type: "error" });
    } finally {
      setIsAwarding(false);
    }
  };

  const handleRefreshAll = async () => {
    await Promise.all([refreshProgram(), refreshReceipts()]);
    showToast({ message: "Refreshed merchant data", type: "info" });
  };

  if (!connected || !publicKey) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-10 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl font-bold mx-auto mb-5">
            🏪
          </div>
          <h1 className="text-2xl font-bold mb-3">Merchant Dashboard</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
            Connect your merchant wallet to initialize your store loyalty program, issue zero-decimal SPL loyalty tokens to customers, and audit on-chain redemption receipts.
          </p>
          <div className="flex justify-center">
            <WalletMultiButtonDynamic />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Merchant Header Bar */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold block mb-1">
            Connected Merchant Wallet
          </span>
          <span className="text-sm font-mono font-medium text-neutral-900 dark:text-white break-all">
            {publicKey.toBase58()}
          </span>
        </div>
        <button
          onClick={handleRefreshAll}
          className="px-3.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors self-start sm:self-auto cursor-pointer"
        >
          ↻ Refresh
        </button>
      </div>

      {programLoading ? (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 animate-pulse space-y-4">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
        </div>
      ) : programError ? (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-sm text-red-700 dark:text-red-300">
          <p className="font-semibold mb-1">Error loading loyalty program:</p>
          <p className="font-mono text-xs">{programError}</p>
        </div>
      ) : !programData ? (
        /* Uninitialized State: Initialize Form */
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
              No Program Initialized Yet
            </span>
            <h2 className="text-2xl font-bold tracking-tight">Initialize Your Loyalty Program</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              Deploy your on-chain LoyaltyProgram PDA and custom Points SPL Mint. Once created, you can issue loyalty points to any Solana address.
            </p>
          </div>

          <form onSubmit={handleInitialize} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                Business / Store Name
              </label>
              <input
                type="text"
                value={initName}
                maxLength={32}
                onChange={(e) => setInitName(e.target.value)}
                placeholder="e.g. Bean There Cafe"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <span className="text-xs text-neutral-400 mt-1 block">Maximum 32 bytes UTF-8 payload.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                Reward Threshold (Points to Burn)
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={initRewardCost}
                onChange={(e) => setInitRewardCost(e.target.value)}
                placeholder="10"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <span className="text-xs text-neutral-400 mt-1 block">Number of points required for a customer to redeem 1 reward.</span>
            </div>

            <button
              type="submit"
              disabled={isInitializing}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              {isInitializing ? "Initializing On-Chain..." : "Initialize Loyalty Program"}
            </button>
          </form>
        </div>
      ) : (
        /* Initialized State: Program Stats & Award Points Form */
        <>
          {/* Program Overview Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-500 block mb-1">
                  Active Loyalty Program
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  {programData.name}
                </h1>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 self-start sm:self-auto">
                Reward Cost: {programData.rewardCost} Points
              </span>
            </div>

            {/* Stat Counters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 border border-neutral-100 dark:border-neutral-800">
                <span className="text-xs uppercase tracking-wider text-neutral-500 block mb-1">Total Points Awarded</span>
                <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                  {programData.totalAwarded}
                </span>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 border border-neutral-100 dark:border-neutral-800">
                <span className="text-xs uppercase tracking-wider text-neutral-500 block mb-1">Total Points Redeemed</span>
                <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                  {programData.totalRedeemed}
                </span>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 border border-neutral-100 dark:border-neutral-800">
                <span className="text-xs uppercase tracking-wider text-neutral-500 block mb-1">Redemption Receipts</span>
                <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                  {programData.redemptionCount}
                </span>
              </div>
            </div>

            {/* PDA Links */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 text-xs font-mono">
              <div className="flex-1 truncate">
                <span className="text-neutral-500 font-sans block mb-1">Loyalty Program PDA:</span>
                <a
                  href={getExplorerAddressUrl(programData.programPda, "devnet")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  {programData.programPda.toBase58()}
                </a>
              </div>
              <div className="flex-1 truncate">
                <span className="text-neutral-500 font-sans block mb-1">Points Mint PDA:</span>
                <a
                  href={getExplorerAddressUrl(programData.mintPda, "devnet")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  {programData.mintPda.toBase58()}
                </a>
              </div>
            </div>
          </div>

          {/* Award Points Form */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold block mb-1">
                Issue Rewards
              </span>
              <h2 className="text-xl font-bold tracking-tight">Award Points to Customer</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Enter the customer&apos;s Solana wallet address and the number of points to mint into their token account.
              </p>
            </div>

            <form onSubmit={handleAward} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Customer Wallet Address
                </label>
                <input
                  type="text"
                  value={awardCustomer}
                  onChange={(e) => {
                    setAwardCustomer(e.target.value);
                    if (awardAddressError) setAwardAddressError(null);
                  }}
                  placeholder="e.g. 82NNe4itWTu8QeC3wf6FRoBrjSujkv48u1hAYYyeTgQ9"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                {awardAddressError && (
                  <span className="text-xs text-red-500 mt-1 block">{awardAddressError}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                  Points Amount
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={awardAmount}
                  onChange={(e) => setAwardAmount(e.target.value)}
                  placeholder="10"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isAwarding}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              >
                {isAwarding ? "Awarding Points..." : "Award Points"}
              </button>
            </form>
          </div>

          {/* Store Redemption Audit History */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-500 block mb-1">
                  On-Chain Proof of Burn
                </span>
                <h2 className="text-xl font-bold tracking-tight">Customer Redemption Receipts</h2>
              </div>
              <span className="text-xs font-medium text-neutral-500">
                {receipts ? `${receipts.length} total` : "Loading..."}
              </span>
            </div>

            {receiptsLoading ? (
              <div className="py-8 text-center text-sm text-neutral-500 animate-pulse">
                Fetching on-chain receipts...
              </div>
            ) : receiptsError ? (
              <div className="py-6 text-center text-sm text-red-500">
                Error loading receipts: {receiptsError}
              </div>
            ) : !receipts || receipts.length === 0 ? (
              <div className="py-10 text-center rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                <span className="text-2xl block mb-2">🧾</span>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 block">
                  No redemptions recorded yet for this store.
                </span>
                <span className="text-xs text-neutral-400 mt-1 block">
                  When customers burn points at your store, permanent cryptographic receipts will appear here.
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-xs uppercase tracking-wider text-neutral-500">
                      <th className="py-3 px-3">#</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Points Burned</th>
                      <th className="py-3 px-3">Date & Time</th>
                      <th className="py-3 px-3 text-right">Receipt PDA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 font-mono text-xs">
                    {receipts.map((r) => (
                      <tr key={r.pubkey.toBase58()} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                        <td className="py-3 px-3 font-semibold text-neutral-900 dark:text-white">
                          #{r.receiptNumber}
                        </td>
                        <td className="py-3 px-3">
                          <a
                            href={getExplorerAddressUrl(r.customer, "devnet")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 dark:text-purple-400 hover:underline"
                          >
                            {r.customer.toBase58().slice(0, 4)}...{r.customer.toBase58().slice(-4)}
                          </a>
                        </td>
                        <td className="py-3 px-3 font-semibold text-emerald-600 dark:text-emerald-400">
                          {r.pointsBurned} pts
                        </td>
                        <td className="py-3 px-3 text-neutral-600 dark:text-neutral-400 font-sans">
                          {new Date(r.timestamp * 1000).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <a
                            href={getExplorerAddressUrl(r.pubkey, "devnet")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>{r.pubkey.toBase58().slice(0, 4)}...{r.pubkey.toBase58().slice(-4)}</span>
                            <span className="text-[10px]">↗</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
